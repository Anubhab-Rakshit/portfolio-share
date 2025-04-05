"use client"

import { useRef } from "react"
import { motion, useInView } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { GithubIcon, ExternalLinkIcon, ArrowRightIcon } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import ProjectCardEnhanced from "./project-card-enhanced"

// Project data
const projects = [
  {
    title: "AI NE BOLA",
    description:
      "AI Ne Bola is a comprehensive project that predicts the number of death cases, case fatality ratio (CFR), and other related metrics for various scenarios using machine learning models. It also provides detailed 3D visualizations and interactive web interfaces for users to explore the predictions.",
    image: "/Images/ai-ne-bola.png",
    tags: ["Next.js", "Three.js", "Tailwind CSS", "Python", "Machine Learning"],
    github: "https://github.com/Anubhab-Rakshit/ai-ne-bola",
    demo: "https://ai-ne-bola.netlify.app/",
    slug: "ai-ne-bola",
    featured: true,
  },
  {
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
  },
  {
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
  },
  {
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
  },
  {
    title: "Happy Birthday Wisher",
    description: "Wish your closed ones in a special way!",
    image: "/Images/hbdwisher.png",
    tags: ["HTML", "CSS", "JavaScript"],
    demo: "https://hbdwisher.netlify.app/",
    slug: "hbdwisher",
    featured: false,
  },
  {
    title: "TUNE IN",
    description:
      "Welcome to Tune in! This innovative application enhances your music listening experience by analyzing your current mood and suggesting songs that align with your emotions. Whether you're feeling joyful, melancholic, energetic, or relaxed, our recommender system curates a playlist that resonates with your feelings.",
    image: "/Images/tune-in.png",
    tags: ["React", "Tailwind CSS", "Google Cloud Vision API", "Spotify API", "Node.js", "TensorFlow.js"],
    demo: "https://tune-in-u255.vercel.app/",
    slug: "tune-in",
    featured: false,
  },
  {
    title: "TIC TAC TOE",
    description: "A classic game of Tic Tac Toe",
    image: "/Images/tictactoe.png",
    tags: ["HTML", "CSS", "JavaScript"],
    demo: "https://playytictactoe.netlify.app/",
    slug: "tictactoe",
    featured: false,
  },
  {
    title: "Electronic Configuration Calculator",
    description: "Calculate the electronic configuration of any element",
    image: "/Images/electronicconfig.png",
    tags: ["HTML", "CSS", "JavaScript"],
    demo: "https://electronic-config.netlify.app/",
    slug: "electronicconfig",
    featured: false,
  },
  {
    title: "GGCC (Project for Client)",
    description: "Goutam Ghosh & Company Constructions (GGCC)",
    image: "/Images/ggcc.png",
    tags: ["HTML", "CSS", "JavaScript"],
    demo: "https://ggcconstruction.netlify.app/",
    slug: "ggcc",
    featured: false,
  },
]



// Featured project with larger display
function FeaturedProject({ project, index }) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
      transition={{ duration: 0.5, delay: index * 0.2 }}
      className="group relative grid md:grid-cols-2 gap-6 rounded-xl bg-card p-6 shadow-lg hover:shadow-xl transition-all duration-300"
    >
      <div className="relative h-80 w-full overflow-hidden rounded-lg order-1">
        <Image
          src={project.image || "/placeholder.svg"}
          alt={project.title}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-60"></div>
      </div>

      <div className="flex flex-col justify-center order-2">
        <div className="flex flex-wrap gap-2 mb-3">
          {project.tags.map((tag, i) => (
            <Badge key={i} variant="secondary" className="bg-primary/10 text-primary">
              {tag}
            </Badge>
          ))}
        </div>

        <h3 className="text-2xl font-bold mb-3 group-hover:text-primary transition-colors">{project.title}</h3>

        <p className="text-muted-foreground mb-6">{project.longDescription || project.description}</p>

        <div className="flex gap-3">
          <Button variant="outline" asChild>
            <a href={project.github} target="_blank" rel="noopener noreferrer">
              <GithubIcon className="mr-2 h-4 w-4" />
              View Code
            </a>
          </Button>
          <Button variant="gradient" asChild>
            <Link href={`/projects/${project.slug}`}>
              <ExternalLinkIcon className="mr-2 h-4 w-4" />
              View Project
            </Link>
          </Button>
        </div>
      </div>
    </motion.div>
  )
}

// Project card with 3D effect
function ProjectCard({ project, index }) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
    >
      <ProjectCardEnhanced project={project} index={index} />
    </motion.div>
  )
}

export default function Projects() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  // Filter featured projects
  const featuredProjects = projects.filter((project) => project.featured)
  const regularProjects = projects.filter((project) => !project.featured)

  return (
    <section id="projects" className="py-24 relative overflow-hidden" ref={ref}>
      <div className="container mx-auto px-4">
        <motion.h2
          className="text-3xl md:text-4xl font-bold text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.5 }}
        >
          Featured Projects
        </motion.h2>

        <div className="mt-16 space-y-24">
          {featuredProjects.map((project, index) => (
            <FeaturedProject key={project.slug} project={project} index={index} />
          ))}
        </div>

        <div className="mt-24">
          <h3 className="text-2xl font-bold mb-8">More Projects</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {regularProjects.map((project, index) => (
              <ProjectCard key={project.slug} project={project} index={index} />
            ))}
          </div>
        </div>

        <div className="mt-16 text-center">
          <Button variant="gradient" size="lg" className="group" asChild>
            <Link href="/projects">
              View All Projects
              <ArrowRightIcon className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  )
}

