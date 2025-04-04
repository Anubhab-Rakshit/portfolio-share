"use client"

import { Suspense, useRef, useState, useEffect } from "react"
import dynamic from "next/dynamic"
import { useTheme } from "next-themes"
import { useHasMounted } from "@/lib/client-utils"

// Dynamically import Three.js components with no SSR
const DynamicCanvas = dynamic(() => import("@react-three/fiber").then((mod) => mod.Canvas), {
  ssr: false,
})

const DynamicOrbitControls = dynamic(() => import("@react-three/drei").then((mod) => mod.OrbitControls), {
  ssr: false,
})

const DynamicEnvironment = dynamic(() => import("@react-three/drei").then((mod) => mod.Environment), {
  ssr: false,
})

const DynamicContactShadows = dynamic(() => import("@react-three/drei").then((mod) => mod.ContactShadows), {
  ssr: false,
})

const DynamicHtml = dynamic(() => import("@react-three/drei").then((mod) => mod.Html), {
  ssr: false,
})

const DynamicUseGLTF = dynamic(() => import("@react-three/drei").then((mod) => mod.useGLTF), {
  ssr: false,
})

const DynamicUseProgress = dynamic(() => import("@react-three/drei").then((mod) => mod.useProgress), {
  ssr: false,
})

// Import useSpring and animated directly
import { useSpring } from "@react-spring/three"
import { animated } from "@react-spring/three"

function Loader() {
  const { progress } = { progress: 0 } // Mock progress for SSR

  return (
    <div className="flex flex-col items-center justify-center">
      <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin mb-2"></div>
      <span className="text-primary">{progress.toFixed(0)}% loaded</span>
    </div>
  )
}

function ClientLoader() {
  const { progress } = DynamicUseProgress()

  return (
    <DynamicHtml center>
      <div className="flex flex-col items-center justify-center">
        <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin mb-2"></div>
        <span className="text-primary">{progress.toFixed(0)}% loaded</span>
      </div>
    </DynamicHtml>
  )
}

function Model({
  path,
  scale = 1,
  position = [0, 0, 0],
  rotation = [0, 0, 0],
  interactive = true,
}: {
  path: string
  scale?: number | [number, number, number]
  position?: [number, number, number]
  rotation?: [number, number, number]
  interactive?: boolean
}) {
  const meshRef = useRef(null)
  const [hovered, setHovered] = useState(false)
  const [clicked, setClicked] = useState(false)

  // Mock GLTF for SSR
  const { scene } = { scene: null }

  const { scaleSpring, rotationSpring } = useSpring({
    scaleSpring: clicked ? 1.2 : hovered ? 1.1 : 1,
    rotationSpring: hovered ? 0.2 : 0,
    config: { mass: 1, tension: 170, friction: 26 },
  })

  // useFrame must be used inside a Canvas
  const useFrame = (callback) => {
    useEffect(() => {
      let frameId

      const animate = () => {
        callback({ clock: { getElapsedTime: () => Date.now() / 1000 } })
        frameId = requestAnimationFrame(animate)
      }

      frameId = requestAnimationFrame(animate)
      return () => cancelAnimationFrame(frameId)
    }, [])
  }

  useFrame((state) => {
    if (!meshRef.current || !interactive) return

    // Subtle continuous rotation
    meshRef.current.rotation.y += 0.003
  })

  const ClientModel = dynamic(
    () =>
      import("@react-three/drei").then((mod) => {
        const { useGLTF } = mod
        return function ClientModel() {
          const { scene } = useGLTF(path)
          return (
            <animated.group
              ref={meshRef}
              scale={interactive ? scaleSpring : scale}
              position={position}
              rotation={rotation}
              onPointerOver={() => interactive && setHovered(true)}
              onPointerOut={() => interactive && setHovered(false)}
              onClick={() => interactive && setClicked(!clicked)}
            >
              <primitive object={scene} />
            </animated.group>
          )
        }
      }),
    { ssr: false },
  )

  return <ClientModel />
}

export function ThreeDModel({
  modelPath,
  scale = 1,
  position = [0, 0, 0],
  rotation = [0, 0, 0],
  autoRotate = true,
  enableZoom = true,
  enablePan = false,
  interactive = true,
  height = "400px",
  environmentPreset = "city",
  showControls = true,
  showShadow = true,
  className = "",
}: {
  modelPath: string
  scale?: number | [number, number, number]
  position?: [number, number, number]
  rotation?: [number, number, number]
  autoRotate?: boolean
  enableZoom?: boolean
  enablePan?: boolean
  interactive?: boolean
  height?: string
  environmentPreset?:
    | "apartment"
    | "city"
    | "dawn"
    | "forest"
    | "lobby"
    | "night"
    | "park"
    | "studio"
    | "sunset"
    | "warehouse"
  showControls?: boolean
  showShadow?: boolean
  className?: string
}) {
  const { theme } = useTheme()
  const isDark = theme === "dark"
  const hasMounted = useHasMounted()

  if (!hasMounted) {
    // Return a placeholder with the same dimensions
    return <div className={`w-full ${className}`} style={{ height }}></div>
  }

  return (
    <div className={`w-full ${className}`} style={{ height }}>
      <DynamicCanvas camera={{ position: [0, 0, 5], fov: 45 }}>
        <color attach="background" args={[isDark ? "#050816" : "#f8fafc"]} />

        <ambientLight intensity={0.5} />
        <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} intensity={1} castShadow />

        <Suspense fallback={<ClientLoader />}>
          <Model path={modelPath} scale={scale} position={position} rotation={rotation} interactive={interactive} />
          <DynamicEnvironment preset={environmentPreset} />

          {showShadow && (
            <DynamicContactShadows position={[0, -1.5, 0]} opacity={0.4} scale={10} blur={1.5} far={1.5} />
          )}
        </Suspense>

        {showControls && (
          <DynamicOrbitControls
            autoRotate={autoRotate}
            autoRotateSpeed={1}
            enableZoom={enableZoom}
            enablePan={enablePan}
            minPolarAngle={Math.PI / 4}
            maxPolarAngle={Math.PI / 1.5}
          />
        )}
      </DynamicCanvas>
    </div>
  )
}

