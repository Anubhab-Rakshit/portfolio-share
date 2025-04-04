"use client"

import type React from "react"
import { useState, useRef } from "react"
import Image from "next/image"
import Link from "next/link"
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ExternalLinkIcon, GithubIcon } from "lucide-react"

export default function ThreeDCard({ project }: { project: any }) {
  const [isHovered, setIsHovered] = useState(false)
  const cardRef = useRef<HTMLDivElement>(null)

  // Motion values for tracking mouse position
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)

  // Smooth spring physics for rotation
  const rotateX = useSpring(useTransform(mouseY, [0, 1], [10, -10]), {
    stiffness: 300,
    damping: 30,
  })
  const rotateY = useSpring(useTransform(mouseX, [0, 1], [-10, 10]), {
    stiffness: 300,
    damping: 30,
  })

  // Glare effect position
  const glareX = useTransform(mouseX, [0, 1], ["0%", "100%"])
  const glareY = useTransform(mouseY, [0, 1], ["0%", "100%"])

  function handleMouseMove(e: React.MouseEvent<HTMLDivElement>) {
    if (!cardRef.current) return

    const rect = cardRef.current.getBoundingClientRect()
    const x = (e.clientX - rect.left) / rect.width
    const y = (e.clientY - rect.top) / rect.height

    mouseX.set(x)
    mouseY.set(y)
  }

  // Ensure project has all required properties
  const safeProject = {
    title: project?.title || "Project Title",
    description: project?.description || "Project description goes here",
    image: project?.image || "/placeholder.svg?height=400&width=600",
    tags: project?.tags || ["React", "Next.js"],
    github: project?.github || "https://github.com",
    slug: project?.slug || "project-slug",
  }

  return (
    <motion.div
      ref={cardRef}
      className="relative overflow-hidden rounded-xl h-full"
      style={{
        transformStyle: "preserve-3d",
        transform: isHovered
          ? `perspective(1000px) rotateX(${rotateX.get()}deg) rotateY(${rotateY.get()}deg)`
          : "perspective(1000px) rotateX(0deg) rotateY(0deg)",
        transition: "transform 0.3s ease",
      }}
      whileHover={{ scale: 1.02 }}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="h-full rounded-xl overflow-hidden border border-border hover:shadow-lg transition-all duration-300">
        <div className="relative h-48 w-full">
          <Image src={safeProject.image || "/placeholder.svg"} alt={safeProject.title} fill className="object-cover" />
        </div>
        <div className="p-6">
          <h3 className="text-xl font-bold mb-2">{safeProject.title}</h3>
          <p className="text-muted-foreground mb-4">{safeProject.description}</p>
          <div className="flex flex-wrap gap-2 mb-4">
            {safeProject.tags.map((tag: string, i: number) => (
              <Badge key={i} variant="secondary">
                {tag}
              </Badge>
            ))}
          </div>
          <div className="flex justify-between">
            <Button variant="outline" size="sm" asChild>
              <a href={safeProject.github} target="_blank" rel="noopener noreferrer">
                <GithubIcon className="mr-2 h-4 w-4" />
                Code
              </a>
            </Button>
            <Button size="sm" asChild>
              <Link href={`/projects/${safeProject.slug}`}>
                <ExternalLinkIcon className="mr-2 h-4 w-4" />
                View Details
              </Link>
            </Button>
          </div>
        </div>
      </div>

      {/* Glare effect - Always render but control opacity */}
      <motion.div
        className="absolute inset-0 w-full h-full bg-gradient-radial from-white/30 to-transparent z-10 pointer-events-none"
        style={{
          opacity: isHovered ? 0.2 : 0,
          left: glareX,
          top: glareY,
          transform: "translate(-50%, -50%)",
        }}
      />
    </motion.div>
  )
}

