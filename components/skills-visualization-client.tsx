"use client"

import { useRef, useEffect, useState } from "react"
import { motion } from "framer-motion"
import { ClientOnlyWrapper } from "./client-only-wrapper"

interface Skill {
  name: string
  icon: string
  color: string
}

const skills: Skill[] = [
  { name: "React", icon: "⚛️", color: "#61DAFB" },
  { name: "Next.js", icon: "▲", color: "#000000" },
  { name: "TypeScript", icon: "TS", color: "#3178C6" },
  { name: "JavaScript", icon: "JS", color: "#F7DF1E" },
  { name: "HTML", icon: "🌐", color: "#E34F26" },
  { name: "CSS", icon: "🎨", color: "#1572B6" },
  { name: "Node.js", icon: "🟢", color: "#339933" },
  { name: "Python", icon: "🐍", color: "#3776AB" },
  { name: "Git", icon: "📊", color: "#F05032" },
  { name: "Docker", icon: "🐳", color: "#2496ED" },
  { name: "AWS", icon: "☁️", color: "#FF9900" },
  { name: "MongoDB", icon: "🍃", color: "#47A248" },
]

export default function SkillsVisualizationClient() {
  const containerRef = useRef<HTMLDivElement>(null)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  return (
    <ClientOnlyWrapper fallback={<div className="h-[400px] w-full bg-muted/20 rounded-lg animate-pulse" />}>
      <div
        className="relative h-[400px] w-full rounded-lg bg-gradient-to-br from-gray-900 to-gray-800 overflow-hidden"
        ref={containerRef}
      >
        {/* Nucleus */}
        <motion.div
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-16 h-16 rounded-full bg-gradient-to-br from-purple-500 to-blue-500 z-10 flex items-center justify-center text-white font-bold"
          animate={{
            boxShadow: [
              "0 0 20px 5px rgba(168, 85, 247, 0.4)",
              "0 0 30px 8px rgba(168, 85, 247, 0.6)",
              "0 0 20px 5px rgba(168, 85, 247, 0.4)",
            ],
          }}
          transition={{
            duration: 3,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
          }}
        >
          <span className="text-2xl">⚡</span>
        </motion.div>

        {/* Orbital paths (rings) */}
        {[1, 2, 3].map((ring) => (
          <motion.div
            key={`ring-${ring}`}
            className="absolute top-1/2 left-1/2 rounded-full border border-gray-500/30"
            style={{
              width: `${ring * 140}px`,
              height: `${ring * 140}px`,
              transform: "translate(-50%, -50%)",
            }}
            animate={{
              rotate: 360,
            }}
            transition={{
              duration: 30 + ring * 10,
              repeat: Number.POSITIVE_INFINITY,
              ease: "linear",
            }}
          />
        ))}

        {/* Skills as electrons */}
        {mounted &&
          skills.map((skill, index) => {
            // Distribute skills across different orbital rings
            const ringIndex = index % 3
            const ringRadius = (ringIndex + 1) * 70
            const skillsPerRing = Math.ceil(skills.length / 3)
            const angleOffset = (index - ringIndex * skillsPerRing) * ((2 * Math.PI) / skillsPerRing)

            return (
              <motion.div
                key={skill.name}
                className="absolute flex items-center justify-center"
                style={{
                  top: "50%",
                  left: "50%",
                  width: "60px",
                  height: "60px",
                }}
                initial={{
                  x: Math.cos(angleOffset) * ringRadius,
                  y: Math.sin(angleOffset) * ringRadius,
                }}
                animate={{
                  x: [
                    Math.cos(angleOffset) * ringRadius,
                    Math.cos(angleOffset + Math.PI) * ringRadius,
                    Math.cos(angleOffset + 2 * Math.PI) * ringRadius,
                  ],
                  y: [
                    Math.sin(angleOffset) * ringRadius,
                    Math.sin(angleOffset + Math.PI) * ringRadius,
                    Math.sin(angleOffset + 2 * Math.PI) * ringRadius,
                  ],
                }}
                transition={{
                  duration: 15 + ringIndex * 5,
                  repeat: Number.POSITIVE_INFINITY,
                  ease: "linear",
                }}
              >
                <motion.div
                  className="flex flex-col items-center justify-center rounded-full cursor-pointer"
                  style={{
                    backgroundColor: skill.color,
                    width: "60px",
                    height: "60px",
                    color: getContrastColor(skill.color),
                  }}
                  whileHover={{
                    scale: 1.2,
                    boxShadow: `0 0 15px 5px ${skill.color}80`,
                    zIndex: 20,
                  }}
                  transition={{
                    type: "spring",
                    stiffness: 300,
                    damping: 15,
                  }}
                >
                  <div className="text-xl font-bold">{skill.icon}</div>
                  <div className="text-xs font-semibold mt-1">{skill.name}</div>
                </motion.div>
              </motion.div>
            )
          })}

        {/* Background stars */}
        {Array.from({ length: 50 }).map((_, i) => (
          <motion.div
            key={`star-${i}`}
            className="absolute rounded-full bg-white"
            style={{
              width: Math.random() * 2 + 1 + "px",
              height: Math.random() * 2 + 1 + "px",
              top: Math.random() * 100 + "%",
              left: Math.random() * 100 + "%",
            }}
            animate={{
              opacity: [0.2, 0.8, 0.2],
              scale: [1, 1.5, 1],
            }}
            transition={{
              duration: Math.random() * 3 + 2,
              repeat: Number.POSITIVE_INFINITY,
              ease: "easeInOut",
              delay: Math.random() * 5,
            }}
          />
        ))}
      </div>
    </ClientOnlyWrapper>
  )
}

// Helper function to determine text color based on background color
function getContrastColor(hexColor: string): string {
  // Convert hex to RGB
  const r = Number.parseInt(hexColor.slice(1, 3), 16) || 0
  const g = Number.parseInt(hexColor.slice(3, 5), 16) || 0
  const b = Number.parseInt(hexColor.slice(5, 7), 16) || 0

  // Calculate luminance
  const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255

  // Return black or white based on luminance
  return luminance > 0.5 ? "#000000" : "#FFFFFF"
}

