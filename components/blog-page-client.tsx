"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Calendar, Clock, Search, Tag } from "lucide-react"
import { ClientOnlyWrapper } from "./client-only-wrapper"

interface BlogPost {
  id: number
  title: string
  excerpt: string
  coverImage: string
  date: string
  readTime: string
  author: string
  category: string
  tags: string[]
  slug: string
}

interface BlogPageClientProps {
  posts: BlogPost[]
}

export default function BlogPageClient({ posts }: BlogPageClientProps) {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)
  const [selectedTag, setSelectedTag] = useState<string | null>(null)

  // Get unique categories and tags
  const categories = Array.from(new Set(posts.map((post) => post.category)))
  const tags = Array.from(new Set(posts.flatMap((post) => post.tags)))

  // Filter posts based on search term, category, and tag
  const filteredPosts = posts.filter((post) => {
    const matchesSearch =
      post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      post.excerpt.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = selectedCategory ? post.category === selectedCategory : true
    const matchesTag = selectedTag ? post.tags.includes(selectedTag) : true

    return matchesSearch && matchesCategory && matchesTag
  })

  return (
    <ClientOnlyWrapper fallback={<div>Loading blog posts...</div>}>
      <div className="space-y-8">
        <div>
          <h1 className="text-4xl font-bold mb-4">Blog</h1>
          <p className="text-xl text-muted-foreground mb-6">
            Thoughts, tutorials, and insights on web development, programming, and technology.
          </p>
        </div>

        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
          <Input
            type="text"
            placeholder="Search articles..."
            className="pl-10"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <div className="flex flex-wrap gap-2">
          <Badge
            variant={selectedCategory === null ? "secondary" : "outline"}
            className="cursor-pointer"
            onClick={() => setSelectedCategory(null)}
          >
            All Categories
          </Badge>
          {categories.map((category) => (
            <Badge
              key={category}
              variant={selectedCategory === category ? "secondary" : "outline"}
              className="cursor-pointer"
              onClick={() => setSelectedCategory(category)}
            >
              {category}
            </Badge>
          ))}
        </div>

        <div className="flex flex-wrap gap-2">
          <Badge
            variant={selectedTag === null ? "secondary" : "outline"}
            className="cursor-pointer"
            onClick={() => setSelectedTag(null)}
          >
            All Tags
          </Badge>
          {tags.map((tag) => (
            <Badge
              key={tag}
              variant={selectedTag === tag ? "secondary" : "outline"}
              className="cursor-pointer"
              onClick={() => setSelectedTag(tag)}
            >
              <Tag className="mr-1 h-3 w-3" />
              {tag}
            </Badge>
          ))}
        </div>

        {filteredPosts.length === 0 ? (
          <div className="text-center py-12">
            <h3 className="text-xl font-semibold mb-2">No posts found</h3>
            <p className="text-muted-foreground">Try adjusting your search or filter criteria.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredPosts.map((post) => (
              <Link href={`/blog/${post.slug}`} key={post.id}>
                <Card className="h-full overflow-hidden hover:shadow-lg transition-shadow duration-300">
                  <div className="relative w-full h-48">
                    <Image src={post.coverImage || "/placeholder.svg"} alt={post.title} fill className="object-cover" />
                  </div>
                  <CardContent className="p-6">
                    <Badge className="mb-2">{post.category}</Badge>
                    <h2 className="text-xl font-bold mb-2 line-clamp-2">{post.title}</h2>
                    <p className="text-muted-foreground line-clamp-3 mb-4">{post.excerpt}</p>
                  </CardContent>
                  <CardFooter className="px-6 py-4 border-t flex justify-between text-sm text-muted-foreground">
                    <div className="flex items-center">
                      <Calendar className="mr-1 h-4 w-4" />
                      <span>{post.date}</span>
                    </div>
                    <div className="flex items-center">
                      <Clock className="mr-1 h-4 w-4" />
                      <span>{post.readTime}</span>
                    </div>
                  </CardFooter>
                </Card>
              </Link>
            ))}
          </div>
        )}
      </div>
    </ClientOnlyWrapper>
  )
}

