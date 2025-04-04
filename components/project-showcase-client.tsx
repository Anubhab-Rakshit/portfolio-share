"use client"

import { useRef, useState, useEffect } from "react"
import { Canvas } from "@react-three/fiber"
import { Html, Environment, ContactShadows, PresentationControls } from "@react-three/drei"
import { motion, useAnimation } from "framer-motion"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ExternalLinkIcon, GithubIcon } from "lucide-react"
import { useTheme } from "next-themes"

interface Project {
  title: string
  description: string
  image: string
  tags: string[]
  github: string
  demo: string
  slug: string
}

function Model({ project, index }: { project: Project; index: number }) {
  const groupRef = useRef(null)
  const [hovered, setHovered] = useState(false)
  const [clicked, setClicked] = useState(false)

  // Simple animation
  useEffect(() => {
    const interval = setInterval(() => {
      if (groupRef.current) {
        groupRef.current.rotation.y = Math.sin(Date.now() / 4000) * 0.2
        groupRef.current.position.y = Math.sin(Date.now() / 2000) * 0.1
      }
    }, 16)

    return () => clearInterval(interval)
  }, [])

  return (
    <group
      ref={groupRef}
      position={[0, 0, 0]}
      scale={2}
      onPointerOver={() => setHovered(true)}
      onPointerOut={() => setHovered(false)}
      onClick={() => setClicked(!clicked)}
    >
      {/* Simple box as a placeholder for the 3D model */}
      <mesh>
        <boxGeometry args={[1, 0.1, 1.5]} />
        <meshStandardMaterial color="#333" />
      </mesh>

      <Html transform wrapperClass="htmlScreen" distanceFactor={1.5} position={[0, 0.5, 0]} rotation={[-0.2, 0, 0]}>
        <div className="w-[600px] h-[400px] bg-white dark:bg-gray-800 rounded-lg shadow-xl overflow-hidden">
          <div className="relative h-1/2 w-full">
            <Image src={project.image || "/placeholder.svg"} alt={project.title} fill className="object-cover" />
          </div>

          <div className="p-4">
            <h3 className="text-xl font-bold mb-2">{project.title}</h3>
            <p className="text-sm text-gray-600 dark:text-gray-300 mb-3 line-clamp-2">{project.description}</p>

            <div className="flex flex-wrap gap-2 mb-4">
              {project.tags.map((tag, i) => (
                <Badge key={i} variant="secondary">
                  {tag}
                </Badge>
              ))}
            </div>

            <div className="flex gap-2">
              <Button variant="outline" size="sm" asChild>
                <a href={project.github} target="_blank" rel="noopener noreferrer">
                  <GithubIcon className="mr-2 h-4 w-4" />
                  Code
                </a>
              </Button>
              <Button size="sm" asChild>
                <Link href={`/projects/${project.slug}`}>
                  <ExternalLinkIcon className="mr-2 h-4 w-4" />
                  View Details
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </Html>
    </group>
  )
}

export default function ProjectShowcaseClient({ projects }: { projects: Project[] }) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const controls = useAnimation()
  const { theme } = useTheme()
  const isDark = theme === "dark"

  const nextProject = () => {
    controls.start({ opacity: 0, x: -100 }).then(() => {
      setCurrentIndex((prev) => (prev + 1) % projects.length)
      controls.start({ opacity: 1, x: 0 })
    })
  }

  const prevProject = () => {
    controls.start({ opacity: 0, x: 100 }).then(() => {
      setCurrentIndex((prev) => (prev - 1 + projects.length) % projects.length)
      controls.start({ opacity: 1, x: 0 })
    })
  }

  useEffect(() => {
    controls.start({ opacity: 1, x: 0 })
  }, [controls])

  return (
    <div className="relative w-full h-[600px]">
      <motion.div
        className="w-full h-full"
        animate={controls}
        initial={{ opacity: 0, x: 100 }}
        transition={{ duration: 0.5 }}
      >
        <Canvas camera={{ position: [0, 0, 8], fov: 25 }}>
          <color attach="background" args={[isDark ? "#050816" : "#f8fafc"]} />

          <ambientLight intensity={0.5} />
          <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} intensity={1} castShadow />

          <PresentationControls
            global
            rotation={[0.1, 0, 0]}
            polar={[-0.2, 0.2]}
            azimuth={[-0.5, 0.5]}
            config={{ mass: 2, tension: 400 }}
            snap={{ mass: 4, tension: 400 }}
          >
            <Model project={projects[currentIndex]} index={currentIndex} />
          </PresentationControls>

          <ContactShadows position={[0, -1.5, 0]} opacity={0.4} scale={10} blur={1.5} far={1.5} />
          <Environment preset="city" />
        </Canvas>
      </motion.div>

      {/* Navigation controls */}
      <div className="absolute bottom-8 left-0 right-0 flex justify-center gap-4">
        <Button variant="outline" size="icon" onClick={prevProject} disabled={projects.length <= 1}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="m15 18-6-6 6-6" />
          </svg>
        </Button>

        <div className="flex items-center gap-2">
          {projects.map((_, index) => (
            <button
              key={index}
              className={`w-3 h-3 rounded-full ${
                index === currentIndex ? "bg-primary" : "bg-gray-300 dark:bg-gray-700"
              }`}
              onClick={() => {
                controls.start({ opacity: 0 }).then(() => {
                  setCurrentIndex(index)
                  controls.start({ opacity: 1 })
                })
              }}
            />
          ))}
        </div>

        <Button variant="outline" size="icon" onClick={nextProject} disabled={projects.length <= 1}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="m9 18 6-6-6-6" />
          </svg>
        </Button>
      </div>
    </div>
  )
}

