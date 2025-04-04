"use client"

import { useState, useRef } from "react"
import { motion } from "framer-motion"
import Image from "next/image"
import Link from "next/link"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { GithubIcon, ExternalLinkIcon } from "lucide-react"
import { cn } from "@/lib/utils"

interface ProjectCardProps {
  project: {
    title: string
    description: string
    longDescription?: string
    image: string
    tags: string[]
    github: string
    demo: string
    slug: string
    featured?: boolean
  }
  index: number
}

export default function ProjectCardEnhanced({ project, index }: ProjectCardProps) {
  const [isHovered, setIsHovered] = useState(false)
  const cardRef = useRef<HTMLDivElement>(null)

  // Generate a random color for the card
  const colors = [
    "from-blue-500/20 to-purple-500/20",
    "from-purple-500/20 to-pink-500/20",
    "from-pink-500/20 to-orange-500/20",
    "from-orange-500/20 to-amber-500/20",
    "from-amber-500/20 to-yellow-500/20",
    "from-yellow-500/20 to-lime-500/20",
    "from-lime-500/20 to-green-500/20",
    "from-green-500/20 to-emerald-500/20",
    "from-emerald-500/20 to-teal-500/20",
    "from-teal-500/20 to-cyan-500/20",
    "from-cyan-500/20 to-sky-500/20",
    "from-sky-500/20 to-blue-500/20",
  ]

  const cardColor = colors[index % colors.length]

  return (
    <motion.div
      ref={cardRef}
      className={cn(
        "relative h-full overflow-hidden rounded-xl border border-white/10 dark:border-white/5 transition-all duration-300",
        "bg-gradient-to-br",
        cardColor,
      )}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      whileHover={{
        scale: 1.03,
        boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
      }}
    >
      {/* Paper fold corner effect */}
      <div
        className="absolute top-0 right-0 w-8 h-8 bg-white/10 dark:bg-white/5 z-10 shadow-md"
        style={{
          transformOrigin: "top right",
          transform: `rotate(-90deg) ${isHovered ? "scale(1.2)" : "scale(1)"}`,
          transition: "all 0.3s ease",
        }}
      />

      {/* Image with overlay */}
      <div className="relative h-48 w-full overflow-hidden">
        <Image
          src={project.image || "/placeholder.svg"}
          alt={project.title}
          fill
          className={`object-cover transition-all duration-500 ${isHovered ? "scale-110 blur-[1px]" : "scale-100"}`}
        />
        <div
          className={`absolute inset-0 bg-gradient-to-t from-black/80 to-transparent transition-opacity duration-300 ${isHovered ? "opacity-90" : "opacity-70"}`}
        />
      </div>

      {/* Content */}
      <div className="p-6">
        {/* Tags */}
        <div className="flex flex-wrap gap-2 mb-3">
          {project.tags.slice(0, 3).map((tag, i) => (
            <Badge key={i} variant="secondary" className="bg-primary/10 text-primary backdrop-blur-sm">
              {tag}
            </Badge>
          ))}
          {project.tags.length > 3 && <Badge variant="outline">+{project.tags.length - 3}</Badge>}
        </div>

        {/* Title with animated underline on hover */}
        <h3 className="text-xl font-bold mb-2 relative inline-block">
          {project.title}
          <span
            className="absolute bottom-0 left-0 w-full h-0.5 bg-primary transform origin-left transition-transform duration-300"
            style={{
              transform: isHovered ? "scaleX(1)" : "scaleX(0)",
            }}
          />
        </h3>

        {/* Description */}
        <p className="text-muted-foreground mb-4 line-clamp-2">{project.description}</p>

        {/* Buttons */}
        <div className="flex gap-3">
          <Button variant="outline" size="sm" className="backdrop-blur-sm bg-white/5" asChild>
            <a href={project.github} target="_blank" rel="noopener noreferrer">
              <GithubIcon className="mr-2 h-4 w-4" />
              Code
            </a>
          </Button>
          <Button
            size="sm"
            className="bg-gradient-to-r from-indigo-500 to-purple-500 hover:from-indigo-600 hover:to-purple-600 relative overflow-hidden group"
            asChild
          >
            <Link href={`/projects/${project.slug}`}>
              <span className="relative z-10 flex items-center">
                <ExternalLinkIcon className="mr-2 h-4 w-4 transition-transform group-hover:rotate-45" />
                Details
              </span>
              <span className="absolute inset-0 bg-white/10 transform -translate-x-full group-hover:translate-x-0 transition-transform duration-300" />
            </Link>
          </Button>
        </div>
      </div>
    </motion.div>
  )
}

