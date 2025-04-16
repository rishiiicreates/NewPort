import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface Skill {
  name: string;
  percentage: number;
}

interface Technology {
  name: string;
  icon: string;
  color: string;
}

export function Skills() {
  const sectionRef = useRef<HTMLElement>(null);
  const developmentSkillsRef = useRef<HTMLDivElement>(null);
  const aiMlSkillsRef = useRef<HTMLDivElement>(null);
  
  const developmentSkills: Skill[] = [
    { name: "UI/UX Design", percentage: 90 },
    { name: "React & Frontend", percentage: 85 },
    { name: "Python", percentage: 80 },
    { name: "JavaScript/TypeScript", percentage: 85 },
    { name: "Responsive Design", percentage: 95 }
  ];
  
  const aiMlSkills: Skill[] = [
    { name: "Machine Learning", percentage: 80 },
    { name: "TensorFlow", percentage: 75 },
    { name: "Computer Vision", percentage: 70 },
    { name: "Natural Language Processing", percentage: 65 },
    { name: "Data Analysis", percentage: 85 }
  ];
  
  const technologies: Technology[] = [
    { name: "React", icon: "fab fa-react", color: "text-blue-500" },
    { name: "Python", icon: "fab fa-python", color: "text-blue-600" },
    { name: "JavaScript", icon: "fab fa-js-square", color: "text-yellow-500" },
    { name: "Figma", icon: "fab fa-figma", color: "text-purple-500" },
    { name: "TensorFlow", icon: "text-2xl font-bold text-green-600", color: "" },
    { name: "SQL", icon: "fas fa-database", color: "text-gray-600" },
    { name: "Node.js", icon: "fab fa-node-js", color: "text-green-600" },
    { name: "Git", icon: "fab fa-git-alt", color: "text-orange-600" }
  ];
  
  useEffect(() => {
    if (!sectionRef.current) return;
    
    // Animate section title when scrolled into view
    gsap.from(".skills-title-content", {
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
    
    // Animate skill bars when they come into view
    const animateSkillBars = (skillsRef: React.RefObject<HTMLDivElement>, skillClass: string) => {
      if (!skillsRef.current) return;
      
      const skillBars = skillsRef.current.querySelectorAll<HTMLElement>(`.${skillClass}`);
      
      ScrollTrigger.create({
        trigger: skillsRef.current,
        start: "top 80%",
        once: true,
        onEnter: () => {
          skillBars.forEach((bar) => {
            gsap.to(bar, {
              width: bar.dataset.width,
              duration: 1.5,
              ease: "power2.out"
            });
          });
        }
      });
    };
    
    animateSkillBars(developmentSkillsRef, "dev-skill-fill");
    animateSkillBars(aiMlSkillsRef, "ai-skill-fill");
    
    // Animate technology icons
    gsap.from(".tech-icon", {
      scrollTrigger: {
        trigger: ".technologies-container",
        start: "top 80%",
        once: true
      },
      y: 30,
      opacity: 0,
      duration: 0.6,
      stagger: 0.1,
      ease: "back.out(1.5)"
    });
    
    return () => {
      // Clean up ScrollTrigger
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);
  
  return (
    <section id="skills" ref={sectionRef} className="py-20 md:py-32 relative overflow-hidden">
      <div className="container mx-auto px-6 md:px-12">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold font-display mb-4 text-dark skills-title-content">
            My <span className="text-primary">Skills</span>
          </h2>
          <p className="text-lg text-dark/70 max-w-2xl mx-auto skills-title-content">
            A comprehensive toolbox of technologies and capabilities I've mastered
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
          <div ref={developmentSkillsRef}>
            <h3 className="text-2xl font-bold mb-8 flex items-center">
              <span className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center mr-3">
                <i className="fas fa-code text-primary"></i>
              </span>
              Development Skills
            </h3>
            
            <div className="space-y-6">
              {developmentSkills.map((skill, index) => (
                <div key={index}>
                  <div className="flex justify-between mb-2">
                    <span className="font-medium">{skill.name}</span>
                    <span>{skill.percentage}%</span>
                  </div>
                  <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-primary rounded-full dev-skill-fill" 
                      data-width={`${skill.percentage}%`}
                      style={{ width: "0%" }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          <div ref={aiMlSkillsRef}>
            <h3 className="text-2xl font-bold mb-8 flex items-center">
              <span className="w-10 h-10 rounded-lg bg-secondary/10 flex items-center justify-center mr-3">
                <i className="fas fa-brain text-secondary"></i>
              </span>
              AI/ML Skills
            </h3>
            
            <div className="space-y-6">
              {aiMlSkills.map((skill, index) => (
                <div key={index}>
                  <div className="flex justify-between mb-2">
                    <span className="font-medium">{skill.name}</span>
                    <span>{skill.percentage}%</span>
                  </div>
                  <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-secondary rounded-full ai-skill-fill" 
                      data-width={`${skill.percentage}%`}
                      style={{ width: "0%" }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        
        <div className="mt-20">
          <h3 className="text-2xl font-bold mb-8 text-center">Technologies I Work With</h3>
          
          <div className="flex flex-wrap justify-center gap-6 md:gap-10 technologies-container">
            {technologies.map((tech, index) => (
              <div key={index} className="flex flex-col items-center tech-icon">
                <div className="w-16 h-16 flex items-center justify-center bg-white rounded-xl shadow-md transform transition-all duration-300 hover:scale-110 hover:shadow-lg">
                  {tech.name === "TensorFlow" ? (
                    <span className={tech.color}>Tf</span>
                  ) : (
                    <i className={`${tech.icon} text-3xl ${tech.color}`}></i>
                  )}
                </div>
                <span className="mt-2 text-sm">{tech.name}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
