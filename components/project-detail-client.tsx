"use client"

import { useState, useEffect, useRef } from "react"
import { motion, useScroll, useTransform } from "framer-motion"
import { Canvas, useFrame } from "@react-three/fiber"
import { Environment, Float, Text3D } from "@react-three/drei"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ArrowLeftIcon, ExternalLinkIcon, GithubIcon, CalendarIcon, CheckCircleIcon, TagIcon } from "lucide-react"
import { useTheme } from "next-themes"
import ConfettiEffect from "@/components/confetti-effect"

// 3D Title component
function ProjectTitle({ title }) {
  const textRef = useRef()
  const { theme } = useTheme()
  const isDark = theme === "dark"

  useFrame((state) => {
    if (textRef.current) {
      textRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.3) * 0.1
    }
  })

  return (
    <Float speed={2} rotationIntensity={0.2} floatIntensity={0.5}>
      <group ref={textRef}>
        <Text3D
          font="/fonts/Inter_Bold.json"
          size={0.5}
          height={0.1}
          curveSegments={12}
          bevelEnabled
          bevelThickness={0.02}
          bevelSize={0.02}
          bevelOffset={0}
          bevelSegments={5}
          position={[-3, 0, 0]}
        >
          {title}
          <meshStandardMaterial
            color={isDark ? "#8b5cf6" : "#6366f1"}
            emissive={isDark ? "#8b5cf6" : "#6366f1"}
            emissiveIntensity={0.5}
            metalness={0.8}
            roughness={0.2}
          />
        </Text3D>
      </group>
    </Float>
  )
}

// Animated section component
function AnimatedSection({ children, delay = 0 }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay }}
      className="relative z-10"
    >
      {children}
    </motion.div>
  )
}

