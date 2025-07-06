import React, { useEffect, useRef } from 'react';

const FallingSnow = () => {
  const canvasRef = useRef(null);
  const animationRef = useRef(null);
  const snowflakes = useRef([]);

  useEffect(() => {
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
    
    for (let i = 0; i < 150; i++) {
      snowflakes.current.push(createSnowflake());
    }
    
    const animate = () => {
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
      
      animationRef.current = requestAnimationFrame(animate);
    };
    
    animate();
    
    return () => {
      window.removeEventListener('resize', resizeCanvas);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-10"
      style={{ background: 'transparent' }}
    />
  );
};

export default FallingSnow;