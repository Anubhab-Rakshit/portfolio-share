"use client"

import { useRef, useState, useEffect } from "react"
import { Canvas, useFrame } from "@react-three/fiber"
import { useGLTF, Environment, OrbitControls, ContactShadows } from "@react-three/drei"
import { motion } from "framer-motion-3d"
import { useTheme } from "next-themes"
import type * as THREE from "three"

function RobotModelInner({ scale = 1 }) {
  const robotRef = useRef<THREE.Group>(null)
  const { theme } = useTheme()
  const isDark = theme === "dark"

  // Use a placeholder model for now
  const { scene } = useGLTF("/assets/3d/duck.glb")

  // Animate the robot
  useFrame((state) => {
    if (robotRef.current) {
      robotRef.current.rotation.y = Math.sin(state.clock.getElapsedTime() * 0.3) * 0.2
      robotRef.current.position.y = Math.sin(state.clock.getElapsedTime() * 0.5) * 0.1
    }
  })

  return (
    <>
      <motion.group
        ref={robotRef}
        scale={[scale, scale, scale]}
        position={[0, -1, 0]}
        initial={{ scale: 0 }}
        animate={{ scale: scale }}
        transition={{ duration: 1, delay: 0.5 }}
      >
        <primitive object={scene} />
      </motion.group>

      {/* Lighting */}
      <ambientLight intensity={0.5} />
      <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} intensity={1} castShadow />
      <pointLight position={[-10, -10, -10]} intensity={0.5} />

      {/* Environment and shadows */}
      <ContactShadows position={[0, -1.5, 0]} opacity={0.5} scale={10} blur={1.5} far={2} />
      <Environment preset={isDark ? "night" : "city"} />
    </>
  )
}

export default function RobotModel() {
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true)
  }, [])

  if (!isMounted) {
    return (
      <div className="w-full h-[400px] bg-gradient-to-br from-blue-500/10 to-purple-500/10 animate-pulse rounded-xl"></div>
    )
  }

  return (
    <div className="w-full h-[400px] rounded-xl overflow-hidden">
      <Canvas camera={{ position: [0, 0, 5], fov: 50 }} dpr={[1, 2]} shadows>
        <color attach="background" args={["transparent"]} />
        <RobotModelInner scale={2} />
        <OrbitControls enableZoom={false} enablePan={false} minPolarAngle={Math.PI / 4} maxPolarAngle={Math.PI / 2} />
      </Canvas>
    </div>
  )
}

