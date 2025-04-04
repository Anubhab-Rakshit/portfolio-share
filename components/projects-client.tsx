"use client"

import { motion } from "framer-motion"
import Projects from "@/components/projects"

export default function ProjectsClient() {
  return (
    <motion.div initial={{ opacity: 0, x: 100 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8 }}>
      <Projects />
    </motion.div>
  )
}

