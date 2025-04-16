export const setupCursor = () => {
  const cursor = document.querySelector<HTMLElement>('.cursor');
  const cursorFollower = document.querySelector<HTMLElement>('.cursor-follower');
  
  if (!cursor || !cursorFollower) return;

  document.addEventListener('mousemove', (e) => {
    cursor.style.left = `${e.clientX}px`;
    cursor.style.top = `${e.clientY}px`;
    
    cursorFollower.style.left = `${e.clientX}px`;
    cursorFollower.style.top = `${e.clientY}px`;
  });
  
  document.addEventListener('mousedown', () => {
    cursor.style.transform = 'translate(-50%, -50%) scale(0.8)';
    cursorFollower.style.transform = 'translate(-50%, -50%) scale(0.5)';
  });
  
  document.addEventListener('mouseup', () => {
    cursor.style.transform = 'translate(-50%, -50%) scale(1)';
    cursorFollower.style.transform = 'translate(-50%, -50%) scale(1)';
  });

  // Add hover effect for clickable elements
  const clickables = document.querySelectorAll('a, button, input, textarea, [role="button"]');
  clickables.forEach(el => {
    el.addEventListener('mouseenter', () => {
      cursor.style.transform = 'translate(-50%, -50%) scale(1.5)';
      cursor.style.backgroundColor = 'rgba(108, 99, 255, 0.1)';
      cursor.style.borderColor = 'rgba(108, 99, 255, 0.6)';
    });
    
    el.addEventListener('mouseleave', () => {
      cursor.style.transform = 'translate(-50%, -50%) scale(1)';
      cursor.style.backgroundColor = 'transparent';
      cursor.style.borderColor = 'hsl(245, 100%, 69%)';
    });
  });
};
