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
      title: "AI Vision Analyzer",
      description: "Computer vision system that analyzes and interprets visual data for insights and anomaly detection.",
      image: "https://images.unsplash.com/photo-1555949963-ff9fe0c870eb?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=600&q=80",
      category: "AI/ML",
      categoryColor: "bg-primary",
      link: "#",
      technologies: [{ name: "Python" }, { name: "TensorFlow" }]
    },
    {
      id: 2,
      title: "NeuroUI Design System",
      description: "Modern design system that adapts to user behavior and preferences using machine learning.",
      image: "https://images.unsplash.com/photo-1581291518633-83b4ebd1d83e?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=600&q=80",
      category: "UI/UX",
      categoryColor: "bg-secondary",
      link: "#",
      technologies: [{ name: "React" }, { name: "Figma" }]
    },
    {
      id: 3,
      title: "Interactive ML Dashboard",
      description: "Real-time data visualization platform with interactive controls and predictive analytics.",
      image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=600&q=80",
      category: "Data Viz",
      categoryColor: "bg-accent",
      link: "#",
      technologies: [{ name: "D3.js" }, { name: "JavaScript" }]
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
    <section id="projects" ref={sectionRef} className="py-20 md:py-32 bg-dark/5 paper-texture relative">
      <div className="container mx-auto px-6 md:px-12">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold font-display mb-4 text-dark projects-title-content">
            My <span className="text-primary">Projects</span>
          </h2>
          <p className="text-lg text-dark/70 max-w-2xl mx-auto projects-title-content">
            Exploring the intersection of design and artificial intelligence through innovative projects
          </p>
        </div>
        
        <div ref={projectsRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project) => (
            <div key={project.id} className="bg-white rounded-xl overflow-hidden shadow-xl project-card" style={{ transformStyle: "preserve-3d" }}>
              <div className="h-56 overflow-hidden relative">
                <img 
                  src={project.image} 
                  alt={project.title} 
                  className="w-full h-full object-cover transition-transform duration-700 hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-dark/50 to-transparent flex items-end">
                  <div className="p-4">
                    <span className={`px-3 py-1 ${project.categoryColor} ${project.category === "UI/UX" ? "text-dark" : "text-white"} text-xs rounded-full`}>
                      {project.category}
                    </span>
                  </div>
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold mb-2">{project.title}</h3>
                <p className="text-dark/70 mb-4">{project.description}</p>
                <div className="flex justify-between items-center">
                  <div className="flex space-x-2">
                    {project.technologies.map((tech, index) => (
                      <span key={index} className="px-2 py-1 bg-primary/10 text-primary text-xs rounded-md">
                        {tech.name}
                      </span>
                    ))}
                  </div>
                  <a href={project.link} className="text-primary hover:text-primary/80">
                    <i className="fas fa-external-link-alt"></i>
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        <div className="text-center mt-12">
          <a 
            href="https://github.com/rishiiicreates" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="inline-flex items-center px-6 py-3 bg-dark text-white font-medium rounded-full hover:bg-dark/90 transition-all duration-300 shadow-lg"
          >
            <i className="fab fa-github mr-2"></i>
            <span>View More on GitHub</span>
          </a>
        </div>
      </div>
    </section>
  );
}
