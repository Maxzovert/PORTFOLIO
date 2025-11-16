import { useEffect, useRef } from 'react';

const CustomCursor = () => {
  const cursorRef = useRef<HTMLDivElement>(null);
  const followerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Disable custom cursor on touch devices
    const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
    if (isTouchDevice) {
      // Show default cursor on touch devices
      document.body.style.cursor = 'auto';
      return;
    }

    const cursor = cursorRef.current;
    const follower = followerRef.current;
    
    if (!cursor || !follower) return;

    let mouseX = 0;
    let mouseY = 0;
    let followerX = 0;
    let followerY = 0;
    let cursorX = 0;
    let cursorY = 0;
    let rafId: number | null = null;
    let isHovering = false;

    const handleMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    };

    const animate = () => {
      // Both cursor and follower follow mouse exactly (no smoothing for instant response)
      cursorX = mouseX;
      cursorY = mouseY;
      followerX = mouseX;
      followerY = mouseY;
      
      // Use left/top with translate(-50%, -50%) to perfectly center elements
      const scale = isHovering ? 1.5 : 1;
      
      // Position at mouse coordinates and center using translate(-50%, -50%)
      cursor.style.left = `${cursorX}px`;
      cursor.style.top = `${cursorY}px`;
      cursor.style.transform = `translate(-50%, -50%) scale(${scale})`;
      
      follower.style.left = `${followerX}px`;
      follower.style.top = `${followerY}px`;
      follower.style.transform = `translate(-50%, -50%) scale(${scale})`;
      
      rafId = requestAnimationFrame(animate);
    };

    const handleMouseEnter = () => {
      isHovering = true;
    };

    const handleMouseLeave = () => {
      isHovering = false;
    };

    // Initialize positions on first mouse move
    const updateInitialPosition = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      cursorX = mouseX;
      cursorY = mouseY;
      followerX = mouseX;
      followerY = mouseY;
      
      // Position immediately using left/top with translate(-50%, -50%) for perfect centering
      cursor.style.left = `${cursorX}px`;
      cursor.style.top = `${cursorY}px`;
      cursor.style.transform = `translate(-50%, -50%)`;
      
      follower.style.left = `${followerX}px`;
      follower.style.top = `${followerY}px`;
      follower.style.transform = `translate(-50%, -50%)`;
    };

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mousemove', updateInitialPosition, { once: true });
    
    // Add hover effects for interactive elements
    const interactiveElements = document.querySelectorAll('button, a, [role="button"], input, textarea, select');
    interactiveElements.forEach(el => {
      el.addEventListener('mouseenter', handleMouseEnter);
      el.addEventListener('mouseleave', handleMouseLeave);
    });

    // Start animation loop
    rafId = requestAnimationFrame(animate);

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mousemove', updateInitialPosition);
      interactiveElements.forEach(el => {
        el.removeEventListener('mouseenter', handleMouseEnter);
        el.removeEventListener('mouseleave', handleMouseLeave);
      });
      if (rafId) {
        cancelAnimationFrame(rafId);
      }
    };
  }, []);

  // Don't render cursor on touch devices
  const isTouchDevice = typeof window !== 'undefined' && ('ontouchstart' in window || navigator.maxTouchPoints > 0);
  if (isTouchDevice) {
    return null;
  }

  return (
    <>
      <div ref={cursorRef} className="cursor" />
      <div ref={followerRef} className="cursor-follower" />
    </>
  );
};

export default CustomCursor;