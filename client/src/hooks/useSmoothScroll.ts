import { useEffect } from "react";

interface UseSmoothScrollOptions {
  duration?: number;
  offset?: number;
  selector?: string;
}

export function useSmoothScroll(options: UseSmoothScrollOptions = {}) {
  const { 
    duration = 1000, 
    offset = 0, 
    selector = 'a[href^="#"]'
  } = options;

  useEffect(() => {
    const handleClick = (e: Event) => {
      e.preventDefault();
      
      const target = e.currentTarget as HTMLAnchorElement;
      const targetId = target.getAttribute('href');
      
      if (!targetId || targetId === '#') return;
      
      const targetElement = document.querySelector(targetId);
      
      if (!targetElement) return;
      
      const startPosition = window.scrollY;
      const targetPosition = targetElement.getBoundingClientRect().top + window.scrollY - offset;
      const startTime = performance.now();
      
      const animateScroll = (currentTime: number) => {
        const elapsedTime = currentTime - startTime;
        const progress = Math.min(elapsedTime / duration, 1);
        
        // Easing function (ease-in-out cubic)
        const ease = progress < 0.5
          ? 4 * progress * progress * progress
          : (progress - 1) * (2 * progress - 2) * (2 * progress - 2) + 1;
        
        const currentPosition = startPosition + (targetPosition - startPosition) * ease;
        
        window.scrollTo(0, currentPosition);
        
        if (progress < 1) {
          requestAnimationFrame(animateScroll);
        }
      };
      
      requestAnimationFrame(animateScroll);
    };
    
    const links = document.querySelectorAll(selector);
    
    links.forEach(link => {
      link.addEventListener('click', handleClick);
    });
    
    return () => {
      links.forEach(link => {
        link.removeEventListener('click', handleClick);
      });
    };
  }, [duration, offset, selector]);
}
