"use client"

import { useState, useEffect, useRef, Suspense, useMemo } from "react"
import { Canvas, useFrame, useThree } from "@react-three/fiber"
import {
  Text3D,
  Float,
  Environment,
  ContactShadows,
  PresentationControls,
  Html,
  Center,
  MeshDistortMaterial,
  MeshWobbleMaterial,
} from "@react-three/drei"
import { motion } from "framer-motion"
import { motion as motion3D } from "framer-motion-3d"
import { useTheme } from "next-themes"
import { TypewriterEffect } from "@/components/ui/typewriter-effect"
import { Button } from "@/components/ui/button"
import { ArrowDownIcon } from "lucide-react"
import type * as THREE from "three"

// Responsive scene scaling based on viewport size
function useResponsiveScale() {
  const { viewport } = useThree()
  const isMobile = viewport.width < 5
  const scale = isMobile ? 0.6 : 1
  const textPosition = isMobile ? [-4, -1, 0] : [-5, -3, 0]
  const secondTextPosition = isMobile ? [1.8, -1, 0] : [3, -3, 0]

  return { scale, isMobile, textPosition, secondTextPosition }
}

// Enhanced animated 3D text with glow effect
function AnimatedText3D({ text, position, rotation, color, glowColor }) {
  const textRef = useRef<THREE.Mesh>(null)
  const { scale } = useResponsiveScale()
  const speed = 0.5
  // More dynamic animation
  useFrame((state) => {
    if (textRef.current) {
      textRef.current.rotation.y = Math.sin(state.clock.getElapsedTime() * 0.3) * 0.15
      textRef.current.rotation.x = Math.sin(state.clock.getElapsedTime() * 0.2) * 0.05
      // Subtle floating effect
      textRef.current.position.y = position[1] + Math.sin(state.clock.getElapsedTime() * speed) * 0.05
    }
  })

  return (
    <Float floatIntensity={0.5} rotationIntensity={0.3} speed={2}>
      <Center>
        <motion3D.group
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: scale }}
          transition={{ duration: 1, delay: 0.2 }}
        >
          {/* Glow effect layer */}
          <Text3D
            position={[position[0] - 0.02, position[1] - 0.02, position[2] - 0.1]}
            rotation={rotation}
            font="/fonts/Inter_Bold.json"
            size={0.55}
            height={0.02}
            curveSegments={12}
            bevelEnabled
            bevelThickness={0.01}
            bevelSize={0.01}
          >
            {text}
            <meshStandardMaterial
              color={glowColor}
              emissive={glowColor}
              emissiveIntensity={0.6}
              transparent
              opacity={0.7}
            />
          </Text3D>

          {/* Main text layer */}
          <Text3D
            ref={textRef}
            font="/fonts/Inter_Bold.json"
            position={position}
            rotation={rotation}
            size={0.55}
            height={0.1}
            curveSegments={12}
            bevelEnabled
            bevelThickness={0.02}
            bevelSize={0.02}
          >
            {text}
            <MeshWobbleMaterial
              color={color}
              factor={0.1}
              speed={0.5}
              metalness={0.8}
              roughness={0.2}
              envMapIntensity={1}
            />
          </Text3D>
        </motion3D.group>
      </Center>
    </Float>
  )
}
const meshRef = useRef<THREE.Mesh | null>(null)
// Enhanced floating geometries with better materials and animations
function FloatingGeometry({ position, geometry, size, color, wobbleFactor = 0, speed = 1, delay = 0 }) {
  const meshRef = useRef<THREE.Mesh | null>(null)
  const { scale } = useResponsiveScale()

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = state.clock.getElapsedTime() * 0.3 * speed
      meshRef.current.rotation.y = state.clock.getElapsedTime() * 0.4 * speed
      meshRef.current.position.y = position[1] + Math.sin(state.clock.getElapsedTime() * speed) * 0.2
    }
  })

  return (
    <motion3D.mesh
      ref={meshRef as any}
      position={position}
      scale={scale}
      initial={{ scale: 0, rotateZ: 0 }}
      animate={{
        scale: scale,
        rotateY: [0, Math.PI * 2],
      }}
      transition={{
        delay: delay,
        duration: 3,
        repeat: Number.POSITIVE_INFINITY,
        repeatType: "loop",
        ease: "easeInOut",
      }}
    >
      {geometry === "box" && <boxGeometry args={size} />}
      {geometry === "sphere" && <sphereGeometry args={[size[0], 32, 32]} />}
      {geometry === "torus" && <torusGeometry args={[size[0], size[1], 16, 32]} />}
      {geometry === "octahedron" && <octahedronGeometry args={[size[0], 0]} />}

      {wobbleFactor > 0 ? (
        <MeshWobbleMaterial
          color={color}
          factor={wobbleFactor}
          speed={speed * 0.5}
          metalness={0.8}
          roughness={0.2}
          envMapIntensity={1}
        />
      ) : (
        <MeshDistortMaterial
          color={color}
          speed={speed * 0.5}
          distort={0.3}
          radius={1}
          metalness={0.8}
          roughness={0.2}
        />
      )}
    </motion3D.mesh>
  )
}

