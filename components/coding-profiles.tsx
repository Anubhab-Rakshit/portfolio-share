"use client"

import { useRef, useState, useEffect } from "react"
import { motion, useInView, AnimatePresence } from "framer-motion"
import { SectionHeading } from "@/components/section-heading"
import { CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ExternalLinkIcon, CodeIcon, StarIcon, GitBranchIcon, GitForkIcon, GithubIcon } from "lucide-react"

// Simulated API fetch function (in a real app, this would be a real API call)
const fetchCodingProfiles = async () => {
  // Return mock data (in a real app, this would be real API data)
  return {
    leetcode: {
      username: "Anubhab_Rakshit",
      totalSolved: 43,
      easySolved: 29,
      mediumSolved: 11,
      hardSolved: 3,
      ranking: 2060306,
      contestRating: 1850,
      profileUrl: "https://leetcode.com/u/Anubhab_Rakshit/", // Added profile URL
      badges: ["Apr Leetcode Challenge"],
      recentSubmissions: [
        { problem: "Combination Sum", difficulty: "Medium", date: "6 months ago", link: "#" },
        { problem: "3Sum Closet", difficulty: "Medium", date: "6 months ago", link: "#" },
        { problem: "Valid Parenthesis", difficulty: "Hard", date: "8 months ago", link: "#" },
        { problem: "Longest Common Prefix", difficulty: "Hard", date: "6 months ago", link: "#" },
        { problem: "Find if Digit Game Can be Won", difficulty: "Easy", date: "8 months ago", link: "#" },
      ],
      solvedByDifficulty: [
        { name: "Easy", value: 29, total: 870, color: "#00AF9B" },
        { name: "Medium", value: 11, total: 1819, color: "#FFC01E" },
        { name: "Hard", value: 3, total: 817, color: "#FF375F" },
      ],
      monthlyActivity: [
        { month: "Jun 2024", problems: 1 },
        { month: "Jul 2024", problems: 20 },
        { month: "Aug 2024", problems: 5 },
        { month: "Oct 2024", problems: 7 },
        
      ],
    },
    gfg: {
      username: "anubhabrakshit06",
      institute: "Jadavpur University",
      codingScore: 464,
      problemsSolved: 130,
      monthlyRank: 1589,
      overallRank: 19879,
      profileUrl: "https://www.geeksforgeeks.org/user/anubhabrakshit06/", // Added profile URL
      badges: ["Problem Solver", "DSA Expert"],
      recentSubmissions: [
        { problem: "LRU cache", difficulty: "Hard", date: "2 months ago", link: "#" },
        { problem: "Clone List with Next and Random", difficulty: "Hard", date: "2 months ago", link: "#" },
        { problem: "Remove loop in linked list", difficulty: "Medium", date: "2 months ago", link: "#" },
        { problem: "k-largest elements", difficulty: "Medium", date: "2 months ago", link: "#" },
        { problem: "Merge k-sorted Linked Lists", difficulty: "Medium", date: "2 months ago", link: "#" },
      ],
      topicWiseProgress: [
        { topic: "Arrays", solved: 13, total: 13 },
        { topic: "Strings", solved: 7, total: 7 },
        { topic: "Linked Lists", solved: 10, total: 10 },
        { topic: "Two Pointer Technique", solved: 10, total: 10 },
        { topic: "Matrix", solved: 6, total: 6 },
        { topic: "Tree", solved: 15, total: 15 },
      ],
      monthlyActivity: [
        { month: "Nov 2024", problems: 4 },
        { month: "Dec 2024", problems: 31 },
        { month: "Jan 2025", problems: 31 },
        { month: "Feb 2025", problems: 20 },
      ],
    },
    github: {
      username: "Anubhab-Rakshit",
      repositories: 25,
      stars: 1,
      followers: 3,
      following: 0,
      contributions: 366,
      profileUrl: "https://github.com/Anubhab-Rakshit", // Added profile URL
      topLanguages: [
        { name: "JavaScript", percentage: 40, color: "#F7DF1E" },
        { name: "HTML/CSS", percentage: 35, color: "#007396" },
        { name: "Python", percentage: 30, color: "#3776AB" },
        { name: "PHP", percentage: 20, color: "#00599C" },
        { name: "TypeScript", percentage: 15, color: "#3178C6" },
        { name: "C", percentage: 10, color: "#00599C" },
        { name: "Java", percentage: 10, color: "#007396" },
      ],
      popularRepos: [
        {
          name: "ai-ne-bola",
          stars: 0,
          forks: 3,
          description: "AI Ne Bola is a comprehensive project that predicts the number of death cases, case fatality ratio (CFR), and other related metrics for various scenarios using machine learning models. It also provides detailed 3D visualizations and interactive web interfaces for users to explore the predictions.",
        },
        {
          name: "syntaxerror-hacknovare",
          stars: 0,
          forks: 0,
          description: "CIVILIZED CHAOS is a web application designed to streamline issue reporting, authority management, and provide real-time insights with interactive graphs. This project offers a seamless way for citizens to report issues, view authorities, and access visual data analytics in a structured and responsive layout.",
        },
        {
          name: "paint-app",
          stars: 0,
          forks: 0,
          description: "A paint application with various tools and features made in Python and tkinter",
        },
        {
          name: "excuse-generator",
          stars: 20,
          forks: 5,
          description: "A simple ai excuse generator app made by Node.js , Express.js and Gemini API",
        },
      ],
      contributionActivity: [
        { day: "Mon", commits: 5 },
        { day: "Tue", commits: 8 },
        { day: "Wed", commits: 12 },
        { day: "Thu", commits: 7 },
        { day: "Fri", commits: 10 },
        { day: "Sat", commits: 3 },
        { day: "Sun", commits: 2 },
      ],
    },
  }
}

