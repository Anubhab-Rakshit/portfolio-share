"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { motion, AnimatePresence } from "framer-motion"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { CalendarIcon, ClockIcon, SearchIcon } from "lucide-react"
import { Input } from "@/components/ui/input"
import EnhancedParticlesBackground from "@/components/enhanced-particles-background"
import ParticlesBg from "@/components/particles-background"
// Simple blog data
export const blogPosts = [
  {
    id: 1,
    title: "Building Responsive Web Applications with Next.js and Tailwind CSS",
    excerpt: "Learn how to create beautiful, responsive web applications using Next.js and Tailwind CSS.",
    coverImage: "/Images/web-tailwind.jpg",
    date: "March 26, 2025",
    readTime: "6 min read",
    author: "Anubhab Rakshit",
    authorImage: "/Images/Anubhab Rakshit Profile Pic.jpg",
    category: "Web Development",
    tags: ["Next.js", "Tailwind CSS", "Responsive Design"],
    slug: "building-responsive-web-applications",
  },
  {
    id: 2,
    title: "Implementing Authentication in React Applications",
    excerpt: "A comprehensive guide to implementing secure authentication in React applications.",
    coverImage: "/Images/authentication-blog.jpeg",
    date: "March 26,2025",
    readTime: "7 min read",
    author: "Anubhab Rakshit",
    authorImage: "/Images/Anubhab Rakshit Profile Pic.jpg",
    category: "Security",
    tags: ["React", "Authentication", "Security"],
    slug: "implementing-authentication-react",
  },
  {
    id: 3,
    title: "Data Structures and Algorithms: A Practical Guide",
    excerpt: "Explore the most important data structures and algorithms with practical examples in JavaScript.",
    coverImage: "/Images/dsa-blog.jpeg",
    date: "March 31,2025",
    readTime: "6 min read",
    author: "Anubhab Rakshit",
    authorImage: "/Images/Anubhab Rakshit Profile Pic.jpg",
    category: "Algorithms",
    tags: ["Data Structures", "Algorithms", "JavaScript"],
    slug: "data-structures-algorithms-guide",
  },
  {
    id: 4,
    title: "Getting Started with Next.js",
    excerpt: "A beginner-friendly guide to getting started with Next.js, the React framework for production.",
    coverImage: "/Images/nextjs-pic.jpeg",
    date: "April 2, 2025",
    readTime: "5 min read",
    author: "Anubhab Rakshit",
    authorImage: "/Images/Anubhab Rakshit Profile Pic.jpg",
    category: "Web Development",
    tags: ["Next.js", "React", "JavaScript"],
    slug: "getting-started-with-nextjs",
  },
  {
    id: 5,
    title: "3D Web Development with Three.js",
    excerpt: "Learn how to create immersive 3D experiences on the web using Three.js and React Three Fiber.",
    coverImage: "/Images/3dweb.png",
    date: "April 3, 2025",
    readTime: "6 min read",
    author: "Anubhab Rakshit",
    authorImage: "/Images/Anubhab Rakshit Profile Pic.jpg",
    category: "Web Development",
    tags: ["Three.js", "React", "3D"],
    slug: "3d-web-development-with-threejs",
  },
]

// Get all unique categories and tags
const categories = ["All", ...new Set(blogPosts.map((post) => post.category))]
const allTags = [...new Set(blogPosts.flatMap((post) => post.tags))]

