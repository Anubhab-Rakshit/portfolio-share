"\"use client"

import { useEffect, useState, type ReactNode } from "react"

interface ClientOnlyWrapperProps {
  children: ReactNode
  fallback?: ReactNode
  delay?: number
}

export default function ClientOnlyWrapper({ children, fallback = null, delay = 0 }: ClientOnlyWrapperProps) {
  const [hasMounted, setHasMounted] = useState(false)

  useEffect(() => {
    let mounted = true

    // Add a small delay to ensure all browser APIs are fully available
    const timer = setTimeout(() => {
      if (mounted) {
        setHasMounted(true)
      }
    }, delay)

    return () => {
      mounted = false
      clearTimeout(timer)
    }
  }, [delay])

  // Only render children after component has mounted on the client
  if (!hasMounted) {
    return <>{fallback}</>
  }

  return <>{children}</>
}
\
"

