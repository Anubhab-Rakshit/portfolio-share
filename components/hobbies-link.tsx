"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { motion, useInView } from "framer-motion"
import Link from "next/link"
import { SectionHeading } from "@/components/section-heading"
import {
  PiGuitarFill,
  PiGameControllerFill,
  PiBookOpenFill,
  PiCameraFill,
  PiMountainsFill,
  PiPaintBrushFill,
  PiCookingPotFill,
  PiPlantFill,
} from "react-icons/pi"
import { Button } from "@/components/ui/button"
import { ArrowRightIcon } from "lucide-react"
import confetti from "canvas-confetti"

const hobbies = [
  {
    name: "Music",
    icon: <PiGuitarFill className="h-8 w-8" />,
    color: "#FF6B6B",
    description: "Playing guitar and piano in my free time",
  },
  {
    name: "Gaming",
    icon: <PiGameControllerFill className="h-8 w-8" />,
    color: "#4ECDC4",
    description: "Strategy and adventure games enthusiast",
  },
  {
    name: "Reading",
    icon: <PiBookOpenFill className="h-8 w-8" />,
    color: "#FFD166",
    description: "Science fiction and philosophy books",
  },
  {
    name: "Photography",
    icon: <PiCameraFill className="h-8 w-8" />,
    color: "#6A0572",
    description: "Capturing moments and landscapes",
  },
  {
    name: "Hiking",
    icon: <PiMountainsFill className="h-8 w-8" />,
    color: "#1A936F",
    description: "Exploring nature and mountain trails",
  },
  {
    name: "Painting",
    icon: <PiPaintBrushFill className="h-8 w-8" />,
    color: "#3D5A80",
    description: "Abstract art and watercolor painting",
  },
  {
    name: "Cooking",
    icon: <PiCookingPotFill className="h-8 w-8" />,
    color: "#E07A5F",
    description: "Experimenting with international cuisines",
  },
  {
    name: "Connect with Nature",
    icon: <PiPlantFill className="h-8 w-8" />,
    color: "#81B29A",
    description: "I find solace in nature's beauty",
  },
]

export default function HobbiesLink() {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })
  const [activeHobby, setActiveHobby] = useState<number | null>(null)
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true)
  }, [])

  const triggerConfetti = (x = 0.5, y = 0.5) => {
    if (typeof window !== "undefined") {
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { x, y },
        colors: ["#FF6B6B", "#4ECDC4", "#FFD166", "#6A0572", "#1A936F", "#3D5A80", "#E07A5F", "#81B29A"],
      })
    }
  }

  const handleHobbyClick = (index: number, e: React.MouseEvent) => {
    if (!isMounted) return

    const rect = e.currentTarget.getBoundingClientRect()
    const x = (rect.left + rect.width / 2) / window.innerWidth
    const y = (rect.top + rect.height / 2) / window.innerHeight

    setActiveHobby(index === activeHobby ? null : index)
    triggerConfetti(x, y)
  }

  return (
    <section id="hobbies-link" className="py-20 relative overflow-hidden" ref={ref}>
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl animate-blob"></div>
        <div className="absolute top-3/4 right-1/4 w-96 h-96 bg-secondary/5 rounded-full blur-3xl animate-blob animation-delay-2000"></div>
        <div className="absolute bottom-1/4 right-1/3 w-96 h-96 bg-accent/5 rounded-full blur-3xl animate-blob animation-delay-4000"></div>
      </div>

      <div className="container mx-auto px-4">
        <SectionHeading title="My Hobbies & Interests" subtitle="Discover what I enjoy doing in my free time" />

        <motion.div
          variants={{
            hidden: { opacity: 0 },
            visible: {
              opacity: 1,
              transition: {
                staggerChildren: 0.1,
              },
            },
          }}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-6"
        >
          {hobbies.map((hobby, index) => (
            <motion.div
              key={index}
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
              }}
              whileHover={{
                scale: 1.05,
                boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
              }}
              className={`relative overflow-hidden rounded-xl backdrop-blur-md bg-white/10 dark:bg-black/10 border border-white/20 dark:border-white/10 p-6 cursor-pointer transition-all duration-300 ${activeHobby === index ? "ring-2 ring-primary" : ""}`}
              onClick={(e) => handleHobbyClick(index, e)}
            >
              {/* Background gradient */}
              <div
                className="absolute inset-0 opacity-20 transition-opacity duration-300"
                style={{
                  background: `radial-gradient(circle at 50% 50%, ${hobby.color}, transparent 70%)`,
                  opacity: activeHobby === index ? 0.3 : 0.1,
                }}
              />

              {/* Content */}
              <div className="relative z-10 flex flex-col items-center text-center">
                <div
                  className="p-3 rounded-full mb-4"
                  style={{ backgroundColor: `${hobby.color}20`, color: hobby.color }}
                >
                  {hobby.icon}
                </div>
                <h3 className="text-lg font-semibold mb-2">{hobby.name}</h3>
                <p className="text-sm text-muted-foreground">{hobby.description}</p>
              </div>

              {/* Animated corner */}
              <div className="absolute top-0 right-0 w-12 h-12 overflow-hidden">
                <div
                  className="absolute top-0 right-0 w-16 h-16 transform rotate-45 origin-bottom-left transition-all duration-300"
                  style={{
                    backgroundColor: hobby.color,
                    transform: `rotate(45deg) scale(${activeHobby === index ? 1.2 : 1})`,
                    opacity: 0.7,
                  }}
                />
              </div>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.5, delay: 0.8 }}
          className="mt-12 text-center"
        >
          <Button variant="gradient" size="lg" className="group" asChild onClick={() => triggerConfetti()}>
            <Link href="/hobbies">
              Explore My Hobbies
              <ArrowRightIcon className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </Button>
        </motion.div>
      </div>
    </section>
  )
}

