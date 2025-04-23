
# Modern 3D Portfolio Website

## Team Name
### Code Cuisine

## Members
### Anubhab Rakshit
<img width="1492" alt="Screenshot 2025-04-20 at 11 01 27 PM" src="https://github.com/user-attachments/assets/90c6a0de-1498-4680-8412-346a4c54d5a7" />



A modern, interactive portfolio website built with Next.js 14, Three.js, and React Three Fiber. This portfolio showcases professional experience, projects, skills, and blog content with immersive 3D elements and interactive UI components.

## ✨ Features

### 🏠 Home Page
- **Interactive 3D Hero Section**: Engaging 3D elements that respond to user interaction
- **Animated Text Effects**: Dynamic typewriter animations highlighting key skills
- **Spotlight Effect**: Interactive spotlight that follows cursor movement
- **Particle Background**: Responsive particle system with mouse interaction

<img width="1506" alt="image" src="https://github.com/user-attachments/assets/11b91a74-99a0-4831-a9dc-49de2983ce98" />



### 👨‍💻 Projects Section
- **3D Project Cards**: Interactive 3D cards that respond to mouse movement
- **Project Filtering**: Filter projects by technology or category
- **Detailed Project Pages**: In-depth project information with images, technologies used, and links
- **Interactive Models**: 3D models representing project themes

<img width="1512" alt="image" src="https://github.com/user-attachments/assets/4cd49e7a-0609-4ab4-adeb-c5c28ed39719" />
<img width="1512" alt="image" src="https://github.com/user-attachments/assets/c97e4389-94f6-40fb-b0cc-b394e3d3e2ee" />



### 📝 Blog
- **Responsive Blog Grid**: Clean, responsive layout for blog posts
- **Interactive Backgrounds**: Particle effects that respond to user interaction
- **Related Posts**: Intelligent related post suggestions
- **Social Sharing**: Easy sharing of blog content to social media
- **Rich Content Support**: Support for code blocks, images, and other rich media

<img width="1512" alt="image" src="https://github.com/user-attachments/assets/e7524068-2e1d-462b-a538-7b25569851e5" />
<img width="1383" alt="Screenshot 2025-04-20 at 11 04 50 PM" src="https://github.com/user-attachments/assets/c54b028d-4991-4e70-976a-afc7194aebee" />




### 🎹 Hobbies Section
- **Interactive Piano**: Fully functional virtual piano with audio playback
- **Particle Effects**: Beautiful particle animations that respond to interaction
- **Audio Visualization**: Visual feedback for audio interactions

<img width="1407" alt="image" src="https://github.com/user-attachments/assets/c4e013c7-f329-4b36-815c-075692378587" />


### 📊 Skills Visualization
- **3D Skills Graph**: Interactive 3D visualization of technical skills
- **Animated Progress Bars**: Visual representation of skill proficiency
- **Categorized Skills**: Organized display of different skill categories

<img width="1407" alt="image" src="https://github.com/user-attachments/assets/2127cc8e-f813-4f92-9367-1e5333f3efe5" />

### ⏳ Timeline
- **Interactive Timeline**: Visual representation of career and education history
- **Animated Elements**: Smooth animations for timeline events
- **Responsive Design**: Adapts to different screen sizes

<img width="1407" alt="image" src="https://github.com/user-attachments/assets/2127cc8e-f813-4f92-9367-1e5333f3efe5" />

### 📱 Responsive Design
- **Mobile-First Approach**: Optimized for all device sizes
- **Adaptive 3D Elements**: 3D components that adjust based on device capabilities
- **Performance Optimizations**: Fallbacks for devices with limited processing power

<img width="893" alt="image" src="https://github.com/user-attachments/assets/b1fb4c64-c6d5-44c7-aaab-317940fa079a" />


## 🛠️ Technical Features

### 3D Rendering
- **Three.js Integration**: Advanced 3D rendering capabilities
- **React Three Fiber**: React components for Three.js scenes
- **3D Models**: Custom and imported 3D models
- **Performance Optimizations**: Lazy loading and conditional rendering for 3D elements

### UI Components
- **Interactive Cards**: 3D cards with hover effects
- **Particle Systems**: Background particle effects with mouse interaction
- **Typewriter Effects**: Animated text typing effects
- **Spotlight Effects**: Interactive spotlight following cursor
- **Confetti Effects**: Celebration animations for achievements

### Performance
- **Next.js App Router**: Optimized routing and page loading
- **Client-Side Components**: Strategic use of client components for interactivity
- **Error Boundaries**: Graceful fallbacks for rendering errors
- **Lazy Loading**: On-demand loading of heavy components
- **Image Optimization**: Next.js image optimization for faster loading

### Accessibility
- **Semantic HTML**: Proper use of HTML elements for better accessibility
- **Keyboard Navigation**: Full keyboard support for navigation
- **Screen Reader Support**: Appropriate ARIA labels and roles
- **Color Contrast**: Sufficient contrast ratios for text readability

## 🚀 Getting Started

### Prerequisites
- Node.js 18.x or higher
- npm or yarn

### Installation

1. Clone the repository
```bash
git clone https://github.com/yourusername/portfolio.git
cd portfolio
```

2. Install dependencies
```bash
npm install
# or
yarn install
```

3. Run the development server
```bash
npm run dev
# or
yarn dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser

## 📁 Project Structure
```
portfolio/
├── app/                  # Next.js app router pages
│   ├── blog/             # Blog pages
│   ├── projects/         # Project pages
│   ├── hobbies/          # Hobbies section
│   ├── resume/           # Resume page
│   └── services/         # Services page
├── components/           # React components
│   ├── ui/               # UI components (buttons, cards, etc.)
│   ├── 3d-*.tsx          # 3D components
│   └── *.tsx             # Other components
├── hooks/                # Custom React hooks
├── lib/                  # Utility functions
├── public/               # Static assets
│   ├── images/           # Images
│   ├── models/           # 3D models
│   ├── sounds/           # Audio files
│   └── fonts/            # Font files
└── styles/               # CSS styles
```

## 🎨 Customization

### Changing Theme Colors
Edit the `tailwind.config.js` file to update the color scheme:

```js
theme: {
  extend: {
    colors: {
      primary: {...},
      secondary: {...},
      // Add your custom colors
    }
  }
}
```
