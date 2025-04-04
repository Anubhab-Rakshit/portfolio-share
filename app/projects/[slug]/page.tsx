"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { motion } from "framer-motion"
import { notFound } from "next/navigation"
import { ArrowLeftIcon, CalendarIcon, ExternalLinkIcon, GithubIcon, TagIcon } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import EnhancedParticlesBackground from "@/components/enhanced-particles-background"

// Project data
const projects = 
  [
    {
      id: 1,
      title: "AI NE BOLA",
      description:
        "AI Ne Bola is a comprehensive project that predicts the number of death cases, case fatality ratio (CFR), and other related metrics for various scenarios using machine learning models.",
      longDescription:
        "AI Ne Bola is a comprehensive project that predicts the number of death cases, case fatality ratio (CFR), and other related metrics for various scenarios using machine learning models. It leverages sophisticated algorithms to analyze health data patterns and provides accurate forecasting for epidemic scenarios. The platform features detailed 3D visualizations built with Three.js, allowing users to explore complex datasets through intuitive interfaces. The frontend is developed with Next.js and Tailwind CSS for a responsive and modern UI, while the backend utilizes Python for data processing and machine learning operations. The project combines data science, machine learning, and web development to create a powerful tool for understanding and visualizing complex health data.",
      image: "/Images/ai-ne-bola.png",
      tags: ["Next.js", "Three.js", "Tailwind CSS", "Python", "Machine Learning", "Data Visualization"],
      github: "https://github.com/Anubhab-Rakshit/ai-ne-bola",
      demo: "https://ai-ne-bola.netlify.app/",
      slug: "ai-ne-bola",
      category: "AI/ML",
      date: "February 2025",
      features: [
        "Predictive models for health metrics",
        "Interactive 3D visualizations",
        "User-friendly dashboard",
        "Data filtering and exploration tools",
        "Responsive design for all devices",
        "Real-time data updates",
        "Comparative analysis tools"
      ],
      screenshots: [
        { url: "/Images/ai-ne-bola-dashboard.png", caption: "Dashboard View" },
        { url: "/Images/ai-ne-bola-predictions.png", caption: "Prediction Interface" },
        { url: "/Images/ai-ne-bola-visualizations.png", caption: "3D Data Visualization" }
      ],
      technical: {
        frontend: ["Next.js", "Three.js", "Tailwind CSS", "React Three Fiber", "D3.js"],
        backend: ["Python", "Flask", "TensorFlow", "Scikit-learn", "Pandas"],
        deployment: ["Netlify", "Render", "Docker"]
      }
    },
    {
      id: 2,
      title: "VLABS",
      description:
        "Virtual Labs is an interactive platform designed to provide students with hands-on learning experiences in a virtual environment.",
      longDescription:
        "Virtual Labs is an interactive platform designed to provide students with hands-on learning experiences in a virtual environment. The platform is built with a modern UI, providing an intuitive and engaging interface for educational experiments. It includes features like a responsive design, a chatbot for student support powered by Gemini API, and integrations with Google Maps API for location-based services. The backend uses MongoDB for efficient data storage and Node.js for server-side operations. This revamp of vlab.co.in enhances the virtual laboratory experience with improved accessibility, real-time collaboration tools, and comprehensive progress tracking for both students and instructors.",
      image: "/Images/vlabs.jpeg",
      tags: ["React", "Next.js", "Tailwind CSS", "MongoDB", "Google Maps API", "Gemini API", "Node.js"],
      github: "https://github.com/Kausheya2006/vlab_frontend",
      demo: "https://ai-ne-bola.netlify.app/",
      slug: "vlabs",
      category: "Web Development",
      date: "March 2025",
      features: [
        "Interactive virtual experiments",
        "Real-time collaboration",
        "Progress tracking",
        "Instructor dashboard",
        "Mobile-responsive design",
        "AI-powered chatbot assistance",
        "Location-based services",
        "Institution Details"
      ],
      screenshots: [
        { url: "/Images/vlabs-labs.png", caption: "Labs Page" },
        { url: "/Images/vlabs-cs.png", caption: "Computer Science Lab" },
        { url: "/Images/vlabs-about.png", caption: "About Us Page" },
        { url: "/Images/vlabs-chatbot.png", caption: "VLABS AI Chatbot" }
      ],
      technical: {
        frontend: ["React", "Next.js", "Tailwind CSS", "Framer Motion", "Leaflet"],
        backend: ["Node.js", "Express", "MongoDB", "Mongoose", "Socket.io"],
        apis: ["Google Maps API", "Gemini API", "Auth0"],
        deployment: ["Vercel", "MongoDB Atlas", "Docker"]
      }
    },
    {
      id: 3,
      title: "IRCTC CLONE",
      description:
        "A modern, responsive clone of the official IRCTC website with core functionality and improved user interface.",
      longDescription:
        "This project is a modern, responsive clone of the official IRCTC (Indian Railway Catering and Tourism Corporation) website. It aims to replicate the core functionality and user interface of the original platform while implementing modern web development practices and technologies for a better user experience. The application features a streamlined booking process, real-time train tracking, seat availability information, and secure payment integration. Built with Next.js and styled with Tailwind CSS, the platform offers an optimized experience across all devices with significantly improved page load times compared to the original site.",
      image: "/Images/irctc.jpeg",
      tags: ["React", "Next.js", "Tailwind CSS", "Vercel"],
      github: "https://github.com/Anubhab-Rakshit/irctc-new",
      demo: "https://irctc-new.vercel.app",
      slug: "IRCTC",
      category: "Web Development",
      date: "March 2025",
      features: [
        "Train search and booking",
        "User authentication",
        "Seat selection",
        "Payment integration",
        "Booking history",
        "PNR Status",
        "Real-time train tracking",
        "Responsive design",
        "Hotel Booking",
        "Travel Packages",
        "Stays/Executive Lounge Booking",
        "Buses/Flights booking",
        "DISHA AI Chatbot",
        "User Dashboard",
      ],
      screenshots: [
        { url: "/Images/irctc-train-list.png", caption: "Train Listing Interface" },
        { url: "/Images/irctc-train-track.png", caption: "Train Track Interface" },
        { url: "/Images/irctc-pnr-status.png", caption: "PNR Status Interface" },
        { url: "/Images/irctc-flight-booking.png", caption: "Flight Booking Interface" },
        { url: "/Images/irctc-tour.png", caption: "Tour Packages Page" },
        { url: "/Images/irctc-rooms.png", caption: "Waiting Rooms Booking Interface" },
        { url: "/Images/irctc-payment.png", caption: "Payment Gateway" },
        { url: "/Images/irctc-user-dashboard.png", caption: "User Dashboard" }
      ],
      technical: {
        frontend: ["React", "Next.js", "Tailwind CSS", "Redux", "React Query"],
        backend: ["Next.js API Routes", "Serverless Functions"],
        authentication: ["NextAuth.js", "JWT"],
        deployment: ["Vercel"]
      }
    },
    {
      id: 4,
      title: "Civilized Chaos",
      description:
        "A web application designed to streamline issue reporting, authority management, and provide real-time insights with interactive graphs.",
      longDescription:
        "CIVILIZED CHAOS is a web application designed to streamline issue reporting, authority management, and provide real-time insights with interactive graphs. This project offers a seamless way for citizens to report issues in their communities, track resolution progress, and access visual data analytics in a structured and responsive layout. The application implements a MongoDB database for efficient data storage, Chart.js for interactive data visualization, and Multer for file uploads allowing users to attach images with their reports. The platform serves as a bridge between citizens and authorities, promoting transparency and efficiency in addressing community issues.",
      image: "/Images/civilized-chaos.png",
      tags: ["HTML", "CSS", "JavaScript", "Node.js", "MongoDB", "Chart.js", "Multer"],
      github: "https://github.com/Anubhab-Rakshit/syntaxerror-hacknovare",
      demo: "https://civilizedchaos.netlify.app/",
      slug: "civilized-chaos",
      category: "Web Development",
      date: "January 2025",
      features: [
        "Issue reporting system",
        "Authority management",
        "Real-time data visualization",
        "User authentication",
        "Mobile-responsive interface",
        "Image upload capability",
        "Status tracking",
        "Gamified Score for Authorities",
        "Government dummy dashboard"
      ],
      screenshots: [
        { url: "/Images/civilizedchaos-government-dashboard.png", caption: "Government Dashboard for modifying Authorities" },
        { url: "/Images/civilizedchaos-report-submission.png", caption: "Issue Reporting Interface" },
        { url: "/Images/civilizedchaos-graphs.png", caption: "Data Analytics Dashboard" },
        { url: "/Images/civilizedchaos-trending-reports.png", caption: "Trending Reports Interface" },
      ],
      technical: {
        frontend: ["HTML5", "CSS3", "JavaScript", "Chart.js", "Bootstrap"],
        backend: ["Node.js", "Express", "MongoDB", "Mongoose", "Multer"],
        authentication: ["JWT", "Bcrypt"],
        deployment: ["Netlify", "Render"]
      }
    },
    {
      id: 5,
      title: "Happy Birthday Wisher",
      description: "A creative web application that allows users to send personalized birthday wishes in an interactive format.",
      longDescription:
        "Happy Birthday Wisher is a delightful web application that enables users to create and send personalized birthday greetings to their loved ones. The application features customizable templates, animations, and interactive elements that make each birthday wish special. Users can select from various themes, add personal messages, upload photos, and even include background music to create a memorable birthday experience. The simple yet effective design makes it accessible to users of all technical abilities while still providing a premium birthday greeting experience.",
      image: "/Images/hbdwisher.png",
      tags: ["HTML", "CSS", "JavaScript", "Web Animations API"],
      github: "https://github.com/Anubhab-Rakshit/hbdwisher",
      demo: "https://hbdwisher.netlify.app/",
      slug: "hbdwisher",
      category: "Web Development",
      date: "August 2024",
      features: [
        "Customizable greeting templates",
        "Interactive animations",
        "Personal message options",
        "Voice detecting cards",
        "Shareable greeting links",
        "Mobile-friendly design"
      ],
      screenshots: [
        { url: "/Images/hbdwisher-form.png", caption: "Home Interface" },
        { url: "/Images/hbdwisher-getlink.png", caption: "Get Link Interface" },
        { url: "/Images/hbdwisher-backcard.png", caption: "Card Display Interface" },
        { url: "/Images/hbdwisher-opencard.png", caption: "Card Revealed Interface" },
      ],
      technical: {
        frontend: ["HTML5", "CSS3", "JavaScript", "Web Animations API", "Local Storage API","Speech Synthesis API"],
        media: ["HTML5 Audio", "CSS Animations"],
        deployment: ["Netlify"]
      }
    },
    {
      id: 6,
      title: "TUNE IN",
      description:
        "An innovative application that enhances your music listening experience by analyzing your current mood and suggesting songs that align with your emotions.",
      longDescription:
        "TUNE IN is an innovative application that enhances your music listening experience by analyzing your current mood and suggesting songs that align with your emotions. Whether you're feeling joyful, melancholic, energetic, or relaxed, our recommender system curates a playlist that resonates with your feelings. The application uses the Google Cloud Vision API to analyze facial expressions from user photos, TensorFlow.js for mood classification, and the Spotify API to generate personalized playlists. The modern interface, built with React and Tailwind CSS, provides a seamless user experience across devices, making music discovery an intuitive and emotionally connected process.",
      image: "/Images/tune-in.png",
      tags: ["React", "Tailwind CSS", "Google Cloud Vision API", "Spotify API", "Node.js", "TensorFlow.js"],
      github: "https://github.com/Anubhab-Rakshit/tune-in",
      demo: "https://tune-in-u255.vercel.app/",
      slug: "tune-in",
      category: "AI/ML",
      date: "March 2025",
      features: [
        "Mood detection from photos",
        "Personalized music recommendations",
        "Spotify integration",
        "Playlist creation",
        "Mood history tracking",
      ],
      screenshots: [
        { url: "/Images/tunein-person.jpeg", caption: "Mood Detection Interface" },
        { url: "/Images/tunein-mood.jpeg", caption: "Playlist Recommendations" },
  
      ],
      technical: {
        frontend: ["React", "Tailwind CSS", "Context API", "Framer Motion"],
        backend: ["Node.js", "Express", "Firebase"],
        ai: ["TensorFlow.js", "Google Cloud Vision API"],
        apis: ["Spotify Web API", "OAuth 2.0"],
        deployment: ["Vercel", "Heroku"]
      }
    },
    {
      id: 7,
      title: "TIC TAC TOE",
      description: "A classic game of Tic Tac Toe with modern design and multiplayer capabilities.",
      longDescription:
        "This Tic Tac Toe game brings the classic paper-and-pencil experience to digital platforms with an elegant, intuitive interface. The game features both single-player mode with adjustable AI difficulty and multiplayer functionality for playing with friends. The clean, responsive design ensures a seamless gaming experience across all devices. Built with vanilla JavaScript, HTML5, and CSS3, the game demonstrates fundamental programming concepts like state management, event handling, and game logic implementation. Additional features include game statistics tracking, customizable player icons, and sound effects to enhance the gaming experience.",
      image: "/Images/tictactoe.png",
      tags: ["HTML", "CSS", "JavaScript", "Game Development"],
      github: "https://github.com/Anubhab-Rakshit/tictactoe",
      demo: "https://playytictactoe.netlify.app/",
      slug: "tictactoe",
      category: "Web Development",
      date: "November 2024",
      features: [
        "Single-player vs AI mode",
        "Local multiplayer functionality",
        "Game statistics tracking",
        "Responsive design",
        "Customizable player icons",
  
      ],
      screenshots: [
        { url: "/Images/tictactoe-opening.png", caption: "Opening Page" },
        { url: "/Images/tictactoe-pvp.png", caption: "Player vs Player" },
        { url: "/Images/tictactoe-pvc.png", caption: "Player vs Computer" }
      ],
      technical: {
        frontend: ["HTML5", "CSS3", "JavaScript", "LocalStorage API"],
        algorithms: ["Minimax Algorithm (for AI opponent)"],
        deployment: ["Netlify"]
      }
    },
    {
      id: 8,
      title: "Electronic Configuration Calculator",
      description: "A specialized tool that calculates and visualizes the electronic configuration of any element in the periodic table.",
      longDescription:
        "The Electronic Configuration Calculator is a specialized web tool that provides accurate electronic configurations for any element in the periodic table. Beyond basic configuration, it offers visual representations of electron distribution across different energy levels and orbitals. The application includes detailed explanations of quantum numbers, orbital diagrams, and periodic trends, making it an excellent educational resource for chemistry students and enthusiasts. The calculator implements complex quantum mechanical principles while maintaining a user-friendly interface that's accessible to users at various levels of chemistry knowledge.",
      image: "/Images/electronicconfig.png",
      tags: ["HTML", "CSS", "JavaScript", "Chemistry", "Educational Tool"],
      github: "https://github.com/Anubhab-Rakshit/electronic-config",
      demo: "https://electronic-config.netlify.app/",
      slug: "electronicconfig",
      category: "Web Development",
      date: "October 2022",
      features: [
        "Electronic configuration calculation",
      
        "Quantum number explanation",
        
        "Educational content integration",
        "Print-friendly results"
      ],
      screenshots: [
        { url: "/Images/electronic-calculator.png", caption: "Configuration Calculator" },
        { url: "/Images/electronic-exception.png", caption: "Takes Care of Exceptions" },
      
      ],
      technical: {
        frontend: ["HTML5", "CSS3", "JavaScript", "SVG"],
        algorithms: ["Electronic configuration algorithms", "Orbital filling rules"],
        data: ["Periodic table database", "Electron property constants"],
        deployment: ["Netlify"]
      }
    },
    {
      id: 9,
      title: "GGCC (Goutam Ghosh & Company Constructions)",
      description: "A professional website for a construction company showcasing their services, projects, and expertise.",
      longDescription:
        "GGCC is a professional website developed for Goutam Ghosh & Company Constructions, a client in the construction industry. The site serves as a comprehensive digital presence for the company, showcasing their portfolio of completed projects, available services, and industry expertise. The website features an elegant design with intuitive navigation, project galleries with detailed case studies, and contact forms for client inquiries. The responsive design ensures optimal viewing across devices, while strategic content placement highlights the company's unique selling propositions and quality craftsmanship.",
      image: "/Images/ggcc.png",
      tags: ["HTML", "CSS", "JavaScript", "Client Project", "Construction"],
      github: "https://github.com/Anubhab-Rakshit/ggcc",
      demo: "https://ggcconstruction.netlify.app/",
      slug: "ggcc",
      category: "Web Development",
      date: "December 2024",
      features: [
        "Project portfolio gallery",
        "Service descriptions",
        "Client testimonials",
        "Company history timeline",
        "Contact form integration",
        "Location map",
        "Request for quote functionality"
      ],
      screenshots: [
        { url: "/Images/ggcc-portfolio.png", caption: "Project Portfolio" },
        { url: "/Images/ggcc-choose.png", caption: "Why Choose GGCC ?" },
        { url: "/Images/ggcc-contact.png", caption: "Contact Page" },
        { url: "/Images/ggcc-about.png", caption: "About GGCC" },
      ],
      technical: {
        frontend: ["HTML5", "CSS3", "JavaScript", "jQuery", "Lightbox Gallery"],
        integrations: [ "Contact Form Handler"],
        optimization: ["Image optimization", "SEO implementation"],
        deployment: ["Netlify", "Custom domain integration"]
      }
    },
  ]

