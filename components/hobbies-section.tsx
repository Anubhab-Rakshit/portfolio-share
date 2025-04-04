import SectionHeading from "@/components/section-heading"
import { Card, CardContent } from "@/components/ui/card"
import { CodeIcon, BookIcon, MusicIcon, GamepadIcon, CameraIcon } from "lucide-react"

const hobbies = [
  {
    title: "Programming",
    description: "Exploring new technologies and building projects",
    icon: <CodeIcon className="h-8 w-8" />,
  },
  {
    title: "Reading",
    description: "Science fiction, technology, and philosophy books",
    icon: <BookIcon className="h-8 w-8" />,
  },
  {
    title: "Music",
    description: "Playing guitar and listening to various genres",
    icon: <MusicIcon className="h-8 w-8" />,
  },
  {
    title: "Gaming",
    description: "Strategy games and occasional FPS titles",
    icon: <GamepadIcon className="h-8 w-8" />,
  },
  {
    title: "Photography",
    description: "Capturing landscapes and urban scenes",
    icon: <CameraIcon className="h-8 w-8" />,
  },
]

export default function HobbiesSection() {
  return (
    <section id="hobbies" className="py-20">
      <SectionHeading>My Hobbies</SectionHeading>

      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {hobbies.map((hobby, index) => (
            <Card key={index} className="overflow-hidden">
              <CardContent className="p-6 flex flex-col items-center text-center">
                <div className="mb-4 p-3 rounded-full bg-primary/10 text-primary">{hobby.icon}</div>
                <h3 className="text-xl font-bold mb-2">{hobby.title}</h3>
                <p className="text-muted-foreground">{hobby.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}

