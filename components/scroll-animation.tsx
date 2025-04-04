"use client"

import type React from "react"

import { useRef, useState, useEffect } from "react"
import { motion, useInView } from "framer-motion"

type Direction = "up" | "down" | "left" | "right" | "none"

interface ScrollAnimationProps {
  children: React.ReactNode
  direction?: Direction
  delay?: number
  duration?: number
  once?: boolean
  className?: string
  distance?: number
}

export default function ScrollAnimation({
  children,
  direction = "up",
  delay = 0,
  duration = 0.5,
  once = true,
  className = "",
  distance = 50,
}: ScrollAnimationProps) {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once, amount: 0.2 })
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true)
  }, [])

  // Define variants based on direction
  const getVariants = () => {
    const hidden: any = { opacity: 0 }

    switch (direction) {
      case "up":
        hidden.y = distance
        break
      case "down":
        hidden.y = -distance
        break
      case "left":
        hidden.x = distance
        break
      case "right":
        hidden.x = -distance
        break
      case "none":
        // Only opacity animation
        break
    }

    return {
      hidden,
      visible: {
        opacity: 1,
        x: 0,
        y: 0,
        transition: {
          duration,
          delay,
          ease: [0.22, 1, 0.36, 1], // Custom ease for smooth animation
        },
      },
    }
  }

  if (!isMounted) {
    return <div className={className}>{children}</div>
  }

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      variants={getVariants()}
      className={className}
    >
      {children}
    </motion.div>
  )
}

