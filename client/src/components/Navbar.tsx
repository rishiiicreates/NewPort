import { useState, useEffect } from "react";
import { Link } from "wouter";

export function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

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
    <nav 
      className={`fixed top-0 left-0 w-full px-6 py-4 z-50 transition-all duration-300 ease-in-out ${
        scrolled ? "bg-white shadow-md" : ""
      }`}
    >
      <div className="container mx-auto flex justify-between items-center">
        <Link href="/" className="text-2xl font-bold text-dark font-display tracking-wider">
          Hrishikesh<span className="text-primary">.</span>
        </Link>
        
        <div className="hidden md:flex items-center space-x-8">
          <a 
            href="#about" 
            className="text-dark hover:text-primary font-medium transition-colors duration-300"
            onClick={handleNavLinkClick}
          >
            About
          </a>
          <a 
            href="#projects" 
            className="text-dark hover:text-primary font-medium transition-colors duration-300"
            onClick={handleNavLinkClick}
          >
            Projects
          </a>
          <a 
            href="#skills" 
            className="text-dark hover:text-primary font-medium transition-colors duration-300"
            onClick={handleNavLinkClick}
          >
            Skills
          </a>
          <a 
            href="#certificates" 
            className="text-dark hover:text-primary font-medium transition-colors duration-300"
            onClick={handleNavLinkClick}
          >
            Certificates
          </a>
          <a 
            href="#contact" 
            className="text-dark hover:text-primary font-medium transition-colors duration-300"
            onClick={handleNavLinkClick}
          >
            Contact
          </a>
        </div>

        <button 
          className="md:hidden text-dark focus:outline-none" 
          onClick={toggleMobileMenu}
          aria-label="Toggle mobile menu"
        >
          <i className={`fas ${mobileMenuOpen ? "fa-times" : "fa-bars"} text-2xl`}></i>
        </button>
      </div>
      
      {/* Mobile Menu */}
      <div 
        className={`md:hidden bg-white absolute top-full left-0 w-full shadow-lg rounded-b-lg transform transition-transform duration-300 ease-in-out ${
          mobileMenuOpen ? "translate-y-0 opacity-100" : "-translate-y-full opacity-0"
        }`}
      >
        <div className="container mx-auto py-4 px-6 flex flex-col space-y-4">
          <a 
            href="#about" 
            className="text-dark hover:text-primary font-medium transition-colors duration-300"
            onClick={handleNavLinkClick}
          >
            About
          </a>
          <a 
            href="#projects" 
            className="text-dark hover:text-primary font-medium transition-colors duration-300"
            onClick={handleNavLinkClick}
          >
            Projects
          </a>
          <a 
            href="#skills" 
            className="text-dark hover:text-primary font-medium transition-colors duration-300"
            onClick={handleNavLinkClick}
          >
            Skills
          </a>
          <a 
            href="#certificates" 
            className="text-dark hover:text-primary font-medium transition-colors duration-300"
            onClick={handleNavLinkClick}
          >
            Certificates
          </a>
          <a 
            href="#contact" 
            className="text-dark hover:text-primary font-medium transition-colors duration-300"
            onClick={handleNavLinkClick}
          >
            Contact
          </a>
        </div>
      </div>
    </nav>
  );
}
