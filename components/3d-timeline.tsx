"use client"

import type React from "react"

import { useRef, useState, useEffect } from "react"
import { Canvas } from "@react-three/fiber"
import { Text, Line, Html, PerspectiveCamera } from "@react-three/drei"
import { motion, useScroll, useTransform } from "framer-motion"
import { useTheme } from "next-themes"

interface TimelineItem {
  date: string
  title: string
  description: string
  icon?: React.ReactNode
  category?: string
}

function TimelineNode({
  item,
  index,
  total,
  scrollYProgress,
}: {
  item: TimelineItem
  index: number
  total: number
  scrollYProgress: any
}) {
  const meshRef = useRef(null)
  const [hovered, setHovered] = useState(false)

  // Calculate position along the line
  const spacing = 2
  const startY = ((total - 1) * spacing) / 2
  const y = startY - index * spacing

  // Use scroll progress to animate
  const progress = useTransform(scrollYProgress, [0, 1], [0, total])

  // Simple animation
  useEffect(() => {
    const interval = setInterval(() => {
      if (meshRef.current) {
        // Animate based on scroll
        const visible = index <= progress.get()
        meshRef.current.visible = visible

        if (visible && meshRef.current.scale.x < 1) {
          meshRef.current.scale.x = Math.min(meshRef.current.scale.x + 0.05, 1)
          meshRef.current.scale.y = Math.min(meshRef.current.scale.y + 0.05, 1)
          meshRef.current.scale.z = Math.min(meshRef.current.scale.z + 0.05, 1)
        }
      }
    }, 16)

    return () => clearInterval(interval)
  }, [index, progress])

  return (
    <group
      ref={meshRef}
      position={[0, y, 0]}
      scale={[0, 0, 0]}
      onPointerOver={() => setHovered(true)}
      onPointerOut={() => setHovered(false)}
    >
      {/* Node */}
      <mesh position={[0, 0, 0]}>
        <sphereGeometry args={[0.2, 32, 32]} />
        <meshStandardMaterial
          color={hovered ? "#7c3aed" : "#4338ca"}
          emissive={hovered ? "#7c3aed" : "#4338ca"}
          emissiveIntensity={0.5}
        />
      </mesh>

      {/* Date text */}
      <Text position={[-1.5, 0, 0]} fontSize={0.2} color="#94a3b8" anchorX="right" anchorY="middle">
        {item.date}
      </Text>

      {/* Content card */}
      <group position={[1, 0, 0]}>
        <Html
          transform
          distanceFactor={1.5}
          position={[0, 0, 0]}
          style={{
            width: "300px",
            transition: "all 0.2s",
            transform: `scale(${hovered ? 1.05 : 1})`,
          }}
        >
          <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700">
            <h3 className="text-lg font-bold mb-1">{item.title}</h3>
            <p className="text-sm text-gray-600 dark:text-gray-300">{item.description}</p>
            {item.category && (
              <span className="inline-block mt-2 text-xs px-2 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 rounded-full">
                {item.category}
              </span>
            )}
          </div>
        </Html>
      </group>
    </group>
  )
}

export default function ThreeDTimeline({ items }: { items: TimelineItem[] }) {
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ target: containerRef })
  const { theme } = useTheme()
  const isDark = theme === "dark"

  return (
    <div ref={containerRef} className="w-full h-[150vh] relative">
      <div className="sticky top-0 h-screen">
        <Canvas>
          <color attach="background" args={[isDark ? "#050816" : "#f8fafc"]} />

          <PerspectiveCamera makeDefault position={[0, 0, 5]} fov={60} />
          <ambientLight intensity={0.5} />
          <directionalLight position={[10, 10, 5]} intensity={1} />

          {/* Timeline line */}
          <Line
            points={[
              [0, items.length, 0],
              [0, -items.length, 0],
            ]}
            color={isDark ? "#6366f1" : "#3b82f6"}
            lineWidth={2}
          />

          {items.map((item, index) => (
            <TimelineNode
              key={index}
              item={item}
              index={index}
              total={items.length}
              scrollYProgress={scrollYProgress}
            />
          ))}
        </Canvas>

        {/* Scroll indicator */}
        <motion.div
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-center text-gray-500 dark:text-gray-400"
          initial={{ opacity: 1 }}
          animate={{
            opacity: [1, 0.5, 1],
            y: [0, 10, 0],
          }}
          transition={{
            repeat: Number.POSITIVE_INFINITY,
            duration: 2,
          }}
        >
          <p className="mb-2">Scroll to explore</p>
          <svg
            className="w-6 h-6 mx-auto"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </motion.div>
      </div>
    </div>
  )
}

