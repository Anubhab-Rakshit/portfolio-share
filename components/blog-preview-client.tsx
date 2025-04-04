"use client"

import { motion } from "framer-motion"
import BlogPreview from "@/components/blog-preview"

export default function BlogPreviewClient() {
  return (
    <motion.div initial={{ opacity: 0, y: 100 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
      <BlogPreview />
    </motion.div>
  )
}

