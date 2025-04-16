import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import profileImage from '@assets/IMG_0013.jpeg';
import { useTheme } from "@/lib/theme";
import { ChevronDown } from "lucide-react";

export function Hero() {
  const heroRef = useRef<HTMLElement>(null);
  const { theme } = useTheme();
  
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
    
    // ADVANCED PARALLAX EFFECT - Mouse movement tracking for multiple elements
    const handleMouseMove = (e: MouseEvent) => {
      if (!heroRef.current) return;
      
      const { clientX, clientY } = e;
      const xPos = (clientX / window.innerWidth - 0.5); // -0.5 to 0.5 range
      const yPos = (clientY / window.innerHeight - 0.5); // -0.5 to 0.5 range
      
      // Profile image - most prominent movement
      const profileImage = heroRef.current.querySelector(".profile-image-container");
      if (profileImage instanceof HTMLElement) {
        gsap.to(profileImage, {
          x: xPos * 30,
          y: yPos * 30,
          rotateY: xPos * 10,
          rotateX: -yPos * 10,
          duration: 1,
          ease: "power2.out"
        });
      }
      
      // Subtitle - subtle movement
      const subtitle = heroRef.current.querySelector(".hero-subtitle");
      if (subtitle instanceof HTMLElement) {
        gsap.to(subtitle, {
          x: xPos * -15,
          y: yPos * -10,
          duration: 1.2,
          ease: "power2.out"
        });
      }
      
      // Heading - very subtle movement
      const heading1 = heroRef.current.querySelector(".hero-text-1");
      const heading2 = heroRef.current.querySelector(".hero-text-2");
      if (heading1 instanceof HTMLElement && heading2 instanceof HTMLElement) {
        gsap.to(heading1, {
          x: xPos * -8,
          y: yPos * -5,
          duration: 1.5,
          ease: "power2.out"
        });
        gsap.to(heading2, {
          x: xPos * -12,
          y: yPos * -7,
          duration: 1.5,
          ease: "power2.out"
        });
      }
      
      // Floating elements - different directions
      const floatingElements = heroRef.current.querySelectorAll(".floating-element");
      floatingElements.forEach((el, i) => {
        if (el instanceof HTMLElement) {
          const factor = (i % 2 === 0) ? 1 : -1;
          const intensity = 20 + (i * 10);
          gsap.to(el, {
            x: xPos * intensity * factor,
            y: yPos * intensity * factor,
            rotate: xPos * 5 * factor,
            duration: 1 + (i * 0.1),
            ease: "power1.out"
          });
        }
      });
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
      className="min-h-screen relative overflow-hidden flex items-center parallax-container paper-texture"
    >
      {/* Animated background elements */}
      <div className="absolute top-20 left-20 size-24 bg-primary/5 rounded-full blur-xl floating-element"></div>
      <div className="absolute bottom-40 left-[30%] size-32 bg-secondary/5 rounded-full blur-xl floating-element"></div>
      <div className="absolute top-1/4 right-[15%] size-40 bg-accent/5 rounded-full blur-xl floating-element"></div>
      <div className="absolute bottom-20 right-20 size-28 bg-primary/5 rounded-full blur-xl floating-element"></div>
      
      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-background/0 to-background/50 z-0"></div>
      
      <div className="container mx-auto px-6 md:px-12 z-10 pt-24">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div className="order-2 md:order-1">
            <div className="overflow-hidden">
              <h1 className="text-4xl md:text-6xl lg:text-7xl font-black font-display leading-tight bg-clip-text text-transparent bg-gradient-to-r from-foreground to-foreground/90">
                <span className="block hero-text-1" style={{ textShadow: '0 0 30px rgba(138, 43, 226, 0.2)' }}>I BEND DATA,</span>
                <span className="block hero-text-2" style={{ textShadow: '0 0 30px rgba(138, 43, 226, 0.2)' }}>MACHINES OBEY.</span>
              </h1>
            </div>
            
            <div className="overflow-hidden mt-4">
              <div className="relative inline-block">
                <h2 className="text-2xl md:text-4xl font-bold hero-subtitle bg-clip-text text-transparent bg-gradient-to-r from-primary via-secondary to-accent">
                  AI/ML
                </h2>
                <div className="absolute -bottom-1 left-0 w-full h-1 bg-gradient-to-r from-primary via-secondary to-accent"></div>
              </div>
            </div>
            
            <div className="overflow-hidden mt-8">
              <p className="text-lg md:text-xl text-foreground/80 max-w-lg hero-description">
                UI/UX Developer & AI/ML Enthusiast crafting exceptional digital experiences with cutting-edge technology.
              </p>
            </div>
            
            <div className="mt-10 flex flex-wrap gap-4 hero-buttons">
              <a 
                href="#projects" 
                className="px-8 py-3 bg-primary text-primary-foreground font-medium rounded-full hover:bg-primary/90 transition-all duration-300 shadow-lg hover:shadow-primary/20 hover:shadow-xl transform hover:-translate-y-1"
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
                className="text-foreground hover:text-primary transition-colors duration-300"
                aria-label="Instagram"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect width="20" height="20" x="2" y="2" rx="5" ry="5"></rect>
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                  <line x1="17.5" x2="17.51" y1="6.5" y2="6.5"></line>
                </svg>
              </a>
              <a 
                href="https://x.com/rishiicreates" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="text-foreground hover:text-primary transition-colors duration-300"
                aria-label="Twitter/X"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"></path>
                </svg>
              </a>
              <a 
                href="https://www.linkedin.com/in/hrishikesh-yadav-b4a736360" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="text-foreground hover:text-primary transition-colors duration-300"
                aria-label="LinkedIn"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
                  <rect width="4" height="12" x="2" y="9"></rect>
                  <circle cx="4" cy="4" r="2"></circle>
                </svg>
              </a>
              <a 
                href="https://github.com/rishiiicreates" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="text-foreground hover:text-primary transition-colors duration-300"
                aria-label="GitHub"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"></path>
                  <path d="M9 18c-4.51 2-5-2-7-2"></path>
                </svg>
              </a>
            </div>
          </div>
          
          <div className="order-1 md:order-2 flex justify-center">
            <div className="relative">
              {/* Profile image wrapper */}
              <div 
                className="relative w-72 h-72 md:w-96 md:h-96 rounded-full overflow-hidden border-4 border-primary/20 shadow-2xl profile-image-container" 
                style={{ transformStyle: "preserve-3d", perspective: "1000px" }}
              >
                {/* Actual profile image */}
                <img 
                  src={profileImage} 
                  alt="Hrishikesh Yadav" 
                  className="w-full h-full object-cover"
                />
                
                {/* Overlay effect */}
                <div className="absolute inset-0 bg-gradient-to-tr from-primary/20 to-transparent mix-blend-overlay"></div>
                
                {/* Glowing edge */}
                <div className="absolute inset-0 rounded-full border-4 border-primary/40 blur-[2px] opacity-60"></div>
              </div>
              
              {/* Animated circles around the profile image */}
              <div className="absolute top-0 left-0 size-full rounded-full border-2 border-dashed border-primary/30 animate-spin-slow"></div>
              <div className="absolute -top-4 -left-4 -bottom-4 -right-4 rounded-full border border-secondary/20 animate-spin-slower"></div>
              <div className="absolute -top-8 -left-8 -bottom-8 -right-8 rounded-full border border-accent/10"></div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Gradient overlay at the bottom */}
      <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-background to-transparent"></div>
      
      {/* Scroll indicator */}
      <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 animate-bounce">
        <a href="#about" className="flex items-center justify-center size-10 rounded-full bg-primary/10 text-primary hover:bg-primary/20 transition-colors">
          <ChevronDown size={20} />
        </a>
      </div>
    </section>
  );
}
