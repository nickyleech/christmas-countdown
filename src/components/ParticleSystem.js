import React, { useEffect, useRef } from 'react';
import { useTheme } from '../contexts/ThemeContext';

const ParticleSystem = () => {
  const canvasRef = useRef(null);
  const animationRef = useRef(null);
  const particlesRef = useRef([]);
  const { theme } = useTheme();

  useEffect(() => {
    if (!theme.particles) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Create particles based on theme
    const createParticle = () => {
      const baseParticle = {
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        opacity: Math.random() * 0.8 + 0.2,
        life: Math.random() * 100 + 50
      };

      switch (theme.particles.type) {
        case 'stars':
          return {
            ...baseParticle,
            size: Math.random() * 2 + 1,
            twinkle: Math.random() * 0.02 + 0.01,
            angle: 0
          };
        case 'sparkles':
          return {
            ...baseParticle,
            size: Math.random() * 3 + 1,
            rotation: Math.random() * Math.PI * 2,
            rotationSpeed: (Math.random() - 0.5) * 0.1
          };
        case 'neon':
          return {
            ...baseParticle,
            size: Math.random() * 4 + 2,
            pulse: Math.random() * 0.05 + 0.02,
            glowSize: Math.random() * 10 + 5
          };
        case 'retro':
          return {
            ...baseParticle,
            size: Math.random() * 6 + 3,
            speed: Math.random() * 2 + 1,
            direction: Math.random() * Math.PI * 2,
            trail: []
          };
        default:
          return baseParticle;
      }
    };

    // Initialize particles
    particlesRef.current = [];
    for (let i = 0; i < theme.particles.count; i++) {
      particlesRef.current.push(createParticle());
    }

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      particlesRef.current.forEach((particle, index) => {
        ctx.save();
        
        switch (theme.particles.type) {
          case 'stars':
            // Twinkling stars
            particle.angle += particle.twinkle;
            particle.opacity = Math.sin(particle.angle) * 0.5 + 0.5;
            
            ctx.globalAlpha = particle.opacity;
            ctx.fillStyle = theme.particles.color;
            ctx.beginPath();
            ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
            ctx.fill();
            
            // Add cross sparkle
            ctx.strokeStyle = theme.particles.color;
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.moveTo(particle.x - particle.size * 2, particle.y);
            ctx.lineTo(particle.x + particle.size * 2, particle.y);
            ctx.moveTo(particle.x, particle.y - particle.size * 2);
            ctx.lineTo(particle.x, particle.y + particle.size * 2);
            ctx.stroke();
            break;

          case 'sparkles':
            // Rotating sparkles
            particle.rotation += particle.rotationSpeed;
            
            ctx.translate(particle.x, particle.y);
            ctx.rotate(particle.rotation);
            ctx.globalAlpha = particle.opacity;
            ctx.fillStyle = theme.particles.color;
            
            // Draw diamond shape
            ctx.beginPath();
            ctx.moveTo(0, -particle.size);
            ctx.lineTo(particle.size * 0.5, 0);
            ctx.lineTo(0, particle.size);
            ctx.lineTo(-particle.size * 0.5, 0);
            ctx.closePath();
            ctx.fill();
            break;

          case 'neon':
            // Pulsing neon particles
            particle.angle = (particle.angle || 0) + particle.pulse;
            const glowIntensity = Math.sin(particle.angle) * 0.3 + 0.7;
            
            ctx.globalAlpha = particle.opacity * glowIntensity;
            ctx.fillStyle = theme.particles.color;
            ctx.shadowColor = theme.particles.color;
            ctx.shadowBlur = particle.glowSize * glowIntensity;
            
            ctx.beginPath();
            ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
            ctx.fill();
            break;

          case 'retro':
            // Moving retro particles with trails
            particle.x += Math.cos(particle.direction) * particle.speed;
            particle.y += Math.sin(particle.direction) * particle.speed;
            
            // Add to trail
            particle.trail.push({ x: particle.x, y: particle.y });
            if (particle.trail.length > 10) {
              particle.trail.shift();
            }
            
            // Draw trail
            particle.trail.forEach((point, i) => {
              ctx.globalAlpha = (i / particle.trail.length) * particle.opacity * 0.5;
              ctx.fillStyle = theme.particles.color;
              ctx.beginPath();
              ctx.arc(point.x, point.y, particle.size * (i / particle.trail.length), 0, Math.PI * 2);
              ctx.fill();
            });
            
            // Wrap around screen
            if (particle.x > canvas.width) particle.x = 0;
            if (particle.x < 0) particle.x = canvas.width;
            if (particle.y > canvas.height) particle.y = 0;
            if (particle.y < 0) particle.y = canvas.height;
            break;
          default:
            break;
        }
        
        ctx.restore();
        
        // Update particle life
        particle.life--;
        if (particle.life <= 0) {
          particlesRef.current[index] = createParticle();
        }
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
  }, [theme]);

  if (!theme.particles) return null;

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-5"
      style={{ background: 'transparent' }}
      aria-hidden="true"
    />
  );
};

export default ParticleSystem;