"use client"

import { useState, useRef, useEffect, Suspense } from "react"
import { Canvas, useFrame, useThree } from "@react-three/fiber"
import { PresentationControls, Environment, ContactShadows, Html, useGLTF } from "@react-three/drei"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { GithubIcon, ExternalLinkIcon } from "lucide-react"
import { useTheme } from "next-themes"

// Safe project function to ensure we always have valid data
const safeProject = (project) => {
  if (!project) {
    return {
      title: "Sample Project",
      description: "This is a sample project description",
      tags: ["React", "Next.js", "TypeScript"],
      github: "https://github.com",
      demo: "https://example.com",
      image: "/placeholder.svg?height=400&width=600",
    }
  }

  return {
    ...project,
    tags: project.tags || ["React", "Next.js", "TypeScript"],
    github: project.github || "https://github.com",
    demo: project.demo || "https://example.com",
    image: project.image || "/placeholder.svg?height=400&width=600",
  }
}

// Laptop model with screen
function LaptopWithScreen({ project }) {
  const { scene } = useGLTF("/models/laptop.glb", true)
  const laptopRef = useRef()
  const { viewport } = useThree()
  const safeProjectData = safeProject(project)

  // Responsive positioning
  const scale = viewport.width < 5 ? 1.2 : 1.5

  useFrame((state) => {
    if (laptopRef.current) {
      laptopRef.current.rotation.y = Math.sin(state.clock.getElapsedTime() * 0.1) * 0.1
    }
  })

  return (
    <group ref={laptopRef} position={[0, -0.5, 0]} scale={scale}>
      <primitive object={scene.clone()} />

      {/* Screen content */}
      <mesh position={[0, 1.55, -1.35]} rotation={[-0.4, 0, 0]}>
        <planeGeometry args={[2.1, 1.3]} />
        <meshBasicMaterial color="#ffffff" />
        <Html transform position={[0, 0, 0.01]} scale={0.15} rotation={[0, 0, 0]} className="w-[500px]">
          <div className="bg-white dark:bg-gray-900 p-4 rounded-lg shadow-lg">
            <div className="relative h-32 w-full bg-gray-200 dark:bg-gray-800 rounded-md overflow-hidden">
              <div
                className="absolute inset-0 bg-cover bg-center"
                style={{ backgroundImage: `url(${safeProjectData.image})` }}
              />
            </div>
            <h3 className="text-lg font-bold mt-3 text-black dark:text-white">{safeProjectData.title}</h3>
            <p className="text-sm text-gray-600 dark:text-gray-300 mt-1">{safeProjectData.description}</p>
            <div className="flex flex-wrap gap-1 mt-2">
              {safeProjectData.tags.map((tag, i) => (
                <Badge key={i} variant="secondary" className="text-xs">
                  {tag}
                </Badge>
              ))}
            </div>
          </div>
        </Html>
      </mesh>
    </group>
  )
}

// Project info panel
function ProjectInfo({ project }) {
  const safeProjectData = safeProject(project)
  const { theme } = useTheme()
  const isDark = theme === "dark"

  return (
    <div className="absolute bottom-8 left-8 right-8 md:left-auto md:right-8 md:top-1/2 md:transform md:-translate-y-1/2 md:w-80 bg-white/90 dark:bg-gray-900/90 backdrop-blur-md p-6 rounded-xl shadow-lg">
      <h2 className="text-2xl font-bold mb-2">{safeProjectData.title}</h2>
      <p className="text-gray-600 dark:text-gray-300 mb-4">{safeProjectData.description}</p>

      <div className="flex flex-wrap gap-2 mb-4">
        {safeProjectData.tags.map((tag, i) => (
          <Badge key={i} variant="secondary">
            {tag}
          </Badge>
        ))}
      </div>

      <div className="flex gap-3">
        <Button size="sm" variant="outline" asChild>
          <a href={safeProjectData.github} target="_blank" rel="noopener noreferrer">
            <GithubIcon className="mr-2 h-4 w-4" />
            Code
          </a>
        </Button>
        <Button size="sm" asChild>
          <a href={safeProjectData.demo} target="_blank" rel="noopener noreferrer">
            <ExternalLinkIcon className="mr-2 h-4 w-4" />
            Live Demo
          </a>
        </Button>
      </div>
    </div>
  )
}

// Main component
export default function ProjectShowcaseEnhanced({ projects = [] }) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isClient, setIsClient] = useState(false)
  const { theme } = useTheme()
  const isDark = theme === "dark"

  // Ensure we have at least one project
  const safeProjects = projects && projects.length > 0 ? projects.map(safeProject) : [safeProject(null)]

  const currentProject = safeProjects[currentIndex]

  useEffect(() => {
    setIsClient(true)
  }, [])

  const nextProject = () => {
    setCurrentIndex((prev) => (prev + 1) % safeProjects.length)
  }

  const prevProject = () => {
    setCurrentIndex((prev) => (prev - 1 + safeProjects.length) % safeProjects.length)
  }

  if (!isClient) {
    return (
      <div className="h-[500px] w-full flex items-center justify-center bg-gray-100 dark:bg-gray-900">
        <p className="text-xl font-bold">Loading Project Showcase...</p>
      </div>
    )
  }

  return (
    <div className="relative h-[600px] w-full">
      <Canvas camera={{ position: [0, 0, 8], fov: 45 }}>
        <color attach="background" args={[isDark ? "#050816" : "#f8fafc"]} />

        <Suspense
          fallback={
            <Html center>
              <div className="text-center">
                <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-2"></div>
                <p>Loading 3D model...</p>
              </div>
            </Html>
          }
        >
          <PresentationControls
            global
            rotation={[0.1, 0, 0]}
            polar={[-Math.PI / 4, Math.PI / 4]}
            azimuth={[-Math.PI / 4, Math.PI / 4]}
            config={{ mass: 2, tension: 400 }}
            snap={{ mass: 4, tension: 400 }}
          >
            <LaptopWithScreen project={currentProject} />
          </PresentationControls>

          <ContactShadows position={[0, -1.5, 0]} opacity={0.4} scale={10} blur={1.5} far={1.5} />
          <Environment preset="city" />
        </Suspense>
      </Canvas>

      <ProjectInfo project={currentProject} />

      {/* Navigation buttons */}
      {safeProjects.length > 1 && (
        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-2">
          <Button variant="outline" size="sm" onClick={prevProject} className="rounded-full w-10 h-10 p-0">
            &larr;
          </Button>
          <Button variant="outline" size="sm" onClick={nextProject} className="rounded-full w-10 h-10 p-0">
            &rarr;
          </Button>
        </div>
      )}
    </div>
  )
}

// Preload models
useGLTF.preload("/models/laptop.glb")

