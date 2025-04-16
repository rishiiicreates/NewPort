import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface Certificate {
  id: number;
  title: string;
  issuer: string;
  year: string;
  icon: string;
  iconColor: string;
  link: string;
}

export function Certificates() {
  const sectionRef = useRef<HTMLElement>(null);
  const certificatesRef = useRef<HTMLDivElement>(null);
  
  const certificates: Certificate[] = [
    {
      id: 1,
      title: "Machine Learning Specialization",
      issuer: "Stanford University & DeepLearning.AI",
      year: "2023",
      icon: "fas fa-certificate",
      iconColor: "text-primary",
      link: "#"
    },
    {
      id: 2,
      title: "UI/UX Design Professional",
      issuer: "Google & Coursera",
      year: "2022",
      icon: "fas fa-certificate",
      iconColor: "text-secondary",
      link: "#"
    },
    {
      id: 3,
      title: "Advanced Front-End Development",
      issuer: "Meta (Facebook)",
      year: "2022",
      icon: "fas fa-certificate",
      iconColor: "text-accent",
      link: "#"
    }
  ];
  
  useEffect(() => {
    if (!sectionRef.current || !certificatesRef.current) return;
    
    // Animate section title when scrolled into view
    gsap.from(".certificates-title-content", {
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
    
    // Animate certificate cards with stagger
    gsap.from(".certificate-card", {
      scrollTrigger: {
        trigger: certificatesRef.current,
        start: "top 80%",
        once: true
      },
      y: 50,
      opacity: 0,
      duration: 0.8,
      stagger: 0.2,
      ease: "back.out(1.5)"
    });
    
    // Setup 3D effect for certificate cards
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
        
        cardElement.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.05)`;
      });
      
      card.addEventListener('mouseleave', () => {
        const cardElement = card as HTMLElement;
        cardElement.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale(1)';
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
    <section id="certificates" ref={sectionRef} className="py-20 md:py-32 bg-dark/5 paper-texture relative">
      <div className="container mx-auto px-6 md:px-12">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold font-display mb-4 text-dark certificates-title-content">
            My <span className="text-primary">Certificates</span>
          </h2>
          <p className="text-lg text-dark/70 max-w-2xl mx-auto certificates-title-content">
            Credentials that demonstrate my commitment to continuous learning
          </p>
        </div>
        
        <div ref={certificatesRef} className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {certificates.map((certificate) => (
            <div 
              key={certificate.id} 
              className="bg-white rounded-xl shadow-xl p-6 card-3d transform hover:scale-105 transition-transform duration-300 certificate-card"
              style={{ transformStyle: "preserve-3d" }}
            >
              <div className={`mb-4 ${certificate.iconColor}`}>
                <i className={`${certificate.icon} text-3xl`}></i>
              </div>
              <h3 className="text-xl font-bold mb-2">{certificate.title}</h3>
              <p className="text-dark/70 mb-4">{certificate.issuer}</p>
              <div className="flex justify-between items-center text-sm">
                <span className="text-dark/60">Issued: {certificate.year}</span>
                <a href={certificate.link} className="text-primary hover:text-primary/80">
                  <i className="fas fa-external-link-alt mr-1"></i> View
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