// Particle system for background effect
function ParticleField({ count = 100, color }) {
  const points = useRef<THREE.Points | null>(null)
  const particles = useMemo(() => {
    const temp = []
    for (let i = 0; i < count; i++) {
      const x = (Math.random() - 0.5) * 15
      const y = (Math.random() - 0.5) * 15
      const z = (Math.random() - 0.5) * 5
      temp.push({ x, y, z })
    }
    return temp
  }, [count])

  useFrame((state) => {
    if (points.current) {
      points.current.rotation.x = state.clock.getElapsedTime() * 0.05
      points.current.rotation.y = state.clock.getElapsedTime() * 0.03
    }
  })

  return (
    <points ref={points}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={particles.length}
          array={Float32Array.from(particles.flatMap((p) => [p.x, p.y, p.z]))}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial size={0.05} color={color} transparent opacity={0.6} sizeAttenuation />
    </points>
  )
}

// Main 3D scene with improved visual effects
function Scene() {
  const { theme } = useTheme()
  const isDark = theme === "dark"
  const { textPosition, secondTextPosition, isMobile } = useResponsiveScale()

  // Define theme-based colors
  const primaryColor = isDark ? "#8a2be2" : "#4a00e0"
  const secondaryColor = isDark ? "#ff4500" : "#ff6347"
  const accentColor = isDark ? "#00bfff" : "#1e90ff"
  const glowColor1 = isDark ? "#b264ff" : "#7c4dff"
  const glowColor2 = isDark ? "#ff7b50" : "#ff8c6a"

  return (
    <>
      <ambientLight intensity={0.3} />
      <spotLight
        position={[10, 10, 10]}
        angle={0.15}
        penumbra={1}
        intensity={1.5}
        castShadow
        shadow-mapSize={[2048, 2048]}
      />
      <pointLight position={[-10, 0, -10]} intensity={0.5} color={primaryColor} />
      <pointLight position={[10, 5, 0]} intensity={0.5} color={secondaryColor} />

      {!isMobile && <ParticleField count={150} color={isDark ? "#ffffff" : "#000000"} />}

      <PresentationControls
        global
        rotation={[0, 0, 0]}
        polar={[-(Math.PI / 8), Math.PI / 8]}
        azimuth={[-(Math.PI / 8), Math.PI / 8]}
        config={{ mass: 2, tension: 400 }}
        snap={{ mass: 4, tension: 400 }}
      >
        <AnimatedText3D
          text="Anubhab"
          position={textPosition}
          rotation={[0, 0, 0]}
          color={primaryColor}
          glowColor={glowColor1}
        />

        <AnimatedText3D
          text="Rakshit"
          position={secondTextPosition}
          rotation={[0, 0, 0]}
          color={secondaryColor}
          glowColor={glowColor2}
        />

        <FloatingGeometry
          geometry="octahedron"
          position={[2, 1.5, -1]}
          size={[0.5]}
          color={primaryColor}
          speed={0.8}
          delay={0.2}
          wobbleFactor={0.5}
        />

        <FloatingGeometry
          geometry="torus"
          position={[2.5, -1, -0.5]}
          size={[0.3, 0.1]}
          color={secondaryColor}
          speed={1.2}
          delay={0.4}
        />

        <FloatingGeometry
          geometry="sphere"
          position={[1.5, 0.5, -1.5]}
          size={[0.25]}
          color={accentColor}
          speed={1.5}
          delay={0.6}
        />

        <FloatingGeometry
          geometry="box"
          position={[-2, 1, -1]}
          size={[0.3, 0.3, 0.3]}
          color={accentColor}
          speed={1}
          delay={0.3}
          wobbleFactor={0.3}
        />
      </PresentationControls>

      <ContactShadows position={[0, -1.5, 0]} opacity={0.5} scale={20} blur={1.5} far={2} resolution={1024} />
      <Environment preset={isDark ? "night" : "city"} />
    </>
  )
}

