"use client"

import type { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { AwardIcon, BriefcaseIcon, DownloadIcon, GraduationCapIcon, MailIcon, MapPinIcon, PhoneIcon, TrophyIcon } from "lucide-react"
import jsPDF from "jspdf"
import html2canvas from "html2canvas"



export default function ResumePage() {
  const DownloadPDF = () => {
    const [isLoading, setIsLoading] = useState(false);

    const generatePDF = async () => {
      setIsLoading(true);
      
      // Target the resume content
      const resumeElement = document.getElementById('resume-content');
      
      if (!resumeElement) {
        console.error("Resume content element not found");
        setIsLoading(false);
        return;
      }

      try {
        const canvas = await html2canvas(resumeElement, {
          scale: 2,
          useCORS: true,
          logging: false,
          allowTaint: true,
        });
        
        const imgData = canvas.toDataURL('image/png');
        
        // Page dimensions (A4)
        const pdf = new jsPDF({
          orientation: 'portrait',
          unit: 'mm',
          format: 'a4',
        });
        
        const pdfWidth = pdf.internal.pageSize.getWidth();
        const pdfHeight = pdf.internal.pageSize.getHeight();
        const imgWidth = canvas.width;
        const imgHeight = canvas.height;
        const ratio = Math.min(pdfWidth / imgWidth, pdfHeight / imgHeight);
        const imgX = (pdfWidth - imgWidth * ratio) / 2;
        
        pdf.addImage(
          imgData, 
          'PNG', 
          imgX, 
          0, 
          imgWidth * ratio, 
          imgHeight * ratio
        );
        
        // If content is too long, add more pages
        if (imgHeight * ratio > pdfHeight) {
          let remainingHeight = imgHeight * ratio;
          let currentPosition = 0;
          
          while (remainingHeight > 0) {
            currentPosition += pdfHeight;
            remainingHeight -= pdfHeight;
            
            if (remainingHeight > 0) {
              pdf.addPage();
              pdf.addImage(
                imgData, 
                'PNG', 
                imgX, 
                -currentPosition, 
                imgWidth * ratio, 
                imgHeight * ratio
              );
            }
          }
        }
        
        pdf.save('Anubhab_Rakshit_Resume.pdf');
      } catch (error) {
        console.error("Error generating PDF:", error);
      } finally {
        setIsLoading(false);
      }
    };

    return (
      <Button onClick={generatePDF} disabled={isLoading}>
        {isLoading ? (
          <span className="flex items-center">
            <svg className="animate-spin -ml-1 mr-3 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            Generating...
          </span>
        ) : (
          <>
            <DownloadIcon className="mr-2 h-4 w-4" />
            Download PDF
          </>
        )}
      </Button>
    );
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-between py-24">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">My Resume</h1>
          <p className="text-muted-foreground text-lg mb-6">
            A comprehensive overview of my education, skills, experience, and achievements.
          </p>
          <DownloadPDF />
        </div>

        <div id="resume-content" className="max-w-5xl mx-auto">
          <Card className="mb-12">
            <CardContent className="p-6 md:p-8">
              <div className="flex flex-col md:flex-row gap-8 items-center md:items-start">
                <div className="relative w-40 h-40 rounded-full overflow-hidden border-4 border-primary/10">
                  <Image
                    src="/Images/Anubhab Rakshit Profile Pic.jpg"
                    alt="Anubhab Rakshit"
                    fill
                    className="object-cover"
                  />
                </div>

                <div className="text-center md:text-left flex-1">
                  <h2 className="text-3xl font-bold mb-2">Anubhab Rakshit</h2>
                  <p className="text-xl text-muted-foreground mb-4">Computer Science Student</p>

                  <div className="flex flex-col md:flex-row gap-4 mb-6">
                    <div className="flex items-center justify-center md:justify-start gap-2 text-muted-foreground">
                      <MapPinIcon className="h-4 w-4" />
                      <span>Siliguri, West Bengal, India</span>
                    </div>
                    <div className="flex items-center justify-center md:justify-start gap-2 text-muted-foreground">
                      <MailIcon className="h-4 w-4" />
                      <a href="mailto:coder.anubhab26@gmail.com" className="hover:text-foreground transition-colors">
                        coder.anubhab26@gmail.com
                      </a>
                    </div>
                    
                  </div>

                  <p className="max-w-2xl mx-auto md:mx-0">
                    Passionate Computer Science student at Jadavpur University with strong problem-solving skills and
                    experience in web development, algorithms, and machine learning. Seeking opportunities to apply my
                    technical knowledge and creativity to solve real-world problems.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Tabs defaultValue="education" className="mb-12">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="education">Education</TabsTrigger>
              <TabsTrigger value="experience">Experience</TabsTrigger>
              <TabsTrigger value="skills">Skills</TabsTrigger>
              <TabsTrigger value="projects">Projects</TabsTrigger>
            </TabsList>

            <TabsContent value="education" className="mt-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <GraduationCapIcon className="h-5 w-5" />
                    Education
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-8">
                  <div className="flex flex-col md:flex-row gap-4">
                    <div className="md:w-1/4">
                      <div className="text-muted-foreground">2024 - Present</div>
                    </div>
                    <div className="md:w-3/4">
                      <h3 className="text-xl font-bold">Bachelor of Engineering in Computer Science and Engineering</h3>
                      <p className="text-muted-foreground mb-2">Jadavpur University, Kolkata</p>
                      <p className="mb-2">CGPA: Not given till now</p>
                      <p>Relevant Coursework:</p>
                      <ul className="list-disc list-inside space-y-1 text-muted-foreground">
                        <li>Data Structures and Algorithms</li>
                        <li>Database Management Systems</li>
                        <li>Operating Systems</li>
                        <li>Computer Networks</li>
                        <li>Machine Learning</li>
                        <li>Web Development</li>
                      </ul>
                    </div>
                  </div>

                  <div className="flex flex-col md:flex-row gap-4">
                    <div className="md:w-1/4">
                      <div className="text-muted-foreground">2022 - 2024</div>
                    </div>
                    <div className="md:w-3/4">
                      <h3 className="text-xl font-bold">Higher Secondary Education</h3>
                      <p className="text-muted-foreground mb-2">Techno India Group Public School , Siliguri</p>
                      <p className="mb-2">Percentage: 96%</p>
                      <p>Subjects: Physics, Chemistry, Mathematics, Computer Science, English, Physical Education</p>
                    </div>
                  </div>

                  <div className="flex flex-col md:flex-row gap-4">
                    <div className="md:w-1/4">
                      <div className="text-muted-foreground">2012-2022</div>
                    </div>
                    <div className="md:w-3/4">
                      <h3 className="text-xl font-bold">Primary Education</h3>
                      <p className="text-muted-foreground mb-2">Don Bosco School , Siliguri</p>
                      <p className="mb-2">Percentage: 97%</p>
                      <p>Subjects: Physics, Chemistry, Biology, Mathematics, Computer Science, English, Bengali , Hindi , Geography , History , Recitation , Singing , Drawing</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="experience" className="mt-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <BriefcaseIcon className="h-5 w-5" />
                    Experience
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-8">
                  <div className="flex flex-col md:flex-row gap-4">
                    <div className="md:w-1/4">
                      <div className="text-muted-foreground">2024 - Present</div>
                    </div>
                    <div className="md:w-3/4">
                      <h3 className="text-xl font-bold">IIT MADRAS BS DS </h3>
                      <p className="text-muted-foreground mb-2"></p>
                      <ul className="list-disc list-inside space-y-1 text-muted-foreground">
                        <li>Enrolled in a course of Data Science</li>
                        <li>BS Degree Course</li>
                        <li>Course by IIT MADRAS</li>
                        
                      </ul>
                    </div>
                  </div>
                  <div className="flex flex-col md:flex-row gap-4">
                    <div className="md:w-1/4">
                      <div className="text-muted-foreground">2024 - Present</div>
                    </div>
                    <div className="md:w-3/4">
                      <h3 className="text-xl font-bold">Minor in AI</h3>
                      <p className="text-muted-foreground mb-2"></p>
                      <ul className="list-disc list-inside space-y-1 text-muted-foreground">
                        <li>Enrolled in a course of Artificial Intelligence</li>
                        <li>Minor in AI Degree</li>
                        <li>Course by IIT ROPAR</li>
                        
                      </ul>
                    </div>
                  </div>

                  
                </CardContent>
              </Card>
            </TabsContent>
            

            <TabsContent value="skills" className="mt-6">
              <Card>
                <CardHeader>
                  <CardTitle>Technical Skills</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div>
                      <h3 className="text-lg font-semibold mb-4">Programming Languages</h3>
                      <div className="flex flex-wrap gap-2">
                        <Badge className="px-3 py-1">C/C++</Badge>
                        <Badge className="px-3 py-1">Java</Badge>
                        <Badge className="px-3 py-1">Python</Badge>
                        <Badge className="px-3 py-1">JavaScript</Badge>
                        <Badge className="px-3 py-1">TypeScript</Badge>
                        <Badge className="px-3 py-1">HTML/CSS</Badge>
                        <Badge className="px-3 py-1">SQL</Badge>
                      </div>

                      <h3 className="text-lg font-semibold mb-4 mt-6">Web Development</h3>
                      <div className="flex flex-wrap gap-2">
                        <Badge className="px-3 py-1">React.js</Badge>
                        <Badge className="px-3 py-1">Next.js</Badge>
                        <Badge className="px-3 py-1">Node.js</Badge>
                        <Badge className="px-3 py-1">Express</Badge>
                        <Badge className="px-3 py-1">MongoDB</Badge>
                        <Badge className="px-3 py-1">PostgreSQL</Badge>
                        <Badge className="px-3 py-1">Tailwind CSS</Badge>
                        <Badge className="px-3 py-1">Redux</Badge>
                      </div>

                      <h3 className="text-lg font-semibold mb-4 mt-6">Tools & Technologies</h3>
                      <div className="flex flex-wrap gap-2">
                        <Badge className="px-3 py-1">Git</Badge>
                        <Badge className="px-3 py-1">Docker</Badge>
                        <Badge className="px-3 py-1">AWS</Badge>
                        <Badge className="px-3 py-1">Firebase</Badge>
                        <Badge className="px-3 py-1">VS Code</Badge>
                        <Badge className="px-3 py-1">Postman</Badge>
                        <Badge className="px-3 py-1">Figma</Badge>
                      </div>
                    </div>

                    <div>
                      <h3 className="text-lg font-semibold mb-4">Machine Learning & AI</h3>
                      <div className="flex flex-wrap gap-2">
                        <Badge className="px-3 py-1">TensorFlow</Badge>
                        <Badge className="px-3 py-1">PyTorch</Badge>
                        <Badge className="px-3 py-1">Scikit-learn</Badge>
                        <Badge className="px-3 py-1">Pandas</Badge>
                        <Badge className="px-3 py-1">NumPy</Badge>
                        <Badge className="px-3 py-1">Data Analysis</Badge>
                        <Badge className="px-3 py-1">NLP</Badge>
                      </div>

                      <h3 className="text-lg font-semibold mb-4 mt-6">Soft Skills</h3>
                      <div className="flex flex-wrap gap-2">
                        <Badge className="px-3 py-1">Problem Solving</Badge>
                        <Badge className="px-3 py-1">Team Collaboration</Badge>
                        <Badge className="px-3 py-1">Communication</Badge>
                        <Badge className="px-3 py-1">Time Management</Badge>
                        <Badge className="px-3 py-1">Leadership</Badge>
                        <Badge className="px-3 py-1">Adaptability</Badge>
                        <Badge className="px-3 py-1">Critical Thinking</Badge>
                      </div>

                      <h3 className="text-lg font-semibold mb-4 mt-6">Languages</h3>
                      <div className="flex flex-wrap gap-2">
                        <Badge className="px-3 py-1">English (Fluent)</Badge>
                        <Badge className="px-3 py-1">Hindi (Fluent)</Badge>
                        <Badge className="px-3 py-1">Bengali (Native)</Badge>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="projects" className="mt-6">
              <Card>
                <CardHeader>
                  <CardTitle>Key Projects</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="border rounded-lg p-4">
                    <h3 className="text-xl font-bold mb-2">AI NE BOLA</h3>
                    <p className="text-muted-foreground mb-3">
                      AI Ne Bola is a comprehensive project that predicts the number of death cases, case fatality ratio (CFR), and other related metrics for various scenarios using machine learning models. It also provides detailed 3D visualizations and interactive web interfaces for users to explore the predictions.
                    </p>
                    <div className="flex flex-wrap gap-2 mb-3">
                      <Badge variant="secondary">Next.js</Badge>
                      <Badge variant="secondary">Three.js</Badge>
                      <Badge variant="secondary">Tailwind CSS</Badge>
                      <Badge variant="secondary">Python</Badge>
                      <Badge variant="secondary">Machine Learning</Badge>
                    </div>
                    <div className="flex gap-2">
                      <Button size="sm" variant="outline" asChild>
                        <Link href="https://ai-ne-bola.netlify.app/">View Demo</Link>
                      </Button>
                      <Button size="sm" variant="outline" asChild>
                        <Link href="https://github.com/Anubhab-Rakshit/ai-ne-bola">GitHub</Link>
                      </Button>
                    </div>
                  </div>

                  <div className="border rounded-lg p-4">
                    <h3 className="text-xl font-bold mb-2">VLABS</h3>
                    <p className="text-muted-foreground mb-3">
                      Virtual Labs is an interactive platform designed to provide students with hands-on learning experiences in a virtual environment. The platform is built with a modern UI, providing an intuitive and engaging interface. It includes features like a responsive design, a chatbot for support, and integrations with Google Maps and Gemini APIs for enhanced functionality.
                    </p>
                    <div className="flex flex-wrap gap-2 mb-3">
                      <Badge variant="secondary">React</Badge>
                      <Badge variant="secondary">Next.js</Badge>
                      <Badge variant="secondary">Tailwind CSS</Badge>
                      <Badge variant="secondary">MongoDB</Badge>
                      <Badge variant="secondary">Google Maps API</Badge>
                      <Badge variant="secondary">Gemini API</Badge>
                      <Badge variant="secondary">Node.js</Badge>
                    </div>
                    <div className="flex gap-2">
                      <Button size="sm" variant="outline" asChild>
                        <Link href="https://github.com/Kausheya2006/vlab_frontend">GitHub</Link>
                      </Button>
                    </div>
                  </div>

                  <div className="border rounded-lg p-4">
                    <h3 className="text-xl font-bold mb-2">IRCTC CLONE</h3>
                    <p className="text-muted-foreground mb-3">
                      This project is a modern, responsive clone of the official IRCTC (Indian Railway Catering and Tourism Corporation) website. It aims to replicate the core functionality and user interface of the original platform while implementing modern web development practices and technologies.
                    </p>
                    <div className="flex flex-wrap gap-2 mb-3">
                      <Badge variant="secondary">React</Badge>
                      <Badge variant="secondary">Next.js</Badge>
                      <Badge variant="secondary">Tailwind CSS</Badge>
                      <Badge variant="secondary">Vercel</Badge>
                    </div>
                    <div className="flex gap-2">
                      <Button size="sm" variant="outline" asChild>
                        <Link href="https://irctc-new.vercel.app">View Demo</Link>
                      </Button>
                      <Button size="sm" variant="outline" asChild>
                        <Link href="https://github.com/Anubhab-Rakshit/irctc-new">GitHub</Link>
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <Card>
              <CardHeader>
                <CardTitle>Certifications</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h3 className="font-semibold">GeeksforGeeks 160 Days Coding Challenge</h3>
                  <p className="text-muted-foreground">GeeksforGeeks | December 2024</p>
                </div>
                <div>
                  <h3 className="font-semibold">Encode - IIT Guwahati Hackathon Participation Certificate</h3>
                  <p className="text-muted-foreground">Unstop | January 2025</p>
                </div>
                <div>
                  <h3 className="font-semibold">Frontend Frontier - IIT Patna Hackathon Participation Certificate</h3>
                  <p className="text-muted-foreground">Unstop | March 2025</p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Achievements</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h3 className="font-semibold flex items-center gap-2">
                    <GraduationCapIcon className="h-4 w-4" />
                    WBJEE Rank-138
                  </h3>
                  <p className="text-muted-foreground">One of the top ranks in the West Bengal Joint Entrance Examination | 2024</p>
                </div>
                <div>
                  <h3 className="font-semibold flex items-center gap-2">
                    <GraduationCapIcon className="h-4 w-4" />
                    JEE Mains Rank-3488
                  </h3>
                  <p className="text-muted-foreground">One of the top 0.2% in JEE Mains | April 2024</p>
                </div>
                <div>
                  <h3 className="font-semibold flex items-center gap-2">
                    <TrophyIcon className="h-4 w-4" />
                    Hackathon Winner
                  </h3>
                  <p className="text-muted-foreground">Second Place in Hacknovare, Hackathon Conducted by IIEST Shibpur | January 2024</p>
                </div>
                <div>
                  <h3 className="font-semibold flex items-center gap-2">
                    <BriefcaseIcon className="h-4 w-4" />
                    Top 5 in Online Code X
                  </h3>
                  <p className="text-muted-foreground">Ranked among the top 5 in the online coding competition conducted by KIOT, Tamil Nadu | January 2025</p>
                </div>
                <div>
                  <h3 className="font-semibold flex items-center gap-2">
                    <AwardIcon className="h-4 w-4" />
                    IIIT Felicity Hackathon Finalists
                  </h3>
                  <p className="text-muted-foreground">Reached the finals of a national-level coding competition among 2000+ participants, came among top 20 | March 2025</p>
                </div>
                <div>
                  <h3 className="font-semibold flex items-center gap-2">
                    <AwardIcon className="h-4 w-4" />
                    Project Selected at GenAI Innovation Challenge 2025
                  </h3>
                  <p className="text-muted-foreground">Developed the project during a hackathon Encode-IIT Guwahati by Ready Tensor | March 2025</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </main>
  )
}


