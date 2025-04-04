"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { Canvas } from "@react-three/fiber"
import { Text, Float, Html, ContactShadows, Environment } from "@react-three/drei"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { useToast } from "@/hooks/use-toast"
import { useTheme } from "next-themes"

function ContactForm() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const { toast } = useToast()
  const formRef = useRef<HTMLFormElement>(null)

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simulate form submission
    await new Promise((resolve) => setTimeout(resolve, 1500))

    toast({
      title: "Message sent!",
      description: "Thank you for your message. I'll get back to you soon.",
    })

    setIsSubmitting(false)

    // Reset form
    if (formRef.current) {
      formRef.current.reset()
    }
  }

  return (
    <Html transform position={[0, 0, 0]} rotation={[0, 0, 0]} distanceFactor={1.5}>
      <div className="w-[400px] glass-card border-0 p-6">
        <h3 className="text-2xl font-bold mb-6 text-center">Send Me a Message</h3>
        <form ref={formRef} onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-2">
              <label htmlFor="name" className="text-sm font-medium">
                Name
              </label>
              <Input id="name" name="name" placeholder="Your name" required />
            </div>
            <div className="space-y-2">
              <label htmlFor="email" className="text-sm font-medium">
                Email
              </label>
              <Input id="email" name="email" type="email" placeholder="Your email" required />
            </div>
          </div>
          <div className="space-y-2">
            <label htmlFor="subject" className="text-sm font-medium">
              Subject
            </label>
            <Input id="subject" name="subject" placeholder="Subject" required />
          </div>
          <div className="space-y-2">
            <label htmlFor="message" className="text-sm font-medium">
              Message
            </label>
            <Textarea id="message" name="message" placeholder="Your message" rows={5} required />
          </div>
          <Button type="submit" className="w-full" disabled={isSubmitting}>
            {isSubmitting ? "Sending..." : "Send Message"}
          </Button>
        </form>
      </div>
    </Html>
  )
}

function FloatingElements() {
  const groupRef = useRef(null)

  // Simple animation
  useEffect(() => {
    const interval = setInterval(() => {
      if (groupRef.current) {
        groupRef.current.rotation.y = Math.sin(Date.now() / 4000) * 0.2
      }
    }, 16)

    return () => clearInterval(interval)
  }, [])

  return (
    <group ref={groupRef}>
      <Float floatIntensity={2} rotationIntensity={0.5} speed={2}>
        <Text
          position={[-2, 1.5, 0]}
          rotation={[0, 0.5, 0]}
          fontSize={0.5}
          color="#4338ca"
          font="/fonts/Inter_Bold.json"
          maxWidth={2}
          textAlign="center"
        >
          Let's Connect
        </Text>
      </Float>

      <Float floatIntensity={1.5} rotationIntensity={0.4} speed={1.5}>
        <mesh position={[2, -1, -1]}>
          <torusKnotGeometry args={[0.5, 0.2, 128, 32]} />
          <meshStandardMaterial color="#7e22ce" metalness={0.5} roughness={0.3} />
        </mesh>
      </Float>

      <Float floatIntensity={1} rotationIntensity={0.3} speed={2}>
        <mesh position={[-2, -1.5, -1]}>
          <dodecahedronGeometry args={[0.6, 0]} />
          <meshStandardMaterial color="#2563eb" metalness={0.3} roughness={0.5} />
        </mesh>
      </Float>
    </group>
  )
}

function ThreeDContactForm() {
  const { theme } = useTheme()
  const isDark = theme === "dark"

  return (
    <div className="w-full h-[600px]">
      <Canvas camera={{ position: [0, 0, 5], fov: 45 }}>
        <color attach="background" args={[isDark ? "#050816" : "#f8fafc"]} />

        <ambientLight intensity={0.5} />
        <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} intensity={1} castShadow />

        <ContactForm />
        <FloatingElements />

        <ContactShadows position={[0, -2, 0]} opacity={0.4} scale={10} blur={1.5} far={3} />
        <Environment preset="city" />
      </Canvas>
    </div>
  )
}

export default ThreeDContactForm

