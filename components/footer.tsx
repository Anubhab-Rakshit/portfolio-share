import Link from "next/link"
import { Button } from "@/components/ui/button"
import { GithubIcon, LinkedinIcon, TwitterIcon , InstagramIcon , YoutubeIcon} from "lucide-react"

export default function Footer() {
  const currentYear = new Date().getFullYear()

  const navItems = [
    { name: "Home", href: "#home" },
    { name: "About", href: "#about" },
    { name: "Skills", href: "#skills" },
    { name: "Projects", href: "/projects" },
    { name: "Experience", href: "#experience" },
    { name: "Contact", href: "#contact" },
  ]

  return (
    <footer className="border-t">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="md:col-span-2">
            <Link href="/" className="text-xl font-bold text-gradient">
              Anubhab Rakshit
            </Link>
            <p className="mt-4 text-muted-foreground">
              Computer Science student at Jadavpur University, passionate about building innovative solutions and
              exploring new technologies.
            </p>
            <div className="flex gap-4 mt-6">
              <Button variant="ghost" size="icon" className="rounded-full" asChild>
                <a href="https://github.com/Anubhab-Rakshit" target="_blank" rel="noopener noreferrer" aria-label="GitHub">
                  <GithubIcon className="h-5 w-5" />
                </a>
              </Button>
              <Button variant="ghost" size="icon" className="rounded-full" asChild>
                <a href="https://www.linkedin.com/in/anubhab-rakshit/" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
                  <LinkedinIcon className="h-5 w-5" />
                </a>
              </Button>
              <Button variant="ghost" size="icon" className="rounded-full" asChild>
                <a href="https://x.com/anubhab_26" target="_blank" rel="noopener noreferrer" aria-label="Twitter">
                  <TwitterIcon className="h-5 w-5" />
                </a>
              </Button>
              <Button variant="ghost" size="icon" className="rounded-full" asChild>
                <a href="https://www.youtube.com/@theallmasteranubhab7686" target="_blank" rel="noopener noreferrer" aria-label="Twitter">
                  <YoutubeIcon className="h-5 w-5" />
                </a>
              </Button>
              <Button variant="ghost" size="icon" className="rounded-full" asChild>
                <a href="https://www.instagram.com/dauntless._.ar" target="_blank" rel="noopener noreferrer" aria-label="Twitter">
                  <InstagramIcon className="h-5 w-5" />
                </a>
              </Button>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              {navItems.map((item) => (
                <li key={item.name}>
                  <Link href={item.href} className="text-muted-foreground hover:text-foreground transition-colors">
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Contact</h3>
            <ul className="space-y-2">
              <li className="text-muted-foreground">Siliguri, West Bengal, India</li>
              <li>
                <a
                  href="mailto:anubhab.rakshit@example.com"
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  coder.anubhab26@gmail.com
                </a>
              </li>
              <li>
              
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t mt-12 pt-6 flex flex-col sm:flex-row justify-between items-center">
          <p className="text-sm text-muted-foreground">© {currentYear} Anubhab Rakshit. All rights reserved.</p>
          <div className="mt-4 sm:mt-0">
            <ul className="flex gap-4 text-sm">
              <li>
                <Link href="/services" className="text-muted-foreground hover:text-foreground transition-colors">
                  Services Provided
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  )
}

