"use client"

import { useRef, useState } from "react"
import { motion, useInView } from "framer-motion"
import { SectionHeading } from "@/components/section-heading"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  AwardIcon,
  BookOpenIcon,
  BriefcaseIcon,
  BadgeIcon as CertificateIcon,
  GraduationCapIcon,
  TrophyIcon,
  SparklesIcon,
  StarIcon,
} from "lucide-react"
import dynamic from "next/dynamic"

// Dynamically import the confetti effect
const ConfettiEffect = dynamic(() => import("@/components/confetti-effect"), {
  ssr: false,
})

export default function Achievements() {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: "-10%" })
  const [activeAchievement, setActiveAchievement] = useState<number | null>(null)
  const [showConfetti, setShowConfetti] = useState(false)
  const [confettiPosition, setConfettiPosition] = useState({ x: 0.5, y: 0.3 })

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 },
    },
  }

  const achievements = [
    {
      title: "WBJEE Rank-138",
      description: "One of the top ranks in the West Bengal Joint Entrance Examination.",
      date: "2024",
      icon: <GraduationCapIcon className="h-5 w-5" />,
      category: "academic",
      color: "#6366F1",
    },
    {
      title: "JEE Mains Rank-3488",
      description: "One of the top 0.2% in JEE Mains.",
      date: "April 2024",
      icon: <GraduationCapIcon className="h-5 w-5" />,
      category: "academic",
      color: "#EC4899",
    },
    {
      title: "Hackathon Winner",
      description: "Second Place in Hacknovare , Hackathon Conducted by IIEST Shibpur.",
      date: "January 2024",
      icon: <TrophyIcon className="h-5 w-5" />,
      category: "competition",
      color: "#8B5CF6",
    },
    
    {
      title: "Top 5 in Online Code X",
      description: "Ranked among the top 5 in the online coding competition conducted by KIOT, Tamil Nadu",
      date: "January 2025",
      icon: <BriefcaseIcon className="h-5 w-5" />,
      category: "competition",
      color: "#10B981",
    },
    {
      title: "IIIT Felicity Hackathon Finalists",
      description: "Reached the finals of a national-level coding competition among 2000+ participants, came among top 20",
      date: "March 2025",
      icon: <AwardIcon className="h-5 w-5" />,
      category: "competition",
      color: "#3B82F6",
    },
    {
      title: "Project Selected at gentic AI Innovation Challenge 2025 by Ready Tensor",
      description: "Developed the project during a hackathon Encode-IIT Guwahati",
      date: "March 2025",
      icon: <AwardIcon className="h-5 w-5" />,
      category: "competition",
      color: "#3B82F6",
    },
    
  ]

  const certifications = [
    {
      name: "GeeksforGeeks 160 Days Coding Challenge",
      issuer: "GeeksforGeeks",
      date: "December 2024",
  
      logo: "/Images/gfg-logo.jpeg",
      color: "#FF9900",
    },
    {
      name: "Encode - IIT Guwahati Hackathon Participation Certificate ",
      issuer: "Unstop",
      date: "January 2025",

      logo: "/Images/encode-iitguwahati-25.jpg",
      color: "#61DAFB",
    },
    {
      name: "Frontend Frontier - IIT Patna Hackathon Participation Certificate ",
      issuer: "Unstop",
      date: "March 2025",
     
      logo: "/Images/frontend-frontier-iitpatna-25.jpg",
      color: "#2A73CC",
    },
  
  ]

  // Animated achievement card
  const AchievementCard = ({ achievement, index }) => {
    const [isHovered, setIsHovered] = useState(false)
    const cardRef = useRef(null)

    // Handle confetti on click
    const handleClick = (e) => {
      if (cardRef.current) {
        const rect = cardRef.current.getBoundingClientRect()
        const x = rect.left + rect.width / 2
        const y = rect.top + rect.height / 2

        // Calculate position as ratio of window dimensions
        const posX = x / window.innerWidth
        const posY = y / window.innerHeight

        setConfettiPosition({ x: posX, y: posY })
        setShowConfetti(true)

        // Hide confetti after a short delay
        setTimeout(() => setShowConfetti(false), 100)
      }

      setActiveAchievement(activeAchievement === index ? null : index)
    }

    return (
      <motion.div
        ref={cardRef}
        variants={itemVariants}
        className="h-full"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onClick={handleClick}
        whileHover={{
          scale: 1.05,
          boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
          transition: { type: "spring", stiffness: 400, damping: 10 },
        }}
      >
        <Card
          className={`h-full relative overflow-hidden backdrop-blur-md bg-white/10 dark:bg-black/10 border-0 transition-all duration-300 cursor-pointer ${activeAchievement === index ? "ring-2 ring-primary" : ""}`}
        >
          {/* Animated background gradient */}
          <div
            className="absolute inset-0 opacity-20 transition-opacity duration-300"
            style={{
              background: `radial-gradient(circle at ${isHovered ? "50% 50%" : "100% 100%"}, ${achievement.color}, transparent 70%)`,
              opacity: isHovered || activeAchievement === index ? 0.3 : 0.1,
            }}
          />

          {/* Animated corner */}
          <div className="absolute top-0 right-0 w-16 h-16 overflow-hidden">
            <div
              className="absolute top-0 right-0 w-16 h-16 transform rotate-45 origin-bottom-left transition-all duration-300"
              style={{
                backgroundColor: achievement.color,
                transform: `rotate(45deg) scale(${isHovered ? 1.2 : 1})`,
                opacity: 0.7,
              }}
            />
          </div>

          <CardHeader className="pb-2 relative z-10">
            <div className="flex justify-between items-start">
              <motion.div
                className="p-2 rounded-full"
                style={{ backgroundColor: `${achievement.color}20` }}
                animate={{
                  rotate: isHovered ? [0, -10, 10, -10, 10, 0] : 0,
                  scale: isHovered ? [1, 1.2, 1] : 1,
                }}
                transition={{ duration: 0.5 }}
              >
                {achievement.icon}
              </motion.div>
              <Badge variant="outline" className="border-white/20 bg-white/10 backdrop-blur-sm">
                {achievement.category}
              </Badge>
            </div>
            <CardTitle className="mt-4">{achievement.title}</CardTitle>
            <CardDescription>{achievement.date}</CardDescription>
          </CardHeader>
          <CardContent className="relative z-10">
            <p className="text-muted-foreground">{achievement.description}</p>

            {/* Floating stars */}
            {isHovered && (
              <>
                <motion.div
                  className="absolute top-2 right-8 text-yellow-400"
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1, y: [0, -10, 0] }}
                  transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, repeatType: "reverse" }}
                >
                  <StarIcon size={12} />
                </motion.div>
                <motion.div
                  className="absolute bottom-4 left-8 text-yellow-400"
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1, y: [0, -15, 0] }}
                  transition={{ duration: 2.5, repeat: Number.POSITIVE_INFINITY, repeatType: "reverse", delay: 0.5 }}
                >
                  <StarIcon size={10} />
                </motion.div>
              </>
            )}
          </CardContent>
        </Card>
      </motion.div>
    )
  }

  // Animated certification card
  const CertificationCard = ({ cert, index }) => {
    const [isFlipped, setIsFlipped] = useState(false)

    return (
      <motion.div
        variants={itemVariants}
        className="relative h-[200px] perspective-1000 cursor-pointer"
        onClick={() => setIsFlipped(!isFlipped)}
        whileHover={{ scale: 1.03 }}
      >
        <motion.div
          className="absolute inset-0 w-full h-full rounded-lg preserve-3d transition-all duration-500"
          animate={{ rotateY: isFlipped ? 180 : 0 }}
        >
          {/* Front */}
          <div className="absolute inset-0 backface-hidden rounded-lg p-6 backdrop-blur-md bg-white/10 dark:bg-black/10 border border-white/20 dark:border-white/10">
            <div className="flex items-start gap-4 h-full">
              <div
                className="relative w-12 h-12 rounded-full overflow-hidden flex-shrink-0"
                style={{ backgroundColor: `${cert.color}30` }}
              >
                <div className="absolute inset-0 flex items-center justify-center">
                  <CertificateIcon className="h-6 w-6" style={{ color: cert.color }} />
                </div>
              </div>
              <div className="flex flex-col justify-between h-full">
                <div>
                  <h4 className="text-lg font-semibold">{cert.name}</h4>
                  <p className="text-muted-foreground">{cert.issuer}</p>
                </div>
                <div className="text-sm text-muted-foreground mt-auto">Click to view details</div>
              </div>
            </div>
          </div>

          {/* Back */}
          <div className="absolute inset-0 backface-hidden rounded-lg p-6 backdrop-blur-md bg-white/10 dark:bg-black/10 border border-white/20 dark:border-white/10 [transform:rotateY(180deg)]">
            <div className="flex flex-col justify-between h-full">
              <div>
                <h4 className="text-lg font-semibold mb-2">{cert.name}</h4>
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-medium">Issuer:</span>
                    <span className="text-sm text-muted-foreground">{cert.issuer}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-medium">Date:</span>
                    <span className="text-sm text-muted-foreground">{cert.date}</span>
                  </div>
                 
                </div>
              </div>
              <div className="text-sm text-muted-foreground mt-auto">Click to flip back</div>
            </div>
          </div>
        </motion.div>
      </motion.div>
    )
  }

  // Animated section title
  const AnimatedSectionTitle = ({ title, icon }) => (
    <motion.div
      className="flex items-center gap-2 mb-8"
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="p-2 rounded-full bg-primary/10 text-primary">{icon}</div>
      <h3 className="text-2xl font-bold">{title}</h3>
    </motion.div>
  )

  return (
    <section id="achievements" className="py-20 relative overflow-hidden">
      {/* Show confetti effect when triggered */}
      {showConfetti && <ConfettiEffect originX={confettiPosition.x} originY={confettiPosition.y} />}

      {/* Animated background elements */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl animate-blob"></div>
        <div className="absolute top-3/4 right-1/4 w-96 h-96 bg-secondary/5 rounded-full blur-3xl animate-blob animation-delay-2000"></div>
        <div className="absolute bottom-1/4 right-1/3 w-96 h-96 bg-accent/5 rounded-full blur-3xl animate-blob animation-delay-4000"></div>
      </div>

      <div className="container mx-auto px-4">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
          <SectionHeading
            title="Achievements & Certifications"
            subtitle="A showcase of my accomplishments and certifications"
          />
        </motion.div>

        <div className="mt-12" ref={ref}>
          <AnimatedSectionTitle title="Key Achievements" icon={<TrophyIcon className="h-5 w-5" />} />

          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {achievements.map((achievement, index) => (
              <AchievementCard key={index} achievement={achievement} index={index} />
            ))}
          </motion.div>

          <div className="mt-16">
            <AnimatedSectionTitle title="Certifications" icon={<CertificateIcon className="h-5 w-5" />} />

            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate={isInView ? "visible" : "hidden"}
              className="grid grid-cols-1 md:grid-cols-2 gap-6"
            >
              {certifications.map((cert, index) => (
                <CertificationCard key={index} cert={cert} index={index} />
              ))}
            </motion.div>

            {/* Showcase button */}
            <motion.div
              className="mt-12 text-center"
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.5, delay: 0.8 }}
            >
              <Button
                className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600"
                size="lg"
                onClick={() => {
                  setConfettiPosition({ x: 0.5, y: 0.5 })
                  setShowConfetti(true)
                  setTimeout(() => setShowConfetti(false), 100)
                }}
              >
                <SparklesIcon className="mr-2 h-5 w-5" />
                View All Achievements
              </Button>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  )
}

