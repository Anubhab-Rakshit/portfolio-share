"use client"

import { useEffect, useState } from "react"

// Check if code is running on the client
export const isClient = typeof window !== "undefined"

// Hook to safely use browser APIs
export function useHasMounted() {
  const [hasMounted, setHasMounted] = useState(false)

  useEffect(() => {
    setHasMounted(true)
  }, [])

  return hasMounted
}

// Safe window dimensions hook
export function useWindowSize() {
  const [size, setSize] = useState({
    width: isClient ? window.innerWidth : 0,
    height: isClient ? window.innerHeight : 0,
  })

  useEffect(() => {
    if (!isClient) return

    const handleResize = () => {
      setSize({
        width: window.innerWidth,
        height: window.innerHeight,
      })
    }

    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [])

  return size
}

