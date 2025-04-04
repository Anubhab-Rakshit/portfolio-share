"use client"

import type React from "react"

import { useState, useRef } from "react"
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion"
import { cn } from "@/lib/utils"

export function ThreeDCard({
  children,
  className = "",
  containerClassName = "",
  glareIntensity = 0.2,
  rotationIntensity = 10,
  borderRadius = "rounded-xl",
}: {
  children: React.ReactNode
  className?: string
  containerClassName?: string
  glareIntensity?: number
  rotationIntensity?: number
  borderRadius?: string
}) {
  const [isHovered, setIsHovered] = useState(false)
  const cardRef = useRef<HTMLDivElement>(null)

  // Motion values for tracking mouse position
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)

  // Smooth spring physics for rotation
  const rotateX = useSpring(useTransform(mouseY, [0, 1], [rotationIntensity, -rotationIntensity]), {
    stiffness: 300,
    damping: 30,
  })
  const rotateY = useSpring(useTransform(mouseX, [0, 1], [-rotationIntensity, rotationIntensity]), {
    stiffness: 300,
    damping: 30,
  })

  // Glare effect position
  const glareX = useTransform(mouseX, [0, 1], ["0%", "100%"])
  const glareY = useTransform(mouseY, [0, 1], ["0%", "100%"])

  function handleMouseMove(e: React.MouseEvent<HTMLDivElement>) {
    if (!cardRef.current) return

    const rect = cardRef.current.getBoundingClientRect()
    const x = (e.clientX - rect.left) / rect.width
    const y = (e.clientY - rect.top) / rect.height

    mouseX.set(x)
    mouseY.set(y)
  }

  return (
    <div className={cn("group perspective-1000px", containerClassName)}>
      <motion.div
        ref={cardRef}
        className={cn("relative w-full h-full", borderRadius, className)}
        style={{
          transformStyle: "preserve-3d",
          rotateX: isHovered ? rotateX : 0,
          rotateY: isHovered ? rotateY : 0,
        }}
        whileHover={{ scale: 1.02 }}
        onMouseMove={handleMouseMove}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {children}

        {/* Glare effect */}
        {isHovered && (
          <motion.div
            className="absolute inset-0 w-full h-full bg-gradient-radial from-white/30 to-transparent z-10 pointer-events-none"
            style={{
              opacity: glareIntensity,
              left: glareX,
              top: glareY,
              transform: "translate(-50%, -50%)",
            }}
          />
        )}
      </motion.div>
    </div>
  )
}

