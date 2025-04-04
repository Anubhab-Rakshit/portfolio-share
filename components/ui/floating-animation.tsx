"use client"

import type React from "react"

import { motion } from "framer-motion"
import { cn } from "@/lib/utils"

interface FloatingAnimationProps {
  children: React.ReactNode
  className?: string
  delay?: number
  duration?: number
  yOffset?: number
}

export function FloatingAnimation({
  children,
  className,
  delay = 0,
  duration = 6,
  yOffset = 20,
}: FloatingAnimationProps) {
  return (
    <motion.div
      className={cn("", className)}
      initial={{ y: 0 }}
      animate={{
        y: [-yOffset, 0, -yOffset],
      }}
      transition={{
        duration,
        ease: "easeInOut",
        repeat: Number.POSITIVE_INFINITY,
        delay,
      }}
    >
      {children}
    </motion.div>
  )
}

