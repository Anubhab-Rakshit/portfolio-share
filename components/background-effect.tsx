"use client"

import { useRef, useEffect, useState } from "react"
import { useTheme } from "next-themes"

export default function BackgroundEffect() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [currentSection, setCurrentSection] = useState("hero")
  const { theme } = useTheme()
  const [isMounted, setIsMounted] = useState(false)

  // Set up sections to watch
  const sections = [
    { id: "hero", variant: "particles", colors: ["#6366F1", "#8B5CF6"] },
    { id: "about", variant: "polygons", colors: ["#8B5CF6", "#EC4899"] },
    { id: "skills", variant: "waves", colors: ["#EC4899", "#F59E0B"] },
    { id: "projects", variant: "particles", colors: ["#F59E0B", "#10B981"] },
    { id: "experience", variant: "polygons", colors: ["#10B981", "#3B82F6"] },
    { id: "achievements", variant: "waves", colors: ["#3B82F6", "#8B5CF6"] },
    { id: "coding", variant: "particles", colors: ["#8B5CF6", "#EC4899"] },
    { id: "hobbies-link", variant: "polygons", colors: ["#EC4899", "#F59E0B"] },
    { id: "contact", variant: "waves", colors: ["#F59E0B", "#6366F1"] },
  ]

  useEffect(() => {
    setIsMounted(true)
  }, [])

  useEffect(() => {
    if (!isMounted) return

    // Track mouse position
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({
        x: e.clientX,
        y: e.clientY,
      })
    }

    // Determine which section is in view
    const handleScroll = () => {
      const scrollPosition = window.scrollY + window.innerHeight / 2

      for (const section of sections) {
        const element = document.getElementById(section.id)
        if (!element) continue

        const { top, bottom } = element.getBoundingClientRect()
        const elementTop = top + window.scrollY
        const elementBottom = bottom + window.scrollY

        if (scrollPosition >= elementTop && scrollPosition <= elementBottom) {
          setCurrentSection(section.id)
          break
        }
      }
    }

    window.addEventListener("mousemove", handleMouseMove)
    window.addEventListener("scroll", handleScroll)

    // Initial check
    handleScroll()

    return () => {
      window.removeEventListener("mousemove", handleMouseMove)
      window.removeEventListener("scroll", handleScroll)
    }
  }, [isMounted, sections])

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

    // Initialize canvas
    resizeCanvas()
    window.addEventListener("resize", resizeCanvas)

    // Get current section config
    const currentSectionConfig = sections.find((s) => s.id === currentSection) || sections[0]
    const variant = currentSectionConfig.variant
    const [color1, color2] = currentSectionConfig.colors

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
        color: Math.random() > 0.5 ? color1 : color2,
        opacity: isDark ? Math.random() * 0.2 : Math.random() * 0.1,
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

        // Set opacity with hex color
        const hexOpacity = Math.floor(particle.opacity * 255)
          .toString(16)
          .padStart(2, "0")
        const color = `${particle.color}${hexOpacity}`

        // Draw based on variant
        ctx.fillStyle = color

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
      window.removeEventListener("resize", resizeCanvas)
      cancelAnimationFrame(animationFrameId)
    }
  }, [isMounted, theme, currentSection, mousePosition, sections])

  if (!isMounted) return null

  return <canvas ref={canvasRef} className="fixed inset-0 -z-10 opacity-60" style={{ pointerEvents: "none" }} />
}