export default function ProjectDetailPage({ params }) {
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true)
  }, [])

  const project = projects.find((p) => p.slug === params.slug)

  if (!project && isMounted) {
    notFound()
  }

  if (!isMounted) {
    return null
  }

  // Get related projects (same category, excluding current project)
  const relatedProjects = projects.filter((p) => p.category === project.category && p.id !== project.id).slice(0, 3)

  return (
    <div className="min-h-screen py-16 relative">
      {/* Enhanced background with particles and mouse effects */}
      <div className="fixed inset-0" style={{ zIndex: -10 }}>
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/5 via-purple-500/5 to-pink-500/5" />
        <EnhancedParticlesBackground />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
          <Link
            href="/projects"
            className="inline-flex items-center text-muted-foreground hover:text-foreground mb-8 transition-colors"
          >
            <ArrowLeftIcon className="mr-2 h-4 w-4" />
            Back to Projects
          </Link>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <motion.div
            className="lg:col-span-2"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <div className="mb-8">
              <div className="flex flex-wrap gap-2 mb-4">
                <Badge className="bg-primary/20 text-primary">{project.category}</Badge>
                <div className="flex items-center text-muted-foreground">
                  <CalendarIcon className="mr-1 h-4 w-4" />
                  <span>{project.date}</span>
                </div>
              </div>

              <h1 className="text-4xl md:text-5xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500">
                {project.title}
              </h1>

              <div className="relative w-full h-[400px] mb-8 rounded-lg overflow-hidden shadow-xl">
                <Image
                  src={project.image || "/placeholder.svg"}
                  alt={project.title}
                  fill
                  className="object-cover"
                  priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background/40 to-transparent"></div>
              </div>

              <div className="prose prose-lg dark:prose-invert max-w-none mb-12 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm p-8 rounded-lg shadow-lg">
                <h2 className="text-2xl font-bold mb-4">Project Overview</h2>
                <p>{project.longDescription}</p>

                <h2 className="text-2xl font-bold mt-8 mb-4">Key Features</h2>
                <ul className="space-y-2">
                  {project.features.map((feature, index) => (
                    <li key={index} className="flex items-start">
                      <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-indigo-500/20 text-indigo-500 mr-3 mt-0.5">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="16"
                          height="16"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <polyline points="20 6 9 17 4 12"></polyline>
                        </svg>
                      </span>
                      {feature}
                    </li>
                  ))}
                </ul>

                <h2 className="text-2xl font-bold mt-8 mb-4">Technologies Used</h2>
                <div className="flex flex-wrap gap-2 my-4">
                  {project.tags.map((tag) => (
                    <Badge key={tag} variant="outline" className="bg-primary/10 hover:bg-primary/20 transition-colors">
                      {tag}
                    </Badge>
                  ))}
                </div>

                <h2 className="text-2xl font-bold mt-8 mb-4">Screenshots</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
                  {project.screenshots.map((screenshot, index) => (
                    <div key={index} className="space-y-2">
                      <div className="relative aspect-video rounded-lg overflow-hidden border border-gray-200 dark:border-gray-800 shadow-md hover:shadow-xl transition-shadow">
                        <Image
                          src={screenshot.url || "/placeholder.svg"}
                          alt={screenshot.caption}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <p className="text-center text-sm font-medium">{screenshot.caption}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div
            className="lg:col-span-1"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <div className="sticky top-24 space-y-8">
              <Card className="overflow-hidden bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border border-white/20 dark:border-white/10 shadow-lg">
                <CardContent className="p-6">
                  <h3 className="text-xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-indigo-500 to-purple-500">
                    Project Details
                  </h3>

                  <div className="space-y-4">
                    <div className="flex items-center gap-2">
                      <CalendarIcon className="h-5 w-5 text-indigo-400" />
                      <span>Completed: {project.date}</span>
                    </div>

                    <div className="flex items-center gap-2">
                      <TagIcon className="h-5 w-5 text-pink-400" />
                      <span>Category: {project.category}</span>
                    </div>

                    <div className="border-t border-gray-200 dark:border-gray-700 my-4"></div>

                    <div className="flex flex-col gap-4">
                      <Button
                        asChild
                        className="w-full bg-gradient-to-r from-indigo-500 to-purple-500 hover:from-indigo-600 hover:to-purple-600"
                      >
                        <a href={project.demo} target="_blank" rel="noopener noreferrer">
                          <ExternalLinkIcon className="mr-2 h-4 w-4" />
                          Live Demo
                        </a>
                      </Button>

                      <Button
                        variant="outline"
                        asChild
                        className="w-full border-indigo-200 dark:border-indigo-800 hover:bg-indigo-100 dark:hover:bg-indigo-900/30"
                      >
                        <a href={project.github} target="_blank" rel="noopener noreferrer">
                          <GithubIcon className="mr-2 h-4 w-4" />
                          View Code
                        </a>
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="overflow-hidden bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border border-white/20 dark:border-white/10 shadow-lg">
                <CardContent className="p-6">
                  <h3 className="text-xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-indigo-500 to-purple-500">
                    Technologies
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {project.tags.map((tag) => (
                      <Badge
                        key={tag}
                        variant="secondary"
                        className="bg-indigo-500/10 text-indigo-500 dark:bg-indigo-500/20 dark:text-indigo-300"
                      >
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </motion.div>
        </div>

        {relatedProjects.length > 0 && (
          <motion.div
            className="mt-16"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <h2 className="text-2xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-indigo-500 to-purple-500">
              Related Projects
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {relatedProjects.map((relatedProject) => (
                <Link href={`/projects/${relatedProject.slug}`} key={relatedProject.id}>
                  <Card className="h-full hover:shadow-xl transition-shadow bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border border-white/20 dark:border-white/10">
                    <div className="relative w-full h-40">
                      <Image
                        src={relatedProject.image || "/placeholder.svg"}
                        alt={relatedProject.title}
                        fill
                        className="object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-background/60 to-transparent"></div>
                      <div className="absolute top-3 left-3">
                        <Badge className="bg-white/80 dark:bg-black/50 backdrop-blur-sm text-black dark:text-white">
                          {relatedProject.category}
                        </Badge>
                      </div>
                    </div>
                    <CardContent className="p-4">
                      <h3 className="font-bold mb-2 line-clamp-2 hover:text-indigo-400 transition-colors">
                        {relatedProject.title}
                      </h3>
                      <p className="text-sm text-muted-foreground line-clamp-2">{relatedProject.description}</p>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          </motion.div>
        )}
      </div>
    </div>
  )
}

