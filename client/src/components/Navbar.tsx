import React, { useState, useEffect, useRef } from "react";
import { Link } from "wouter";
import { useTheme } from "@/lib/theme";
import { Sun, Moon, ChevronUp, Menu, X, BrainCircuit, Code, CircleUser, Award, Send } from "lucide-react";
import gsap from "gsap";

export function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const [navOpen, setNavOpen] = useState(false);
  const navRef = useRef<HTMLDivElement>(null);
  const navBtnRef = useRef<HTMLButtonElement>(null);
  const { theme, toggleTheme } = useTheme();

  // Scroll detection for dynamic nav appearance
  useEffect(() => {
    const handleScroll = () => {
      // Update scrolled state
      setScrolled(window.scrollY > 50);
      
      // Determine active section
      const sections = ["about", "projects", "skills", "certificates", "contact"];
      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          if (rect.top <= 150 && rect.bottom >= 150) {
            setActiveSection(section);
            break;
          } else if (window.scrollY < 100) {
            setActiveSection("home");
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Animate nav button elements
  useEffect(() => {
    if (navBtnRef.current) {
      const glowEffect = navBtnRef.current.querySelector('.nav-glow');
      const orb = navBtnRef.current.querySelector('.nav-orb');
      
      if (glowEffect && orb) {
        gsap.to(glowEffect, {
          opacity: navOpen ? 0.7 : 0.3,
          scale: navOpen ? 1.2 : 1,
          duration: 0.5,
          ease: "power2.out"
        });
        
        gsap.to(orb, {
          rotate: navOpen ? '135deg' : '0deg',
          scale: navOpen ? 1.1 : 1,
          duration: 0.5,
          ease: "back.out(1.7)"
        });
      }
    }
  }, [navOpen]);

  // Handle nav toggle
  const toggleNav = () => {
    setNavOpen(!navOpen);
  };

  // Close mobile menu and nav when link is clicked
  const handleNavLinkClick = () => {
    setMobileMenuOpen(false);
    setNavOpen(false);
  };

  // Dynamic icon mapping for sections
  const sectionIcons: { [key: string]: React.ReactNode } = {
    about: <CircleUser size={navOpen ? 18 : 0} />,
    projects: <BrainCircuit size={navOpen ? 18 : 0} />,
    skills: <Code size={navOpen ? 18 : 0} />,
    certificates: <Award size={navOpen ? 18 : 0} />,
    contact: <Send size={navOpen ? 18 : 0} />
  };

  return (
    <>
      {/* Brand logo in top left - always visible */}
      <div className="fixed top-6 left-6 z-50">
        <Link href="/" className="flex items-center">
          <span className={`text-2xl font-bold font-display tracking-wider px-4 py-2 rounded-full backdrop-blur-sm border border-primary/20 transition-all duration-300 ${
            scrolled ? "bg-background/70 shadow-md" : "bg-primary/10"
          }`}>
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary">rishii_</span>
          </span>
        </Link>
      </div>

      {/* Unique orbital navigation button - activates the circular menu */}
      <div className="fixed bottom-8 left-1/2 transform -translate-x-1/2 z-50 flex justify-center items-center">
        <button 
          ref={navBtnRef}
          onClick={toggleNav}
          className="group relative size-14 rounded-full bg-background/30 border border-primary/30 backdrop-blur-md shadow-lg flex items-center justify-center overflow-hidden"
          aria-label="Toggle navigation"
        >
          {/* Animated glow effect */}
          <div className="nav-glow absolute inset-0 bg-gradient-to-r from-primary/30 via-secondary/30 to-accent/30 opacity-30 blur-md"></div>
          
          {/* Orbital animation */}
          <div className="nav-orb relative size-8 rounded-full bg-gradient-to-r from-primary to-secondary flex items-center justify-center transition-transform duration-300">
            {navOpen ? 
              <X size={18} className="text-white" /> : 
              <div className="size-1.5 rounded-full bg-white"></div>
            }
          </div>
        </button>
      </div>
      
      {/* Circular orbit navigation - appears when nav button is clicked */}
      <div 
        ref={navRef}
        className={`fixed inset-0 z-40 pointer-events-none ${navOpen ? "opacity-100" : "opacity-0"} transition-opacity duration-500 ease-in-out`}
      >
        <div className="absolute inset-0 bg-background/10 backdrop-blur-sm pointer-events-auto"></div>
        
        {/* Orbit sections */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2">
          {/* Create navigation items in a circle around the center button */}
          {["about", "projects", "skills", "certificates", "contact"].map((section, index) => {
            // Calculate position in the circle
            const angle = (index * (360 / 5) - 90) * (Math.PI / 180);
            const radius = navOpen ? 160 : 0; // Radius when open vs closed
            const x = Math.cos(angle) * radius;
            const y = Math.sin(angle) * radius;
            
            // Delay for staggered animation
            const delay = index * 0.05;
            
            return (
              <a
                key={section}
                href={`#${section}`}
                onClick={handleNavLinkClick}
                className={`absolute size-14 rounded-full flex items-center justify-center transition-all duration-500 pointer-events-auto
                  ${activeSection === section ? "bg-primary text-primary-foreground" : "bg-card/50 text-foreground hover:bg-primary/10"}
                  backdrop-blur-md border border-primary/20 shadow-lg`}
                style={{ 
                  transform: `translate(${x}px, ${y}px) scale(${navOpen ? 1 : 0})`,
                  opacity: navOpen ? 1 : 0,
                  transitionDelay: navOpen ? `${delay}s` : "0s"
                }}
              >
                <div className="flex flex-col items-center justify-center">
                  {sectionIcons[section]}
                  <span className={`text-xs font-medium mt-1 transition-opacity duration-300 ${navOpen ? "opacity-100" : "opacity-0"}`}>
                    {section.charAt(0).toUpperCase() + section.slice(1)}
                  </span>
                </div>
              </a>
            );
          })}
          
          {/* Theme toggle and scroll to top - appear when nav is open */}
          <div 
            className="absolute left-1/2 top-0 transform -translate-x-1/2 -translate-y-24 transition-all duration-500"
            style={{ 
              opacity: navOpen ? 1 : 0,
              transform: `translate(-50%, ${navOpen ? "-6rem" : "0"})`,
              pointerEvents: navOpen ? "auto" : "none"
            }}
          >
            <div className="flex items-center gap-4">
              <button
                onClick={toggleTheme}
                className="size-10 rounded-full bg-card/70 backdrop-blur-md border border-primary/20 shadow-lg flex items-center justify-center text-foreground hover:bg-primary/10 transition-colors"
                aria-label="Toggle theme"
              >
                {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
              </button>
              
              <a
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                  handleNavLinkClick();
                }}
                className="size-10 rounded-full bg-card/70 backdrop-blur-md border border-primary/20 shadow-lg flex items-center justify-center text-foreground hover:bg-primary/10 transition-colors"
                aria-label="Scroll to top"
              >
                <ChevronUp size={18} />
              </a>
            </div>
          </div>
        </div>
      </div>
      
      {/* Scroll progress indicator */}
      <div className="fixed top-0 left-0 w-full h-1 z-40">
        <div 
          className="h-full bg-gradient-to-r from-primary via-secondary to-accent"
          style={{ 
            width: `${scrolled ? Math.min((window.scrollY / (document.body.scrollHeight - window.innerHeight)) * 100, 100) : 0}%`,
            opacity: scrolled ? 1 : 0,
            transition: "width 0.1s ease-out, opacity 0.3s ease"
          }}
        ></div>
      </div>
    </>
  );
}
