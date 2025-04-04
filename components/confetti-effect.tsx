"use client"

import { useEffect, useState } from "react"
import Confetti from "react-confetti"
import { useWindowSize } from "react-use"

export default function ConfettiEffect({ duration = 3000, pieces = 200, originX = 0.5, originY = 0.5 }) {
  const { width, height } = useWindowSize()
  const [isActive, setIsActive] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsActive(false)
    }, duration)

    return () => clearTimeout(timer)
  }, [duration])

  if (!isActive) return null

  return (
    <Confetti
      width={width}
      height={height}
      numberOfPieces={pieces}
      recycle={false}
      confettiSource={{
        x: width * originX,
        y: height * originY,
        w: 0,
        h: 0,
      }}
      colors={[
        "#8b5cf6", // purple
        "#ec4899", // pink
        "#3b82f6", // blue
        "#10b981", // green
        "#f43f5e", // rose
        "#f59e0b", // amber
      ]}
    />
  )
}