export default function ProjectDetailClient({ project, projects }) {
  const [showConfetti, setShowConfetti] = useState(false)
  const headerRef = useRef(null)
  const { scrollYProgress } = useScroll({ target: headerRef, offset: ["start start", "end start"] })
  const { theme } = useTheme()
  const isDark = theme === "dark"

  // Parallax effects
  const headerY = useTransform(scrollYProgress, [0, 1], [0, 200])
  const headerOpacity = useTransform(scrollYProgress, [0, 1], [1, 0])

  useEffect(() => {
    // Show confetti when project loads
    setShowConfetti(true)

    // Hide confetti after 2 seconds
    const timer = setTimeout(() => {
      setShowConfetti(false)
    }, 2000)

    return () => clearTimeout(timer)
  }, [])

  return (
    <main className="min-h-screen relative">
      {showConfetti && <ConfettiEffect originY={0.3} />}

      {/* Hero header with 3D title */}
      <motion.div ref={headerRef} className="relative h-[60vh] overflow-hidden" style={{ opacity: headerOpacity }}>
        <motion.div className="absolute inset-0 z-0" style={{ y: headerY }}>
          <Image src={project.image || "/placeholder.svg"} alt={project.title} fill className="object-cover" priority />
          <div className="absolute inset-0 bg-gradient-to-b from-background/30 via-background/60 to-background"></div>
        </motion.div>

        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-full h-[30vh]">
            <Canvas camera={{ position: [0, 0, 5], fov: 50 }}>
              <color attach="background" args={["transparent"]} />
              <ambientLight intensity={0.5} />
              <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} intensity={1} />
              <ProjectTitle title={project.title} />
              <Environment preset="city" />
            </Canvas>
          </div>
        </div>
      </motion.div>

      <div className="container mx-auto px-4 -mt-20 relative z-10">
        <AnimatedSection>
          <Link
            href="/projects"
            className="inline-flex items-center text-muted-foreground hover:text-foreground transition-colors"
          >
            <ArrowLeftIcon className="mr-2 h-4 w-4" />
            Back to Projects
          </Link>
        </AnimatedSection>

        <AnimatedSection delay={0.1}>
          <div className="mt-8 mb-12">
            <div className="flex flex-wrap gap-2 mb-4">
              <Badge className="bg-primary/20 text-primary">{project.category}</Badge>
              <div className="flex items-center text-muted-foreground">
                <CalendarIcon className="mr-1 h-4 w-4" />
                <span>{project.date}</span>
              </div>
            </div>

            <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500">
              {project.title}
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl">{project.longDescription || project.description}</p>
          </div>
        </AnimatedSection>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          <div className="lg:col-span-2">
            <AnimatedSection delay={0.3}>
              <Tabs defaultValue="overview" className="w-full">
                <TabsList className="mb-8 bg-white/10 dark:bg-black/10 backdrop-blur-sm">
                  <TabsTrigger value="overview">Overview</TabsTrigger>
                  <TabsTrigger value="features">Features</TabsTrigger>
                  <TabsTrigger value="tech">Technologies</TabsTrigger>
                  <TabsTrigger value="gallery">Gallery</TabsTrigger>
                </TabsList>

                <TabsContent value="overview" className="space-y-6">
                  <div>
                    <h2 className="text-2xl font-bold mb-4">Project Overview</h2>
                    <p className="text-muted-foreground">{project.longDescription || project.description}</p>
                  </div>

                  <div>
                    <h3 className="text-xl font-bold mb-3">Technologies Used</h3>
                    <div className="flex flex-wrap gap-2">
                      {project.tags.map((tag, i) => (
                        <Badge key={i} variant="secondary" className="bg-white/10 dark:bg-black/20">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h3 className="text-xl font-bold mb-3">Challenges & Solutions</h3>
                    <ul className="space-y-4">
                      {project.challenges?.map((challenge, i) => (
                        <li
                          key={i}
                          className="bg-white/5 dark:bg-black/10 p-4 rounded-lg border border-white/10 dark:border-white/5"
                        >
                          <p>{challenge}</p>
                        </li>
                      ))}
                    </ul>
                  </div>
                </TabsContent>

                <TabsContent value="features" className="space-y-6">
                  <h2 className="text-2xl font-bold mb-4">Key Features</h2>
                  <ul className="space-y-3">
                    {project.features?.map((feature, i) => (
                      <li key={i} className="flex items-start gap-3">
                        <div className="mt-1 rounded-full bg-gradient-to-r from-indigo-500 to-purple-500 p-1">
                          <CheckCircleIcon className="h-4 w-4 text-white" />
                        </div>
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </TabsContent>

                <TabsContent value="tech" className="space-y-6">
                  <h2 className="text-2xl font-bold mb-4">Technologies</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {project.technologies?.map((tech, i) => (
                      <div
                        key={i}
                        className="bg-white/5 dark:bg-black/10 p-4 rounded-lg border border-white/10 dark:border-white/5 hover:border-primary/30 transition-all duration-300"
                      >
                        <h3 className="font-bold mb-1">{tech.name}</h3>
                        <p className="text-sm text-muted-foreground">{tech.description}</p>
                      </div>
                    ))}
                  </div>
                </TabsContent>

                <TabsContent value="gallery" className="space-y-6">
                  <h2 className="text-2xl font-bold mb-4">Project Gallery</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {project.screenshots?.map((screenshot, i) => (
                      <motion.div
                        key={i}
                        className="space-y-2"
                        whileHover={{ scale: 1.02 }}
                        transition={{ type: "spring", stiffness: 300, damping: 15 }}
                      >
                        <div className="relative aspect-video rounded-lg overflow-hidden border border-white/10 dark:border-white/5 shadow-lg">
                          <Image
                            src={screenshot.url || "/placeholder.svg"}
                            alt={screenshot.caption}
                            fill
                            className="object-cover"
                          />
                        </div>
                        <p className="text-center text-sm font-medium">{screenshot.caption}</p>
                      </motion.div>
                    ))}
                  </div>
                </TabsContent>
              </Tabs>
            </AnimatedSection>
          </div>

          <div className="lg:col-span-1">
            <AnimatedSection delay={0.4}>
              <div className="sticky top-24 space-y-8">
                <div className="bg-white/5 dark:bg-black/10 backdrop-blur-sm rounded-xl p-6 shadow-lg border border-white/10 dark:border-white/5">
                  <h3 className="text-xl font-bold mb-4">Project Details</h3>

                  <div className="space-y-4">
                    <div className="flex items-center gap-2">
                      <CalendarIcon className="h-5 w-5 text-indigo-400" />
                      <span>Completed: {project.date}</span>
                    </div>

                    <div className="flex items-center gap-2">
                      <TagIcon className="h-5 w-5 text-purple-400" />
                      <span>Category: {project.category}</span>
                    </div>

                    <Separator className="bg-white/10 dark:bg-white/5" />

                    <div className="flex flex-col gap-4">
                      <Button
                        asChild
                        className="bg-gradient-to-r from-indigo-500 to-purple-500 hover:from-indigo-600 hover:to-purple-600 text-white"
                      >
                        <a href={project.demo} target="_blank" rel="noopener noreferrer">
                          <ExternalLinkIcon className="mr-2 h-4 w-4" />
                          Live Demo
                        </a>
                      </Button>
                      <Button
                        variant="outline"
                        asChild
                        className="border-white/10 dark:border-white/5 hover:bg-white/5 dark:hover:bg-black/20"
                      >
                        <a href={project.github} target="_blank" rel="noopener noreferrer">
                          <GithubIcon className="mr-2 h-4 w-4" />
                          View Code
                        </a>
                      </Button>
                    </div>
                  </div>
                </div>

                <div className="bg-white/5 dark:bg-black/10 backdrop-blur-sm rounded-xl p-6 shadow-lg border border-white/10 dark:border-white/5">
                  <h3 className="text-xl font-bold mb-4">Technologies</h3>
                  <div className="flex flex-wrap gap-2">
                    {project.tags.map((tag, i) => (
                      <Badge key={i} variant="secondary" className="bg-white/10 dark:bg-black/20">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>
            </AnimatedSection>
          </div>
        </div>

        {/* Related projects */}
        <AnimatedSection delay={0.5}>
          <div className="mt-24 mb-12">
            <h2 className="text-2xl font-bold mb-8">More Projects</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {projects
                .filter((p) => p.slug !== project.slug && p.category === project.category)
                .slice(0, 3)
                .map((relatedProject, index) => (
                  <motion.div
                    key={relatedProject.slug}
                    className="group relative overflow-hidden rounded-xl bg-white/5 dark:bg-black/10 backdrop-blur-sm shadow-lg border border-white/10 dark:border-white/5 hover:border-primary/30 transition-all duration-300"
                    whileHover={{ y: -5 }}
                  >
                    <div className="relative h-48 w-full overflow-hidden">
                      <Image
                        src={relatedProject.image || "/placeholder.svg"}
                        alt={relatedProject.title}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent opacity-70"></div>
                    </div>
                    <div className="relative p-6">
                      <h3 className="text-xl font-bold mb-2 group-hover:text-primary transition-colors">
                        {relatedProject.title}
                      </h3>
                      <p className="text-muted-foreground mb-4 line-clamp-2">{relatedProject.description}</p>
                      <Button
                        size="sm"
                        asChild
                        className="bg-gradient-to-r from-indigo-500/80 to-purple-500/80 hover:from-indigo-500 hover:to-purple-500 text-white"
                      >
                        <Link href={`/projects/${relatedProject.slug}`}>View Project</Link>
                      </Button>
                    </div>
                  </motion.div>
                ))}
            </div>
          </div>
        </AnimatedSection>
      </div>
    </main>
  )
}

