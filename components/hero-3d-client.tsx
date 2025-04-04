"use client"

import { useRef, useState, useEffect } from "react"
import { Canvas } from "@react-three/fiber"
import { OrbitControls, Stars } from "@react-three/drei"
import { useTheme } from "next-themes"

function AnimatedSphere() {
  const meshRef = useRef(null)
  const [hovered, setHovered] = useState(false)
  const { theme } = useTheme()
  const isDark = theme === "dark"

  useEffect(() => {
    const interval = setInterval(() => {
      if (meshRef.current) {
        meshRef.current.rotation.x = Math.cos(Date.now() / 4000) * 0.3
        meshRef.current.rotation.y = Math.sin(Date.now() / 4000) * 0.3
      }
    }, 16)

    return () => clearInterval(interval)
  }, [])

  return (
    <mesh ref={meshRef} onPointerOver={() => setHovered(true)} onPointerOut={() => setHovered(false)}>
      <sphereGeometry args={[1.4, 64, 64]} />
      <meshStandardMaterial color={isDark ? "#4c1d95" : "#3b82f6"} roughness={0.2} metalness={0.8} />
    </mesh>
  )
}

function FloatingName() {
  const { theme } = useTheme()
  const isDark = theme === "dark"

  return (
    <group position={[-2, 0, 0]}>
      <mesh>
        <boxGeometry args={[2, 0.5, 0.1]} />
        <meshStandardMaterial
          color={isDark ? "#8b5cf6" : "#3b82f6"}
          emissive={isDark ? "#8b5cf6" : "#3b82f6"}
          emissiveIntensity={0.5}
          metalness={0.8}
          roughness={0.2}
        />
      </mesh>
    </group>
  )
}

export default function Hero3DClient() {
  return (
    <div className="flex-1 relative h-[400px] w-full">
      <Canvas camera={{ position: [0, 0, 5], fov: 45 }}>
        <ambientLight intensity={0.5} />
        <directionalLight position={[10, 10, 5]} intensity={1} />

        <group position={[0, 0, 0]}>
          <AnimatedSphere />
          <FloatingName />
          <Stars radius={100} depth={50} count={1000} factor={4} saturation={0} fade speed={1} />
        </group>

        <OrbitControls
          enableZoom={false}
          enablePan={false}
          autoRotate
          autoRotateSpeed={0.5}
          minPolarAngle={Math.PI / 2.5}
          maxPolarAngle={Math.PI / 1.5}
        />
      </Canvas>
    </div>
  )
}

