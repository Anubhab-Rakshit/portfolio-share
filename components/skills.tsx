"use client"

import { useRef, useState } from "react"
import { motion, useInView, AnimatePresence } from "framer-motion"
import { Progress } from "@/components/ui/progress"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { CodeIcon, PencilRulerIcon, BrainCircuitIcon } from "lucide-react"

const technicalSkills = [
  { name: "JavaScript", level: 88, color: "#F7DF1E", icon: "🟡" },
  { name: "TypeScript", level: 70, color: "#3178C6", icon: "🔵" },
  { name: "React", level: 80, color: "#61DAFB", icon: "⚛️" },
  { name: "Next.js", level: 80, color: "#000000", icon: "▲" },
  { name: "Node.js", level: 80, color: "#339933", icon: "🟢" },
  { name: "Python", level: 90, color: "#3776AB", icon: "🐍" },
  { name: "C", level: 75, color: "#00599C", icon: "🔷" },
  { name: "HTML/CSS", level: 95, color: "#E34F26", icon: "🌐" },
  { name: "SQL", level: 82, color: "#4479A1", icon: "🗃️" },
  { name: "Git", level: 60, color: "#F05032", icon: "🔄" },
]

const designSkills = [
  { name: "UI Design", level: 90, color: "#FF61F6", icon: "🎨" },
  { name: "UX Design", level: 80, color: "#7B61FF", icon: "👤" },
  { name: "Figma", level: 70, color: "#F24E1E", icon: "🖌️" },
  { name: "Adobe XD", level: 60, color: "#FF61F6", icon: "✏️" },
  { name: "Responsive Design", level: 90, color: "#38B2AC", icon: "📱" },
]

const softSkills = [
  { name: "Problem Solving", level: 95, color: "#38B2AC", icon: "🧩" },
  { name: "Communication", level: 90, color: "#4C1D95", icon: "🗣️" },
  { name: "Teamwork", level: 95, color: "#2563EB", icon: "👥" },
  { name: "Time Management", level: 90, color: "#DC2626", icon: "⏰" },
  { name: "Adaptability", level: 90, color: "#059669", icon: "🔄" },
]

// Animation variants for the skill balls
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
}

const ballVariants = {
  hidden: { opacity: 0, scale: 0 },
  visible: { opacity: 1, scale: 1, transition: { type: "spring", stiffness: 200, damping: 10 } },
}

