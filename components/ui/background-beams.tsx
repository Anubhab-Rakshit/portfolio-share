"use client"

import type React from "react"
import { useEffect, useRef, useState } from "react"
import { cn } from "@/lib/utils"

export function BackgroundBeams({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  const [mousePosition, setMousePosition] = useState<{ x: number; y: number }>({
    x: 0,
    y: 0,
  })

  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleMouseMove = (event: MouseEvent) => {
      if (ref.current) {
        const rect = ref.current.getBoundingClientRect()
        setMousePosition({
          x: event.clientX - rect.left,
          y: event.clientY - rect.top,
        })
      }
    }

    const element = ref.current
    if (element) {
      element.addEventListener("mousemove", handleMouseMove)
    }

    return () => {
      if (element) {
        element.removeEventListener("mousemove", handleMouseMove)
      }
    }
  }, [])

  return (
    <div ref={ref} className={cn("h-full w-full overflow-hidden [--x-px:0] [--y-px:0]", className)} {...props}>
      <svg className="absolute inset-0 h-full w-full">
        <defs>
          <radialGradient id="radial-gradient" cx="50%" cy="50%" r="50%" fx={mousePosition.x} fy={mousePosition.y}>
            <stop offset="0%" stopColor="rgba(138, 43, 226, 0.2)" />
            <stop offset="100%" stopColor="rgba(138, 43, 226, 0)" />
          </radialGradient>
        </defs>
        <rect x="0" y="0" width="100%" height="100%" fill="url(#radial-gradient)" />
      </svg>
      <div className="absolute inset-0 z-10 h-full w-full bg-background [background:radial-gradient(125%_125%_at_50%_10%,#000_40%,#63e_100%)] opacity-[0.03]" />
    </div>
  )
}