export default function CodingProfiles() {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })
  const [profileData, setProfileData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [activeTab, setActiveTab] = useState("leetcode")

  // Fetch profile data
  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchCodingProfiles()
        setProfileData(data)
      } catch (error) {
        console.error("Error fetching coding profiles:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [])

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 },
    },
  }

  // Animated card with glassmorphism effect
  const GlassCard = ({ children, className = "" }) => (
    <motion.div
      variants={itemVariants}
      className={`relative overflow-hidden rounded-xl backdrop-blur-md bg-white/10 dark:bg-black/10 border border-white/20 dark:border-white/10 shadow-xl ${className}`}
    >
      {/* Glassmorphism highlight effect */}
      <div className="absolute top-0 left-0 right-0 h-24 bg-gradient-to-b from-white/20 to-transparent" />
      <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-black/20 to-transparent" />

      {/* Content */}
      <div className="relative z-10">{children}</div>
    </motion.div>
  )

  // Animated progress bar
  const AnimatedProgressBar = ({ value, max, color, label }) => {
    const percentage = (value / max) * 100

    return (
      <div className="space-y-1">
        <div className="flex justify-between text-sm">
          <span>{label}</span>
          <span>
            {value}/{max}
          </span>
        </div>
        <div className="relative h-2 w-full bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
          <motion.div
            className="absolute top-0 left-0 h-full rounded-full"
            style={{ backgroundColor: color }}
            initial={{ width: 0 }}
            animate={{ width: `${percentage}%` }}
            transition={{ duration: 1, delay: 0.2 }}
          />
        </div>
      </div>
    )
  }

  // Animated bar chart
  const BarChart = ({ data, valueKey, labelKey, colorKey = null }) => {
    const maxValue = Math.max(...data.map((item) => item[valueKey]))

    return (
      <div className="flex items-end h-40 gap-2">
        {data.map((item, index) => (
          <div key={index} className="flex flex-col items-center flex-1">
            <motion.div
              className="w-full rounded-t-md"
              style={{
                backgroundColor: colorKey ? item[colorKey] : "#6366F1",
                height: `${(item[valueKey] / maxValue) * 100}%`,
              }}
              initial={{ height: 0 }}
              animate={{ height: `${(item[valueKey] / maxValue) * 100}%` }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ opacity: 0.8 }}
            />
            <div className="text-xs mt-1">{item[labelKey]}</div>
          </div>
        ))}
      </div>
    )
  }

  // Animated language bar
  const LanguageBar = ({ languages }) => {
    return (
      <div className="w-full h-6 rounded-full overflow-hidden flex">
        {languages.map((lang, index) => (
          <motion.div
            key={index}
            className="h-full relative group"
            style={{
              width: `${lang.percentage}%`,
              backgroundColor: lang.color,
            }}
            initial={{ width: 0 }}
            animate={{ width: `${lang.percentage}%` }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
          >
            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 flex items-center justify-center bg-black/30 transition-opacity">
              <span className="text-xs text-white font-medium">{lang.name}</span>
            </div>
          </motion.div>
        ))}
      </div>
    )
  }

  // Repository card with hover effects
  const RepoCard = ({ repo, index }) => {
    const [isHovered, setIsHovered] = useState(false)

    return (
      <motion.div
        variants={itemVariants}
        className="relative overflow-hidden rounded-lg border border-white/10 dark:border-white/5 transition-all duration-300"
        style={{
          background: isHovered
            ? "linear-gradient(135deg, rgba(99,102,241,0.1) 0%, rgba(139,92,246,0.1) 100%)"
            : "rgba(255,255,255,0.05)",
        }}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        whileHover={{
          scale: 1.03,
          boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)",
        }}
      >
        <div className="p-4">
          <div className="flex justify-between items-start">
            <h4 className="font-medium flex items-center">
              <GitBranchIcon className="h-4 w-4 mr-2 text-primary" />
              {repo.name}
            </h4>
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-1 text-sm">
                <StarIcon className="h-4 w-4 text-yellow-400" />
                <span>{repo.stars}</span>
              </div>
              <div className="flex items-center gap-1 text-sm text-muted-foreground">
                <GitForkIcon className="h-4 w-4" />
                <span>{repo.forks}</span>
              </div>
            </div>
          </div>

          <p className="mt-2 text-sm text-muted-foreground line-clamp-2">{repo.description}</p>

          {/* Animated corner */}
          <div className="absolute bottom-0 right-0 w-12 h-12 overflow-hidden">
            <div
              className="absolute bottom-0 right-0 w-24 h-24 -mb-12 -mr-12 transform rotate-45 bg-primary/10 transition-all duration-300"
              style={{
                transform: isHovered ? "rotate(45deg) scale(1.2)" : "rotate(45deg) scale(1)",
              }}
            />
          </div>
        </div>
      </motion.div>
    )
  }

  // Loading skeleton
  const LoadingSkeleton = () => (
    <div className="space-y-8">
      <div className="h-12 bg-gray-200 dark:bg-gray-800 rounded-md animate-pulse" />
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="h-80 bg-gray-200 dark:bg-gray-800 rounded-xl animate-pulse" />
        <div className="lg:col-span-2 h-80 bg-gray-200 dark:bg-gray-800 rounded-xl animate-pulse" />
      </div>
    </div>
  )

  // Render LeetCode profile
  const renderLeetCodeProfile = () => {
    const leetcode = profileData?.leetcode

    if (!leetcode) return null

    return (
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        className="grid grid-cols-1 lg:grid-cols-3 gap-8"
      >
        <GlassCard className="lg:col-span-1">
          <CardHeader>
            <div className="flex items-center gap-4">
              <div className="relative w-16 h-16 rounded-full overflow-hidden bg-gradient-to-br from-orange-400 to-yellow-500 flex items-center justify-center">
                <CodeIcon className="h-8 w-8 text-white" />
              </div>
              <div>
                <CardTitle>{leetcode.username}</CardTitle>
                <CardDescription>LeetCode Profile</CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1">
                <p className="text-sm text-muted-foreground">Total Solved</p>
                <motion.p
                  className="text-2xl font-bold"
                  initial={{ opacity: 0, scale: 0.5 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                >
                  {leetcode.totalSolved}
                </motion.p>
              </div>
              <div className="space-y-1">
                <p className="text-sm text-muted-foreground">Ranking</p>
                <motion.p
                  className="text-2xl font-bold"
                  initial={{ opacity: 0, scale: 0.5 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: 0.3 }}
                >
                  {leetcode.ranking}
                </motion.p>
              </div>
              <div className="space-y-1">
                <p className="text-sm text-muted-foreground">Contest Rating</p>
                <motion.p
                  className="text-2xl font-bold"
                  initial={{ opacity: 0, scale: 0.5 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: 0.4 }}
                >
                  {leetcode.contestRating}
                </motion.p>
              </div>
            </div>

            <div className="pt-4">
              <p className="text-sm font-medium mb-2">Problem Solving</p>
              <div className="grid grid-cols-3 gap-2 text-center">
                {leetcode.solvedByDifficulty.map((difficulty, index) => (
                  <motion.div
                    key={index}
                    className="rounded-md p-2"
                    style={{ backgroundColor: `${difficulty.color}20` }}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.2 + index * 0.1 }}
                  >
                    <motion.p
                      className="text-lg font-bold"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.5, delay: 0.5 + index * 0.1 }}
                    >
                      {difficulty.value}
                    </motion.p>
                    <p className="text-xs">{difficulty.name}</p>
                    <div className="mt-1 h-1 w-full bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                      <motion.div
                        className="h-full rounded-full"
                        style={{ backgroundColor: difficulty.color }}
                        initial={{ width: 0 }}
                        animate={{ width: `${(difficulty.value / difficulty.total) * 100}%` }}
                        transition={{ duration: 1, delay: 0.7 + index * 0.1 }}
                      />
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            <div className="pt-4">
              <p className="text-sm font-medium mb-2">Badges</p>
              <div className="flex flex-wrap gap-2">
                {leetcode.badges.map((badge, index) => (
                  <motion.span
                    key={index}
                    className="px-2 py-1 bg-primary/10 rounded-full text-xs"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.3, delay: 0.2 + index * 0.1 }}
                    whileHover={{ scale: 1.1 }}
                  >
                    {badge}
                  </motion.span>
                ))}
              </div>
            </div>

            {/* Added profile link button */}
            <Button
              className="w-full bg-gradient-to-r from-orange-500 to-yellow-500 hover:from-orange-600 hover:to-yellow-600"
              asChild
            >
              <a href={leetcode.profileUrl} target="_blank" rel="noopener noreferrer">
                <ExternalLinkIcon className="mr-2 h-4 w-4" />
                Visit My LeetCode Profile
              </a>
            </Button>
          </CardContent>
        </GlassCard>

        <GlassCard className="lg:col-span-2">
          <Tabs defaultValue="submissions" className="w-full">
            <CardHeader>
              <div className="flex justify-between items-center">
                <CardTitle>LeetCode Activity</CardTitle>
                <TabsList className="bg-white/10 dark:bg-black/10">
                  <TabsTrigger value="submissions">Submissions</TabsTrigger>
                  <TabsTrigger value="activity">Monthly Activity</TabsTrigger>
                </TabsList>
              </div>
            </CardHeader>
            <CardContent>
              <TabsContent value="submissions" className="mt-0">
                <div className="space-y-6">
                  {leetcode.recentSubmissions.map((submission, index) => (
                    <motion.div
                      key={index}
                      className="flex gap-4 p-3 rounded-lg hover:bg-white/5 transition-colors"
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                    >
                      <div className="w-2 h-2 rounded-full bg-primary mt-2"></div>
                      <div className="space-y-1 flex-1">
                        <div className="flex items-center justify-between">
                          <h4 className="font-medium">{submission.problem}</h4>
                          <span className="text-sm text-muted-foreground">{submission.date}</span>
                        </div>
                        <div className="flex items-center">
                          <span
                            className={`text-xs px-2 py-0.5 rounded-full ${
                              submission.difficulty === "Easy"
                                ? "bg-green-500/20 text-green-700 dark:text-green-400"
                                : submission.difficulty === "Medium"
                                  ? "bg-yellow-500/20 text-yellow-700 dark:text-yellow-400"
                                  : "bg-red-500/20 text-red-700 dark:text-red-400"
                            }`}
                          >
                            {submission.difficulty}
                          </span>
                          <a
                            href={submission.link}
                            className="ml-2 text-xs text-primary hover:underline"
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            View Solution
                          </a>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="activity" className="mt-0">
                <div className="h-64">
                  <BarChart data={leetcode.monthlyActivity} valueKey="problems" labelKey="month" />
                </div>
              </TabsContent>
            </CardContent>
          </Tabs>
        </GlassCard>
      </motion.div>
    )
  }

  // Render GeeksForGeeks profile
  const renderGFGProfile = () => {
    const gfg = profileData?.gfg

    if (!gfg) return null

    return (
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        className="grid grid-cols-1 lg:grid-cols-3 gap-8"
      >
        <GlassCard className="lg:col-span-1">
          <CardHeader>
            <div className="flex items-center gap-4">
              <div className="relative w-16 h-16 rounded-full overflow-hidden bg-gradient-to-br from-green-400 to-green-600 flex items-center justify-center">
                <CodeIcon className="h-8 w-8 text-white" />
              </div>
              <div>
                <CardTitle>{gfg.username}</CardTitle>
                <CardDescription>{gfg.institute}</CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1">
                <p className="text-sm text-muted-foreground">Coding Score</p>
                <motion.p
                  className="text-2xl font-bold"
                  initial={{ opacity: 0, scale: 0.5 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                >
                  {gfg.codingScore}
                </motion.p>
              </div>
              <div className="space-y-1">
                <p className="text-sm text-muted-foreground">Problems Solved</p>
                <motion.p
                  className="text-2xl font-bold"
                  initial={{ opacity: 0, scale: 0.5 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: 0.3 }}
                >
                  {gfg.problemsSolved}
                </motion.p>
              </div>
              <div className="space-y-1">
                <p className="text-sm text-muted-foreground">Monthly Rank</p>
                <motion.p
                  className="text-2xl font-bold"
                  initial={{ opacity: 0, scale: 0.5 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: 0.4 }}
                >
                  {gfg.monthlyRank}
                </motion.p>
              </div>
              <div className="space-y-1">
                <p className="text-sm text-muted-foreground">Overall Rank</p>
                <motion.p
                  className="text-2xl font-bold"
                  initial={{ opacity: 0, scale: 0.5 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: 0.5 }}
                >
                  {gfg.overallRank}
                </motion.p>
              </div>
            </div>

            <div className="pt-4">
              <p className="text-sm font-medium mb-2">Badges</p>
              <div className="flex flex-wrap gap-2">
                {gfg.badges.map((badge, index) => (
                  <motion.span
                    key={index}
                    className="px-2 py-1 bg-green-500/10 text-green-700 dark:text-green-400 rounded-full text-xs"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.3, delay: 0.2 + index * 0.1 }}
                    whileHover={{ scale: 1.1 }}
                  >
                    {badge}
                  </motion.span>
                ))}
              </div>
            </div>

            {/* Added profile link button */}
            <Button
              className="w-full bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700"
              asChild
            >
              <a href={gfg.profileUrl} target="_blank" rel="noopener noreferrer">
                <ExternalLinkIcon className="mr-2 h-4 w-4" />
                Visit My GeeksForGeeks Profile
              </a>
            </Button>
          </CardContent>
        </GlassCard>

        <GlassCard className="lg:col-span-2">
          <Tabs defaultValue="topics" className="w-full">
            <CardHeader>
              <div className="flex justify-between items-center">
                <CardTitle>GeeksForGeeks Progress</CardTitle>
                <TabsList className="bg-white/10 dark:bg-black/10">
                  <TabsTrigger value="topics">Topic Progress</TabsTrigger>
                  <TabsTrigger value="submissions">Recent Submissions</TabsTrigger>
                  <TabsTrigger value="activity">Monthly Activity</TabsTrigger>
                </TabsList>
              </div>
            </CardHeader>
            <CardContent>
              <TabsContent value="topics" className="mt-0">
                <div className="space-y-4">
                  {gfg.topicWiseProgress.map((topic, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                    >
                      <AnimatedProgressBar value={topic.solved} max={topic.total} color="#4C9F70" label={topic.topic} />
                    </motion.div>
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="submissions" className="mt-0">
                <div className="space-y-6">
                  {gfg.recentSubmissions.map((submission, index) => (
                    <motion.div
                      key={index}
                      className="flex gap-4 p-3 rounded-lg hover:bg-white/5 transition-colors"
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                    >
                      <div className="w-2 h-2 rounded-full bg-green-500 mt-2"></div>
                      <div className="space-y-1 flex-1">
                        <div className="flex items-center justify-between">
                          <h4 className="font-medium">{submission.problem}</h4>
                          <span className="text-sm text-muted-foreground">{submission.date}</span>
                        </div>
                        <div className="flex items-center">
                          <span
                            className={`text-xs px-2 py-0.5 rounded-full ${
                              submission.difficulty === "Easy"
                                ? "bg-green-500/20 text-green-700 dark:text-green-400"
                                : submission.difficulty === "Medium"
                                  ? "bg-yellow-500/20 text-yellow-700 dark:text-yellow-400"
                                  : "bg-red-500/20 text-red-700 dark:text-red-400"
                            }`}
                          >
                            {submission.difficulty}
                          </span>
                          <a
                            href={submission.link}
                            className="ml-2 text-xs text-primary hover:underline"
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            View Solution
                          </a>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="activity" className="mt-0">
                <div className="h-64">
                  <BarChart data={gfg.monthlyActivity} valueKey="problems" labelKey="month" />
                </div>
              </TabsContent>
            </CardContent>
          </Tabs>
        </GlassCard>
      </motion.div>
    )
  }

  // Render GitHub profile
  const renderGitHubProfile = () => {
    const github = profileData?.github

    if (!github) return null

    return (
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        className="grid grid-cols-1 lg:grid-cols-3 gap-8"
      >
        <GlassCard className="lg:col-span-1">
          <CardHeader>
            <div className="flex items-center gap-4">
              <div className="relative w-16 h-16 rounded-full overflow-hidden bg-gradient-to-br from-gray-700 to-gray-900 flex items-center justify-center">
                <GithubIcon className="h-8 w-8 text-white" />
              </div>
              <div>
                <CardTitle>{github.username}</CardTitle>
                <CardDescription>GitHub Profile</CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-3 gap-4">
              <div className="space-y-1">
                <p className="text-sm text-muted-foreground">Repos</p>
                <motion.p
                  className="text-2xl font-bold"
                  initial={{ opacity: 0, scale: 0.5 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                >
                  {github.repositories}
                </motion.p>
              </div>
              <div className="space-y-1">
                <p className="text-sm text-muted-foreground">Stars</p>
                <motion.p
                  className="text-2xl font-bold"
                  initial={{ opacity: 0, scale: 0.5 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: 0.3 }}
                >
                  {github.stars}
                </motion.p>
              </div>
              <div className="space-y-1">
                <p className="text-sm text-muted-foreground">Contributions</p>
                <motion.p
                  className="text-2xl font-bold"
                  initial={{ opacity: 0, scale: 0.5 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: 0.4 }}
                >
                  {github.contributions}
                </motion.p>
              </div>
            </div>

            <div className="pt-4">
              <p className="text-sm font-medium mb-2">Top Languages</p>
              <LanguageBar languages={github.topLanguages} />
              <div className="grid grid-cols-2 gap-2 mt-2">
                {github.topLanguages.map((lang, index) => (
                  <div key={index} className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full" style={{ backgroundColor: lang.color }} />
                    <span className="text-xs">{lang.name}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="pt-2 flex justify-between">
              <div className="space-y-1">
                <p className="text-sm text-muted-foreground">Followers</p>
                <p className="text-lg font-medium">{github.followers}</p>
              </div>
              <div className="space-y-1">
                <p className="text-sm text-muted-foreground">Following</p>
                <p className="text-lg font-medium">{github.following}</p>
              </div>
            </div>

            {/* Added profile link button */}
            <Button
              className="w-full bg-gradient-to-r from-gray-700 to-gray-900 hover:from-gray-800 hover:to-black"
              asChild
            >
              <a href={github.profileUrl} target="_blank" rel="noopener noreferrer">
                <GithubIcon className="mr-2 h-4 w-4" />
                Visit My GitHub Profile
              </a>
            </Button>
          </CardContent>
        </GlassCard>

        <GlassCard className="lg:col-span-2">
          <Tabs defaultValue="repos" className="w-full">
            <CardHeader>
              <div className="flex justify-between items-center">
                <CardTitle>GitHub Activity</CardTitle>
                <TabsList className="bg-white/10 dark:bg-black/10">
                  <TabsTrigger value="repos">Popular Repos</TabsTrigger>
                  <TabsTrigger value="activity">Contribution Activity</TabsTrigger>
                </TabsList>
              </div>
            </CardHeader>
            <CardContent>
              <TabsContent value="repos" className="mt-0">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {github.popularRepos.map((repo, index) => (
                    <RepoCard key={index} repo={repo} index={index} />
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="activity" className="mt-0">
                <div className="h-64">
                  <BarChart data={github.contributionActivity} valueKey="commits" labelKey="day" />
                </div>
                <div className="mt-4 p-4 bg-white/5 rounded-lg border border-white/10">
                  <div className="flex items-center justify-between">
                    <p className="text-sm">This Week's Contributions</p>
                    <p className="text-lg font-medium">
                      {github.contributionActivity.reduce((sum, day) => sum + day.commits, 0)} commits
                    </p>
                  </div>
                </div>
              </TabsContent>
            </CardContent>
          </Tabs>
        </GlassCard>
      </motion.div>
    )
  }

  return (
    <section id="coding" className="py-20" ref={ref}>
      <div className="container mx-auto px-4">
        <SectionHeading title="Coding Profiles" subtitle="My competitive programming journey" />

        <div className="mt-12">
          <Tabs defaultValue="leetcode" value={activeTab} onValueChange={setActiveTab} className="w-full">
            <div className="flex justify-center mb-8">
              <TabsList className="bg-white/10 dark:bg-black/10 p-1">
                <TabsTrigger value="leetcode" className="data-[state=active]:bg-primary">
                  LeetCode
                </TabsTrigger>
                <TabsTrigger value="gfg" className="data-[state=active]:bg-primary">
                  GeeksForGeeks
                </TabsTrigger>
                <TabsTrigger value="github" className="data-[state=active]:bg-primary">
                  GitHub
                </TabsTrigger>
              </TabsList>
            </div>

            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
              >
                <TabsContent value="leetcode" className="mt-0">
                  {renderLeetCodeProfile()}
                </TabsContent>

                <TabsContent value="gfg" className="mt-0">
                  {renderGFGProfile()}
                </TabsContent>

                <TabsContent value="github" className="mt-0">
                  {renderGitHubProfile()}
                </TabsContent>
              </motion.div>
            </AnimatePresence>
          </Tabs>
        </div>
      </div>
    </section>
  )
}

