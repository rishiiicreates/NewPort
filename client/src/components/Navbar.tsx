import { useState, useEffect } from "react";
import { Link } from "wouter";
import { useTheme } from "@/lib/theme";
import { Sun, Moon, ChevronUp, Menu, X } from "lucide-react";

export function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { theme, toggleTheme } = useTheme();

  // Handle scroll event to change navbar appearance
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Handle mobile menu toggle
  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  // Close mobile menu when a link is clicked
  const handleNavLinkClick = () => {
    setMobileMenuOpen(false);
  };

  return (
    <>
      {/* Brand logo in top left */}
      <div className="fixed top-6 left-6 z-50">
        <Link href="/" className="flex items-center">
          <span className="text-2xl font-bold font-display tracking-wider bg-primary/10 px-4 py-2 rounded-full backdrop-blur-sm border border-primary/20">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary">Hrishikesh_</span>
          </span>
        </Link>
      </div>
      
      {/* Fixed vertical navbar on right side */}
      <nav 
        className={`fixed right-8 top-1/2 transform -translate-y-1/2 z-50 hidden md:block`}
      >
        <div className={`py-6 px-3 rounded-full backdrop-blur-sm transition-all duration-300 flex flex-col items-center gap-6
          ${scrolled ? "bg-background/70 shadow-lg border border-primary/20" : "bg-transparent"}`}>
          
          <a 
            href="#about" 
            className="text-foreground hover:text-primary size-10 flex items-center justify-center rounded-full hover:bg-primary/10 transition-colors duration-300 group relative"
            onClick={handleNavLinkClick}
          >
            <span className="absolute right-14 bg-background/80 px-3 py-1 rounded-md opacity-0 group-hover:opacity-100 transition-opacity duration-300 backdrop-blur-sm border border-primary/20 text-sm whitespace-nowrap">About</span>
            A
          </a>
          <a 
            href="#projects" 
            className="text-foreground hover:text-primary size-10 flex items-center justify-center rounded-full hover:bg-primary/10 transition-colors duration-300 group relative"
            onClick={handleNavLinkClick}
          >
            <span className="absolute right-14 bg-background/80 px-3 py-1 rounded-md opacity-0 group-hover:opacity-100 transition-opacity duration-300 backdrop-blur-sm border border-primary/20 text-sm whitespace-nowrap">Projects</span>
            P
          </a>
          <a 
            href="#skills" 
            className="text-foreground hover:text-primary size-10 flex items-center justify-center rounded-full hover:bg-primary/10 transition-colors duration-300 group relative"
            onClick={handleNavLinkClick}
          >
            <span className="absolute right-14 bg-background/80 px-3 py-1 rounded-md opacity-0 group-hover:opacity-100 transition-opacity duration-300 backdrop-blur-sm border border-primary/20 text-sm whitespace-nowrap">Skills</span>
            S
          </a>
          <a 
            href="#certificates" 
            className="text-foreground hover:text-primary size-10 flex items-center justify-center rounded-full hover:bg-primary/10 transition-colors duration-300 group relative"
            onClick={handleNavLinkClick}
          >
            <span className="absolute right-14 bg-background/80 px-3 py-1 rounded-md opacity-0 group-hover:opacity-100 transition-opacity duration-300 backdrop-blur-sm border border-primary/20 text-sm whitespace-nowrap">Certificates</span>
            C
          </a>
          <a 
            href="#contact" 
            className="text-foreground hover:text-primary size-10 flex items-center justify-center rounded-full hover:bg-primary/10 transition-colors duration-300 group relative"
            onClick={handleNavLinkClick}
          >
            <span className="absolute right-14 bg-background/80 px-3 py-1 rounded-md opacity-0 group-hover:opacity-100 transition-opacity duration-300 backdrop-blur-sm border border-primary/20 text-sm whitespace-nowrap">Contact</span>
            @
          </a>
          
          <div className="border-t border-primary/20 w-8 my-2"></div>
          
          <button 
            onClick={toggleTheme}
            className="text-foreground hover:text-primary size-10 flex items-center justify-center rounded-full hover:bg-primary/10 transition-colors duration-300"
            aria-label="Toggle theme"
          >
            {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
          </button>
          
          <a 
            href="#" 
            className="text-foreground hover:text-primary size-10 flex items-center justify-center rounded-full hover:bg-primary/10 transition-colors duration-300"
            onClick={(e) => {
              e.preventDefault();
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
          >
            <ChevronUp size={18} />
          </a>
        </div>
      </nav>
      
      {/* Mobile menu button in top right */}
      <div className="fixed top-6 right-6 z-50 md:hidden">
        <button 
          className="size-12 flex items-center justify-center rounded-full bg-primary text-primary-foreground"
          onClick={toggleMobileMenu}
          aria-label="Toggle mobile menu"
        >
          {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>
      
      {/* Theme toggle for mobile */}
      <div className="fixed top-6 right-20 z-50 md:hidden">
        <button 
          onClick={toggleTheme}
          className="size-12 flex items-center justify-center rounded-full bg-background border border-primary/20 text-foreground"
          aria-label="Toggle theme"
        >
          {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
        </button>
      </div>
      
      {/* Mobile Menu */}
      <div 
        className={`md:hidden fixed inset-0 bg-background/95 backdrop-blur-md z-40 flex items-center justify-center transition-opacity duration-300 ease-in-out ${
          mobileMenuOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
      >
        <div className="flex flex-col items-center space-y-8 p-6">
          <a 
            href="#about" 
            className="text-xl font-medium text-foreground hover:text-primary transition-colors duration-300"
            onClick={handleNavLinkClick}
          >
            About
          </a>
          <a 
            href="#projects" 
            className="text-xl font-medium text-foreground hover:text-primary transition-colors duration-300"
            onClick={handleNavLinkClick}
          >
            Projects
          </a>
          <a 
            href="#skills" 
            className="text-xl font-medium text-foreground hover:text-primary transition-colors duration-300"
            onClick={handleNavLinkClick}
          >
            Skills
          </a>
          <a 
            href="#certificates" 
            className="text-xl font-medium text-foreground hover:text-primary transition-colors duration-300"
            onClick={handleNavLinkClick}
          >
            Certificates
          </a>
          <a 
            href="#contact" 
            className="text-xl font-medium text-foreground hover:text-primary transition-colors duration-300"
            onClick={handleNavLinkClick}
          >
            Contact
          </a>
        </div>
      </div>
    </>
  );
}
