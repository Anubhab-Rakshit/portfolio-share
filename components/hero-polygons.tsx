"use client"

import { useRef, useEffect, useState } from "react"
import { useTheme } from "next-themes"

export default function HeroPolygons() {
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
    let polygons: Polygon[] = []
    const isDark = theme === "dark"
    const primaryColor = isDark ? "#8b5cf6" : "#6366f1" // Purple/Indigo
    const secondaryColor = isDark ? "#ec4899" : "#f43f5e" // Pink/Rose

    // Set canvas dimensions
    const resizeCanvas = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
      initPolygons()
    }

    // Polygon class
    class Polygon {
      x: number
      y: number
      size: number
      sides: number
      rotation: number
      rotationSpeed: number
      color: string
      opacity: number
      speedX: number
      speedY: number

      constructor() {
        this.x = Math.random() * canvas.width
        this.y = Math.random() * canvas.height
        this.size = Math.random() * 50 + 20
        this.sides = Math.floor(Math.random() * 3) + 3 // 3 to 5 sides
        this.rotation = Math.random() * Math.PI * 2
        this.rotationSpeed = (Math.random() - 0.5) * 0.01

        // Randomly choose between primary and secondary colors
        this.color = Math.random() > 0.5 ? primaryColor : secondaryColor

        this.opacity = Math.random() * 0.15 + 0.05
        this.speedX = (Math.random() - 0.5) * 0.3
        this.speedY = (Math.random() - 0.5) * 0.3
      }

      update() {
        this.x += this.speedX
        this.y += this.speedY
        this.rotation += this.rotationSpeed

        // Wrap around edges
        if (this.x < -this.size) this.x = canvas.width + this.size
        else if (this.x > canvas.width + this.size) this.x = -this.size
        if (this.y < -this.size) this.y = canvas.height + this.size
        else if (this.y > canvas.height + this.size) this.y = -this.size
      }

      draw() {
        if (!ctx) return

        ctx.save()
        ctx.translate(this.x, this.y)
        ctx.rotate(this.rotation)

        ctx.beginPath()
        ctx.moveTo(this.size * Math.cos(0), this.size * Math.sin(0))

        for (let i = 1; i <= this.sides; i++) {
          const angle = (i * 2 * Math.PI) / this.sides
          ctx.lineTo(this.size * Math.cos(angle), this.size * Math.sin(angle))
        }

        ctx.closePath()
        ctx.fillStyle = `${this.color}${Math.round(this.opacity * 255)
          .toString(16)
          .padStart(2, "0")}`
        ctx.fill()

        ctx.restore()
      }
    }

    // Initialize polygons
    const initPolygons = () => {
      polygons = []
      const polygonCount = Math.min(Math.floor((canvas.width * canvas.height) / 40000), 20)
      for (let i = 0; i < polygonCount; i++) {
        polygons.push(new Polygon())
      }
    }

    // Animation loop
    const animate = () => {
      if (!ctx) return
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      // Draw and update polygons
      polygons.forEach((polygon) => {
        polygon.update()
        polygon.draw()
      })

      animationFrameId = requestAnimationFrame(animate)
    }

    // Initialize
    resizeCanvas()
    animate()

    // Handle resize
    window.addEventListener("resize", resizeCanvas)

    // Cleanup
    return () => {
      window.removeEventListener("resize", resizeCanvas)
      cancelAnimationFrame(animationFrameId)
    }
  }, [isMounted, theme])

  if (!isMounted) return null

  return <canvas ref={canvasRef} className="absolute inset-0 -z-10" style={{ pointerEvents: "none" }} />
}

