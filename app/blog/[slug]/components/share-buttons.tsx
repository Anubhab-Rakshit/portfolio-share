"use client"

import { Button } from "@/components/ui/button"
import { Facebook, Twitter, Linkedin, LinkIcon } from "lucide-react"
import { useState, useEffect } from "react"

export function ShareButtons({ title = "Check out this blog post!" }) {
  const [currentUrl, setCurrentUrl] = useState("")
  const [copied, setCopied] = useState(false)

  useEffect(() => {
    setCurrentUrl(window.location.href)
  }, [])

  const shareOnTwitter = () => {
    window.open(
      `https://twitter.com/intent/tweet?text=${encodeURIComponent(title)}&url=${encodeURIComponent(currentUrl)}`,
      "_blank",
    )
  }

  const shareOnFacebook = () => {
    window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(currentUrl)}`, "_blank")
  }

  const shareOnLinkedIn = () => {
    window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(currentUrl)}`, "_blank")
  }

  const copyToClipboard = () => {
    navigator.clipboard.writeText(currentUrl)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="flex flex-wrap gap-2">
      <Button variant="outline" size="sm" onClick={shareOnTwitter}>
        <Twitter className="h-4 w-4 mr-2" />
        Twitter
      </Button>
      <Button variant="outline" size="sm" onClick={shareOnFacebook}>
        <Facebook className="h-4 w-4 mr-2" />
        Facebook
      </Button>
      <Button variant="outline" size="sm" onClick={shareOnLinkedIn}>
        <Linkedin className="h-4 w-4 mr-2" />
        LinkedIn
      </Button>
      <Button variant="outline" size="sm" onClick={copyToClipboard}>
        <LinkIcon className="h-4 w-4 mr-2" />
        {copied ? "Copied!" : "Copy Link"}
      </Button>
    </div>
  )
}

