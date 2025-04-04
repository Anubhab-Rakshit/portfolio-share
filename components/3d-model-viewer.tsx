"use client"

import { useState, useEffect, useRef, Suspense } from "react"
import { Canvas } from "@react-three/fiber"
import { OrbitControls, PresentationControls, Environment, useGLTF, ContactShadows, Html } from "@react-three/drei"
import { useTheme } from "next-themes"

// Available environment presets
const ENVIRONMENT_PRESETS = [
  "apartment",
  "city",
  "dawn",
  "forest",
  "lobby",
  "night",
  "park",
  "studio",
  "sunset",
  "warehouse",
]

// Fallback model path
const FALLBACK_MODEL = "/models/fallback-cube.glb"

// Model component with error handling
function Model({ modelPath, scale = 1 }) {
  const [error, setError] = useState(false)
  const [loading, setLoading] = useState(true)

  // Use a ref to track if component is mounted
  const isMounted = useRef(true)

  useEffect(() => {
    return () => {
      isMounted.current = false
    }
  }, [])

  // Load model with error handling
  const { scene } = useGLTF(
    error ? FALLBACK_MODEL : modelPath,
    true,
    () => {
      if (isMounted.current) setLoading(false)
    },
    (err) => {
      console.error(`Error loading model ${modelPath}:`, err)
      if (isMounted.current) {
        setError(true)
        // Try loading fallback model
        useGLTF.load(
          FALLBACK_MODEL,
          () => {
            if (isMounted.current) setLoading(false)
          },
          undefined,
          (fallbackErr) => {
            console.error("Error loading fallback model:", fallbackErr)
            if (isMounted.current) setLoading(false)
          },
        )
      }
    },
  )

  if (loading) {
    return (
      <Html center>
        <div className="text-center">
          <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-2"></div>
          <p>Loading model...</p>
        </div>
      </Html>
    )
  }

  return <primitive object={scene} scale={scale} position={[0, error ? 0 : -1, 0]} />
}

// Main component
export default function ModelViewer({
  modelPath = "/models/robot.glb",
  height = "400px",
  showControls = true,
  environmentPreset = "city",
  scale = 2,
}) {
  const { theme } = useTheme()
  const isDark = theme === "dark"
  const [isClient, setIsClient] = useState(false)

  // Validate environment preset
  const safeEnvironmentPreset = ENVIRONMENT_PRESETS.includes(environmentPreset) ? environmentPreset : "city"

  useEffect(() => {
    setIsClient(true)
  }, [])

  if (!isClient) {
    return (
      <div
        style={{ height }}
        className="w-full flex items-center justify-center bg-gray-100 dark:bg-gray-800 rounded-lg"
      >
        <p className="text-center">Loading 3D Model...</p>
      </div>
    )
  }

  return (
    <div style={{ height }} className="w-full">
      <Canvas camera={{ position: [0, 0, 5], fov: 50 }} shadows>
        <color attach="background" args={[isDark ? "#050816" : "#f8fafc"]} />

        <ambientLight intensity={0.5} />
        <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} intensity={1} castShadow />

        <Suspense
          fallback={
            <Html center>
              <div className="text-center">
                <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-2"></div>
                <p>Loading model...</p>
              </div>
            </Html>
          }
        >
          {showControls ? (
            <>
              <OrbitControls enableZoom={true} enablePan={true} enableRotate={true} autoRotate autoRotateSpeed={0.5} />
              <Model modelPath={modelPath} scale={scale} />
            </>
          ) : (
            <PresentationControls
              global
              rotation={[0, 0, 0]}
              polar={[-Math.PI / 4, Math.PI / 4]}
              azimuth={[-Math.PI / 4, Math.PI / 4]}
              config={{ mass: 2, tension: 400 }}
              snap={{ mass: 4, tension: 400 }}
            >
              <Model modelPath={modelPath} scale={scale} />
            </PresentationControls>
          )}

          <ContactShadows position={[0, -1.5, 0]} opacity={0.4} scale={10} blur={1.5} far={1.5} />

          <Environment preset={safeEnvironmentPreset} />
        </Suspense>
      </Canvas>
    </div>
  )
}

// Preload fallback model
try {
  useGLTF.preload(FALLBACK_MODEL)
} catch (error) {
  console.error("Failed to preload fallback model:", error)
}

