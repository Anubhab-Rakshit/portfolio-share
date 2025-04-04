export default function HeroFallback() {
  return (
    <div className="h-screen w-full flex flex-col items-center justify-center bg-gradient-to-br from-indigo-500/10 via-purple-500/10 to-pink-500/10 text-center px-4">
      <h1 className="text-4xl md:text-6xl font-bold mb-4">
        Hi, I'm <span className="text-primary">Anubhab Rakshit</span>
      </h1>

      <div className="h-12 md:h-16 mb-6">
        <p className="text-xl md:text-3xl font-medium">Full Stack Developer</p>
      </div>

      <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-8">
        I build exceptional digital experiences with cutting-edge technologies. Let's create something amazing together.
      </p>

      <div className="flex flex-wrap gap-4 justify-center">
        <div className="h-10 w-32 bg-primary rounded-md animate-pulse"></div>
        <div className="h-10 w-32 bg-gray-300 dark:bg-gray-700 rounded-md animate-pulse"></div>
      </div>
    </div>
  )
}