export default function Skills() {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: "-10%" })
  const [selectedSkill, setSelectedSkill] = useState<string | null>(null)
  const [activeTab, setActiveTab] = useState("technical")

  // Get the current skills based on the active tab
  const getCurrentSkills = () => {
    switch (activeTab) {
      case "technical":
        return technicalSkills
      case "design":
        return designSkills
      case "soft":
        return softSkills
      default:
        return technicalSkills
    }
  }

  // Find the selected skill details
  const selectedSkillDetails = getCurrentSkills().find((skill) => skill.name === selectedSkill)

  return (
    <section id="skills" className="py-20 relative overflow-hidden">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 bg-clip-text text-transparent bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500">
          Skills & Expertise
        </h2>

        <div ref={ref}>
          <Tabs
            defaultValue="technical"
            className="w-full"
            onValueChange={(value) => {
              setActiveTab(value)
              setSelectedSkill(null)
            }}
          >
            <TabsList className="grid w-full grid-cols-3 mb-8 bg-white/10 dark:bg-black/10 backdrop-blur-sm">
              <TabsTrigger
                value="technical"
                className="flex items-center gap-2 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
              >
                <CodeIcon className="h-4 w-4" />
                <span className="hidden sm:inline">Technical</span>
              </TabsTrigger>
              <TabsTrigger
                value="design"
                className="flex items-center gap-2 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
              >
                <PencilRulerIcon className="h-4 w-4" />
                <span className="hidden sm:inline">Design</span>
              </TabsTrigger>
              <TabsTrigger
                value="soft"
                className="flex items-center gap-2 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
              >
                <BrainCircuitIcon className="h-4 w-4" />
                <span className="hidden sm:inline">Soft Skills</span>
              </TabsTrigger>
            </TabsList>

            {["technical", "design", "soft"].map((tabValue) => (
              <TabsContent key={tabValue} value={tabValue}>
                <Card className="bg-white/10 dark:bg-black/10 backdrop-blur-sm border-white/10">
                  <CardContent className="pt-6">
                    {/* Progress bars */}
                    {tabValue === "technical" &&
                      technicalSkills.map((skill) => (
                        <div key={skill.name} className="mb-4">
                          <div className="flex justify-between mb-1">
                            <span className="text-sm font-medium">{skill.name}</span>
                            <span className="text-sm text-muted-foreground">{skill.level}%</span>
                          </div>
                          <Progress value={skill.level} className="h-2" indicatorColor={skill.color} />
                        </div>
                      ))}

                    {tabValue === "design" &&
                      designSkills.map((skill) => (
                        <div key={skill.name} className="mb-4">
                          <div className="flex justify-between mb-1">
                            <span className="text-sm font-medium">{skill.name}</span>
                       
                          </div>
                          <Progress value={skill.level} className="h-2" indicatorColor={skill.color} />
                        </div>
                      ))}

                    {tabValue === "soft" &&
                      softSkills.map((skill) => (
                        <div key={skill.name} className="mb-4">
                          <div className="flex justify-between mb-1">
                            <span className="text-sm font-medium">{skill.name}</span>
                            <span className="text-sm text-muted-foreground">{skill.level}%</span>
                          </div>
                          <Progress value={skill.level} className="h-2" indicatorColor={skill.color} />
                        </div>
                      ))}

                    {/* Skill details popup */}
                    <AnimatePresence>
                      {selectedSkill && selectedSkillDetails && (
                        <motion.div
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: 20 }}
                          className="mt-6 p-4 rounded-lg bg-gradient-to-r from-indigo-500/10 via-purple-500/10 to-pink-500/10 border border-white/10"
                        >
                          <div className="flex items-center gap-3 mb-2">
                            <div className="text-2xl">{selectedSkillDetails.icon}</div>
                            <h3 className="text-lg font-bold">{selectedSkillDetails.name}</h3>
                          </div>
                          <div className="flex items-center gap-2 mb-2">
                            <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5">
                              <div
                                className="h-2.5 rounded-full"
                                style={{
                                  width: `${selectedSkillDetails.level}%`,
                                  backgroundColor: selectedSkillDetails.color,
                                }}
                              ></div>
                            </div>
                            <span className="text-sm font-medium">{selectedSkillDetails.level}%</span>
                          </div>
                          <p className="text-sm text-muted-foreground">
                            {selectedSkillDetails.name} is one of my core skills with {selectedSkillDetails.level}%
                            proficiency. I've used it in various projects and continue to improve my expertise.
                          </p>
                        </motion.div>
                      )}
                    </AnimatePresence>

                    {/* Animated skill balls */}
                    <div className="mt-8 relative h-40 border-t border-white/10 pt-6">
                      <h3 className="text-sm font-medium text-muted-foreground mb-4">
                        Click on a skill to see details:
                      </h3>
                      <motion.div
                        className="flex flex-wrap gap-4 justify-center"
                        variants={containerVariants}
                        initial="hidden"
                        animate={isInView ? "visible" : "hidden"}
                      >
                        {getCurrentSkills().map((skill, index) => (
                          <motion.div
                            key={skill.name}
                            className="relative cursor-pointer"
                            variants={ballVariants}
                            whileHover={{ scale: 1.1 }}
                            animate={{
                              y: [0, -10, 0],
                              transition: {
                                y: {
                                  repeat: Number.POSITIVE_INFINITY,
                                  duration: 2,
                                  delay: index * 0.2,
                                  ease: "easeInOut",
                                },
                              },
                            }}
                            onClick={() => setSelectedSkill(skill.name === selectedSkill ? null : skill.name)}
                          >
                            <div
                              className={`w-12 h-12 rounded-full flex items-center justify-center text-white shadow-lg ${
                                selectedSkill === skill.name
                                  ? "ring-2 ring-white ring-offset-2 ring-offset-background"
                                  : ""
                              }`}
                              style={{
                                background: `linear-gradient(135deg, ${skill.color}, ${skill.color}99)`,
                              }}
                            >
                              <span className="text-xl">{skill.icon}</span>
                            </div>
                            <motion.div
                              className="absolute inset-0 rounded-full"
                              animate={{
                                boxShadow:
                                  selectedSkill === skill.name
                                    ? [
                                        `0 0 0 0px ${skill.color}00`,
                                        `0 0 0 10px ${skill.color}50`,
                                        `0 0 0 20px ${skill.color}00`,
                                      ]
                                    : `0 0 0 0px ${skill.color}00`,
                              }}
                              transition={{
                                repeat: selectedSkill === skill.name ? Number.POSITIVE_INFINITY : 0,
                                duration: 1.5,
                              }}
                            />
                          </motion.div>
                        ))}
                      </motion.div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            ))}
          </Tabs>
        </div>
      </div>
    </section>
  )
}