function BlogPostCard({ post, index }) {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <motion.div
      className="relative h-full"
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.5,
        delay: index * 0.1,
        type: "spring",
        stiffness: 300,
        damping: 20,
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      whileHover={{ scale: 1.05, zIndex: 10 }}
    >
      <Card className="overflow-hidden h-full hover:shadow-xl transition-all duration-500 bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm border border-white/20 dark:border-white/10 group">
        <div className="relative h-48 w-full">
          <Image
            src={post.coverImage || "/placeholder.svg"}
            alt={post.title}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent"></div>

          <div className="absolute top-4 left-4">
            <Badge className="bg-white/80 dark:bg-black/50 backdrop-blur-sm text-black dark:text-white font-bold">
              {post.category}
            </Badge>
          </div>
        </div>

        <CardHeader className="pb-2 relative">
          <div className="flex items-center gap-2 mb-2 text-xs text-muted-foreground">
            <div className="flex items-center">
              <CalendarIcon className="mr-1 h-3 w-3 text-indigo-400" />
              {post.date}
            </div>
            <div className="flex items-center">
              <ClockIcon className="mr-1 h-3 w-3 text-pink-400" />
              {post.readTime}
            </div>
          </div>

          <CardTitle className="line-clamp-2 group-hover:text-indigo-400 transition-colors">{post.title}</CardTitle>

          <CardContent className="p-0 pt-2">
            <p className="line-clamp-3 text-muted-foreground">{post.excerpt}</p>
          </CardContent>
        </CardHeader>

        <CardFooter className="flex justify-between items-center pt-0 pb-4 px-6">
          <div className="flex items-center gap-2">
            <div className="relative w-8 h-8 rounded-full overflow-hidden border border-white/20">
              <Image src={post.authorImage || "/placeholder.svg"} alt={post.author} fill className="object-cover" />
            </div>
            <span className="text-sm font-medium">{post.author}</span>
          </div>

          <Button variant="ghost" size="sm" asChild className="group-hover:bg-indigo-500/10 transition-colors">
            <Link href={`/blog/${post.slug}`} className="flex items-center gap-1">
              Read
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
                className="ml-1 h-3 w-3 transition-transform duration-300 group-hover:translate-x-1"
              >
                <path d="M5 12h14"></path>
                <path d="m12 5 7 7-7 7"></path>
              </svg>
            </Link>
          </Button>
        </CardFooter>
      </Card>

      {/* Glow effect */}
      <motion.div
        className="absolute -inset-1 rounded-xl z-[-1] opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        style={{
          background: `radial-gradient(circle at 50% 50%, rgba(99, 102, 241, 0.5), transparent 70%)`,
          filter: "blur(20px)",
        }}
        animate={{ opacity: isHovered ? 0.8 : 0 }}
        transition={{ duration: 0.3 }}
      />
    </motion.div>
  )
}

// Animated filter button
function FilterButton({ active, onClick, children }) {
  return (
    <motion.button
      onClick={onClick}
      className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
        active
          ? "bg-gradient-to-r from-indigo-500 to-purple-500 text-white"
          : "bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-700"
      }`}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      {children}
    </motion.button>
  )
}

export default function BlogPage() {
  const [selectedCategory, setSelectedCategory] = useState("All")
  const [searchQuery, setSearchQuery] = useState("")
  const [filteredPosts, setFilteredPosts] = useState(blogPosts)

  // Filter posts when filters change
  useEffect(() => {
    let filtered = blogPosts

    // Filter by category
    if (selectedCategory !== "All") {
      filtered = filtered.filter((post) => post.category === selectedCategory)
    }

    // Filter by search query
    if (searchQuery) {
      const query = searchQuery.toLowerCase()
      filtered = filtered.filter(
        (post) =>
          post.title.toLowerCase().includes(query) ||
          post.excerpt.toLowerCase().includes(query) ||
          post.tags.some((tag) => tag.toLowerCase().includes(query)),
      )
    }

    setFilteredPosts(filtered)
  }, [selectedCategory, searchQuery])

  return (
    <main className="min-h-screen py-24 overflow-hidden relative">
      {/* Enhanced background with particles and mouse effects */}
      <div className="fixed inset-0" style={{ zIndex: -10 }}>
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/5 via-purple-500/5 to-pink-500/5" />
        <ParticlesBg/>
        <EnhancedParticlesBackground />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="mb-12">
          <motion.h1
            className="text-5xl md:text-7xl font-bold mt-6 mb-2 bg-clip-text text-transparent bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            Blog
          </motion.h1>

          <motion.p
            className="text-xl text-muted-foreground max-w-2xl mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            Thoughts, tutorials, and insights on web development, programming, and technology.
          </motion.p>

          {/* Filters */}
          <motion.div
            className="flex flex-wrap gap-3 mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            {categories.map((category) => (
              <FilterButton
                key={category}
                active={selectedCategory === category}
                onClick={() => setSelectedCategory(category)}
              >
                {category}
              </FilterButton>
            ))}
          </motion.div>

          {/* Search */}
          <motion.div
            className="relative max-w-md mb-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search posts by title, content, or tags..."
              className="pl-10 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border-gray-300 dark:border-gray-700"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </motion.div>
        </div>

        {/* Blog posts grid */}
        <AnimatePresence mode="wait">
          {filteredPosts.length > 0 ? (
            <motion.div
              key={`${selectedCategory}-${searchQuery}`}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            >
              {filteredPosts.map((post, index) => (
                <BlogPostCard key={post.id} post={post} index={index} />
              ))}
            </motion.div>
          ) : (
            <motion.div
              className="text-center py-20"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              <h3 className="text-xl font-medium mb-2">No posts found</h3>
              <p className="text-muted-foreground mb-6">
                No posts match your current filters. Try adjusting your search criteria.
              </p>
              <Button
                onClick={() => {
                  setSelectedCategory("All")
                  setSearchQuery("")
                }}
              >
                Reset Filters
              </Button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </main>
  )
}

