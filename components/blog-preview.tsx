"use client"

import { useState, useRef } from "react"
import { motion, useInView } from "framer-motion"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { CalendarIcon, ClockIcon, ArrowRightIcon } from "lucide-react"
import Link from "next/link"
import Image from "next/image"

const blogPosts = [
  {
    title: "Getting Started with Next.js",
    excerpt: "Learn how to build modern web applications with Next.js, React, and TypeScript.",
    date: "April 2, 2025",
    readTime: "5 min read",
    slug: "getting-started-with-nextjs",
    image: "/Images/nextjs-pic.jpeg",
    category: "Web Development",
  },
  {
    title: "3D Web Development with Three.js",
    excerpt: "Explore the world of 3D web development using Three.js and React Three Fiber.",
    date: "April 3, 2025",
    readTime: "6 min read",
    slug: "3d-web-development-with-threejs",
    image: "/Images/3dweb.png",
    category: "3D Graphics",
  },
  {
    title: "Implementing Authentication in React Application",
    excerpt: "A comprehensive guide to implementing secure authentication in React applications.",
    date: "March 26, 2025",
    readTime: "7 min read",
    slug: "implementing-authentication-react",
    image: "/Images/authentication-blog.jpeg",
    category: "Security",
  },
]

export default function BlogPreview() {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: "-10%" })
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)

  return (
    <section id="blog" className="py-20">
      <div className="container mx-auto px-4" ref={ref}>
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 bg-clip-text text-transparent bg-gradient-to-r from-purple-500 via-pink-500 to-red-500">
          Latest Articles
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-12">
          {blogPosts.map((post, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
              className="relative"
            >
              <Link href={`/blog/${post.slug}`} className="block h-full">
                <Card className="overflow-hidden h-full border-0 shadow-lg hover:shadow-2xl transition-all duration-500 bg-gradient-to-br from-background via-background to-background/80 backdrop-blur-sm">
                  {/* Animated glow effect */}
                  <motion.div
                    className="absolute inset-0 opacity-0 bg-gradient-to-br from-purple-500/20 via-pink-500/20 to-red-500/20 rounded-xl"
                    animate={{
                      opacity: hoveredIndex === index ? 1 : 0,
                    }}
                    transition={{ duration: 0.3 }}
                  />

                  {/* Image with overlay */}
                  <div className="relative h-52 overflow-hidden rounded-t-xl">
                    <Image
                      src={post.image || "/placeholder.svg"}
                      alt={post.title}
                      width={400}
                      height={200}
                      className="object-cover w-full h-full transition-transform duration-700"
                      style={{
                        transform: hoveredIndex === index ? "scale(1.08)" : "scale(1)",
                      }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-background to-transparent opacity-80" />

                    {/* Category badge */}
                    <div className="absolute top-4 right-4">
                      <motion.div
                        className="bg-gradient-to-r from-purple-500 to-pink-500 text-white text-xs font-medium py-1 px-3 rounded-full shadow-md"
                        animate={{
                          y: hoveredIndex === index ? -5 : 0,
                          scale: hoveredIndex === index ? 1.05 : 1,
                        }}
                        transition={{ duration: 0.3 }}
                      >
                        {post.category}
                      </motion.div>
                    </div>
                  </div>

                  <CardContent className="p-6 relative z-10">
                    <motion.h3
                      className="text-xl font-bold mb-3 transition-colors"
                      animate={{
                        color: hoveredIndex === index ? "hsl(var(--primary))" : "hsl(var(--foreground))",
                      }}
                    >
                      {post.title}
                    </motion.h3>
                    <p className="text-muted-foreground mb-4 line-clamp-2">{post.excerpt}</p>
                    <div className="flex items-center text-sm text-muted-foreground gap-4 mb-4">
                      <span className="flex items-center">
                        <CalendarIcon className="h-4 w-4 mr-1 text-purple-400" />
                        {post.date}
                      </span>
                      <span className="flex items-center">
                        <ClockIcon className="h-4 w-4 mr-1 text-pink-400" />
                        {post.readTime}
                      </span>
                    </div>
                  </CardContent>

                  <CardFooter className="p-6 pt-0">
                    <motion.div
                      className="ml-auto"
                      animate={{
                        x: hoveredIndex === index ? 5 : 0,
                      }}
                      transition={{ duration: 0.3 }}
                    >
                      <Button
                        variant="ghost"
                        size="sm"
                        className="group bg-gradient-to-r from-purple-500/10 to-pink-500/10 hover:from-purple-500/20 hover:to-pink-500/20"
                      >
                        Read More{" "}
                        <ArrowRightIcon className="ml-2 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                      </Button>
                    </motion.div>
                  </CardFooter>

                  {/* Animated corner accent */}
                  <div className="absolute top-0 right-0 w-16 h-16 overflow-hidden pointer-events-none">
                    <motion.div
                      className="absolute top-0 right-0 w-16 h-16 bg-gradient-to-bl from-purple-500 to-pink-500 rotate-45 origin-bottom-left opacity-30"
                      animate={{
                        scale: hoveredIndex === index ? 1.2 : 1,
                        opacity: hoveredIndex === index ? 0.5 : 0.3,
                      }}
                      transition={{ duration: 0.3 }}
                    />
                  </div>
                </Card>
              </Link>
            </motion.div>
          ))}
        </div>

        <motion.div
          className="flex justify-center mt-12"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <Button
            asChild
            className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white shadow-md hover:shadow-lg transition-all duration-300 px-6 py-2"
          >
            <Link href="/blog">
              View All Articles <ArrowRightIcon className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </motion.div>
      </div>
    </section>
  )
}

