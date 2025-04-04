"use client"

import { useState, useEffect, useRef } from "react"
import { motion, useScroll, useTransform } from "framer-motion"
import Image from "next/image"
import Link from "next/link"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowLeftIcon, CalendarIcon, ClockIcon, BookOpenIcon } from "lucide-react"
import { ShareButtons } from "@/app/blog/[slug]/components/share-buttons"
import ConfettiEffect from "@/components/confetti-effect"

export default function BlogPostClientPage({ post, blogPosts }) {
  const [showConfetti, setShowConfetti] = useState(false)
  const headerRef = useRef(null)
  const contentRef = useRef(null)
  const { scrollYProgress } = useScroll({ target: headerRef, offset: ["start start", "end start"] })

  // Parallax effects
  const headerY = useTransform(scrollYProgress, [0, 1], [0, 200])
  const headerOpacity = useTransform(scrollYProgress, [0, 1], [1, 0])

  // Reading progress
  const { scrollYProgress: readingProgress } = useScroll({
    target: contentRef,
    offset: ["start start", "end end"],
  })

  useEffect(() => {
    // Show confetti when post loads
    setShowConfetti(true)

    // Hide confetti after 2 seconds
    const timer = setTimeout(() => {
      setShowConfetti(false)
    }, 2000)

    return () => clearTimeout(timer)
  }, [])

  // Get related posts (same category, excluding current post)
  const relatedPosts = blogPosts.filter((p) => p.category === post.category && p.id !== post.id).slice(0, 3)

  return (
    <main className="min-h-screen relative">
      {showConfetti && <ConfettiEffect originY={0.3} />}

      {/* Reading progress bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 z-50"
        style={{ scaleX: readingProgress, transformOrigin: "0%" }}
      />

      {/* Hero header */}
      <motion.div ref={headerRef} className="relative h-[50vh] overflow-hidden" style={{ opacity: headerOpacity }}>
        <motion.div className="absolute inset-0 z-0" style={{ y: headerY }}>
          <Image src={post.coverImage || "/placeholder.svg"} alt={post.title} fill className="object-cover" priority />
          <div className="absolute inset-0 bg-gradient-to-b from-background/30 via-background/60 to-background"></div>
        </motion.div>

        <div className="absolute inset-0 flex items-center justify-center">
          <div className="container px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="max-w-4xl mx-auto text-center"
            >
              <Badge className="mb-4 bg-gradient-to-r from-purple-500 to-pink-500 text-white border-none">
                {post.category}
              </Badge>
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-purple-500 via-pink-500 to-red-500">
                {post.title}
              </h1>
            </motion.div>
          </div>
        </div>
      </motion.div>

      <div className="container mx-auto px-4 -mt-20 relative z-10">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <Link
              href="/blog"
              className="inline-flex items-center text-muted-foreground hover:text-purple-400 transition-colors"
            >
              <ArrowLeftIcon className="mr-2 h-4 w-4" />
              Back to Blog
            </Link>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mt-8 mb-8 flex items-center justify-between flex-wrap gap-4"
          >
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <div className="relative w-10 h-10 rounded-full overflow-hidden border border-white/20">
                  <Image src={post.authorImage || "/placeholder.svg"} alt={post.author} fill className="object-cover" />
                </div>
                <span className="font-medium">{post.author}</span>
              </div>

              <div className="flex items-center text-muted-foreground">
                <CalendarIcon className="mr-1 h-4 w-4 text-purple-400" />
                {post.date}
              </div>

              <div className="flex items-center text-muted-foreground">
                <ClockIcon className="mr-1 h-4 w-4 text-pink-400" />
                {post.readTime}
              </div>
            </div>

            <div className="flex gap-2">
              {post.tags.map((tag, i) => (
                <Badge
                  key={i}
                  variant="outline"
                  className="bg-white/5 dark:bg-black/10 border-white/10 dark:border-white/5"
                >
                  {tag}
                </Badge>
              ))}
            </div>
          </motion.div>

          <div ref={contentRef}>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="prose prose-lg dark:prose-invert max-w-none mb-12 bg-white/5 dark:bg-black/10 backdrop-blur-sm rounded-xl p-8 border border-white/10 dark:border-white/5 shadow-lg"
              dangerouslySetInnerHTML={{ __html: post.content }}
            />

            <div className="border-t border-b border-white/10 dark:border-white/5 py-6 mb-12">
              <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
                <div>
                  <span className="text-muted-foreground">Share this article:</span>
                </div>
                <ShareButtons />
              </div>
            </div>
          </div>

          {relatedPosts.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="mb-12"
            >
              <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
                <BookOpenIcon className="h-5 w-5 text-purple-400" />
                Related Articles
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {relatedPosts.map((relatedPost) => (
                  <Card
                    key={relatedPost.id}
                    className="overflow-hidden hover:shadow-xl transition-all duration-300 bg-white/5 dark:bg-black/10 backdrop-blur-sm border border-white/10 dark:border-white/5 group"
                  >
                    <div className="relative h-40 w-full">
                      <Image
                        src={relatedPost.coverImage || "/placeholder.svg"}
                        alt={relatedPost.title}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-background to-transparent opacity-70"></div>
                    </div>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-lg line-clamp-2 group-hover:text-purple-400 transition-colors">
                        <Link href={`/blog/${relatedPost.slug}`}>{relatedPost.title}</Link>
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <CalendarIcon className="h-3 w-3 text-purple-400" />
                        {relatedPost.date}
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </motion.div>
          )}
        </div>
      </div>
    </main>
  )
}

