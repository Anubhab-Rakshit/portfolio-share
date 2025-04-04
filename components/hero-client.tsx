"use client"

import { useEffect, useState } from "react"
import dynamic from "next/dynamic"
import HeroFallback from "@/components/hero-fallback"

// Dynamically import the 3D hero component with SSR disabled
const DynamicHero3D = dynamic(() => import("@/components/hero-3d-enhanced"), {
  ssr: false,
  loading: () => <HeroFallback />,
})

export default function HeroClient() {
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true)
  }, [])

  if (!isMounted) {
    return <HeroFallback />
  }

  return <DynamicHero3D />
}

