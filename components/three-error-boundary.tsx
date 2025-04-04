"use client"

import type React from "react"

import { useState, useEffect } from "react"

interface ThreeErrorBoundaryProps {
  children: React.ReactNode
  fallback: React.ReactNode
}

export default function ThreeErrorBoundary({ children, fallback }: ThreeErrorBoundaryProps) {
  const [hasError, setHasError] = useState(false)
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true)

    // Add error handler for Three.js errors
    const errorHandler = (event: ErrorEvent) => {
      if (
        event.message.includes("ReactCurrentBatchConfig") ||
        event.message.includes("three") ||
        event.message.includes("webgl") ||
        event.message.includes("canvas")
      ) {
        console.error("Three.js error caught:", event.message)
        setHasError(true)
        event.preventDefault()
      }
    }

    window.addEventListener("error", errorHandler)

    return () => {
      window.removeEventListener("error", errorHandler)
    }
  }, [])

  if (hasError || !isMounted) {
    return <>{fallback}</>
  }

  return <>{children}</>
}

