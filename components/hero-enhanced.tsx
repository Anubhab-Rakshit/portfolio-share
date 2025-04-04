"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { TypewriterEffect } from "@/components/ui/typewriter-effect"
import { Button } from "@/components/ui/button"
import { ArrowDownIcon, GithubIcon, LinkedinIcon, TwitterIcon } from "lucide-react"
import { ClientOnly } from "@/components/client-only"
import dynamic from "next/dynamic"

// Dynamically import the 3D component with SSR disabled
const Hero3DEnhanced = dynamic(() => import("@/components/hero-3d-enhanced"), {
  ssr: false,
  loading: () => (
    <div className="h-screen w-full flex items-center justify-center bg-gray-100 dark:bg-gray-900">
      <div className="text-center">
        <div className="w-12 h-12 border-4 border-t-transparent border-primary rounded-full animate-spin mx-auto mb-4"></div>
        <p className="text-primary text-xl font-bold">Loading 3D Experience...</p>
      </div>
    </div>
  ),
})

export default function HeroEnhanced() {
  const [mounted, setMounted] = useState(false)
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    setMounted(true)
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }

    checkMobile()
    window.addEventListener("resize", checkMobile)

    return () => {
      window.removeEventListener("resize", checkMobile)
    }
  }, [])

  if (!mounted) {
    return (
      <div className="h-screen w-full flex items-center justify-center bg-gray-100 dark:bg-gray-900">
        <p className="text-xl font-bold">Loading Hero...</p>
      </div>
    )
  }

  return (
    <section id="hero" className="relative min-h-screen">
      <ClientOnly>
        <Hero3DEnhanced />
      </ClientOnly>

      {/* Content Overlay */}
      <div className="absolute inset-0 z-10 flex flex-col items-center justify-center text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mb-6 mt-12 md:mt-0"
        >
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4">
            Hi, I'm <span className="text-primary">Anubhab Rakshit</span>
          </h1>

          <div className="h-12 md:h-16 mb-6">
            <TypewriterEffect
              words={[
                { text: "Full Stack Developer" },
                { text: "UI/UX Designer" },
                { text: "3D Enthusiast" },
                { text: "Problem Solver" },
              ]}
              className="text-lg md:text-xl lg:text-3xl font-medium"
            />
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.8 }}
          className="flex flex-wrap gap-3 md:gap-4 justify-center mb-8 md:mb-12"
        >
          <Button className="bg-primary hover:bg-primary/90">View My Work</Button>
          <Button variant="outline">Contact Me</Button>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.8 }}
          className="flex gap-4 md:gap-6"
        >
          <Button variant="ghost" size="icon" className="rounded-full">
            <GithubIcon className="h-5 w-5" />
          </Button>
          <Button variant="ghost" size="icon" className="rounded-full">
            <LinkedinIcon className="h-5 w-5" />
          </Button>
          <Button variant="ghost" size="icon" className="rounded-full">
            <TwitterIcon className="h-5 w-5" />
          </Button>
        </motion.div>

        {/* Scroll down indicator */}
        <motion.div
          className="absolute bottom-8"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            delay: 0.8,
            duration: 0.5,
            repeat: Number.POSITIVE_INFINITY,
            repeatType: "reverse",
          }}
        >
          <Button
            variant="ghost"
            size="icon"
            asChild
            className="rounded-full bg-background/50 backdrop-blur-sm hover:bg-background/70"
          >
            <a href="#about" aria-label="Scroll down">
              <ArrowDownIcon className="h-5 w-5 md:h-6 md:w-6" />
            </a>
          </Button>
        </motion.div>
      </div>
    </section>
  )
}

