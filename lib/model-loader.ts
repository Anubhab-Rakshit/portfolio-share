"use client"

import { useEffect, useState } from "react"
import { useGLTF } from "@react-three/drei"

// Define available models
export const AVAILABLE_MODELS = {
  laptop: "/models/laptop.glb",
  robot: "/models/robot.glb",
  desk: "/models/desk_setup.glb",
  phone: "/models/smartphone.glb",
  // Fallback to a simple model if others aren't available
  fallback: "/models/fallback-cube.glb",
}

// Preload all models
export function preloadModels() {
  Object.values(AVAILABLE_MODELS).forEach((path) => {
    useGLTF.preload(path)
  })
}

// Hook to check if a model exists and return fallback if not
export function useModelWithFallback(modelPath: string) {
  const [finalPath, setFinalPath] = useState(modelPath)

  useEffect(() => {
    // Check if the model exists
    fetch(modelPath, { method: "HEAD" })
      .then((response) => {
        if (!response.ok) {
          console.warn(`Model ${modelPath} not found, using fallback`)
          setFinalPath(AVAILABLE_MODELS.fallback)
        }
      })
      .catch(() => {
        console.warn(`Error loading model ${modelPath}, using fallback`)
        setFinalPath(AVAILABLE_MODELS.fallback)
      })
  }, [modelPath])

  return finalPath
}

