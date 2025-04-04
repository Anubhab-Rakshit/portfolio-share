"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { GithubIcon, ExternalLinkIcon, SearchIcon, ArrowLeftIcon } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import ParticlesBg from "@/components/particles-background"

// Project data
const projects = [
  {
    id: 1,
    title: "AI NE BOLA",
    description:
      "AI Ne Bola is a comprehensive project that predicts the number of death cases, case fatality ratio (CFR), and other related metrics for various scenarios using machine learning models. It also provides detailed 3D visualizations and interactive web interfaces for users to explore the predictions.",
    image: "/Images/ai-ne-bola.png",
    tags: ["Next.js", "Three.js", "Tailwind CSS", "Python", "Machine Learning"],
    github: "https://github.com/Anubhab-Rakshit/ai-ne-bola",
    demo: "https://ai-ne-bola.netlify.app/",
    slug: "ai-ne-bola",
    featured: true,
    category: "AI/ML",
  },
  {
    id: 2,
    title: "VLABS",
    description: "Revamp of the website vlab.co.in",
    longDescription:
      "Virtual Labs is an interactive platform designed to provide students with hands-on learning experiences in a virtual environment. The platform is built with a modern UI, providing an intuitive and engaging interface. It includes features like a responsive design, a chatbot for support, and integrations with Google Maps and Gemini APIs for enhanced functionality.",
    image: "/Images/vlabs.jpeg",
    tags: ["React", "Next.js", "Tailwind CSS", "Mongo DB", "Google Maps API", "Gemini API", "Node.js"],
    github: "https://github.com/Kausheya2006/vlab_frontend",
    demo: "https://ai-ne-bola.netlify.app/",
    slug: "vlabs",
    featured: true,
    category: "Web Development",
  },
  {
    id: 3,
    title: "IRCTC CLONE",
    description: "Experience the New Era of Railway Travel",
    longDescription:
      "This project is a modern, responsive clone of the official IRCTC (Indian Railway Catering and Tourism Corporation) website. It aims to replicate the core functionality and user interface of the original platform while implementing modern web development practices and technologies.",
    image: "/Images/irctc.jpeg",
    tags: ["React", "Next.js", "Tailwind CSS", "Vercel"],
    github: "https://github.com/Anubhab-Rakshit/irctc-new",
    demo: "https://irctc-new.vercel.app",
    slug: "IRCTC",
    featured: true,
    category: "Web Development",
  },
  {
    id: 4,
    title: "Civilized Chaos",
    description: "The People's Power App for Fixing India's Flaws",
    longDescription:
      "CIVILIZED CHAOS is a web application designed to streamline issue reporting, authority management, and provide real-time insights with interactive graphs. This project offers a seamless way for citizens to report issues, view authorities, and access visual data analytics in a structured and responsive layout.",
    image: "/Images/civilized-chaos.png",
    tags: ["HTML", "CSS", "JavaScript", "Node.js", "MongoDB", "Chart.js", "Multer"],
    github: "https://github.com/Anubhab-Rakshit/syntaxerror-hacknovare",
    demo: "https://civilizedchaos.netlify.app/",
    slug: "civilized-chaos",
    featured: true,
    category: "Web Development",
  },
  {
    id: 5,
    title: "Happy Birthday Wisher",
    description: "Wish your closed ones in a special way!",
    image: "/Images/hbdwisher.png",
    tags: ["HTML", "CSS", "JavaScript"],
    demo: "https://hbdwisher.netlify.app/",
    slug: "hbdwisher",
    featured: false,
    category: "Web Development",
  },
  {
    id: 6,
    title: "TUNE IN",
    description:
      "Welcome to Tune in! This innovative application enhances your music listening experience by analyzing your current mood and suggesting songs that align with your emotions. Whether you're feeling joyful, melancholic, energetic, or relaxed, our recommender system curates a playlist that resonates with your feelings.",
    image: "/Images/tune-in.png",
    tags: ["React", "Tailwind CSS", "Google Cloud Vision API", "Spotify API", "Node.js", "TensorFlow.js"],
    demo: "https://tune-in-u255.vercel.app/",
    slug: "tune-in",
    featured: false,
    category: "AI/ML",
  },
  {
    id: 7,
    title: "TIC TAC TOE",
    description: "A classic game of Tic Tac Toe",
    image: "/Images/tictactoe.png",
    tags: ["HTML", "CSS", "JavaScript"],
    demo: "https://playytictactoe.netlify.app/",
    slug: "tictactoe",
    featured: false,
    category:"Web Development",
  },
  {
    id: 8,
    title: "Electronic Configuration Calculator",
    description: "Calculate the electronic configuration of any element",
    image: "/Images/electronicconfig.png",
    tags: ["HTML", "CSS", "JavaScript"],
    demo: "https://electronic-config.netlify.app/",
    slug: "electronicconfig",
    featured: false,
    category:"Web Development",
  },
  {
    id: 9,
    title: "GGCC (Project for Client)",
    description: "Goutam Ghosh & Company Constructions (GGCC)",
    image: "/Images/ggcc.png",
    tags: ["HTML", "CSS", "JavaScript"],
    demo: "https://ggcconstruction.netlify.app/",
    slug: "ggcc",
    featured: false,
    category:"Web Development",
  },
]

