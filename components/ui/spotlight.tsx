"use client"

import type React from "react"

import { useRef, useState, useEffect } from "react"
import { cn } from "@/lib/utils"

interface SpotlightProps {
  className?: string
  children: React.ReactNode
}

export function Spotlight({ children, className = "" }: SpotlightProps) {
  const divRef = useRef<HTMLDivElement>(null)
  const [isMounted, setIsMounted] = useState(false)
  const [position, setPosition] = useState({ x: 0, y: 0 })

  useEffect(() => {
    setIsMounted(true)
    return () => setIsMounted(false)
  }, [])

  useEffect(() => {
    if (!isMounted) return

    const handleMouseMove = (e: MouseEvent) => {
      if (!divRef.current) return

      const div = divRef.current
      const rect = div.getBoundingClientRect()

      setPosition({
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      })
    }

    const div = divRef.current
    if (div) {
      div.addEventListener("mousemove", handleMouseMove)

      return () => {
        div.removeEventListener("mousemove", handleMouseMove)
      }
    }
  }, [isMounted])

  return (
    <div
      ref={divRef}
      className={cn("relative w-full overflow-hidden rounded-md", className)}
      style={
        {
          "--mouse-x": `${position.x}px`,
          "--mouse-y": `${position.y}px`,
        } as React.CSSProperties
      }
    >
      <div className="spotlight absolute inset-0 z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      <div className="relative z-20">{children}</div>
    </div>
  )
}

