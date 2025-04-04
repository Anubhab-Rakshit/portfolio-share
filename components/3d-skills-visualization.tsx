"use client"

import { useRef, useEffect } from "react"
import { Canvas } from "@react-three/fiber"
import { Text, Float, OrbitControls, MeshDistortMaterial } from "@react-three/drei"
import { useTheme } from "next-themes"

interface Skill {
  name: string
  level: number
  color: string
}

function SkillNode({ skill, index, total }: { skill: Skill; index: number; total: number }) {
  const meshRef = useRef(null)

  // Calculate position in a sphere
  const phi = Math.acos(-1 + (2 * index) / total)
  const theta = Math.sqrt(total * Math.PI) * phi
  const radius = 3.5

  const position: [number, number, number] = [
    radius * Math.cos(theta) * Math.sin(phi),
    radius * Math.sin(theta) * Math.sin(phi),
    radius * Math.cos(phi),
  ]

  // Scale based on skill level (0-100)
  const size = 0.2 + (skill.level / 100) * 0.3

  // Simple animation
  useEffect(() => {
    const interval = setInterval(() => {
      if (meshRef.current) {
        meshRef.current.position.y += Math.sin(Date.now() / 1000 + index) * 0.001
      }
    }, 16)

    return () => clearInterval(interval)
  }, [index])

  return (
    <group position={position}>
      <mesh
        ref={meshRef}
        onPointerOver={() => {
          if (meshRef.current) {
            meshRef.current.scale.set(1.4, 1.4, 1.4)
          }
        }}
        onPointerOut={() => {
          if (meshRef.current) {
            meshRef.current.scale.set(1, 1, 1)
          }
        }}
      >
        <sphereGeometry args={[size, 32, 32]} />
        <MeshDistortMaterial color={skill.color} speed={2} distort={0.2} radius={1} />
      </mesh>

      <Float floatIntensity={0.5} rotationIntensity={0.2} speed={2}>
        <Text position={[0, size + 0.3, 0]} fontSize={0.2} color="white" anchorX="center" anchorY="middle">
          {skill.name}
        </Text>
        <Text
          position={[0, size + 0.1, 0]}
          fontSize={0.15}
          color="white"
          anchorX="center"
          anchorY="middle"
          opacity={0.7}
        >
          {skill.level}%
        </Text>
      </Float>
    </group>
  )
}

export default function ThreeDSkillsVisualization({ skills }: { skills: Skill[] }) {
  const { theme } = useTheme()
  const isDark = theme === "dark"

  return (
    <div className="w-full h-[600px]">
      <Canvas camera={{ position: [0, 0, 10], fov: 45 }}>
        <color attach="background" args={[isDark ? "#050816" : "#f8fafc"]} />

        <ambientLight intensity={0.5} />
        <directionalLight position={[10, 10, 5]} intensity={1} />

        {skills.map((skill, index) => (
          <SkillNode key={skill.name} skill={skill} index={index} total={skills.length} />
        ))}

        {/* Central sphere */}
        <mesh position={[0, 0, 0]}>
          <sphereGeometry args={[1, 32, 32]} />
          <meshStandardMaterial
            color={isDark ? "#4338ca" : "#3b82f6"}
            emissive={isDark ? "#4338ca" : "#3b82f6"}
            emissiveIntensity={0.5}
            transparent
            opacity={0.7}
          />
        </mesh>

        <OrbitControls enableZoom={false} autoRotate autoRotateSpeed={0.5} />
      </Canvas>
    </div>
  )
}

