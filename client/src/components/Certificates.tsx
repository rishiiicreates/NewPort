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
      title: "Deep Learning Specialization",
      issuer: "DeepLearning.AI & Stanford University",
      year: "2023",
      icon: "fas fa-brain",
      iconColor: "text-primary",
      link: "https://www.coursera.org/account/accomplishments/specialization/rishiiicreates"
    },
    {
      id: 2,
      title: "TensorFlow Developer Certificate",
      issuer: "Google & TensorFlow",
      year: "2023",
      icon: "fas fa-code",
      iconColor: "text-secondary",
      link: "https://www.tensorflow.org/certificate/rishiiicreates"
    },
    {
      id: 3,
      title: "Advanced Computer Vision",
      issuer: "NVIDIA Deep Learning Institute",
      year: "2022",
      icon: "fas fa-eye",
      iconColor: "text-accent",
      link: "https://www.nvidia.com/en-us/training/rishiiicreates"
    },
    {
      id: 4,
      title: "Natural Language Processing",
      issuer: "Hugging Face & PyTorch",
      year: "2022",
      icon: "fas fa-comment-alt",
      iconColor: "text-primary",
      link: "https://huggingface.co/rishiiicreates"
    },
    {
      id: 5,
      title: "UI/UX Design for AI Products",
      issuer: "Interaction Design Foundation",
      year: "2022",
      icon: "fas fa-palette",
      iconColor: "text-secondary",
      link: "https://www.interaction-design.org/rishiiicreates"
    },
    {
      id: 6,
      title: "AWS Machine Learning Specialty",
      issuer: "Amazon Web Services",
      year: "2021",
      icon: "fas fa-cloud",
      iconColor: "text-accent",
      link: "https://aws.amazon.com/certification/rishiiicreates"
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
    <section id="certificates" ref={sectionRef} className="py-20 md:py-32 paper-texture neural-bg relative">
      {/* AI-inspired decorative elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden opacity-10 pointer-events-none">
        <div className="absolute -bottom-20 -right-20 size-96 rounded-full border border-dashed border-primary/50 animate-spin-slow"></div>
        <div className="absolute top-20 right-20 size-24 bg-accent/5 rounded-full blur-xl floating-element"></div>
        
        {/* Binary texture for ML theme */}
        <div className="hidden md:block absolute top-0 right-0 w-40 h-full opacity-5">
          <div className="absolute inset-0 text-xs font-mono text-primary whitespace-pre animate-matrix-scan">
            {Array.from({length: 100}, (_, i) => "01".repeat(20)).join("\n")}
          </div>
        </div>
      </div>
      
      <div className="container mx-auto px-6 md:px-12 relative z-10">
        <div className="text-center mb-16">
          <div className="relative inline-block">
            <h2 className="text-3xl md:text-5xl font-bold font-display mb-4 text-foreground certificates-title-content">
              rishii's <span className="text-primary">Certificates</span>
            </h2>
            <div className="absolute -bottom-2 left-0 w-full h-1 bg-gradient-to-r from-primary via-secondary to-accent"></div>
          </div>
          <p className="text-lg text-foreground/70 max-w-2xl mx-auto mt-6 certificates-title-content">
            Credentials that demonstrate Hrishikesh's expertise and continuous learning in AI/ML
          </p>
        </div>
        
        <div ref={certificatesRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {certificates.map((certificate) => (
            <div 
              key={certificate.id} 
              className="bg-card border border-primary/10 rounded-xl shadow-xl p-6 card-3d hover:shadow-primary/5 hover:shadow-2xl transition-all duration-300 certificate-card backdrop-blur-sm"
              style={{ transformStyle: "preserve-3d" }}
            >
              <div className="flex justify-between items-start mb-4">
                <div className={`${certificate.iconColor} size-12 rounded-lg bg-card border border-primary/20 flex items-center justify-center shadow-sm`}>
                  <i className={`${certificate.icon} text-2xl`}></i>
                </div>
                <div className="px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-medium">
                  {certificate.year}
                </div>
              </div>
              
              <h3 className="text-xl font-bold mb-2 text-foreground">{certificate.title}</h3>
              <p className="text-foreground/70 mb-4 text-sm">{certificate.issuer}</p>
              
              {/* Neural network pattern */}
              <div className="relative h-1 w-full bg-muted rounded-full overflow-hidden mb-4">
                <div className="absolute inset-0 flex">
                  <div className="h-full bg-primary animate-data-flow" style={{ width: "60%" }}></div>
                </div>
              </div>
              
              <div className="flex justify-end">
                <a 
                  href={certificate.link} 
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary hover:text-primary/80 hover:underline flex items-center text-sm font-medium"
                >
                  <span>View Certificate</span>
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="ml-1">
                    <path d="M7 7h10v10"></path>
                    <path d="M7 17 17 7"></path>
                  </svg>
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
