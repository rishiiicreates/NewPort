import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface Project {
  id: number;
  title: string;
  description: string;
  image: string;
  category: string;
  categoryColor: string;
  link: string;
  technologies: { name: string }[];
}

export function Projects() {
  const sectionRef = useRef<HTMLElement>(null);
  const projectsRef = useRef<HTMLDivElement>(null);
  
  const projects: Project[] = [
    {
      id: 1,
      title: "NeuralVision Analyzer",
      description: "Advanced computer vision system that uses convolutional neural networks to analyze and interpret visual data for real-time insights and anomaly detection.",
      image: "https://images.unsplash.com/photo-1555949963-ff9fe0c870eb?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=600&q=80",
      category: "Computer Vision",
      categoryColor: "bg-primary",
      link: "https://github.com/rishiiicreates/neural-vision",
      technologies: [{ name: "Python" }, { name: "TensorFlow" }, { name: "OpenCV" }]
    },
    {
      id: 2,
      title: "AdaptiveUI Framework",
      description: "AI-powered design system that learns from user behavior and adapts interfaces to improve usability and engagement through reinforcement learning.",
      image: "https://images.unsplash.com/photo-1581291518633-83b4ebd1d83e?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=600&q=80",
      category: "AI/UX",
      categoryColor: "bg-secondary",
      link: "https://github.com/rishiiicreates/adaptive-ui",
      technologies: [{ name: "React" }, { name: "TensorFlow.js" }, { name: "Figma" }]
    },
    {
      id: 3,
      title: "Predictive Analytics Dashboard",
      description: "Real-time data visualization platform with interactive controls and predictive models that forecast future trends using advanced time-series analysis.",
      image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=600&q=80",
      category: "Data Science",
      categoryColor: "bg-accent",
      link: "https://github.com/rishiiicreates/predictive-dashboard",
      technologies: [{ name: "D3.js" }, { name: "Python" }, { name: "Prophet" }]
    },
    {
      id: 4,
      title: "DeepNLP Sentiment Engine",
      description: "State-of-the-art natural language processing model for sentiment analysis with fine-tuned transformers achieving 94% accuracy on benchmark datasets.",
      image: "https://images.unsplash.com/photo-1599658880436-c61792e70672?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=600&q=80",
      category: "NLP",
      categoryColor: "bg-primary",
      link: "https://github.com/rishiiicreates/deep-nlp",
      technologies: [{ name: "Python" }, { name: "PyTorch" }, { name: "Hugging Face" }]
    },
    {
      id: 5,
      title: "QuantumML Simulator",
      description: "Cutting-edge simulation environment for exploring quantum machine learning algorithms and their applications in optimization problems.",
      image: "https://images.unsplash.com/photo-1635070041078-e363dbe005cb?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=600&q=80",
      category: "Quantum ML",
      categoryColor: "bg-secondary",
      link: "https://github.com/rishiiicreates/quantum-ml",
      technologies: [{ name: "Python" }, { name: "Qiskit" }, { name: "TensorFlow Quantum" }]
    },
    {
      id: 6,
      title: "AutoML Pipeline Builder",
      description: "Automated machine learning platform that handles feature engineering, model selection, and hyperparameter tuning with minimal human intervention.",
      image: "https://images.unsplash.com/photo-1551434678-e076c223a692?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=600&q=80",
      category: "AutoML",
      categoryColor: "bg-accent",
      link: "https://github.com/rishiiicreates/automl-platform",
      technologies: [{ name: "Python" }, { name: "Scikit-learn" }, { name: "MLflow" }]
    },
    {
      id: 7,
      title: "Edge AI Deployment Framework",
      description: "Framework for optimizing and deploying neural networks on edge devices with constraints on memory and compute resources.",
      image: "https://images.unsplash.com/photo-1558346490-a72e53ae2d4f?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=600&q=80",
      category: "Edge AI",
      categoryColor: "bg-primary",
      link: "https://github.com/rishiiicreates/edge-ai",
      technologies: [{ name: "TensorFlow Lite" }, { name: "C++" }, { name: "CUDA" }]
    },
    {
      id: 8,
      title: "Reinforcement Learning Gym",
      description: "Custom environments for training reinforcement learning agents with novel reward functions and physics simulation for robotics applications.",
      image: "https://images.unsplash.com/photo-1531297484001-80022131f5a1?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=600&q=80",
      category: "RL",
      categoryColor: "bg-secondary",
      link: "https://github.com/rishiiicreates/rl-gym",
      technologies: [{ name: "Python" }, { name: "PyTorch" }, { name: "Gymnasium" }]
    }
  ];
  
  useEffect(() => {
    if (!sectionRef.current || !projectsRef.current) return;
    
    // Animate section title when scrolled into view
    gsap.from(".projects-title-content", {
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top 80%",
        once: true
      },
      y: 30,
      opacity: 0,
      duration: 0.8,
      stagger: 0.2
    });
    
    // Animate project cards with stagger
    gsap.from(".project-card", {
      scrollTrigger: {
        trigger: projectsRef.current,
        start: "top 80%",
        once: true
      },
      y: 50,
      opacity: 0,
      duration: 0.8,
      stagger: 0.2,
      ease: "back.out(1.5)"
    });
    
    // Setup 3D tilt effect for project cards
    const cards = document.querySelectorAll('.project-card');
    
    cards.forEach(card => {
      card.addEventListener('mousemove', (e) => {
        const cardElement = card as HTMLElement;
        const rect = cardElement.getBoundingClientRect();
        
        const x = (e as MouseEvent).clientX - rect.left;
        const y = (e as MouseEvent).clientY - rect.top;
        
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        
        const rotateX = (y - centerY) / 20;
        const rotateY = (centerX - x) / 20;
        
        cardElement.style.transform = `translateY(-10px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
        cardElement.style.boxShadow = "30px 30px 30px rgba(0,0,0,0.08)";
      });
      
      card.addEventListener('mouseleave', () => {
        const cardElement = card as HTMLElement;
        cardElement.style.transform = "";
        cardElement.style.boxShadow = "";
      });
    });
    
    return () => {
      // Clean up event listeners
      cards.forEach(card => {
        card.removeEventListener('mousemove', () => {});
        card.removeEventListener('mouseleave', () => {});
      });
    };
  }, []);
  
  return (
    <section id="projects" ref={sectionRef} className="py-20 md:py-32 paper-texture neural-bg relative">
      {/* AI-inspired decorative elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden opacity-10 pointer-events-none">
        <div className="absolute top-[10%] left-[5%] size-40 rounded-full border border-dashed border-primary/50 animate-spin-slow"></div>
        <div className="absolute bottom-[20%] right-[10%] size-60 rounded-full border border-dashed border-secondary/50 animate-spin-slower"></div>
        <div className="absolute top-[40%] right-[20%] size-24 rounded-full bg-accent/5 blur-xl floating-element"></div>
        
        <div className="hidden md:block absolute inset-y-0 left-10 w-[1px] bg-gradient-to-b from-transparent via-primary/20 to-transparent"></div>
        <div className="hidden md:block absolute inset-y-0 right-10 w-[1px] bg-gradient-to-b from-transparent via-secondary/20 to-transparent"></div>
        <div className="hidden md:block absolute inset-x-0 bottom-10 h-[1px] bg-gradient-to-r from-transparent via-accent/20 to-transparent"></div>
      </div>
      
      <div className="container mx-auto px-6 md:px-12 relative z-10">
        <div className="text-center mb-16">
          <div className="relative inline-block">
            <h2 className="text-3xl md:text-5xl font-bold font-display mb-4 text-foreground projects-title-content bg-clip-text">
              ML <span className="text-primary">Projects</span> & <span className="text-secondary">Research</span>
            </h2>
            <div className="absolute -bottom-2 left-0 w-full h-1 bg-gradient-to-r from-primary via-secondary to-accent"></div>
          </div>
          <p className="text-lg text-foreground/70 max-w-2xl mx-auto mt-6 projects-title-content">
            Exploring the intersection of artificial intelligence, machine learning, and human-centered design through innovative solutions
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8" ref={projectsRef}>
          {projects.slice(0, 6).map((project) => (
            <div key={project.id} className="bg-card rounded-xl overflow-hidden shadow-xl project-card border border-primary/10 backdrop-blur-sm" style={{ transformStyle: "preserve-3d" }}>
              <div className="h-56 overflow-hidden relative">
                <img 
                  src={project.image} 
                  alt={project.title} 
                  className="w-full h-full object-cover transition-transform duration-700 hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background/90 to-transparent flex items-end">
                  <div className="p-4">
                    <span className={`px-3 py-1 ${project.categoryColor} text-primary-foreground text-xs rounded-full backdrop-blur-sm`}>
                      {project.category}
                    </span>
                  </div>
                </div>
                
                {/* AI Grid overlay */}
                <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI0MCIgaGVpZ2h0PSI0MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAwIDEwIEwgNDAgMTAgTSAxMCAwIEwgMTAgNDAgTSAwIDIwIEwgNDAgMjAgTSAyMCAwIEwgMjAgNDAgTSAwIDMwIEwgNDAgMzAgTSAzMCAwIEwgMzAgNDAiIGZpbGw9Im5vbmUiIHN0cm9rZT0iI2ZmZiIgc3Ryb2tlLXdpZHRoPSIwLjUiIHN0cm9rZS1vcGFjaXR5PSIwLjA1Ii8+PC9wYXR0ZXJuPjwvZGVmcz48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSJ1cmwoI2dyaWQpIiAvPjwvc3ZnPg==')]"></div>
              </div>
              
              <div className="p-6">
                <h3 className="text-xl font-bold mb-2 text-foreground flex items-center gap-2">
                  <span className="block w-2 h-2 rounded-full bg-primary animate-pulse"></span>
                  {project.title}
                </h3>
                <p className="text-foreground/70 mb-4 text-sm">{project.description}</p>
                <div className="flex flex-col gap-4">
                  <div className="flex flex-wrap gap-2">
                    {project.technologies.map((tech, index) => (
                      <span key={index} className="px-2 py-1 bg-primary/10 text-primary text-xs rounded-md">
                        {tech.name}
                      </span>
                    ))}
                  </div>
                  <a 
                    href={project.link} 
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-2 py-2 border border-primary/20 text-primary hover:bg-primary/5 rounded-lg transition-colors duration-300 text-sm font-medium"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"></path>
                      <path d="M9 18c-4.51 2-5-2-7-2"></path>
                    </svg>
                    View Repository
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        {/* Second row of projects in a more compact format */}
        <div className="mt-12">
          <h3 className="text-xl md:text-2xl font-medium mb-6 text-foreground/80">More Research Projects</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {projects.slice(6).map((project) => (
              <div key={project.id} className="flex bg-card/50 border border-primary/10 rounded-lg overflow-hidden backdrop-blur-sm hover:bg-card/80 transition-colors duration-300">
                <div className="w-24 md:w-32 h-full overflow-hidden">
                  <img 
                    src={project.image} 
                    alt={project.title} 
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-4 flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <span className={`px-2 py-0.5 ${project.categoryColor} text-primary-foreground text-xs rounded-full`}>
                      {project.category}
                    </span>
                  </div>
                  <h4 className="font-bold text-foreground">{project.title}</h4>
                  <div className="flex gap-2 mt-2">
                    {project.technologies.slice(0, 2).map((tech, index) => (
                      <span key={index} className="text-xs text-foreground/70">
                        {tech.name}
                      </span>
                    ))}
                    {project.technologies.length > 2 && (
                      <span className="text-xs text-foreground/70">+{project.technologies.length - 2}</span>
                    )}
                  </div>
                </div>
                <div className="flex items-center pr-4">
                  <a 
                    href={project.link}
                    target="_blank"
                    rel="noopener noreferrer" 
                    className="text-primary hover:text-primary/80"
                    aria-label={`View ${project.title} repository`}
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M7 7h10v10"></path>
                      <path d="M7 17 17 7"></path>
                    </svg>
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
        
        <div className="text-center mt-12">
          <a 
            href="https://github.com/rishiiicreates" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="inline-flex items-center px-8 py-3 bg-primary/10 border border-primary text-primary font-medium rounded-full hover:bg-primary/20 transition-all duration-300"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2">
              <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"></path>
              <path d="M9 18c-4.51 2-5-2-7-2"></path>
            </svg>
            Explore All Projects
          </a>
        </div>
      </div>
    </section>
  );
}
