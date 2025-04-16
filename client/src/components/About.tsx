import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export function About() {
  const sectionRef = useRef<HTMLElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    if (!sectionRef.current) return;
    
    // Animate section content when scrolled into view
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top 70%",
        once: true
      }
    });
    
    tl.from(".about-title", {
      opacity: 0,
      y: 30,
      duration: 0.8
    })
    .from(".about-text", {
      opacity: 0,
      y: 30,
      duration: 0.8,
      stagger: 0.15
    }, "-=0.4")
    .from(".about-link", {
      opacity: 0,
      y: 20,
      duration: 0.5
    }, "-=0.2");
    
    // Animate cards with stagger
    if (cardsRef.current) {
      gsap.from(".card-3d", {
        scrollTrigger: {
          trigger: cardsRef.current,
          start: "top 80%",
          once: true
        },
        y: 50,
        opacity: 0,
        duration: 0.8,
        stagger: 0.2,
        ease: "back.out(1.5)"
      });
    }
    
    // Setup 3D effect for cards
    const cards = document.querySelectorAll('.card-3d');
    
    cards.forEach(card => {
      card.addEventListener('mousemove', (e) => {
        const cardElement = card as HTMLElement;
        const rect = cardElement.getBoundingClientRect();
        
        const x = (e as MouseEvent).clientX - rect.left;
        const y = (e as MouseEvent).clientY - rect.top;
        
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        
        const rotateX = (y - centerY) / 10;
        const rotateY = (centerX - x) / 10;
        
        cardElement.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.05)`;
      });
      
      card.addEventListener('mouseleave', () => {
        const cardElement = card as HTMLElement;
        cardElement.style.transform = 'rotateX(0) rotateY(0) scale(1)';
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
    <section id="about" ref={sectionRef} className="py-20 md:py-32 relative overflow-hidden">
      <div className="container mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 items-center">
          <div className="md:col-span-5">
            <h2 className="text-3xl md:text-5xl font-bold font-display mb-6 text-dark about-title">
              About <span className="text-primary">Me</span>
            </h2>
            
            <div className="space-y-4 text-lg">
              <p className="about-text">I'm a passionate student diving deep into the realms of <span className="text-primary font-medium">Artificial Intelligence</span> and <span className="text-primary font-medium">Machine Learning</span>, while simultaneously honing my craft in UI/UX development.</p>
              
              <p className="about-text">My journey combines creativity with technical expertise, allowing me to build experiences that are not only functional but also visually captivating and intuitive.</p>
              
              <p className="about-text">With a keen eye for detail and a drive for innovation, I'm constantly exploring the intersection of design and cutting-edge technology to create solutions that make a difference.</p>
            </div>
            
            <div className="mt-8">
              <a href="#contact" className="inline-flex items-center text-primary font-medium group about-link">
                <span>Let's connect</span>
                <i className="fas fa-arrow-right ml-2 transform transition-transform group-hover:translate-x-2"></i>
              </a>
            </div>
          </div>
          
          <div className="md:col-span-7" ref={cardsRef}>
            <div className="grid grid-cols-2 gap-6">
              <div className="bg-white rounded-xl shadow-xl p-6 card-3d transform transition-transform duration-300">
                <div className="w-14 h-14 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                  <i className="fas fa-code text-primary text-2xl"></i>
                </div>
                <h3 className="text-xl font-bold mb-2">UI/UX Development</h3>
                <p className="text-dark/70">Creating intuitive and seamless user experiences with modern frameworks and design systems.</p>
              </div>
              
              <div className="bg-white rounded-xl shadow-xl p-6 card-3d transform transition-transform duration-300 mt-12">
                <div className="w-14 h-14 bg-secondary/10 rounded-lg flex items-center justify-center mb-4">
                  <i className="fas fa-brain text-secondary text-2xl"></i>
                </div>
                <h3 className="text-xl font-bold mb-2">Machine Learning</h3>
                <p className="text-dark/70">Developing intelligent systems that learn and adapt to solve complex problems.</p>
              </div>
              
              <div className="bg-white rounded-xl shadow-xl p-6 card-3d transform transition-transform duration-300">
                <div className="w-14 h-14 bg-accent/10 rounded-lg flex items-center justify-center mb-4">
                  <i className="fas fa-robot text-accent text-2xl"></i>
                </div>
                <h3 className="text-xl font-bold mb-2">AI Implementation</h3>
                <p className="text-dark/70">Building and integrating AI solutions to enhance user experiences and automate processes.</p>
              </div>
              
              <div className="bg-white rounded-xl shadow-xl p-6 card-3d transform transition-transform duration-300 mt-12">
                <div className="w-14 h-14 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                  <i className="fas fa-laptop-code text-primary text-2xl"></i>
                </div>
                <h3 className="text-xl font-bold mb-2">Digital Creativity</h3>
                <p className="text-dark/70">Merging technical skills with creative vision to deliver standout digital experiences.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
