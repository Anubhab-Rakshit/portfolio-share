"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { ArrowLeft, Calendar, Clock, Tag } from "lucide-react"
import { ShareButtons } from "@/app/blog/[slug]/components/share-buttons"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ClientOnlyWrapper } from "@/components/client-only-wrapper"
import { getAllBlogPosts } from "./blog-posts"

interface BlogPost {
  id: number
  title: string
  excerpt: string
  content: string
  coverImage: string
  date: string
  readTime: string
  author: string
  authorImage: string
  category: string
  tags: string[]
  slug: string
}

interface BlogPostClientPageProps {
  post: BlogPost
}

export default function BlogPostClientPage({ post }: BlogPostClientPageProps) {
  const [scrollProgress, setScrollProgress] = useState(0)
  const [relatedPosts, setRelatedPosts] = useState<BlogPost[]>([])

  useEffect(() => {
    const handleScroll = () => {
      const totalHeight = document.body.scrollHeight - window.innerHeight
      const progress = (window.scrollY / totalHeight) * 100
      setScrollProgress(progress)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  useEffect(() => {
    if (post) {
      // Get related posts (same category, excluding current post)
      const allPosts = getAllBlogPosts()
      const related = allPosts.filter((p) => p.category === post.category && p.id !== post.id).slice(0, 3)
      setRelatedPosts(related)
    }
  }, [post])

  if (!post) {
    return (
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold">Blog post not found</h1>
        <p className="mt-4">The requested blog post could not be found.</p>
        <Link href="/blog">
          <Button className="mt-4">
            <ArrowLeft className="mr-2 h-4 w-4" /> Back to Blog
          </Button>
        </Link>
      </div>
    )
  }

  return (
    <ClientOnlyWrapper fallback={<div>Loading blog post...</div>}>
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        {/* Reading progress bar */}
        <div className="fixed top-0 left-0 w-full h-1 bg-gray-200 z-50">
          <div
            className="h-full bg-primary transition-all duration-150 ease-out"
            style={{ width: `${scrollProgress}%` }}
          />
        </div>

        <Link href="/blog">
          <Button variant="ghost" className="mb-4">
            <ArrowLeft className="mr-2 h-4 w-4" /> Back to Blog
          </Button>
        </Link>

        <h1 className="text-4xl md:text-5xl font-bold mb-4">{post.title}</h1>

        <div className="flex flex-wrap items-center gap-4 mb-6 text-muted-foreground">
          <div className="flex items-center">
            <Image
              src={post.authorImage || "/placeholder.svg"}
              alt={post.author}
              width={40}
              height={40}
              className="rounded-full mr-2"
            />
            <span>{post.author}</span>
          </div>
          <div className="flex items-center">
            <Calendar className="mr-1 h-4 w-4" />
            <span>{post.date}</span>
          </div>
          <div className="flex items-center">
            <Clock className="mr-1 h-4 w-4" />
            <span>{post.readTime}</span>
          </div>
        </div>

        <div className="mb-6">
          <Badge variant="secondary" className="mr-2">
            {post.category}
          </Badge>
          {post.tags.map((tag) => (
            <Badge key={tag} variant="outline" className="mr-2">
              <Tag className="mr-1 h-3 w-3" />
              {tag}
            </Badge>
          ))}
        </div>

        <div className="relative w-full h-[400px] mb-8 rounded-lg overflow-hidden">
          <Image src={post.coverImage || "/placeholder.svg"} alt={post.title} fill className="object-cover" />
        </div>

        <Card className="mb-8">
          <CardContent className="p-6">
            <div
              className="prose prose-lg max-w-none dark:prose-invert"
              dangerouslySetInnerHTML={{ __html: post.content }}
            />
          </CardContent>
        </Card>

        <ShareButtons title={post.title} />

        {relatedPosts.length > 0 && (
          <div className="mt-12">
            <h2 className="text-2xl font-bold mb-6">Related Articles</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {relatedPosts.map((relatedPost) => (
                <Card key={relatedPost.id} className="overflow-hidden hover:shadow-lg transition-all duration-300">
                  <div className="relative h-40 w-full">
                    <Image
                      src={relatedPost.coverImage || "/placeholder.svg"}
                      alt={relatedPost.title}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <CardContent className="p-4">
                    <h3 className="text-lg font-bold mb-2 line-clamp-2">
                      <Link href={`/blog/${relatedPost.slug}`} className="hover:text-primary transition-colors">
                        {relatedPost.title}
                      </Link>
                    </h3>
                    <p className="text-sm text-muted-foreground line-clamp-2 mb-2">{relatedPost.excerpt}</p>
                    <div className="flex items-center text-xs text-muted-foreground">
                      <Calendar className="mr-1 h-3 w-3" />
                      {relatedPost.date}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}
      </div>
    </ClientOnlyWrapper>
  )
}

