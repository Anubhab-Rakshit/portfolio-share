"use client"

import { useRef, useEffect, useState } from "react"
import { useTheme } from "next-themes"

interface InteractiveBackgroundProps {
  sectionId?: string
  variant?: "default" | "particles" | "polygons" | "waves"
}

export default function InteractiveBackground({
  sectionId = "global",
  variant = "default",
}: InteractiveBackgroundProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const { theme } = useTheme()
  const [isMounted, setIsMounted] = useState(false)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })

  useEffect(() => {
    setIsMounted(true)
  }, [])

  useEffect(() => {
    if (!isMounted || !canvasRef.current) return

    const canvas = canvasRef.current
    const ctx = canvas.getContext("2d")
    if (!ctx) return

    let animationFrameId: number
    const isDark = theme === "dark"

    // Set canvas dimensions
    const resizeCanvas = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }

    // Track mouse position
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({
        x: e.clientX,
        y: e.clientY,
      })
    }

    // Initialize canvas
    resizeCanvas()
    window.addEventListener("mousemove", handleMouseMove)
    window.addEventListener("resize", resizeCanvas)

    // Particles setup
    const particles: any[] = []
    const particleCount = Math.min(Math.floor((canvas.width * canvas.height) / 15000), 100)

    // Create particles based on variant
    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size: Math.random() * 3 + 1,
        speedX: Math.random() * 0.5 - 0.25,
        speedY: Math.random() * 0.5 - 0.25,
        color: isDark ? `rgba(255, 255, 255, ${Math.random() * 0.2})` : `rgba(0, 0, 0, ${Math.random() * 0.1})`,
        // For polygons variant
        sides: Math.floor(Math.random() * 3) + 3,
        rotation: Math.random() * Math.PI * 2,
        rotationSpeed: (Math.random() - 0.5) * 0.01,
      })
    }

    // Animation loop
    const animate = () => {
      if (!ctx) return
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      // Draw and update particles
      particles.forEach((particle) => {
        // Update position
        particle.x += particle.speedX
        particle.y += particle.speedY

        // Wrap around edges
        if (particle.x > canvas.width) particle.x = 0
        else if (particle.x < 0) particle.x = canvas.width
        if (particle.y > canvas.height) particle.y = 0
        else if (particle.y < 0) particle.y = canvas.height

        // Mouse interaction - particles move away from cursor
        const dx = mousePosition.x - particle.x
        const dy = mousePosition.y - particle.y
        const distance = Math.sqrt(dx * dx + dy * dy)
        const maxDistance = 100

        if (distance < maxDistance) {
          const force = (maxDistance - distance) / maxDistance
          particle.speedX -= dx * force * 0.01
          particle.speedY -= dy * force * 0.01
        }

        // Draw based on variant
        ctx.fillStyle = particle.color

        if (variant === "polygons") {
          // Draw polygon
          ctx.save()
          ctx.translate(particle.x, particle.y)
          ctx.rotate((particle.rotation += particle.rotationSpeed))

          ctx.beginPath()
          for (let i = 0; i < particle.sides; i++) {
            const angle = (i * 2 * Math.PI) / particle.sides
            const x = particle.size * Math.cos(angle)
            const y = particle.size * Math.sin(angle)

            if (i === 0) {
              ctx.moveTo(x, y)
            } else {
              ctx.lineTo(x, y)
            }
          }
          ctx.closePath()
          ctx.fill()
          ctx.restore()
        } else if (variant === "waves") {
          // Draw wave-like pattern
          const time = Date.now() * 0.001
          const waveY = particle.y + Math.sin(particle.x * 0.01 + time) * 20

          ctx.beginPath()
          ctx.arc(particle.x, waveY, particle.size, 0, Math.PI * 2)
          ctx.closePath()
          ctx.fill()
        } else {
          // Default particles
          ctx.beginPath()
          ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2)
          ctx.closePath()
          ctx.fill()
        }
      })

      // Draw connections between particles
      if (variant !== "waves") {
        const maxDistance = 150
        ctx.strokeStyle = isDark ? "rgba(255, 255, 255, 0.05)" : "rgba(0, 0, 0, 0.03)"
        ctx.lineWidth = 0.5

        for (let i = 0; i < particles.length; i++) {
          for (let j = i + 1; j < particles.length; j++) {
            const dx = particles[i].x - particles[j].x
            const dy = particles[i].y - particles[j].y
            const distance = Math.sqrt(dx * dx + dy * dy)

            if (distance < maxDistance) {
              const opacity = 1 - distance / maxDistance
              ctx.globalAlpha = opacity
              ctx.beginPath()
              ctx.moveTo(particles[i].x, particles[i].y)
              ctx.lineTo(particles[j].x, particles[j].y)
              ctx.stroke()
            }
          }
        }
        ctx.globalAlpha = 1
      }

      animationFrameId = requestAnimationFrame(animate)
    }

    // Start animation
    animate()

    // Cleanup
    return () => {
      window.removeEventListener("mousemove", handleMouseMove)
      window.removeEventListener("resize", resizeCanvas)
      cancelAnimationFrame(animationFrameId)
    }
  }, [isMounted, theme, variant, mousePosition])

  if (!isMounted) return null

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 -z-(-1) opacity-60"
      style={{ pointerEvents: "none" }}
      data-section={sectionId}
    />
  )
}

