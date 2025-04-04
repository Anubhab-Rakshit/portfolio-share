"use client"

import { useEffect } from "react"

import { useRef, useState } from "react"
import dynamic from "next/dynamic"
import { useTheme } from "next-themes"
import { useHasMounted } from "@/lib/client-utils"

// Dynamically import Three.js components with no SSR
const DynamicCanvas = dynamic(() => import("@react-three/fiber").then((mod) => mod.Canvas), {
  ssr: false,
})

const DynamicText3D = dynamic(() => import("@react-three/drei").then((mod) => mod.Text3D), {
  ssr: false,
})

const DynamicCenter = dynamic(() => import("@react-three/drei").then((mod) => mod.Center), {
  ssr: false,
})

const DynamicFloat = dynamic(() => import("@react-three/drei").then((mod) => mod.Float), {
  ssr: false,
})

// Import useSpring and animated directly
import { useSpring } from "@react-spring/three"
import { animated } from "@react-spring/three"

export function ThreeDText({
  text,
  size = 1,
  height = 0.2,
  color = "#ffffff",
  bevelEnabled = true,
  bevelSize = 0.02,
  bevelThickness = 0.1,
  font = "/fonts/Inter_Bold.json",
  floatIntensity = 0.5,
  className = "",
  animated = true,
}: {
  text: string
  size?: number
  height?: number
  color?: string
  bevelEnabled?: boolean
  bevelSize?: number
  bevelThickness?: number
  font?: string
  floatIntensity?: number
  className?: string
  animated?: boolean
}) {
  const { theme } = useTheme()
  const isDark = theme === "dark"
  const defaultColor = isDark ? "#ffffff" : "#1e293b"
  const hasMounted = useHasMounted()

  if (!hasMounted) {
    // Return a placeholder with the same dimensions
    return <div className={`w-full h-24 ${className}`}></div>
  }

  return (
    <div className={`w-full h-24 ${className}`}>
      <DynamicCanvas camera={{ position: [0, 0, 5], fov: 45 }}>
        <ambientLight intensity={0.5} />
        <directionalLight position={[10, 10, 10]} intensity={1} />

        {animated ? (
          <DynamicFloat floatIntensity={floatIntensity} rotationIntensity={0.2} speed={2}>
            <DynamicCenter>
              <AnimatedText3D
                text={text}
                size={size}
                height={height}
                color={color || defaultColor}
                bevelEnabled={bevelEnabled}
                bevelSize={bevelSize}
                bevelThickness={bevelThickness}
                font={font}
              />
            </DynamicCenter>
          </DynamicFloat>
        ) : (
          <DynamicCenter>
            <DynamicText3D
              font={font}
              size={size}
              height={height}
              bevelEnabled={bevelEnabled}
              bevelSize={bevelSize}
              bevelThickness={bevelThickness}
              curveSegments={32}
            >
              {text}
              <meshStandardMaterial color={color || defaultColor} />
            </DynamicText3D>
          </DynamicCenter>
        )}
      </DynamicCanvas>
    </div>
  )
}

function AnimatedText3D({
  text,
  size,
  height,
  color,
  bevelEnabled,
  bevelSize,
  bevelThickness,
  font,
}: {
  text: string
  size: number
  height: number
  color: string
  bevelEnabled: boolean
  bevelSize: number
  bevelThickness: number
  font: string
}) {
  const meshRef = useRef(null)
  const [hovered, setHovered] = useState(false)

  const { scale, rotation } = useSpring({
    scale: hovered ? 1.1 : 1,
    rotation: hovered ? [0, Math.PI / 12, 0] : [0, 0, 0],
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
    if (!meshRef.current) return

    // Subtle continuous rotation
    meshRef.current.rotation.y = Math.sin(state.clock.getElapsedTime() * 0.2) * 0.1
  })

  return (
    <animated.mesh
      ref={meshRef}
      scale={scale}
      rotation={rotation}
      onPointerOver={() => setHovered(true)}
      onPointerOut={() => setHovered(false)}
    >
      <DynamicText3D
        font={font}
        size={size}
        height={height}
        bevelEnabled={bevelEnabled}
        bevelSize={bevelSize}
        bevelThickness={bevelThickness}
        curveSegments={32}
      >
        {text}
        <meshStandardMaterial color={color} />
      </DynamicText3D>
    </animated.mesh>
  )
}