// Get all unique categories and tags
const categories = ["All", ...new Set(projects.map((project) => project.category))]
const allTags = [...new Set(projects.flatMap((project) => project.tags))]

// Paper-bending card component with fun hover effects
function ProjectCard({ project, index }) {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <motion.div
      className="relative"
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.5,
        delay: index * 0.1,
        type: "spring",
        stiffness: 300,
        damping: 20,
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      whileHover={{ scale: 1.05, zIndex: 10 }}
    >
      <div className="bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-xl h-full">
        {/* Image container */}
        <div className="relative h-48 overflow-hidden">
          <Image
            src={project.image || "/placeholder.svg"}
            alt={project.title}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-110"
          />

          {/* Category badge */}
          <div className="absolute top-4 left-4 z-10">
            <Badge className="bg-white/80 dark:bg-black/50 backdrop-blur-sm text-black dark:text-white font-bold">
              {project.category}
            </Badge>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 relative">
          {/* Tags */}
          <div className="flex flex-wrap gap-2 mb-3">
            {project.tags.slice(0, 3).map((tag, i) => (
              <Badge
                key={i}
                variant="outline"
                className="bg-primary/5 text-primary border-primary/20 hover:bg-primary/10 transition-colors"
              >
                {tag}
              </Badge>
            ))}
            {project.tags.length > 3 && <Badge variant="outline">+{project.tags.length - 3}</Badge>}
          </div>

          {/* Title */}
          <h3 className="text-xl font-bold mb-2 group-hover:text-primary transition-colors">{project.title}</h3>

          {/* Description */}
          <p className="text-muted-foreground mb-4 line-clamp-2">{project.description}</p>

          {/* Buttons */}
          <div className="flex gap-3">
            {project.github && (
              <Button variant="outline" size="sm" asChild className="hover:scale-105 transition-transform">
                <a href={project.github} target="_blank" rel="noopener noreferrer">
                  <GithubIcon className="mr-2 h-4 w-4" />
                  Code
                </a>
              </Button>
            )}
            <Button
              size="sm"
              asChild
              className="bg-gradient-to-r from-indigo-500 to-purple-500 hover:from-indigo-600 hover:to-purple-600 hover:scale-105 transition-transform"
            >
              <Link href={`/projects/${project.slug}`}>
                <ExternalLinkIcon className="mr-2 h-4 w-4" />
                Details
              </Link>
            </Button>
          </div>
        </div>
      </div>

      {/* Glow effect */}
      <motion.div
        className="absolute -inset-1 rounded-xl z-[-1] opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        style={{
          background: `radial-gradient(circle at 50% 50%, rgba(99, 102, 241, 0.5), transparent 70%)`,
          filter: "blur(20px)",
        }}
        animate={{ opacity: isHovered ? 0.8 : 0 }}
        transition={{ duration: 0.3 }}
      />
    </motion.div>
  )
}

