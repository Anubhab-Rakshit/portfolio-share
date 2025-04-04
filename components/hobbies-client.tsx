"use client"

import { motion } from "framer-motion"
import HobbiesSection from "@/components/hobbies-section"

export default function HobbiesClient() {
  return (
    <motion.div initial={{ opacity: 0, x: -100 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8 }}>
      <HobbiesSection />
    </motion.div>
  )
}

