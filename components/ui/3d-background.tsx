"use client"

import type React from "react"

import { useRef, useEffect } from "react"
import dynamic from "next/dynamic"
import { useTheme } from "next-themes"
import { useHasMounted } from "@/lib/client-utils"

// Dynamically import Three.js components with no SSR
const DynamicCanvas = dynamic(() => import("@react-three/fiber").then((mod) => mod.Canvas), {
  ssr: false,
})

const DynamicStars = dynamic(() => import("@react-three/drei").then((mod) => mod.Stars), {
  ssr: false,
})

const DynamicCloud = dynamic(() => import("@react-three/drei").then((mod) => mod.Cloud), {
  ssr: false,
})

const DynamicFloat = dynamic(() => import("@react-three/drei").then((mod) => mod.Float), {
  ssr: false,
})

const DynamicEnvironment = dynamic(() => import("@react-three/drei").then((mod) => mod.Environment), {
  ssr: false,
})

const DynamicEffectComposer = dynamic(() => import("@react-three/postprocessing").then((mod) => mod.EffectComposer), {
  ssr: false,
})

const DynamicBloom = dynamic(() => import("@react-three/postprocessing").then((mod) => mod.Bloom), {
  ssr: false,
})

const DynamicChromaticAberration = dynamic(
  () => import("@react-three/postprocessing").then((mod) => mod.ChromaticAberration),
  {
    ssr: false,
  },
)

// Import Vector3 directly since it's just a class
import { Vector3 } from "three"

function MovingLights() {
  const light1 = useRef(null)
  const light2 = useRef(null)

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

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime()

    if (light1.current) {
      light1.current.position.x = Math.sin(t * 0.2) * 15
      light1.current.position.y = Math.cos(t * 0.3) * 10
      light1.current.position.z = Math.sin(t * 0.4) * 5 + 8
    }

    if (light2.current) {
      light2.current.position.x = Math.cos(t * 0.3) * 15
      light2.current.position.y = Math.sin(t * 0.2) * 10
      light2.current.position.z = Math.cos(t * 0.4) * 5 + 8
    }
  })

  return (
    <>
      <pointLight ref={light1} color="#4338ca" intensity={1} distance={20} />
      <pointLight ref={light2} color="#7e22ce" intensity={1} distance={20} />
    </>
  )
}

export function ThreeDBackground({
  children,
  intensity = 0.5,
  density = 50,
  speed = 0.3,
  color = "#88ccff",
  bloomIntensity = 0.5,
  className = "",
}: {
  children?: React.ReactNode
  intensity?: number
  density?: number
  speed?: number
  color?: string
  bloomIntensity?: number
  className?: string
}) {
  const { theme } = useTheme()
  const isDark = theme === "dark"
  const hasMounted = useHasMounted()

  if (!hasMounted) {
    // Return a placeholder with the same dimensions while client-side code is loading
    return <div className={`absolute inset-0 -z-10 ${className}`}>{children}</div>
  }

  return (
    <div className={`absolute inset-0 -z-10 ${className}`}>
      <DynamicCanvas camera={{ position: [0, 0, 10], fov: 45 }}>
        <color attach="background" args={[isDark ? "#050816" : "#f8fafc"]} />

        <ambientLight intensity={0.2} />
        <directionalLight position={[10, 10, 5]} intensity={intensity} />

        <DynamicStars radius={100} depth={50} count={density} factor={4} saturation={0} fade speed={speed} />

        <DynamicFloat speed={1.5} rotationIntensity={0.2} floatIntensity={0.5}>
          <DynamicCloud opacity={0.15} speed={0.1} width={20} depth={1.5} segments={20} color={color} />
        </DynamicFloat>

        <DynamicEnvironment preset="city" />

        <DynamicEffectComposer>
          <DynamicBloom intensity={bloomIntensity} luminanceThreshold={0.2} luminanceSmoothing={0.9} height={300} />
          <DynamicChromaticAberration offset={new Vector3(0.0005, 0.0005, 0.0005)} />
        </DynamicEffectComposer>

        <MovingLights />
      </DynamicCanvas>
      {children}
    </div>
  )
}

