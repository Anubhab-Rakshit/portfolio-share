"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Button, type ButtonProps } from "@/components/ui/button"

interface ConfettiButtonProps extends ButtonProps {
  onConfetti?: () => void
}

export default function ConfettiButton({ children, onConfetti, ...props }: ConfettiButtonProps) {
  const [confetti, setConfetti] = useState<any>(null)

  useEffect(() => {
    // Dynamically import confetti only on client side
    import("canvas-confetti").then((module) => {
      setConfetti(() => module.default)
    })
  }, [])

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (confetti) {
      const rect = e.currentTarget.getBoundingClientRect()
      const x = (rect.left + rect.width / 2) / window.innerWidth
      const y = (rect.top + rect.height / 2) / window.innerHeight

      confetti({
        particleCount: 100,
        spread: 70,
        origin: { x, y },
        colors: ["#6366F1", "#8B5CF6", "#EC4899", "#10B981", "#3B82F6"],
      })
    }

    if (onConfetti) {
      onConfetti()
    }

    if (props.onClick) {
      props.onClick(e)
    }
  }

  return (
    <Button {...props} onClick={handleClick}>
      {children}
    </Button>
  )
}

