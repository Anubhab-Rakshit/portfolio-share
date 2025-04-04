"use client"

import { useRef, useEffect, useState } from "react"
import { useTheme } from "next-themes"

export default function EnhancedParticlesBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const { theme } = useTheme()
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true)
  }, [])

  useEffect(() => {
    if (!isMounted || !canvasRef.current) return

    const canvas = canvasRef.current
    const ctx = canvas.getContext("2d")
    if (!ctx) return

    let animationFrameId: number
    let particles: any[] = []
    let mouseX = 0
    let mouseY = 0
    let isMouseMoving = false
    let mouseTimeout: NodeJS.Timeout

    // Set canvas dimensions
    const setCanvasDimensions = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }

    setCanvasDimensions()
    window.addEventListener("resize", setCanvasDimensions)

    // Track mouse movement
    const handleMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX
      mouseY = e.clientY
      isMouseMoving = true

      // Create particles on mouse move
      for (let i = 0; i < 3; i++) {
        particles.push(createParticle(mouseX, mouseY, true))
      }

      // Reset timeout
      clearTimeout(mouseTimeout)
      mouseTimeout = setTimeout(() => {
        isMouseMoving = false
      }, 100)
    }

    window.addEventListener("mousemove", handleMouseMove)

    // Particle class with more creative properties
    function createParticle(x: number, y: number, fromMouse = false) {
      const isDark = theme === "dark"
      // Random colors - vibrant for mouse particles, subtle for background
      const colors = fromMouse
        ? ["#FF5E5B", "#D8D8F6", "#7FC29B", "#FFC145", "#A685E2", "#6EB5FF"]
        : ["#6366F1", "#8B5CF6", "#EC4899", "#6366F1", "#8B5CF6", "#EC4899"]

      const color = colors[Math.floor(Math.random() * colors.length)]

      // More varied sizes
      const size = fromMouse ? Math.random() * 8 + 2 : Math.random() * 3 + 1

      // Random starting position (if not from mouse)
      const startX = fromMouse ? x : Math.random() * canvas.width
      const startY = fromMouse ? y : Math.random() * canvas.height

      // More varied speeds
      const speedFactor = fromMouse ? 2 : 0.5
      const speedX = (Math.random() - 0.5) * speedFactor
      const speedY = (Math.random() - 0.5) * speedFactor

      // Add rotation and shape variation
      const rotation = Math.random() * Math.PI * 2
      const rotationSpeed = (Math.random() - 0.5) * 0.01
      const shape = Math.random() > 0.7 ? "square" : "circle"

      // Add glow effect
      const glow = fromMouse ? 8 : 3

      // Add life and fade properties
      const life = fromMouse ? 80 : 150
      const fade = fromMouse ? 0.02 : 0.005

      return {
        x: startX,
        y: startY,
        size,
        color,
        speedX,
        speedY,
        rotation,
        rotationSpeed,
        shape,
        glow,
        life,
        fade,
        opacity: fromMouse ? 0.8 : 0.3,
        fromMouse,
      }
    }

    // Initialize particles
    const initParticles = () => {
      particles = []
      const particleCount = Math.min(80, Math.floor((window.innerWidth * window.innerHeight) / 20000))

      for (let i = 0; i < particleCount; i++) {
        particles.push(createParticle(0, 0))
      }
    }

    initParticles()

    // Animation loop with more creative rendering
    const animate = () => {
      if (!ctx) return
      const isDark = theme === "dark"

      // Clear with slight opacity for trail effect
      ctx.fillStyle = isDark ? "rgba(10, 10, 20, 0.05)" : "rgba(255, 255, 255, 0.05)"
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      // Update and draw particles
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i]

        // Update position
        p.x += p.speedX
        p.y += p.speedY
        p.rotation += p.rotationSpeed
        p.life -= 1
        p.opacity -= p.fade

        // Remove dead particles
        if (p.life <= 0 || p.opacity <= 0) {
          particles.splice(i, 1)
          i--
          continue
        }

        // Bounce off edges with slight damping
        if (p.x < 0 || p.x > canvas.width) {
          p.speedX *= -0.9
          p.x = p.x < 0 ? 0 : canvas.width
        }

        if (p.y < 0 || p.y > canvas.height) {
          p.speedY *= -0.9
          p.y = p.y < 0 ? 0 : canvas.height
        }

        // Draw particle with glow
        ctx.save()
        ctx.globalAlpha = p.opacity
        ctx.translate(p.x, p.y)
        ctx.rotate(p.rotation)

        // Add glow effect
        ctx.shadowBlur = p.glow
        ctx.shadowColor = p.color

        // Draw shape
        ctx.fillStyle = p.color
        if (p.shape === "square") {
          ctx.fillRect(-p.size / 2, -p.size / 2, p.size, p.size)
        } else {
          ctx.beginPath()
          ctx.arc(0, 0, p.size / 2, 0, Math.PI * 2)
          ctx.fill()
        }

        ctx.restore()
      }

      // Draw connections between mouse particles
      if (isMouseMoving) {
        const mouseParticles = particles.filter((p) => p.fromMouse)

        ctx.strokeStyle = isDark ? "rgba(255, 255, 255, 0.05)" : "rgba(0, 0, 0, 0.05)"
        ctx.lineWidth = 0.5

        for (let i = 0; i < mouseParticles.length; i++) {
          for (let j = i + 1; j < mouseParticles.length; j++) {
            const p1 = mouseParticles[i]
            const p2 = mouseParticles[j]
            const dx = p1.x - p2.x
            const dy = p1.y - p2.y
            const distance = Math.sqrt(dx * dx + dy * dy)

            if (distance < 80) {
              ctx.beginPath()
              ctx.moveTo(p1.x, p1.y)
              ctx.lineTo(p2.x, p2.y)
              ctx.stroke()
            }
          }
        }
      }

      // Add new particles occasionally
      if (Math.random() < 0.03 && particles.length < 150) {
        particles.push(createParticle(Math.random() * canvas.width, Math.random() * canvas.height))
      }

      animationFrameId = requestAnimationFrame(animate)
    }

    animate()

    // Cleanup
    return () => {
      window.removeEventListener("resize", setCanvasDimensions)
      window.removeEventListener("mousemove", handleMouseMove)
      cancelAnimationFrame(animationFrameId)
      clearTimeout(mouseTimeout)
    }
  }, [isMounted, theme])

  if (!isMounted) return null

  return (
    <canvas
      ref={canvasRef}
      className="fixed top-0 left-0 w-full h-full pointer-events-none opacity-40"
      style={{ zIndex: -10 }}
    />
  )
}

