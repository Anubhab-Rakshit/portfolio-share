"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { motion } from "framer-motion"
import { notFound } from "next/navigation"
import { blogPosts } from "../page"
import { ArrowLeftIcon, CalendarIcon, ClockIcon, TagIcon } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import EnhancedParticlesBackground from "@/components/enhanced-particles-background"

// Simple blog post content
const blogContents = {
  "building-responsive-web-applications": `
    <h2>Introduction to Responsive Web Design</h2>
    <p>In today's digital landscape, creating responsive web applications is essential. Users access websites from various devices with different screen sizes, from smartphones and tablets to desktop computers. A responsive design ensures that your application looks and functions well across all these devices.</p>
    
    <p>Next.js and Tailwind CSS have emerged as powerful tools for building modern, responsive web applications. Next.js provides features like server-side rendering and static site generation, while Tailwind CSS offers a utility-first approach to styling.</p>
    
    <h2>Setting Up Your Project</h2>
    <p>To get started with Next.js and Tailwind CSS, you'll need to set up a new project. First, ensure you have Node.js installed on your machine. Then, create a new Next.js project and install Tailwind CSS.</p>
    
    <h2>Creating Responsive Layouts</h2>
    <p>Tailwind CSS makes it easy to create responsive layouts using its built-in breakpoint prefixes: sm, md, lg, xl, and 2xl. These correspond to minimum widths of 640px, 768px, 1024px, 1280px, and 1536px, respectively.</p>
    
    <h2>Conclusion</h2>
    <p>Next.js and Tailwind CSS provide a powerful combination for building responsive web applications. By leveraging the responsive utilities provided by Tailwind CSS, you can create web applications that look and function well across all devices.</p>
  `,
  "implementing-authentication-react": `
    <h2>Introduction to Authentication in React</h2>
    <p>Authentication is a critical aspect of modern web applications. It ensures that users are who they claim to be and provides a secure way to access protected resources. In React applications, implementing authentication requires careful consideration of various factors, including security, user experience, and maintainability.</p>
    
    <h2>JWT Authentication</h2>
    <p>JWT (JSON Web Tokens) is a popular method for implementing authentication in React applications. It's a compact, self-contained way to securely transmit information between parties as a JSON object.</p>
    
    <h2>OAuth Authentication</h2>
    <p>OAuth is an open standard for access delegation, commonly used for implementing "Sign in with Google/Facebook/GitHub" functionality. It allows users to grant third-party applications access to their resources without sharing their credentials.</p>
    
    <h2>Security Considerations</h2>
    <p>When implementing authentication in React applications, consider security best practices such as using HTTP-only cookies for storing tokens, implementing token refresh mechanisms, and using HTTPS to encrypt data in transit.</p>
  `,
  "data-structures-algorithms-guide": `
    <h2>Introduction to Data Structures and Algorithms</h2>
    <p>Data structures and algorithms form the foundation of computer science and software development. Understanding these concepts is crucial for writing efficient code, solving complex problems, and acing technical interviews.</p>
    
    <h2>Arrays and Strings</h2>
    <p>Arrays and strings are the most basic data structures, but they're used in countless algorithms and interview questions. The two-pointer technique is a common approach for solving array problems efficiently.</p>
    
    <h2>Linked Lists</h2>
    <p>Linked lists are linear data structures where elements are stored in nodes, and each node points to the next node in the sequence. Reversing a linked list is a common interview question.</p>
    
    <h2>Stacks and Queues</h2>
    <p>Stacks and queues are linear data structures that follow specific patterns for adding and removing elements. Stacks follow Last-In-First-Out (LIFO) while queues follow First-In-First-Out (FIFO).</p>
    
    <h2>Trees and Graphs</h2>
    <p>Trees and graphs are non-linear data structures that represent hierarchical or network relationships. Binary trees, binary search trees, and balanced trees are common types of trees used in programming.</p>
  `,
  "getting-started-with-nextjs": `
    <h2>Introduction to Next.js</h2>
    <p>Next.js is a React framework that enables functionality such as server-side rendering, static site generation, and API routes. It's designed to make building React applications easier and more efficient, with built-in features that help you create production-ready applications.</p>
    
    <h2>Why Next.js?</h2>
    <p>Next.js offers several advantages over a plain React application, including server-side rendering, static site generation, incremental static regeneration, API routes, file-based routing, built-in CSS and Sass support, and image optimization.</p>
    
    <h2>Setting Up Your First Next.js Project</h2>
    <p>To create a new Next.js project, you can use the create-next-app command, which sets up everything automatically for you. This will create a new Next.js project and start the development server.</p>
    
    <h2>Understanding the Project Structure</h2>
    <p>A typical Next.js project has a specific structure, including directories for pages, public assets, and styles. The pages directory contains all your page components, with each file becoming a route in your application.</p>
  `,
  "3d-web-development-with-threejs": `
    <h2>Introduction to 3D Web Development</h2>
    <p>3D web development has evolved significantly over the years, allowing developers to create immersive experiences directly in the browser without requiring plugins. Three.js has emerged as one of the most popular libraries for 3D graphics on the web, providing a high-level API for WebGL.</p>
    
    <h2>Getting Started with Three.js</h2>
    <p>Three.js is a JavaScript library that makes it easier to create 3D graphics in the browser using WebGL. To create a basic Three.js scene, you need a scene, camera, renderer, geometry, material, mesh, and lighting.</p>
    
    <h2>Introduction to React Three Fiber</h2>
    <p>React Three Fiber is a React renderer for Three.js, allowing you to create 3D graphics using React's component-based approach. It simplifies the process of creating and managing Three.js scenes.</p>
    
    <h2>Creating Complex 3D Models</h2>
    <p>For complex 3D models, you'll typically use modeling software like Blender and export models in formats like glTF or GLB. React Three Fiber makes it easy to load and display these models.</p>
    
    <h2>Adding Interactivity</h2>
    <p>One of the advantages of 3D web development is the ability to create interactive experiences. React Three Fiber makes this straightforward with event handlers for mouse interactions.</p>
  `,
}

