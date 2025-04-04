"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { TypewriterEffect } from "@/components/ui/typewriter-effect"
import { Button } from "@/components/ui/button"
import { ArrowDownIcon, GithubIcon, LinkedinIcon, TwitterIcon } from "lucide-react"

export default function Hero() {
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true)
  }, [])

  return (
    <section id="hero" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/10 via-purple-500/10 to-pink-500/10 z-0"></div>

      {/* Content Overlay */}
      <div className="relative z-10 container mx-auto px-4 flex flex-col items-center text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mb-6 mt-12 md:mt-0"
        >
          <motion.h1
            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500"
            initial={{ scale: 0.9 }}
            animate={{ scale: 1 }}
            transition={{
              duration: 0.8,
              type: "spring",
              stiffness: 100,
            }}
          >
            Hi, I'm Anubhab Rakshit
          </motion.h1>

          <div className="h-12 md:h-16 mb-6">
            {isMounted && (
              <TypewriterEffect
                words={[
                  { text: "Full Stack Developer" },
                  { text: "UI/UX Designer" },
                  { text: "3D Enthusiast" },
                  { text: "Problem Solver" },
                ]}
                className="text-lg md:text-xl lg:text-3xl font-medium"
              />
            )}
          </div>

          <motion.p
            className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            I build exceptional digital experiences with cutting-edge technologies. Let's create something amazing
            together.
          </motion.p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.8 }}
          className="flex flex-wrap gap-3 md:gap-4 justify-center mb-8 md:mb-12"
        >
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Button
              size="lg"
              className="bg-gradient-to-r from-indigo-500 to-purple-500 hover:from-indigo-600 hover:to-purple-600 transition-all duration-300"
              asChild
            >
              <a href="#contact">Get In Touch</a>
            </Button>
          </motion.div>

          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Button
              size="lg"
              variant="outline"
              className="backdrop-blur-sm bg-white/5 border-white/10 transition-all duration-300 hover:bg-white/10"
              asChild
            >
              <a href="#projects">View My Work</a>
            </Button>
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.8 }}
          className="flex gap-4 md:gap-6"
        >
          <motion.div whileHover={{ scale: 1.2, rotate: 5 }} whileTap={{ scale: 0.9 }}>
            <Button variant="ghost" size="icon" className="rounded-full hover:bg-white/10" asChild>
              <a href="https://github.com/Anubhab-Rakshit" target="_blank" rel="noopener noreferrer" aria-label="GitHub">
                <GithubIcon className="h-6 w-6" />
              </a>
            </Button>
          </motion.div>

          <motion.div whileHover={{ scale: 1.2, rotate: -5 }} whileTap={{ scale: 0.9 }}>
            <Button variant="ghost" size="icon" className="rounded-full hover:bg-white/10" asChild>
              <a href="https://www.linkedin.com/in/anubhab-rakshit/" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
                <LinkedinIcon className="h-6 w-6" />
              </a>
            </Button>
          </motion.div>

          <motion.div whileHover={{ scale: 1.2, rotate: 5 }} whileTap={{ scale: 0.9 }}>
            <Button variant="ghost" size="icon" className="rounded-full hover:bg-white/10" asChild>
              <a href="https://x.com/anubhab_26" target="_blank" rel="noopener noreferrer" aria-label="Twitter">
                <TwitterIcon className="h-6 w-6" />
              </a>
            </Button>
          </motion.div>
        </motion.div>

        {/* Scroll down indicator */}
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
          <motion.div whileHover={{ scale: 1.1, y: 5 }} whileTap={{ scale: 0.9 }}>
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
        </motion.div>
      </div>
    </section>
  )
}

