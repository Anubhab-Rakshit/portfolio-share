"use client"

import { useRef } from "react"
import { useInView } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { CalendarIcon, GraduationCapIcon, BriefcaseIcon, CodeIcon } from "lucide-react"
import Image from "next/image"

const experiences = [
  {
    title: "Don Bosco School Siliguri",
    role: "Primary Education",
    description:
      "Completed Class 1-10 here. Developed a strong foundation in Mathematics and Science. Participated in numerous co-curricular activities. Childhood well spent here.",
    date: "2012 - 2022",
    type: "education",
    skills: ["Physics", "Biology","Chemistry","Mathematics", "Computer Science","Bengali","English","Geography","History","Hindi","Recitation","Singing","Drawing"],
    image: "/Images/dbs-siliguri.jpeg",
  },
  {
    title: "Techno India Group Public School, Siliguri",
    role: "Higher Secondary Education",
    description:
      "Completed Class 11-12 with a focus on Science and Mathematics. Participated in various technical competitions and developed a strong foundation in computer science.",
    date: "2022 - 2024",
    type: "education",
    skills: ["Physics", "Mathematics", "Computer Science","English","Chemistry","Physical Education"],
    image: "/Images/tigps-siliguri.jpeg",
  },
  {
    title: "Jadavpur University, Kolkata",
    role: "B.E. in Computer Science and Engineering",
    description:
      "Pursuing my bachelor's degree at one of India's premier engineering institutions, known for its academic excellence and research contributions.",
    date: "2024 - 2028",
    type: "education",
    skills: ["Data Structures", "Algorithms", "Machine Learning", "Web Development","AI/ML"],
    image: "/Images/jadavpur-university.jpeg",
  },
  
 
]

export default function Experience() {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  const getIcon = (type: string) => {
    switch (type) {
      case "education":
        return <GraduationCapIcon className="h-6 w-6" />
      case "work":
        return <BriefcaseIcon className="h-6 w-6" />
      case "volunteer":
        return <CodeIcon className="h-6 w-6" />
      default:
        return <CalendarIcon className="h-6 w-6" />
    }
  }

  const getTypeColor = (type: string) => {
    switch (type) {
      case "education":
        return "bg-blue-500/10 text-blue-500"
      case "work":
        return "bg-green-500/10 text-green-500"
      case "volunteer":
        return "bg-purple-500/10 text-purple-500"
      default:
        return "bg-gray-500/10 text-gray-500"
    }
  }

  return (
    <section id="experience" className="py-20">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">Experience & Education</h2>

        <div className="relative max-w-4xl mx-auto" ref={ref}>
          {/* Vertical line */}
          <div className="absolute left-0 md:left-1/2 top-0 bottom-0 w-1 bg-gradient-to-b from-blue-500 to-purple-500 transform md:translate-x-[-50%]"></div>

          {experiences.map((experience, index) => (
            <div
              key={index}
              className={`relative mb-12 md:w-1/2 ${
                index % 2 === 0 ? "md:ml-auto md:pl-10" : "md:mr-auto md:pr-10 md:text-right"
              } pl-10 md:pl-0`}
            >
              {/* Circle on the timeline */}
              <div
                className={`absolute left-[-8px] md:left-auto ${
                  index % 2 === 0 ? "md:left-[-8px]" : "md:right-[-8px]"
                } top-6 w-4 h-4 rounded-full bg-primary border-4 border-background`}
              ></div>

              <Card className="overflow-hidden">
                <CardContent className="p-6">
                  <div className="flex flex-col items-center gap-4">
                    {/* Type Icon (Education, Work, etc.) */}
                    <div className={`p-2 rounded-full ${getTypeColor(experience.type)}`}>
                      {getIcon(experience.type)}
                    </div>

                    {/* Institution/Company Image */}
                    <div className="relative w-40 h-40 rounded-lg overflow-hidden shadow-lg border-2 border-background">
                      <Image
                        src={experience.image || "/placeholder.svg"}
                        alt={experience.title}
                        width={300}
                        height={300}
                        className="object-cover w-full h-full"
                      />
                    </div>

                    {/* Text Content */}
                    <div className={`w-full ${index % 2 !== 0 ? "md:text-right" : ""}`}>
                      <div className="flex items-center gap-2 mb-1 justify-center md:justify-start">
                        <Badge variant="outline">{experience.date}</Badge>
                        <Badge variant="secondary" className={getTypeColor(experience.type)}>
                          {experience.type}
                        </Badge>
                      </div>
                      <h3 className="text-xl font-bold text-center md:text-left">{experience.title}</h3>
                      <p className="text-muted-foreground font-medium mb-2 text-center md:text-left">{experience.role}</p>
                      <p className="text-muted-foreground mb-4 text-center md:text-left">{experience.description}</p>

                      <div className="flex flex-wrap gap-2 justify-center md:justify-start">
                        {experience.skills.map((skill, i) => (
                          <Badge key={i} variant="outline">
                            {skill}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}