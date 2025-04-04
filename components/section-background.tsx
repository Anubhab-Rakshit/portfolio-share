"use client"

import { useTheme } from "next-themes"

interface SectionBackgroundProps {
  color1: string
  color2: string
  variant?: "gradient" | "radial" | "diagonal"
}

export default function SectionBackground({ color1, color2, variant = "gradient" }: SectionBackgroundProps) {
  const { theme } = useTheme()
  const isDark = theme === "dark"

  // Set opacity based on theme
  const opacity = isDark ? "15" : "10"

  // Generate background based on variant
  const getBackground = () => {
    switch (variant) {
      case "radial":
        return `radial-gradient(circle, ${color1}${opacity} 0%, ${color2}${opacity} 100%)`
      case "diagonal":
        return `linear-gradient(135deg, ${color1}${opacity} 0%, ${color2}${opacity} 100%)`
      case "gradient":
      default:
        return `linear-gradient(to bottom, ${color1}${opacity} 0%, ${color2}${opacity} 100%)`
    }
  }

  return (
    <div
      className="absolute inset-0 w-full h-full pointer-events-none"
      style={{
        background: getBackground(),
        zIndex: -1,
      }}
      aria-hidden="true"
    />
  )
}

