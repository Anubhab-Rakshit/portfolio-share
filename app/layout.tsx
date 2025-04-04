import type React from "react"
import type { Metadata } from "next"
import { Poppins, Montserrat } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import Navbar from "@/components/navbar"
import InteractiveBackground from "@/components/interactive-background"


// Use Poppins for headings and Montserrat for body text
const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-poppins",
})

const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  variable: "--font-montserrat",
})

export const metadata: Metadata = {
  title: "Anubhab Rakshit | Portfolio",
  description: "Personal portfolio of Anubhab Rakshit, a Computer Science student at Jadavpur University",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${poppins.variable} ${montserrat.variable} font-sans`}>
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
          <Navbar />
          <InteractiveBackground />
          
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}



import './globals.css'