// Social share links
function ShareButtons({ url, title }) {
  const encodedUrl = encodeURIComponent(url)
  const encodedTitle = encodeURIComponent(title)

  return (
    <div className="flex items-center gap-2">
      <span className="text-sm text-muted-foreground">Share:</span>
      <Button
        size="icon"
        variant="ghost"
        className="h-8 w-8 rounded-full bg-[#1877F2]/10 hover:bg-[#1877F2]/20 text-[#1877F2]"
        asChild
      >
        <a
          href={`https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Share on Facebook"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
            <path d="M16 8.049c0-4.446-3.582-8.05-8-8.05C3.58 0-.002 3.603-.002 8.05c0 4.017 2.926 7.347 6.75 7.951v-5.625h-2.03V8.05H6.75V6.275c0-2.017 1.195-3.131 3.022-3.131.876 0 1.791.157 1.791.157v1.98h-1.009c-.993 0-1.303.621-1.303 1.258v1.51h2.218l-.354 2.326H9.25V16c3.824-.604 6.75-3.934 6.75-7.951z" />
          </svg>
        </a>
      </Button>
      <Button
        size="icon"
        variant="ghost"
        className="h-8 w-8 rounded-full bg-[#1DA1F2]/10 hover:bg-[#1DA1F2]/20 text-[#1DA1F2]"
        asChild
      >
        <a
          href={`https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedTitle}`}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Share on Twitter"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
            <path d="M5.026 15c6.038 0 9.341-5.003 9.341-9.334 0-.14 0-.282-.006-.422A6.685 6.685 0 0 0 16 3.542a6.658 6.658 0 0 1-1.889.518 3.301 3.301 0 0 0 1.447-1.817 6.533 6.533 0 0 1-2.087.793A3.286 3.286 0 0 0 7.875 6.03a9.325 9.325 0 0 1-6.767-3.429 3.289 3.289 0 0 0 1.018 4.382A3.323 3.323 0 0 1 .64 6.575v.045a3.288 3.288 0 0 0 2.632 3.218 3.203 3.203 0 0 1-.865.115 3.23 3.23 0 0 1-.614-.057 3.283 3.283 0 0 0 3.067 2.277A6.588 6.588 0 0 1 .78 13.58a6.32 6.32 0 0 1-.78-.045A9.344 9.344 0 0 0 5.026 15z" />
          </svg>
        </a>
      </Button>
      <Button
        size="icon"
        variant="ghost"
        className="h-8 w-8 rounded-full bg-[#0A66C2]/10 hover:bg-[#0A66C2]/20 text-[#0A66C2]"
        asChild
      >
        <a
          href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Share on LinkedIn"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
            <path d="M0 1.146C0 .513.526 0 1.175 0h13.65C15.474 0 16 .513 16 1.146v13.708c0 .633-.526 1.146-1.175 1.146H1.175C.526 16 0 15.487 0 14.854V1.146zm4.943 12.248V6.169H2.542v7.225h2.401zm-1.2-8.212c.837 0 1.358-.554 1.358-1.248-.015-.709-.52-1.248-1.342-1.248-.822 0-1.359.54-1.359 1.248 0 .694.521 1.248 1.327 1.248h.016zm4.908 8.212V9.359c0-.216.016-.432.08-.586.173-.431.568-.878 1.232-.878.869 0 1.216.662 1.216 1.634v3.865h2.401V9.25c0-2.22-1.184-3.252-2.764-3.252-1.274 0-1.845.7-2.165 1.193v.025h-.016a5.54 5.54 0 0 1 .016-.025V6.169h-2.4c.03.678 0 7.225 0 7.225h2.4z" />
          </svg>
        </a>
      </Button>
    </div>
  )
}

export default function BlogPostPage({ params }) {
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true)
  }, [])

  const post = blogPosts.find((post) => post.slug === params.slug)

  if (!post && isMounted) {
    notFound()
  }

  if (!isMounted) {
    return null
  }

  const content = blogContents[params.slug] || "<p>Content coming soon...</p>"

  // Get related posts (same category, excluding current post)
  const relatedPosts = blogPosts.filter((p) => p.category === post.category && p.id !== post.id).slice(0, 3)

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
            href="/blog"
            className="inline-flex items-center text-muted-foreground hover:text-foreground mb-8 transition-colors"
          >
            <ArrowLeftIcon className="mr-2 h-4 w-4" />
            Back to Blog
          </Link>
        </motion.div>

        <div className="max-w-4xl mx-auto">
          <motion.div
            className="mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <div className="flex flex-wrap gap-2 mb-4">
              <Badge className="bg-primary/20 text-primary">{post.category}</Badge>
              <div className="flex items-center text-muted-foreground">
                <CalendarIcon className="mr-1 h-4 w-4" />
                <span>{post.date}</span>
              </div>
              <div className="flex items-center text-muted-foreground">
                <ClockIcon className="mr-1 h-4 w-4" />
                <span>{post.readTime}</span>
              </div>
            </div>

            <h1 className="text-4xl md:text-5xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500">
              {post.title}
            </h1>

            <div className="relative w-full h-[400px] mb-8 rounded-lg overflow-hidden shadow-xl">
              <Image
                src={post.coverImage || "/placeholder.svg"}
                alt={post.title}
                fill
                className="object-cover"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background/40 to-transparent"></div>
            </div>

            <div className="flex items-center justify-between mb-8">
              <div className="flex items-center gap-3">
                <div className="relative w-10 h-10 rounded-full overflow-hidden border-2 border-white/20">
                  <Image src={post.authorImage || "/placeholder.svg"} alt={post.author} fill className="object-cover" />
                </div>
                <div>
                  <p className="font-medium">{post.author}</p>
                  <p className="text-sm text-muted-foreground">{post.date}</p>
                </div>
              </div>

              <ShareButtons url={`https://yourwebsite.com/blog/${post.slug}`} title={post.title} />
            </div>

            <div
              className="prose prose-lg dark:prose-invert max-w-none mb-12 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm p-8 rounded-lg shadow-lg"
              dangerouslySetInnerHTML={{ __html: content }}
            />

            <div className="flex flex-wrap gap-2 mt-8">
              <span className="text-muted-foreground flex items-center">
                <TagIcon className="mr-2 h-4 w-4" /> Tags:
              </span>
              {post.tags.map((tag) => (
                <Badge key={tag} variant="outline" className="bg-primary/10 hover:bg-primary/20 transition-colors">
                  {tag}
                </Badge>
              ))}
            </div>
          </motion.div>

          {relatedPosts.length > 0 && (
            <motion.div
              className="mt-16"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <h2 className="text-2xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-indigo-500 to-purple-500">
                Related Posts
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {relatedPosts.map((relatedPost) => (
                  <Link href={`/blog/${relatedPost.slug}`} key={relatedPost.id}>
                    <Card className="h-full hover:shadow-md transition-shadow bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border border-white/20 dark:border-white/10">
                      <div className="relative w-full h-40">
                        <Image
                          src={relatedPost.coverImage || "/placeholder.svg"}
                          alt={relatedPost.title}
                          fill
                          className="object-cover"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-background/60 to-transparent"></div>
                      </div>
                      <CardContent className="p-4">
                        <h3 className="font-bold mb-2 line-clamp-2 hover:text-indigo-400 transition-colors">
                          {relatedPost.title}
                        </h3>
                        <p className="text-sm text-muted-foreground">
                          {relatedPost.date} · {relatedPost.readTime}
                        </p>
                      </CardContent>
                    </Card>
                  </Link>
                ))}
              </div>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  )
}

