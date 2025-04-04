import type { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import {
  CheckIcon,
  CodeIcon,
  DatabaseIcon,
  LayoutIcon,
  MessageSquareIcon,
  PaintbrushIcon,
  SearchIcon,
} from "lucide-react"

export const metadata: Metadata = {
  title: "Services | Anubhab Rakshit",
  description: "Professional services offered by Anubhab Rakshit",
}

const services = [
  {
    icon: <LayoutIcon className="h-10 w-10 text-blue-500" />,
    title: "Web Development",
    description:
      "Custom websites and web applications built with modern technologies like React, Next.js, and Node.js.",
    features: [
      "Responsive design for all devices",
      "Performance optimization",
      "SEO-friendly structure",
      "Modern UI/UX implementation",
      "Integration with third-party services",
    ],
    cta: "Start a Project",
  },
  {
    icon: <PaintbrushIcon className="h-10 w-10 text-purple-500" />,
    title: "UI/UX Design",
    description: "User-centered design solutions that enhance user experience and drive engagement.",
    features: [
      "User research and personas",
      "Wireframing and prototyping",
      "Interactive mockups",
      "Usability testing",
      "Design system creation",
    ],
    cta: "Request Design",
  },
  {
    icon: <DatabaseIcon className="h-10 w-10 text-green-500" />,
    title: "Database Design",
    description: "Efficient and scalable database solutions for your applications and business needs.",
    features: [
      "Schema design and optimization",
      "Data migration and integration",
      "Query optimization",
      "Database security implementation",
      "Backup and recovery solutions",
    ],
    cta: "Discuss Requirements",
  },
 
  {
    icon: <MessageSquareIcon className="h-10 w-10 text-yellow-500" />,
    title: "Technical Consultation",
    description: "Expert advice on technology selection, architecture, and implementation strategies.",
    features: [
      "Technology stack evaluation",
      "Architecture review",
      "Performance assessment",
      "Security audit",
      "Scalability planning",
    ],
    cta: "Book Consultation",
  },
  {
    icon: <SearchIcon className="h-10 w-10 text-indigo-500" />,
    title: "Code Review & Optimization",
    description: "Comprehensive code review and optimization to improve quality and performance.",
    features: [
      "Code quality assessment",
      "Performance bottleneck identification",
      "Refactoring recommendations",
      "Best practices implementation",
      "Documentation improvement",
    ],
    cta: "Request Review",
  },
]

const processSteps = [
  {
    number: "01",
    title: "Discovery",
    description: "We start by understanding your requirements, goals, and challenges through detailed discussions.",
  },
  {
    number: "02",
    title: "Planning",
    description:
      "Based on the discovery, we create a comprehensive plan outlining the scope, timeline, and deliverables.",
  },
  {
    number: "03",
    title: "Design",
    description: "We design the solution architecture and user interfaces, incorporating your feedback at every step.",
  },
  {
    number: "04",
    title: "Development",
    description: "Our development process follows best practices with regular updates and milestone reviews.",
  },
  {
    number: "05",
    title: "Testing",
    description: "Rigorous testing ensures the solution meets quality standards and performs as expected.",
  },
  {
    number: "06",
    title: "Deployment",
    description: "We handle the deployment process, ensuring a smooth transition to production.",
  },
  {
    number: "07",
    title: "Support",
    description: "Post-deployment support and maintenance to ensure continued success of your solution.",
  },
]

export default function ServicesPage() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between py-24">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">My Services</h1>
          <p className="text-muted-foreground text-lg">
            Comprehensive solutions tailored to your specific needs and requirements.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
          {services.map((service, index) => (
            <Card key={index} className="hover:shadow-lg transition-all duration-300">
              <CardHeader>
                <div className="mb-4">{service.icon}</div>
                <CardTitle className="text-2xl">{service.title}</CardTitle>
                <CardDescription>{service.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {service.features.map((feature, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <CheckIcon className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
              <CardFooter>
                <Button className="w-full">{service.cta}</Button>
              </CardFooter>
            </Card>
          ))}
        </div>

        <div className="mb-20">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <h2 className="text-3xl font-bold mb-4">My Process</h2>
            <p className="text-muted-foreground">
              A structured approach to ensure successful project delivery and client satisfaction.
            </p>
          </div>

          <div className="relative">
            <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-muted hidden md:block"></div>

            <div className="space-y-12">
              {processSteps.map((step, index) => (
                <div key={index} className="relative">
                  <div
                    className={`md:absolute md:left-1/2 md:transform md:-translate-x-1/2 z-10 w-12 h-12 rounded-full flex items-center justify-center ${index % 2 === 0 ? "bg-blue-500" : "bg-purple-500"} text-white font-bold mx-auto md:mx-0 mb-4 md:mb-0`}
                  >
                    {step.number}
                  </div>

                  <div className={`md:flex ${index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"} items-center`}>
                    <div className={`md:w-1/2 ${index % 2 === 0 ? "md:pr-16 md:text-right" : "md:pl-16"}`}>
                      <h3 className="text-xl font-bold mb-2">{step.title}</h3>
                      <p className="text-muted-foreground">{step.description}</p>
                    </div>
                    <div className="md:w-1/2"></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="bg-muted/30 rounded-xl p-8 md:p-12">
          <div className="flex flex-col md:flex-row items-center gap-8">
            <div className="md:w-1/2">
              <h2 className="text-3xl font-bold mb-4">Ready to Start Your Project?</h2>
              <p className="text-muted-foreground mb-6">
                Let's discuss your requirements and how I can help you achieve your goals. Whether you need a website, a
                custom algorithm, or technical consultation, I'm here to help.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button size="lg" asChild>
                  <Link href="/">Get in Touch</Link>
                </Button>
                <Button size="lg" variant="outline" asChild>
                  <Link href="/projects">View My Work</Link>
                </Button>
              </div>
            </div>
            <div className="md:w-1/2">
              <div className="relative h-64 w-full rounded-xl overflow-hidden">
                <Image src="/Images/tech-help.jpeg" alt="Collaboration" fill className="object-cover" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}

