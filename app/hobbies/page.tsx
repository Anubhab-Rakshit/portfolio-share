"use client"

import { useState, useRef, useEffect } from "react"
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion"
import { Button } from "@/components/ui/button"
import { ArrowLeftIcon, PlayIcon, MusicIcon, HeartIcon, ShareIcon } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import EnhancedParticlesBackground from "@/components/enhanced-particles-background"

// Piano video data
const pianoVideos = [
  {
    id: "video1",
    title: "Aashiqui 2 Love Theme",
    thumbnail: "/Images/aashiqui 2 love theme cover piano.jpg",
    videoUrl: "https://www.youtube.com/embed/2RIkfYY-SCU?si=-Ni9Q6xaQqWV9IL8",
    description: "Aashiqui 2 Love theme - Aashiqui 2 (2013) | Mithoon | Played by Anubhab",
    date: "July, 2024",
    difficulty: "Intermediate",
    likes: 45,
    duration: "1:26",
  },
  {
    id: "video2",
    title: "Mai Phir Bhi Tumko Chahunga - Half Girlfriend(2017)",
    thumbnail: "/Images/mai phir bhi tumko chahunga piano.jpg",
    videoUrl: "https://www.youtube.com/embed/ttWMb0E4OYk?si=CiYnd7nqHaEHZ6rD",
    description: "Mai Phir Bhi Tumko Chahunga - Half Girlfriend(2017)| Piano| Played by Anubhab",
    date: "August, 2024",
    difficulty: "Intermediate",
    likes: 30,
    duration: "3:16",
  },
  {
    id: "video3",
    title: "Tum Hi Ho - Aashiqui 2 (2013)",
    thumbnail: "/Images/tum hi ho piano.jpg",
    videoUrl: "https://www.youtube.com/embed/SXe_4qXHhQ4?si=iBwIFOpEXKFPcGGb",
    description: "Tum Hi Ho - Aashiqui 2 (2013) | Piano | Played by Anubhab",
    date: "October, 2024",
    difficulty: "Intermediate",
    likes: 32,
    duration: "2:42",
  },
  {
    id: "video4",
    title: "Bojhena Shey Bojhena - Bojhena Shey Bojhena (2012)",
    thumbnail: "/Images/bojhena se bojhena piano.jpg",
    videoUrl: "https://www.youtube.com/embed/Zz15eMNhW1w?si=hJTJtBdQ7qof3zkh",
    description: "Bojhena Shey Bojhena - Bojhena Shey Bojhena (2012) | Piano | By Anubhab",
    date: "October, 2024",
    difficulty: "Intermediate",
    likes: 24,
    duration: "2:36",
  },
  {
    id: "video5",
    title: "Tujh Mein Rab Dikhta Hai - Rab ne Bana Di Jodi",
    thumbnail: "/Images/tujh mein rab dikhta hai piano.jpg",
    videoUrl: "https://www.youtube.com/embed/tFvquaAeWKc?si=kxn57qhk-awb5ohL",
    description: "Tujh Mein Rab Dikhta Hai - Rab ne Bana Di Jodi | Piano Cover by Anubhab",
    date: "June, 2024",
    difficulty: "Intermediate",
    likes: 40,
    duration: "1:06",
  },
]

// Piano note frequencies (in Hz)
const noteFrequencies = {
  C: 261.63,
  "C#": 277.18,
  D: 293.66,
  "D#": 311.13,
  E: 329.63,
  F: 349.23,
  "F#": 369.99,
  G: 392.0,
  "G#": 415.3,
  A: 440.0,
  "A#": 466.16,
  B: 493.88,
  C2: 523.25,
}

// Audio context for generating piano sounds
let audioContext: AudioContext | null = null

// Function to play a note using Web Audio API
const playPianoNote = (note: string) => {
  try {
    if (typeof window === "undefined") return

    // Initialize audio context if it doesn't exist
    if (!audioContext) {
      audioContext = new (window.AudioContext || (window as any).webkitAudioContext)()
    }

    // Create oscillator
    const oscillator = audioContext.createOscillator()
    const gainNode = audioContext.createGain()

    // Set frequency based on note
    oscillator.frequency.value = noteFrequencies[note] || 440

    // Use a piano-like waveform (sine is closest to a pure tone)
    oscillator.type = "sine"

    // Connect oscillator to gain node and gain node to audio context destination
    oscillator.connect(gainNode)
    gainNode.connect(audioContext.destination)

    // Set initial volume
    gainNode.gain.value = 0.5

    // Start oscillator
    oscillator.start()

    // Create a piano-like envelope (attack, decay, sustain, release)
    gainNode.gain.setValueAtTime(0, audioContext.currentTime)
    gainNode.gain.linearRampToValueAtTime(0.5, audioContext.currentTime + 0.01) // Quick attack
    gainNode.gain.exponentialRampToValueAtTime(0.1, audioContext.currentTime + 0.5) // Decay to sustain
    gainNode.gain.exponentialRampToValueAtTime(0.001, audioContext.currentTime + 2) // Release

    // Stop oscillator after release
    oscillator.stop(audioContext.currentTime + 2)
  } catch (error) {
    console.error("Error playing piano note:", error)
  }
}

