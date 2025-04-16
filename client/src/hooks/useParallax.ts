import { useEffect, RefObject } from "react";

interface UseParallaxOptions {
  intensity?: number;
  reverse?: boolean;
}

export function useParallax(
  ref: RefObject<HTMLElement>,
  options: UseParallaxOptions = {}
) {
  const { intensity = 0.1, reverse = false } = options;

  useEffect(() => {
    if (!ref.current) return;

    const element = ref.current;
    
    const handleMouseMove = (e: MouseEvent) => {
      const { clientX, clientY } = e;
      const { left, top, width, height } = element.getBoundingClientRect();
      
      // Calculate mouse position relative to the element
      const xRelative = clientX - left;
      const yRelative = clientY - top;
      
      // Calculate position as a percentage
      const xPercent = xRelative / width;
      const yPercent = yRelative / height;
      
      // Calculate movement based on position and intensity
      // If reverse is true, invert the direction
      const xMove = reverse 
        ? (0.5 - xPercent) * intensity * 100 
        : (xPercent - 0.5) * intensity * 100;
      const yMove = reverse 
        ? (0.5 - yPercent) * intensity * 100 
        : (yPercent - 0.5) * intensity * 100;
      
      // Apply the transform
      element.style.transform = `translate(${xMove}px, ${yMove}px)`;
    };
    
    const handleMouseLeave = () => {
      // Reset position when mouse leaves
      element.style.transform = 'translate(0, 0)';
      element.style.transition = 'transform 0.5s ease-out';
    };
    
    const handleMouseEnter = () => {
      // Remove transition when mouse enters for smoother movement
      element.style.transition = 'none';
    };
    
    // Add event listeners
    element.addEventListener('mousemove', handleMouseMove);
    element.addEventListener('mouseleave', handleMouseLeave);
    element.addEventListener('mouseenter', handleMouseEnter);
    
    return () => {
      // Clean up
      element.removeEventListener('mousemove', handleMouseMove);
      element.removeEventListener('mouseleave', handleMouseLeave);
      element.removeEventListener('mouseenter', handleMouseEnter);
    };
  }, [ref, intensity, reverse]);
}
