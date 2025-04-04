"use client"

import { useState } from "react"
import dynamic from "next/dynamic"
import { MotionConfig } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ExternalLinkIcon, GithubIcon } from "lucide-react"
import { ThreeDModel } from "@/components/ui/3d-model"
import { useTheme } from "next-themes"
import { useHasMounted } from "@/lib/client-utils"

// Dynamically import Three.js components with no SSR
const DynamicCanvas = dynamic(() => import("@react-three/fiber").then((mod) => mod.Canvas), {
  ssr: false,
})

const DynamicEnvironment = dynamic(() => import("@react-three/drei").then((mod) => mod.Environment), {
  ssr: false,
})

const DynamicContactShadows = dynamic(() => import("@react-three/drei").then((mod) => mod.ContactShadows), {
  ssr: false,
})

const DynamicHtml = dynamic(() => import("@react-three/drei").then((mod) => mod.Html), {
  ssr: false,
})

export function ProjectCard3D() {
  const [hover, setHover] = useState(false)
  const { theme } = useTheme()
  const isDark = theme === "dark"
  const hasMounted = useHasMounted()

  if (!hasMounted) {
    // Return a placeholder with the same dimensions
    return <div className="h-full w-full"></div>
  }

  return (
    <div className="h-full w-full">
      <MotionConfig transition={{ duration: 0.5 }}>
        <DynamicCanvas shadows camera={{ position: [0, 0, 8], fov: 42 }}>
          <ambientLight intensity={0.5} />
          <directionalLight position={[10, 10, 10]} intensity={1} castShadow shadow-mapSize={[1024, 1024]} />
          <group position-y={-1}>
            <ThreeDModel
              modelPath="/assets/3d/duck.glb"
              scale={2}
              position={[0, 0, 0]}
              autoRotate={true}
              showControls={false}
              interactive={true}
            />

            <DynamicHtml
              transform
              wrapperClass="htmlScreen"
              distanceFactor={1.5}
              position={[0, 1.5, 0.5]}
              rotation={[-0.2, 0, 0]}
            >
              <div
                className="w-[600px] h-[400px] bg-white dark:bg-gray-800 rounded-lg p-4 shadow-xl overflow-hidden"
                onPointerOver={() => setHover(true)}
                onPointerOut={() => setHover(false)}
              >
                <div className="flex flex-col h-full">
                  <div className="text-2xl font-bold mb-2">AI-Powered Learning Platform</div>
                  <p className="text-muted-foreground mb-4">
                    A cutting-edge platform that uses artificial intelligence to provide personalized learning
                    experiences. Features include content recommendation, progress tracking, and adaptive assessments.
                  </p>

                  <div className="flex flex-wrap gap-2 mb-4">
                    <Badge>React</Badge>
                    <Badge>Node.js</Badge>
                    <Badge>MongoDB</Badge>
                    <Badge>TensorFlow</Badge>
                    <Badge>AWS</Badge>
                  </div>

                  <div className="flex-grow relative">
                    <div className="absolute inset-0 bg-muted rounded-md overflow-hidden">
                      <div className="w-full h-full bg-gradient-to-br from-blue-500/20 to-purple-500/20"></div>
                    </div>
                  </div>

                  <div className="flex justify-between mt-4">
                    <Button variant="outline" size="sm">
                      <GithubIcon className="mr-2 h-4 w-4" />
                      View Code
                    </Button>
                    <Button size="sm">
                      <ExternalLinkIcon className="mr-2 h-4 w-4" />
                      Live Demo
                    </Button>
                  </div>
                </div>
              </div>
            </DynamicHtml>

            <DynamicContactShadows position={[0, -1.5, 0]} opacity={0.35} scale={10} blur={1.5} far={1.5} />
          </group>
          <DynamicEnvironment preset={isDark ? "night" : "city"} />
        </DynamicCanvas>
      </MotionConfig>
    </div>
  )
}

