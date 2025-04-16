import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Initialize GSAP plugins
gsap.registerPlugin(ScrollTrigger);

export const setupScrollAnimations = () => {
  // Animate skill bars when scrolled into view
  const skillSection = document.getElementById('skills');
  const skillFills = document.querySelectorAll<HTMLElement>('.skill-fill');
  
  if (skillSection && skillFills.length > 0) {
    ScrollTrigger.create({
      trigger: skillSection,
      start: "top 80%",
      onEnter: () => {
        skillFills.forEach(fill => {
          const fillWidth = fill.getAttribute('data-fill-width') || '0%';
          gsap.to(fill, {
            width: fillWidth,
            duration: 1.5,
            ease: "power2.out"
          });
        });
      }
    });
  }

  // Add fade-in animations for sections
  const sections = document.querySelectorAll('section');
  sections.forEach((section, index) => {
    gsap.from(section, {
      scrollTrigger: {
        trigger: section,
        start: "top 80%",
        once: true
      },
      y: 50,
      opacity: 0,
      duration: 1,
      delay: 0.2,
      ease: "power2.out"
    });
  });

  // Animate project cards
  const projectCards = document.querySelectorAll('.project-card');
  projectCards.forEach((card, index) => {
    gsap.from(card, {
      scrollTrigger: {
        trigger: card,
        start: "top 90%",
        once: true
      },
      y: 50,
      opacity: 0,
      duration: 0.8,
      delay: index * 0.2,
      ease: "back.out(1.5)"
    });
  });

  // Add parallax effect to backgrounds
  document.querySelectorAll('.parallax').forEach((parallaxElement: Element) => {
    const parallaxLayers = parallaxElement.querySelectorAll('.parallax-layer');
    
    if (parallaxLayers.length > 0) {
      parallaxLayers.forEach(layer => {
        const speed = (layer as HTMLElement).dataset.speed || '0.1';
        
        gsap.to(layer, {
          scrollTrigger: {
            trigger: parallaxElement,
            start: "top bottom",
            end: "bottom top",
            scrub: true
          },
          y: `${parseFloat(speed) * 100}%`,
          ease: "none"
        });
      });
    }
  });
};

// Hero section animations
export const animateHero = () => {
  const tl = gsap.timeline();
  
  tl.from(".hero-headline span:first-child", {
    opacity: 0,
    y: 20,
    duration: 0.8,
    delay: 0.4
  })
  .from(".hero-headline span:last-child", {
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
  
  return tl;
};

// 3D card effect
export const setup3DCards = () => {
  const cards = document.querySelectorAll('.card-3d');
  
  cards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const cardElement = card as HTMLElement;
      const rect = cardElement.getBoundingClientRect();
      
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      
      const rotateX = (y - centerY) / 10;
      const rotateY = (centerX - x) / 10;
      
      cardElement.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
    });
    
    card.addEventListener('mouseleave', () => {
      const cardElement = card as HTMLElement;
      cardElement.style.transform = 'perspective(1000px) rotateX(0) rotateY(0)';
    });
  });
};