// Piano key component for the interactive keyboard
function PianoKey({ note, color = "white", onClick }) {
  const playSound = () => {
    playPianoNote(note)
    onClick(note)
  }

  return (
    <motion.div
      className={`cursor-pointer relative ${
        color === "white"
          ? "bg-gradient-to-b from-white to-gray-100 border border-gray-300 rounded-b-md h-36 w-14 z-0 shadow-md"
          : "bg-gradient-to-b from-gray-900 to-black h-24 w-10 z-10 -mx-5 shadow-lg"
      }`}
      whileHover={{
        y: -5,
        backgroundColor: color === "white" ? "#f8f8f8" : "#1a1a1a",
        boxShadow:
          color === "white"
            ? "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)"
            : "0 10px 15px -3px rgba(0, 0, 0, 0.2), 0 4px 6px -2px rgba(0, 0, 0, 0.1)",
      }}
      whileTap={{
        y: 0,
        backgroundColor: color === "white" ? "#e0e0e0" : "#000000",
        boxShadow: "none",
      }}
      onClick={playSound}
    >
      {color === "white" && (
        <div className="absolute bottom-4 left-0 right-0 text-center text-xs text-gray-500 font-medium">{note}</div>
      )}
      {color === "black" && (
        <div className="absolute bottom-2 left-0 right-0 text-center text-xs text-gray-400 font-medium">{note}</div>
      )}
    </motion.div>
  )
}

// Interactive piano keyboard
function PianoKeyboard() {
  const [lastPlayedNote, setLastPlayedNote] = useState(null)
  const [audioInitialized, setAudioInitialized] = useState(false)

  // Initialize audio context on first user interaction
  const initializeAudio = () => {
    if (!audioInitialized && typeof window !== "undefined") {
      try {
        audioContext = new (window.AudioContext || (window as any).webkitAudioContext)()
        setAudioInitialized(true)
      } catch (error) {
        console.error("Error initializing audio context:", error)
      }
    }
  }

  const playNote = (note) => {
    setLastPlayedNote(note)
    // Sound is played in the playPianoNote function
  }

  return (
    <div className="relative" onClick={initializeAudio}>
      <div className="flex justify-center items-end mb-12 mt-8 relative">
        {/* Piano body */}
        <div className="absolute -top-10 -left-8 -right-8 h-16 bg-gradient-to-r from-gray-900 via-black to-gray-900 rounded-t-lg shadow-xl z-0"></div>

        {/* Piano keys container with perspective */}
        <div className="relative z-10 flex justify-center items-end perspective-800 transform-style-3d">
          <PianoKey note="C" onClick={playNote} />
          <PianoKey note="C#" color="black" onClick={playNote} />
          <PianoKey note="D" onClick={playNote} />
          <PianoKey note="D#" color="black" onClick={playNote} />
          <PianoKey note="E" onClick={playNote} />
          <PianoKey note="F" onClick={playNote} />
          <PianoKey note="F#" color="black" onClick={playNote} />
          <PianoKey note="G" onClick={playNote} />
          <PianoKey note="G#" color="black" onClick={playNote} />
          <PianoKey note="A" onClick={playNote} />
          <PianoKey note="A#" color="black" onClick={playNote} />
          <PianoKey note="B" onClick={playNote} />
          <PianoKey note="C2" onClick={playNote} />
        </div>
      </div>

      {/* Last played note indicator */}
      {lastPlayedNote && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0 }}
          className="text-center text-primary font-medium mb-4"
        >
          Last played: {lastPlayedNote}
        </motion.div>
      )}

      {/* Audio initialization message */}
      {!audioInitialized && (
        <div className="text-center text-sm text-muted-foreground mb-4">
          Click anywhere on the piano to enable sounds
        </div>
      )}
    </div>
  )
}

