import { useEffect, useState } from "react";

export function Cursor() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    // Only show custom cursor on desktop
    const mediaQuery = window.matchMedia("(min-width: 768px)");
    if (!mediaQuery.matches) return;
    
    setVisible(true);
    
    const cursor = document.querySelector<HTMLElement>('.cursor');
    const cursorFollower = document.querySelector<HTMLElement>('.cursor-follower');
    
    if (!cursor || !cursorFollower) return;

    const onMouseMove = (e: MouseEvent) => {
      cursor.style.left = `${e.clientX}px`;
      cursor.style.top = `${e.clientY}px`;
      
      cursorFollower.style.left = `${e.clientX}px`;
      cursorFollower.style.top = `${e.clientY}px`;
    };
    
    const onMouseDown = () => {
      cursor.style.transform = 'translate(-50%, -50%) scale(0.8)';
      cursorFollower.style.transform = 'translate(-50%, -50%) scale(0.5)';
    };
    
    const onMouseUp = () => {
      cursor.style.transform = 'translate(-50%, -50%) scale(1)';
      cursorFollower.style.transform = 'translate(-50%, -50%) scale(1)';
    };

    // Add hover effect for clickable elements
    const handleElementMouseEnter = (e: Event) => {
      cursor.style.transform = 'translate(-50%, -50%) scale(1.5)';
      cursor.style.backgroundColor = 'rgba(108, 99, 255, 0.1)';
      cursor.style.borderColor = 'rgba(108, 99, 255, 0.6)';
    };
    
    const handleElementMouseLeave = (e: Event) => {
      cursor.style.transform = 'translate(-50%, -50%) scale(1)';
      cursor.style.backgroundColor = 'transparent';
      cursor.style.borderColor = 'hsl(245, 100%, 69%)';
    };

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mousedown', onMouseDown);
    document.addEventListener('mouseup', onMouseUp);
    
    // Attach hover events to all clickable elements
    const attachEventsToClickables = () => {
      const clickables = document.querySelectorAll('a, button, input, textarea, [role="button"]');
      clickables.forEach(el => {
        el.addEventListener('mouseenter', handleElementMouseEnter);
        el.addEventListener('mouseleave', handleElementMouseLeave);
      });
    };
    
    // Initial attachment
    attachEventsToClickables();
    
    // Set up a MutationObserver to watch for new clickable elements
    const observer = new MutationObserver((mutations) => {
      attachEventsToClickables();
    });
    
    observer.observe(document.body, {
      childList: true,
      subtree: true
    });
    
    return () => {
      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mousedown', onMouseDown);
      document.removeEventListener('mouseup', onMouseUp);
      
      // Clean up all event listeners
      const clickables = document.querySelectorAll('a, button, input, textarea, [role="button"]');
      clickables.forEach(el => {
        el.removeEventListener('mouseenter', handleElementMouseEnter);
        el.removeEventListener('mouseleave', handleElementMouseLeave);
      });
      
      observer.disconnect();
    };
  }, []);

  if (!visible) return null;

  return (
    <>
      <div className="cursor hidden md:block"></div>
      <div className="cursor-follower hidden md:block"></div>
    </>
  );
}
