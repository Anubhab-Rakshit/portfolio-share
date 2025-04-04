"use client"

import { useRef, useState } from "react"
import { motion, useInView } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { AtSignIcon, GithubIcon, LinkedinIcon, MapPinIcon, PhoneIcon, TwitterIcon, YoutubeIcon, InstagramIcon } from "lucide-react"

export default function Contact() {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [error, setError] = useState("")

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsSubmitting(true)
    setError("")
    
    const formData = new FormData(e.target)
    
    try {
      // Using FormSubmit.co service - they provide a simple way to handle form submissions and forward to email
      // Replace with your own backend endpoint if you have one
      const response = await fetch(`https://formsubmit.co/${encodeURIComponent("coder.anubhab26@gmail.com")}`, {
        method: "POST",
        body: formData,
        headers: {
          Accept: "application/json",
        },
      })
      
      if (!response.ok) {
        throw new Error("Failed to submit form")
      }
      
      setIsSubmitted(true)
    } catch (err) {
      console.error("Form submission error:", err)
      setError("There was a problem sending your message. Please try again.")
    } finally {
      setIsSubmitting(false)
    }
  }

  const contactInfo = [
    {
      icon: <AtSignIcon className="h-5 w-5" />,
      title: "Email",
      value: "coder.anubhab26@gmail.com",
      link: "mailto:coder.anubhab26@gmail.com",
    },
    
    {
      icon: <MapPinIcon className="h-5 w-5" />,
      title: "Location",
      value: "Siliguri, West Bengal, India",
      link: "https://maps.google.com/?q=Siliguri,India",
    },
  ]

  const socialLinks = [
    {
      icon: <GithubIcon className="h-5 w-5" />,
      title: "GitHub",
      link: "https://github.com/Anubhab-Rakshit",
    },
    {
      icon: <LinkedinIcon className="h-5 w-5" />,
      title: "LinkedIn",
      link: "https://www.linkedin.com/in/anubhab-rakshit/",
    },
    {
      icon: <TwitterIcon className="h-5 w-5" />,
      title: "Twitter",
      link: "https://x.com/anubhab_26",
    },
    {
      icon: <YoutubeIcon className="h-5 w-5" />,
      title: "Youtube",
      link: "https://www.youtube.com/@theallmasteranubhab7686",
    },
    {
      icon: <InstagramIcon className="h-5 w-5" />,
      title: "Instagram",
      link: "https://www.instagram.com/dauntless._.ar",
    },
  ]

  return (
    <section id="contact" className="py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        <motion.h2
          className="text-3xl md:text-4xl font-bold text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.5 }}
        >
          Get In Touch
        </motion.h2>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8" ref={ref}>
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }}
            transition={{ duration: 0.5 }}
            className="space-y-6"
          >
            <h3 className="text-2xl font-bold mb-4">Contact Information</h3>
            <p className="text-muted-foreground mb-8">
              Feel free to reach out to me through any of the following channels. I'm always open to discussing new
              projects, opportunities, or partnerships.
            </p>

            <div className="space-y-4">
              {contactInfo.map((info, index) => (
                <div key={index} className="flex items-center gap-4">
                  <div className="p-3 rounded-full bg-primary/10">{info.icon}</div>
                  <div>
                    <p className="text-sm text-muted-foreground">{info.title}</p>
                    <a
                      href={info.link}
                      className="font-medium hover:underline"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {info.value}
                    </a>
                  </div>
                </div>
              ))}
            </div>

            <div className="pt-6">
              <h3 className="text-xl font-bold mb-4">Connect With Me</h3>
              <div className="flex gap-4">
                {socialLinks.map((social, index) => (
                  <a
                    key={index}
                    href={social.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-3 rounded-full bg-primary/10 hover:bg-primary/20 transition-colors"
                    aria-label={social.title}
                  >
                    {social.icon}
                  </a>
                ))}
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 50 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <Card>
              <CardContent className="p-6">
                <h3 className="text-2xl font-bold mb-6">Send Me a Message</h3>
                {isSubmitted ? (
                  <div className="text-center py-8">
                    <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-green-100 text-green-500 mb-4">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-8 w-8"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <h4 className="text-xl font-bold mb-2">Message Sent!</h4>
                    <p className="text-muted-foreground">Thank you for your message. I'll get back to you soon.</p>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-4">
                    {/* Hidden inputs for FormSubmit configuration */}
                    <input type="hidden" name="_subject" value="New portfolio contact message" />
                    <input type="hidden" name="_captcha" value="false" />
                    <input type="hidden" name="_template" value="table" />
                    <input type="hidden" name="_next" value={typeof window !== 'undefined' ? window.location.href : ''} />
                    
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <label htmlFor="name" className="text-sm font-medium">
                          Name
                        </label>
                        <Input id="name" name="name" placeholder="Your name" required />
                      </div>
                      <div className="space-y-2">
                        <label htmlFor="email" className="text-sm font-medium">
                          Email
                        </label>
                        <Input id="email" name="email" type="email" placeholder="Your email" required />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <label htmlFor="subject" className="text-sm font-medium">
                        Subject
                      </label>
                      <Input id="subject" name="subject" placeholder="Subject" required />
                    </div>
                    <div className="space-y-2">
                      <label htmlFor="message" className="text-sm font-medium">
                        Message
                      </label>
                      <Textarea id="message" name="message" placeholder="Your message" rows={5} required />
                    </div>
                    {error && <p className="text-red-500 text-sm">{error}</p>}
                    <Button type="submit" className="w-full" variant="gradient" disabled={isSubmitting}>
                      {isSubmitting ? "Sending..." : "Send Message"}
                    </Button>
                  </form>
                )}
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </section>
  )
}