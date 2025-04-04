"use client"

import { useRef, useEffect } from "react"
import { Canvas } from "@react-three/fiber"
import { useGLTF, OrbitControls, Environment, ContactShadows } from "@react-three/drei"
import { useTheme } from "next-themes"

export default function ThreeDModel() {
  const { theme } = useTheme()
  const isDark = theme === "dark"
  const groupRef = useRef(null)

  // Load a simple 3D model
  const { scene } = useGLTF("/assets/3d/duck.glb")

  // Simple animation
  useEffect(() => {
    const interval = setInterval(() => {
      if (groupRef.current) {
        groupRef.current.rotation.y += 0.01
      }
    }, 16)

    return () => clearInterval(interval)
  }, [])

  return (
    <div className="relative w-full h-[400px] rounded-2xl overflow-hidden">
      <Canvas camera={{ position: [0, 0, 5], fov: 45 }}>
        <color attach="background" args={[isDark ? "#050816" : "#f8fafc"]} />

        <ambientLight intensity={0.5} />
        <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} intensity={1} castShadow />

        <group ref={groupRef} position={[0, -1, 0]} scale={2}>
          <primitive object={scene} />
        </group>

        <ContactShadows position={[0, -1.5, 0]} opacity={0.4} scale={10} blur={1.5} far={1.5} />
        <Environment preset={isDark ? "night" : "city"} />

        <OrbitControls
          autoRotate
          autoRotateSpeed={1}
          enableZoom={false}
          enablePan={false}
          minPolarAngle={Math.PI / 4}
          maxPolarAngle={Math.PI / 1.5}
        />
      </Canvas>
    </div>
  )
}

