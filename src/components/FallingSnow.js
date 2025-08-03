import React, { useEffect, useRef, useState } from 'react';

const FallingSnow = () => {
  const canvasRef = useRef(null);
  const animationRef = useRef(null);
  const snowflakes = useRef([]);
  const [isMobile, setIsMobile] = useState(false);
  const [isReduced, setIsReduced] = useState(false);

  useEffect(() => {
    // Detect mobile devices and reduced motion preference
    const checkMobile = () => window.innerWidth <= 768;
    const checkReducedMotion = () => window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    
    setIsMobile(checkMobile());
    setIsReduced(checkReducedMotion());
    
    const handleResize = () => setIsMobile(checkMobile());
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    const handleMotionChange = (e) => setIsReduced(e.matches);
    
    window.addEventListener('resize', handleResize);
    mediaQuery.addEventListener('change', handleMotionChange);
    
    return () => {
      window.removeEventListener('resize', handleResize);
      mediaQuery.removeEventListener('change', handleMotionChange);
    };
  }, []);

  useEffect(() => {
    if (isReduced) return; // Skip animation if user prefers reduced motion
    
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);
    
    const createSnowflake = () => ({
      x: Math.random() * canvas.width,
      y: -10,
      radius: Math.random() * 3 + 1,
      speed: Math.random() * 2 + 0.5,
      wind: Math.random() * 0.5 - 0.25,
      opacity: Math.random() * 0.8 + 0.2
    });
    
    // Reduce snowflake count on mobile for better performance
    const snowflakeCount = isMobile ? 75 : 150;
    snowflakes.current = [];
    
    for (let i = 0; i < snowflakeCount; i++) {
      snowflakes.current.push(createSnowflake());
    }
    
    let lastTime = 0;
    const targetFPS = isMobile ? 30 : 60; // Lower FPS on mobile
    const frameInterval = 1000 / targetFPS;
    
    const animate = (currentTime) => {
      if (currentTime - lastTime >= frameInterval) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        snowflakes.current.forEach((flake, index) => {
          flake.y += flake.speed;
          flake.x += flake.wind;
          
          if (flake.y > canvas.height) {
            snowflakes.current[index] = createSnowflake();
          }
          
          if (flake.x > canvas.width + 10) {
            flake.x = -10;
          } else if (flake.x < -10) {
            flake.x = canvas.width + 10;
          }
          
          ctx.beginPath();
          ctx.arc(flake.x, flake.y, flake.radius, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(255, 255, 255, ${flake.opacity})`;
          ctx.fill();
        });
        
        lastTime = currentTime;
      }
      
      animationRef.current = requestAnimationFrame(animate);
    };
    
    animate(0);
    
    return () => {
      window.removeEventListener('resize', resizeCanvas);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [isMobile, isReduced]);

  if (isReduced) {
    return null; // Don't render snow if user prefers reduced motion
  }

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-10"
      style={{ background: 'transparent' }}
      aria-hidden="true"
    />
  );
};

export default FallingSnow;