// Custom loading component with animated indicator
function LoadingScreen() {
  return (
    <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-gray-900 to-black">
      <div className="text-center">
        <div className="w-12 h-12 border-4 border-t-transparent border-primary rounded-full animate-spin mx-auto mb-4"></div>
        <p className="text-primary text-xl font-bold">Loading 3D Experience...</p>
      </div>
    </div>
  )
}

// Main component with responsive adjustments
export default function Hero3DEnhanced() {
  const { theme } = useTheme()
  const isDark = theme === "dark"
  const [isClient, setIsClient] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [isMobile, setIsMobile] = useState(false)

  // Handle client-side rendering and responsive detection
  useEffect(() => {
    setIsClient(true)

    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }

    checkMobile()
    window.addEventListener("resize", checkMobile)

    // Simulate loading to ensure smooth transition
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 1500)

    return () => {
      window.removeEventListener("resize", checkMobile)
      clearTimeout(timer)
    }
  }, [])

  // Server-side rendering fallback
  if (!isClient) {
    return (
      <div className="h-screen w-full flex items-center justify-center bg-gray-100 dark:bg-gray-900">
        <p className="text-xl font-bold">Loading Hero...</p>
      </div>
    )
  }

  return (
    <div className="relative h-screen w-full flex flex-col items-center justify-center overflow-hidden">
      {/* 3D Background with responsive canvas */}
      <div className="absolute inset-0 z-0">
        <Canvas
          camera={{ position: [0, 0, 5], fov: isMobile ? 70 : 50 }}
          dpr={[1, 2]}
          style={{ width: "100%", height: "100%" }}
          gl={{ antialias: true, alpha: true }}
          legacy={false}
        >
          <color attach="background" args={[isDark ? "#050816" : "#f8fafc"]} />
          <Suspense
            fallback={
              <Html center>
                <LoadingScreen />
              </Html>
            }
          >
            <Scene />
          </Suspense>
        </Canvas>
      </div>

      {/* Content Overlay with improved responsive layout */}
      <div className="relative z-10 container mx-auto px-4 flex flex-col items-center text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mb-6 mt-12 md:mt-0"
        >
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4">
            Hi, I'm <span className="text-primary">Anubhab Rakshit</span>
          </h1>

          <div className="h-12 md:h-16 mb-6">
            <TypewriterEffect
              words={[
                { text: "Full Stack Developer" },
                { text: "UI/UX Designer" },
                { text: "3D Enthusiast" },
                { text: "Problem Solver" },
              ]}
              className="text-lg md:text-xl lg:text-3xl font-medium"
            />
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.8 }}
          className="flex flex-wrap gap-3 md:gap-4 justify-center mb-8 md:mb-12"
        ></motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.8 }}
          className="flex gap-4 md:gap-6"
        ></motion.div>

        {/* Improved scroll down indicator */}
        <motion.div
          className="absolute bottom-8"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            delay: 0.8,
            duration: 0.5,
            repeat: Number.POSITIVE_INFINITY,
            repeatType: "reverse",
          }}
        >
          <Button
            variant="ghost"
            size="icon"
            asChild
            className="rounded-full bg-background/50 backdrop-blur-sm hover:bg-background/70"
          >
            <a href="#about" aria-label="Scroll down">
              <ArrowDownIcon className="h-5 w-5 md:h-6 md:w-6" />
            </a>
          </Button>
        </motion.div>
      </div>
    </div>
  )
}

