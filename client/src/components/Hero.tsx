import { useEffect, useRef } from "react";
import { gsap } from "gsap";

export function Hero() {
  const heroRef = useRef<HTMLElement>(null);
  
  useEffect(() => {
    if (!heroRef.current) return;
    
    const tl = gsap.timeline();
    
    tl.from(".hero-text-1", {
      opacity: 0,
      y: 20,
      duration: 0.8,
      delay: 0.4
    })
    .from(".hero-text-2", {
      opacity: 0,
      y: 20,
      duration: 0.8
    }, "-=0.4")
    .from(".hero-subtitle", {
      opacity: 0,
      y: 20,
      duration: 0.8
    }, "-=0.4")
    .from(".hero-description", {
      opacity: 0,
      y: 20,
      duration: 0.8
    }, "-=0.4")
    .from(".hero-buttons", {
      opacity: 0,
      y: 20,
      duration: 0.8
    }, "-=0.4")
    .from(".hero-socials", {
      opacity: 0,
      y: 20,
      duration: 0.8
    }, "-=0.4");
    
    // Mouse movement parallax effect
    const handleMouseMove = (e: MouseEvent) => {
      const { clientX, clientY } = e;
      const xPos = (clientX / window.innerWidth - 0.5) * 20;
      const yPos = (clientY / window.innerHeight - 0.5) * 20;
      
      const profileImage = heroRef.current?.querySelector(".profile-image-container");
      if (profileImage instanceof HTMLElement) {
        gsap.to(profileImage, {
          x: xPos,
          y: yPos,
          rotationY: xPos * 0.5,
          rotationX: -yPos * 0.5,
          duration: 1,
          ease: "power2.out"
        });
      }
    };
    
    window.addEventListener("mousemove", handleMouseMove);
    
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);
  
  return (
    <section 
      id="hero" 
      ref={heroRef}
      className="min-h-screen relative overflow-hidden flex items-center parallax paper-texture"
    >
      <div className="absolute inset-0 bg-gradient-to-br from-transparent to-white/50 z-0"></div>
      
      <div className="container mx-auto px-6 md:px-12 z-10 pt-24">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div className="order-2 md:order-1">
            <div className="overflow-hidden">
              <h1 className="text-4xl md:text-6xl lg:text-7xl font-black text-dark font-display leading-tight">
                <span className="block text-primary hero-text-1">I BEND DATA,</span>
                <span className="block hero-text-2">MACHINES OBEY.</span>
              </h1>
            </div>
            
            <div className="overflow-hidden">
              <h2 className="text-2xl md:text-4xl text-accent font-bold mt-4 hero-subtitle">AI/ML</h2>
            </div>
            
            <div className="overflow-hidden">
              <p className="text-lg md:text-xl text-dark/80 mt-6 max-w-lg hero-description">
                UI/UX Developer & AI/ML Enthusiast crafting exceptional digital experiences with cutting-edge technology.
              </p>
            </div>
            
            <div className="mt-10 flex flex-wrap gap-4 hero-buttons">
              <a 
                href="#projects" 
                className="px-8 py-3 bg-primary text-white font-medium rounded-full hover:bg-primary/90 transition-all duration-300 shadow-lg hover:shadow-primary/20 hover:shadow-xl transform hover:-translate-y-1"
              >
                View Projects
              </a>
              <a 
                href="#contact" 
                className="px-8 py-3 border-2 border-primary text-primary font-medium rounded-full hover:bg-primary/5 transition-all duration-300"
              >
                Get in Touch
              </a>
            </div>
            
            <div className="mt-12 flex items-center space-x-5 hero-socials">
              <a 
                href="https://www.instagram.com/rishiicreatess/" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="text-dark hover:text-primary transition-colors duration-300"
              >
                <i className="fab fa-instagram text-xl"></i>
              </a>
              <a 
                href="https://x.com/rishiicreates" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="text-dark hover:text-primary transition-colors duration-300"
              >
                <i className="fab fa-twitter text-xl"></i>
              </a>
              <a 
                href="https://www.linkedin.com/in/hrishikesh-yadav-b4a736360" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="text-dark hover:text-primary transition-colors duration-300"
              >
                <i className="fab fa-linkedin text-xl"></i>
              </a>
              <a 
                href="https://github.com/rishiiicreates" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="text-dark hover:text-primary transition-colors duration-300"
              >
                <i className="fab fa-github text-xl"></i>
              </a>
            </div>
          </div>
          
          <div className="order-1 md:order-2 flex justify-center">
            <div 
              className="relative w-72 h-72 md:w-96 md:h-96 rounded-full overflow-hidden animate-float border-4 border-white shadow-2xl profile-image-container" 
              style={{ transformStyle: "preserve-3d" }}
            >
              {/* Default profile image - replace with actual image in implementation */}
              <img 
                src="https://images.unsplash.com/photo-1560250097-0b93528c311a?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=400&h=400&q=80" 
                alt="Hrishikesh Yadav" 
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-tr from-primary/30 to-transparent mix-blend-overlay"></div>
            </div>
          </div>
        </div>
      </div>
      
      <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-white to-transparent"></div>
      
      <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 animate-bounce">
        <a href="#about" className="block text-primary">
          <i className="fas fa-chevron-down text-2xl"></i>
        </a>
      </div>
    </section>
  );
}
