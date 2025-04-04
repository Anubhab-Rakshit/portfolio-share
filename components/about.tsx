"use client"

import { useState, useRef, useEffect } from "react"
import Image from "next/image"
import { motion, useInView, useAnimation } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { DownloadIcon, GithubIcon, LinkedinIcon, TwitterIcon, MailIcon, YoutubeIcon, InstagramIcon } from "lucide-react"
import ConfettiEffect from "@/components/confetti-effect"
import Link from "next/link"

export default function About() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })
  const controls = useAnimation()
  const [isHovered, setIsHovered] = useState(false)
  const [showConfetti, setShowConfetti] = useState(false)

  // Profile picture 3D effect
  const [rotateX, setRotateX] = useState(0)
  const [rotateY, setRotateY] = useState(0)
  const [scale, setScale] = useState(1)
  const profileRef = useRef(null)

  useEffect(() => {
    if (isInView) {
      controls.start("visible")
    }
  }, [isInView, controls])

  // Handle mouse move for 3D effect
  const handleMouseMove = (e) => {
    if (!profileRef.current) return

    const rect = profileRef.current.getBoundingClientRect()
    const centerX = rect.left + rect.width / 2
    const centerY = rect.top + rect.height / 2

    // Calculate rotation based on mouse position relative to center
    const rotateYValue = ((e.clientX - centerX) / (rect.width / 2)) * 10
    const rotateXValue = ((e.clientY - centerY) / (rect.height / 2)) * 10

    setRotateX(-rotateXValue)
    setRotateY(rotateYValue)
    setScale(1.05)
  }

  const handleMouseLeave = () => {
    setRotateX(0)
    setRotateY(0)
    setScale(1)
  }

  const handleDownloadResume = () => {
    setShowConfetti(true)
    setTimeout(() => setShowConfetti(false), 2000)
  }

  return (
    <section id="about" className="py-20 relative">
      {showConfetti && <ConfettiEffect />}

      <div className="container mx-auto px-4">
        <motion.div
          ref={ref}
          initial="hidden"
          animate={controls}
          variants={{
            hidden: { opacity: 0, y: 50 },
            visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
          }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">About Me</h2>
          <div className="h-1 w-20 bg-gradient-to-r from-purple-500 to-pink-500 mx-auto"></div>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="md:col-span-1 flex justify-center"
          >
            <div
              ref={profileRef}
              className="relative"
              onMouseMove={handleMouseMove}
              onMouseLeave={handleMouseLeave}
              style={{
                perspective: "1000px",
                transformStyle: "preserve-3d",
              }}
            >
              <motion.div
                animate={{
                  rotateX,
                  rotateY,
                  scale,
                  transition: { type: "spring", stiffness: 300, damping: 30 },
                }}
                className="relative w-64 h-64 md:w-80 md:h-80 rounded-2xl overflow-hidden"
                style={{ transformStyle: "preserve-3d" }}
              >
                {/* Main profile image */}
                <Image
                  src="/Images/Anubhab Rakshit Profile Pic.jpg"
                  alt="Anubhab Rakshit"
                  fill
                  className="object-cover"
                />

                {/* Shine effect overlay */}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-tr from-transparent via-white to-transparent opacity-0"
                  animate={{
                    opacity: isHovered ? 0.2 : 0,
                    backgroundPosition: isHovered ? "100% 100%" : "0% 0%",
                  }}
                  transition={{ duration: 1.5 }}
                />

                {/* Border glow */}
                <motion.div
                  className="absolute -inset-0.5 rounded-2xl bg-gradient-to-r from-purple-500 to-pink-500 opacity-0"
                  animate={{ opacity: isHovered ? 0.7 : 0 }}
                  style={{ zIndex: -1 }}
                />
              </motion.div>

              {/* 3D floating elements */}
              <motion.div
                className="absolute -bottom-4 -right-4 w-20 h-20 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full opacity-80"
                animate={{
                  y: [0, -10, 0],
                  rotate: [0, 5, 0],
                  scale: isHovered ? 1.1 : 1,
                }}
                transition={{
                  y: { repeat: Number.POSITIVE_INFINITY, duration: 3, ease: "easeInOut" },
                  rotate: { repeat: Number.POSITIVE_INFINITY, duration: 4, ease: "easeInOut" },
                  scale: { duration: 0.3 },
                }}
                style={{
                  filter: "blur(8px)",
                  zIndex: -1,
                }}
              />

              <motion.div
                className="absolute -top-4 -left-4 w-16 h-16 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full opacity-70"
                animate={{
                  y: [0, 10, 0],
                  rotate: [0, -5, 0],
                  scale: isHovered ? 1.1 : 1,
                }}
                transition={{
                  y: { repeat: Number.POSITIVE_INFINITY, duration: 4, ease: "easeInOut" },
                  rotate: { repeat: Number.POSITIVE_INFINITY, duration: 3, ease: "easeInOut" },
                  scale: { duration: 0.3 },
                }}
                style={{
                  filter: "blur(8px)",
                  zIndex: -1,
                }}
              />

              {/* Interactive hover area */}
              <div
                className="absolute inset-0 cursor-pointer z-10"
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
              />
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 50 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="md:col-span-2"
          >
            <Card className="bg-white/5 dark:bg-black/20 backdrop-blur-sm border border-white/10 dark:border-white/5 shadow-lg">
              <CardContent className="p-6">
                <h3 className="text-2xl font-bold mb-2 bg-clip-text text-transparent bg-gradient-to-r from-purple-500 to-pink-500">
                  Anubhab Rakshit
                </h3>
                <p className="text-muted-foreground mb-4">Full Stack Developer & AI Enthusiast</p>

                <div className="space-y-4 mb-6">
                  <p>
                    I'm a passionate developer with expertise in building modern web applications using cutting-edge
                    technologies. With a strong foundation in both frontend and backend development, I create seamless,
                    user-friendly experiences that solve real-world problems.
                  </p>
                  <p>
                    My journey in tech began with a fascination for how software can transform lives. Since then, I've
                    worked on various projects ranging from e-commerce platforms to AI-powered applications, always
                    striving to learn and implement the latest technologies.
                  </p>
                </div>

                <div className="mb-6">
                  <h4 className="font-semibold mb-2">Technical Skills</h4>
                  <div className="flex flex-wrap gap-2">
                    <Badge className="bg-purple-500/10 text-purple-500 hover:bg-purple-500/20">React</Badge>
                    <Badge className="bg-blue-500/10 text-blue-500 hover:bg-blue-500/20">Next.js</Badge>
                    <Badge className="bg-green-500/10 text-green-500 hover:bg-green-500/20">Node.js</Badge>
                    <Badge className="bg-yellow-500/10 text-yellow-500 hover:bg-yellow-500/20">JavaScript</Badge>
                    <Badge className="bg-cyan-500/10 text-cyan-500 hover:bg-cyan-500/20">TypeScript</Badge>
                    <Badge className="bg-red-500/10 text-red-500 hover:bg-red-500/20">Python</Badge>
                    <Badge className="bg-indigo-500/10 text-indigo-500 hover:bg-indigo-500/20">TensorFlow</Badge>
                    <Badge className="bg-pink-500/10 text-pink-500 hover:bg-pink-500/20">C</Badge>
                    <Badge className="bg-purple-500/10 text-purple-500 hover:bg-purple-500/20">PHP</Badge>
                    <Badge className="bg-blue-500/10 text-blue-500 hover:bg-blue-500/20">Java</Badge>
                    <Badge className="bg-green-500/10 text-green-500 hover:bg-green-500/20">MYSQL</Badge>
                    <Badge className="bg-yellow-500/10 text-yellow-500 hover:bg-yellow-500/20">HTML/CSS</Badge>
                  </div>
                </div>

                <div className="flex flex-wrap gap-3">
                  <Button
                    variant="default"
                    className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600"
                    onClick={handleDownloadResume}
                    asChild
                  >
                    <Link href="/resume">
                      <DownloadIcon className="mr-2 h-4 w-4" />
                      Download Resume
                    </Link>
                  </Button>
                  <Button variant="outline" className="border-white/10 dark:border-white/5" asChild>
                    <Link href="/#contact">
                      <MailIcon className="mr-2 h-4 w-4" />
                      Contact Me
                    </Link>
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="rounded-full hover:bg-white/10 dark:hover:bg-black/20"
                    asChild
                  >
                    <a href="https://github.com/Anubhab-Rakshit" target="_blank" rel="noopener noreferrer">
                      <GithubIcon className="h-5 w-5" />
                    </a>
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="rounded-full hover:bg-white/10 dark:hover:bg-black/20"
                    asChild
                  >
                    <a href="https://www.linkedin.com/in/anubhab-rakshit/" target="_blank" rel="noopener noreferrer">
                      <LinkedinIcon className="h-5 w-5" />
                    </a>
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="rounded-full hover:bg-white/10 dark:hover:bg-black/20"
                    asChild
                  >
                    <a href="https://x.com/anubhab_26" target="_blank" rel="noopener noreferrer">
                      <TwitterIcon className="h-5 w-5" />
                    </a>
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="rounded-full hover:bg-white/10 dark:hover:bg-black/20"
                    asChild
                  >
                    <a href="https://www.youtube.com/@theallmasteranubhab7686" target="_blank" rel="noopener noreferrer">
                      <YoutubeIcon className="h-5 w-5" />
                    </a>
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="rounded-full hover:bg-white/10 dark:hover:bg-black/20"
                    asChild
                  >
                    <a href="https://www.instagram.com/dauntless._.ar" target="_blank" rel="noopener noreferrer">
                      <InstagramIcon className="h-5 w-5" />
                    </a>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </section>
  )
}