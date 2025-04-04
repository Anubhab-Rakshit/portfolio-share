"use client"

import type React from "react"

import { useRef, useEffect, useState } from "react"
import { motion, useInView } from "framer-motion"

type Direction = "up" | "down" | "left" | "right" | "none"

interface ScrollRevealProps {
  children: React.ReactNode
  direction?: Direction
  delay?: number
  duration?: number
  once?: boolean
  className?: string
  distance?: number
}

export default function ScrollReveal({
  children,
  direction = "up",
  delay = 0,
  duration = 0.5,
  once = true,
  className = "",
  distance = 50,
}: ScrollRevealProps) {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once, margin: "-10%" })
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true)
  }, [])

  // Define initial and animate states based on direction
  const getDirectionalProps = () => {
    switch (direction) {
      case "up":
        return { y: distance }
      case "down":
        return { y: -distance }
      case "left":
        return { x: distance }
      case "right":
        return { x: -distance }
      case "none":
      default:
        return {}
    }
  }

  if (!isMounted) {
    return <div className={className}>{children}</div>
  }

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, ...getDirectionalProps() }}
      animate={isInView ? { opacity: 1, x: 0, y: 0 } : { opacity: 0, ...getDirectionalProps() }}
      transition={{ duration, delay }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

