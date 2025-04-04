import Hero from "@/components/hero"
import About from "@/components/about"
import Skills from "@/components/skills"
import Projects from "@/components/projects"
import Experience from "@/components/experience"
import Contact from "@/components/contact"
import Footer from "@/components/footer"
import EnhancedParticlesBackground from "@/components/enhanced-particles-background"
import BlogPreview from "@/components/blog-preview"
import Achievements from "@/components/achievements"
import CodingProfiles from "@/components/coding-profiles"
import HobbiesLink from "@/components/hobbies-link"
import InteractiveBackground from "@/components/interactive-background"
import ParticlesBg from "@/components/particles-background"
export default function Home() {
  return (
    <main className="relative">
      {/* Global interactive background - positioned with negative z-index to stay behind content */}
      <InteractiveBackground/>
      <ParticlesBg />
      <EnhancedParticlesBackground />

      {/* Content sections */}
      <div className="relative z-10">
        {/* Hero section */}
        <Hero />

        {/* About section */}
        <About />

        {/* Skills section */}
        <Skills />

        {/* Projects section */}
        <Projects />

        {/* Experience section */}
        <Experience />

        {/* Achievements section */}
        <Achievements />

        {/* Coding Profiles section */}
        <CodingProfiles />

        {/* Blog Preview section */}
        <BlogPreview />

        {/* Hobbies section */}
        <HobbiesLink />

        {/* Contact section */}
        <Contact />

        {/* Footer */}
        <Footer />
      </div>
    </main>
  )
}

