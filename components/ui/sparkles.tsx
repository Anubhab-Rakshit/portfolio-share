"use client"

import { useEffect, useRef, useState } from "react"
import { cn } from "@/lib/utils"

interface SparklesProps {
  id?: string
  className?: string
  background?: string
  minSize?: number
  maxSize?: number
  speed?: number
  particleCount?: number
  particleColor?: string
}

export const SparklesCore = ({
  id,
  className,
  background = "transparent",
  minSize = 0.4,
  maxSize = 1,
  speed = 1,
  particleCount = 30,
  particleColor = "#FFF",
}: SparklesProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [context, setContext] = useState<CanvasRenderingContext2D | null>(null)
  const [particles, setParticles] = useState<any[]>([])
  const [width, setWidth] = useState(0)
  const [height, setHeight] = useState(0)
  const [mouse, setMouse] = useState({ x: 0, y: 0 })
  const [isHovering, setIsHovering] = useState(false)

  const handleMouseMove = (e: MouseEvent) => {
    if (canvasRef.current) {
      const rect = canvasRef.current.getBoundingClientRect()
      setMouse({
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      })
    }
  }

  const handleMouseEnter = () => {
    setIsHovering(true)
  }

  const handleMouseLeave = () => {
    setIsHovering(false)
  }

  const createParticles = () => {
    const newParticles = []
    for (let i = 0; i < particleCount; i++) {
      newParticles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        size: Math.random() * (maxSize - minSize) + minSize,
        speedX: (Math.random() - 0.5) * speed,
        speedY: (Math.random() - 0.5) * speed,
      })
    }
    setParticles(newParticles)
  }

  useEffect(() => {
    if (canvasRef.current) {
      const ctx = canvasRef.current.getContext("2d")
      setContext(ctx)
      setWidth(canvasRef.current.offsetWidth)
      setHeight(canvasRef.current.offsetHeight)

      if (ctx) {
        canvasRef.current.width = canvasRef.current.offsetWidth
        canvasRef.current.height = canvasRef.current.offsetHeight
      }
    }

    window.addEventListener("resize", handleResize)
    return () => {
      window.removeEventListener("resize", handleResize)
    }
  }, [])

  useEffect(() => {
    if (width && height) {
      createParticles()
    }
  }, [width, height])

  useEffect(() => {
    if (canvasRef.current) {
      canvasRef.current.addEventListener("mousemove", handleMouseMove)
      canvasRef.current.addEventListener("mouseenter", handleMouseEnter)
      canvasRef.current.addEventListener("mouseleave", handleMouseLeave)
    }

    return () => {
      if (canvasRef.current) {
        canvasRef.current.removeEventListener("mousemove", handleMouseMove)
        canvasRef.current.removeEventListener("mouseenter", handleMouseEnter)
        canvasRef.current.removeEventListener("mouseleave", handleMouseLeave)
      }
    }
  }, [canvasRef.current])

  useEffect(() => {
    if (!context || !particles.length) return

    const animateParticles = () => {
      context.clearRect(0, 0, width, height)
      context.fillStyle = background
      context.fillRect(0, 0, width, height)

      particles.forEach((particle, i) => {
        // Update particle position
        particle.x += particle.speedX
        particle.y += particle.speedY

        // Boundary check
        if (particle.x < 0 || particle.x > width) {
          particle.speedX = -particle.speedX
        }
        if (particle.y < 0 || particle.y > height) {
          particle.speedY = -particle.speedY
        }

        // Mouse interaction
        if (isHovering) {
          const dx = mouse.x - particle.x
          const dy = mouse.y - particle.y
          const distance = Math.sqrt(dx * dx + dy * dy)
          const maxDistance = 100

          if (distance < maxDistance) {
            const force = (maxDistance - distance) / maxDistance
            particle.speedX -= dx * force * 0.02
            particle.speedY -= dy * force * 0.02
          }
        }

        // Draw particle
        context.beginPath()
        context.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2)
        context.fillStyle = particleColor
        context.fill()
      })

      animationFrameId = requestAnimationFrame(animateParticles)
    }

    let animationFrameId = requestAnimationFrame(animateParticles)
    return () => {
      cancelAnimationFrame(animationFrameId)
    }
  }, [context, particles, width, height, mouse, isHovering])

  const handleResize = () => {
    if (canvasRef.current) {
      setWidth(canvasRef.current.offsetWidth)
      setHeight(canvasRef.current.offsetHeight)
      canvasRef.current.width = canvasRef.current.offsetWidth
      canvasRef.current.height = canvasRef.current.offsetHeight
    }
  }

  return <canvas ref={canvasRef} id={id} className={cn("h-full w-full", className)} />
}