// Animated music notes that float around
function FloatingMusicNotes() {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden z-10">
      {[...Array(20)].map((_, i) => {
        const size = Math.random() * 20 + 10
        const startX = Math.random() * 100
        const startY = Math.random() * 100 + 100
        const duration = Math.random() * 10 + 10
        const delay = Math.random() * 15

        return (
          <motion.div
            key={i}
            className="absolute text-primary/20 dark:text-primary/10"
            style={{
              fontSize: size,
              left: `${startX}%`,
              top: `${startY}%`,
            }}
            animate={{
              y: -500,
              x: Math.sin(i) * 100,
              rotate: Math.random() * 360,
              opacity: [0, 1, 0],
            }}
            transition={{
              duration,
              delay,
              repeat: Number.POSITIVE_INFINITY,
              ease: "linear",
            }}
          >
            {i % 2 === 0 ? "♪" : "♫"}
          </motion.div>
        )
      })}
    </div>
  )
}

// Video card with fun hover effects
function VideoCard({ video, index, onClick }) {
  const cardRef = useRef(null)
  const { scrollYProgress } = useScroll({
    target: cardRef,
    offset: ["start end", "end start"],
  })

  const y = useTransform(scrollYProgress, [0, 1], [100, -100])
  const rotate = useTransform(scrollYProgress, [0, 1], [10, -10])

  // Random rotation for initial position
  const randomRotation = useRef(Math.random() * 10 - 5)

  return (
    <motion.div
      ref={cardRef}
      className="group relative"
      initial={{ opacity: 0, y: 50, rotate: randomRotation.current }}
      whileInView={{ opacity: 1, y: 0, rotate: 0 }}
      transition={{
        duration: 0.5,
        delay: index * 0.1,
        type: "spring",
        stiffness: 100,
        damping: 15,
      }}
      viewport={{ once: true, margin: "-100px" }}
      whileHover={{
        scale: 1.05,
        rotate: 0,
        zIndex: 10,
      }}
      onClick={() => onClick(video)}
    >
      <div className="bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-xl">
        {/* Thumbnail */}
        <div className="relative aspect-video overflow-hidden">
          <Image
            src={video.thumbnail || "/placeholder.svg"}
            alt={video.title}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-110"
          />

          {/* Play button overlay */}
          <div className="absolute inset-0 flex items-center justify-center bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity">
            <motion.div
              className="bg-white dark:bg-gray-800 rounded-full p-3"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <PlayIcon className="h-8 w-8 text-primary" />
            </motion.div>
          </div>

          {/* Duration badge */}
          <div className="absolute bottom-2 right-2 bg-black/70 text-white text-xs px-2 py-1 rounded">
            {video.duration}
          </div>
        </div>

        {/* Content */}
        <div className="p-4">
          <h3 className="text-xl font-bold mb-1 group-hover:text-primary transition-colors">{video.title}</h3>

          <p className="text-muted-foreground text-sm mb-3">{video.description}</p>

          <div className="flex justify-between items-center">
            <span className="text-xs text-muted-foreground">{video.date}</span>

            <div className="flex items-center gap-2">
              <span className="inline-flex items-center text-xs bg-primary/10 text-primary px-2 py-1 rounded-full">
                <MusicIcon className="h-3 w-3 mr-1" />
                {video.difficulty}
              </span>

              <span className="inline-flex items-center text-xs text-rose-500">
                <HeartIcon className="h-3 w-3 mr-1" />
                {video.likes}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Decorative music notes */}
      <motion.div
        className="absolute -top-4 -right-2 text-primary text-2xl opacity-0 group-hover:opacity-100 transition-opacity"
        animate={{ y: [0, -10, 0], rotate: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
      >
        ♪
      </motion.div>

      <motion.div
        className="absolute -bottom-2 -left-4 text-primary text-3xl opacity-0 group-hover:opacity-100 transition-opacity"
        animate={{ y: [0, -15, 0], rotate: [0, -10, 0] }}
        transition={{ duration: 2.5, repeat: Number.POSITIVE_INFINITY, delay: 0.5 }}
      >
        ♫
      </motion.div>
    </motion.div>
  )
}

// Video player modal
function VideoModal({ video, isOpen, onClose }) {
  // Close on escape key
  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === "Escape") onClose()
    }
    window.addEventListener("keydown", handleEsc)
    return () => window.removeEventListener("keydown", handleEsc)
  }, [onClose])

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        >
          <motion.div
            className="relative bg-white dark:bg-gray-800 rounded-xl overflow-hidden max-w-4xl w-full"
            initial={{ scale: 0.9, y: 20 }}
            animate={{ scale: 1, y: 0 }}
            exit={{ scale: 0.9, y: 20 }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative aspect-video">
              <iframe
                src={video.videoUrl}
                title={video.title}
                className="absolute inset-0 w-full h-full"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </div>

            <div className="p-6">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h2 className="text-2xl font-bold mb-2">{video.title}</h2>
                  <p className="text-muted-foreground">{video.description}</p>
                </div>

                <Button variant="ghost" size="icon" onClick={onClose}>
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
                    <path d="M18 6 6 18"></path>
                    <path d="m6 6 12 12"></path>
                  </svg>
                </Button>
              </div>

              <div className="flex justify-between items-center">
                <div className="flex items-center gap-4">
                  <span className="text-sm text-muted-foreground">{video.date}</span>
                  <span className="text-sm text-muted-foreground">{video.duration}</span>
                  <span className="text-sm text-muted-foreground">{video.difficulty}</span>
                </div>

                <div className="flex gap-2">
                  <Button variant="outline" size="sm">
                    <HeartIcon className="h-4 w-4 mr-2 text-rose-500" />
                    Like
                  </Button>
                  <Button variant="outline" size="sm">
                    <ShareIcon className="h-4 w-4 mr-2" />
                    Share
                  </Button>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

export default function HobbiesPage() {
  const [selectedVideo, setSelectedVideo] = useState(null)
  const [isModalOpen, setIsModalOpen] = useState(false)

  const openVideoModal = (video) => {
    setSelectedVideo(video)
    setIsModalOpen(true)
  }

  return (
    <main className="min-h-screen py-24 overflow-hidden relative">
      {/* Background elements */}
      <div className="absolute inset-0 z-0">
        <EnhancedParticlesBackground />
      </div>

      <FloatingMusicNotes />

      <div className="container mx-auto px-4 relative z-10">
        <div className="mb-12">
          <Link
            href="/"
            className="inline-flex items-center text-muted-foreground hover:text-foreground transition-colors"
          >
            <ArrowLeftIcon className="mr-2 h-4 w-4" />
            Back to Home
          </Link>

          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mt-6 mb-8 text-center"
          >
            <h1 className="text-5xl md:text-7xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500">
              Piano Playground
            </h1>
            <p className="text-xl text-muted-foreground mt-4 max-w-2xl mx-auto">
              Welcome to my musical corner! Here I share my piano journey, from classical pieces to modern compositions.
              Click on any video to watch and listen, or play the interactive piano below.
            </p>
          </motion.div>

          {/* Interactive piano keyboard */}
          <PianoKeyboard />
        </div>

        {/* Featured video */}
        <motion.div
          className="mb-16"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <h2 className="text-2xl font-bold mb-6 flex items-center">
            <MusicIcon className="mr-2 h-5 w-5 text-primary" />
            Featured Performance
          </h2>

          <div
            className="relative aspect-video rounded-xl overflow-hidden cursor-pointer shadow-2xl"
            onClick={() => openVideoModal(pianoVideos[0])}
          >
            <Image
              src={pianoVideos[0].thumbnail || "/placeholder.svg"}
              alt={pianoVideos[0].title}
              fill
              className="object-cover"
            />

            <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent flex flex-col justify-end p-6">
              <h3 className="text-2xl font-bold text-white mb-2">{pianoVideos[0].title}</h3>
              <p className="text-white/80 mb-4">{pianoVideos[0].description}</p>

              <Button className="w-fit bg-white text-black hover:bg-white/90">
                <PlayIcon className="mr-2 h-4 w-4" />
                Watch Now
              </Button>
            </div>
          </div>
        </motion.div>

        {/* Video grid */}
        <div>
          <h2 className="text-2xl font-bold mb-6 flex items-center">
            <MusicIcon className="mr-2 h-5 w-5 text-primary" />
            All Performances
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {pianoVideos.map((video, index) => (
              <VideoCard key={video.id} video={video} index={index} onClick={openVideoModal} />
            ))}
          </div>
        </div>

        {/* Quote */}
        <motion.div
          className="mt-24 text-center max-w-2xl mx-auto"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 1 }}
          viewport={{ once: true }}
        >
          <p className="text-2xl italic text-muted-foreground">
            "Music is the language of the spirit. It opens the secret of life bringing peace, abolishing strife."
          </p>
          <p className="mt-2 font-medium">— Kahlil Gibran</p>
        </motion.div>
      </div>

      {/* Video modal */}
      {selectedVideo && <VideoModal video={selectedVideo} isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />}
    </main>
  )
}

