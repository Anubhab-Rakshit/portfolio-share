"use client"

import type React from "react"
import { useState, useRef } from "react"
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"

export default function ThreeDCard({ interest }: { interest: any }) {
  const [isHovered, setIsHovered] = useState(false)
  const cardRef = useRef<HTMLDivElement>(null)

  // Motion values for tracking mouse position
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)

  // Smooth spring physics for rotation
  const rotateX = useSpring(useTransform(mouseY, [0, 1], [10, -10]), {
    stiffness: 300,
    damping: 30,
  })
  const rotateY = useSpring(useTransform(mouseX, [0, 1], [-10, 10]), {
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
    <motion.div
      ref={cardRef}
      className="relative overflow-hidden rounded-xl h-full"
      style={{
        transformStyle: "preserve-3d",
        transform: isHovered
          ? `perspective(1000px) rotateX(${rotateX.get()}deg) rotateY(${rotateY.get()}deg)`
          : "perspective(1000px) rotateX(0deg) rotateY(0deg)",
        transition: "transform 0.3s ease",
      }}
      whileHover={{ scale: 1.02 }}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <Card className="h-full border-0 bg-gradient-to-br from-background to-background/80">
        <CardContent className="p-6 flex flex-col items-center text-center">
          <div className="mb-4 p-3 rounded-full bg-background/50">{interest.icon}</div>
          <h4 className="text-xl font-semibold mb-2">{interest.title}</h4>
          <p className="text-muted-foreground">{interest.description}</p>
        </CardContent>
      </Card>

      {/* Glare effect - Always render but control opacity */}
      <motion.div
        className="absolute inset-0 w-full h-full bg-gradient-radial from-white/30 to-transparent z-10 pointer-events-none"
        style={{
          opacity: isHovered ? 0.2 : 0,
          left: glareX,
          top: glareY,
          transform: "translate(-50%, -50%)",
        }}
      />
    </motion.div>
  )
}