// Animated filter button
function FilterButton({ active, onClick, children }) {
  return (
    <motion.button
      onClick={onClick}
      className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
        active
          ? "bg-gradient-to-r from-indigo-500 to-purple-500 text-white"
          : "bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-700"
      }`}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      {children}
    </motion.button>
  )
}

export default function ProjectsPage() {
  const [selectedCategory, setSelectedCategory] = useState("All")
  const [searchQuery, setSearchQuery] = useState("")
  const [filteredProjects, setFilteredProjects] = useState(projects)
  const [isGridView, setIsGridView] = useState(true)

  // Filter projects when filters change
  useEffect(() => {
    let filtered = projects

    // Filter by category
    if (selectedCategory !== "All") {
      filtered = filtered.filter((project) => project.category === selectedCategory)
    }

    // Filter by search query
    if (searchQuery) {
      const query = searchQuery.toLowerCase()
      filtered = filtered.filter(
        (project) =>
          project.title.toLowerCase().includes(query) ||
          project.description.toLowerCase().includes(query) ||
          project.tags.some((tag) => tag.toLowerCase().includes(query)),
      )
    }

    setFilteredProjects(filtered)
  }, [selectedCategory, searchQuery])

  return (
    <main className="min-h-screen py-24 overflow-hidden">
      {/* Background */}
      <div className="fixed inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/5 via-purple-500/5 to-pink-500/5" />
        <ParticlesBg />
      </div>

      <div className="container mx-auto px-4">
        <div className="mb-12">
          <Link
            href="/#projects"
            className="inline-flex items-center text-muted-foreground hover:text-foreground transition-colors"
          >
            <ArrowLeftIcon className="mr-2 h-4 w-4" />
            Back to Home
          </Link>

          <motion.h1
            className="text-5xl md:text-7xl font-bold mt-6 mb-2 bg-clip-text text-transparent bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            Project Gallery
          </motion.h1>

          <motion.p
            className="text-xl text-muted-foreground max-w-2xl mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            Explore my digital playground of projects spanning web development, AI/ML, and more. Each card is a portal
            to a unique creation. Hover around to see the magic!
          </motion.p>

          {/* Filters */}
          <motion.div
            className="flex flex-wrap gap-3 mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            {categories.map((category) => (
              <FilterButton
                key={category}
                active={selectedCategory === category}
                onClick={() => setSelectedCategory(category)}
              >
                {category}
              </FilterButton>
            ))}
          </motion.div>

          {/* Search */}
          <motion.div
            className="relative max-w-md mb-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search projects by name, description, or tech..."
              className="pl-10 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border-gray-300 dark:border-gray-700"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </motion.div>

          {/* View toggle */}
          <motion.div
            className="flex justify-end mb-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.5 }}
          >
            <div className="flex bg-gray-100 dark:bg-gray-800 rounded-full p-1">
              <button
                className={`px-4 py-1 rounded-full text-sm font-medium transition-colors ${
                  isGridView ? "bg-white dark:bg-gray-700 shadow-sm" : "text-gray-600 dark:text-gray-400"
                }`}
                onClick={() => setIsGridView(true)}
              >
                Grid
              </button>
              <button
                className={`px-4 py-1 rounded-full text-sm font-medium transition-colors ${
                  !isGridView ? "bg-white dark:bg-gray-700 shadow-sm" : "text-gray-600 dark:text-gray-400"
                }`}
                onClick={() => setIsGridView(false)}
              >
                Masonry
              </button>
            </div>
          </motion.div>
        </div>

        {/* Projects grid */}
        <AnimatePresence mode="wait">
          {filteredProjects.length > 0 ? (
            <motion.div
              key={`${selectedCategory}-${searchQuery}-${isGridView}`}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className={
                isGridView
                  ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
                  : "columns-1 md:columns-2 lg:columns-3 gap-8 space-y-8"
              }
            >
              {filteredProjects.map((project, index) => (
                <div key={project.slug} className={isGridView ? "" : "break-inside-avoid mb-8"}>
                  <ProjectCard project={project} index={index} />
                </div>
              ))}
            </motion.div>
          ) : (
            <motion.div
              className="text-center py-20"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              <h3 className="text-xl font-medium mb-2">No projects found</h3>
              <p className="text-muted-foreground mb-6">
                No projects match your current filters. Try adjusting your search criteria.
              </p>
              <Button
                onClick={() => {
                  setSelectedCategory("All")
                  setSearchQuery("")
                }}
              >
                Reset Filters
              </Button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </main>
  )
}

