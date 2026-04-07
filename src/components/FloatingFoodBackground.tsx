'use client';

import { useEffect, useState } from 'react';

interface Particle {
  id: number;
  x: number;
  y: number;
  size: number;
  duration: number;
  delay: number;
  opacity: number;
}

export default function FloatingFoodBackground() {
  const [particles, setParticles] = useState<Particle[]>([]);
  const [bokehEffects, setBokehEffects] = useState<Particle[]>([]);
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    // Check for reduced motion preference
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setReducedMotion(mediaQuery.matches);
    
    const handleChange = (e: MediaQueryListEvent) => {
      setReducedMotion(e.matches);
    };
    
    mediaQuery.addEventListener('change', handleChange);
    
    // Generate floating particles
    const particleCount = 20;
    const newParticles: Particle[] = [];
    
    for (let i = 0; i < particleCount; i++) {
      newParticles.push({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: 2 + Math.random() * 4,
        duration: 15 + Math.random() * 20,
        delay: -Math.random() * 15,
        opacity: 0.1 + Math.random() * 0.2,
      });
    }
    
    setParticles(newParticles);
    
    // Generate bokeh effects
    const bokehCount = 8;
    const newBokeh: Particle[] = [];
    
    for (let i = 0; i < bokehCount; i++) {
      newBokeh.push({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: 40 + Math.random() * 80,
        duration: 20 + Math.random() * 15,
        delay: -Math.random() * 20,
        opacity: 0.03 + Math.random() * 0.05,
      });
    }
    
    setBokehEffects(newBokeh);
    
    return () => {
      mediaQuery.removeEventListener('change', handleChange);
    };
  }, []);

  if (reducedMotion) {
    return (
      <div className="luxury-bg" aria-hidden="true">
        <div className="luxury-bg-gradient" />
      </div>
    );
  }

  return (
    <div className="luxury-bg" aria-hidden="true">
      {/* Base gradient */}
      <div className="luxury-bg-gradient" />
      
      {/* Warm color overlays */}
      <div className="luxury-bg-overlay luxury-bg-overlay--red" />
      <div className="luxury-bg-overlay luxury-bg-overlay--gold" />
      <div className="luxury-bg-overlay luxury-bg-overlay--orange" />
      
      {/* Bokeh light effects */}
      {bokehEffects.map((bokeh) => (
        <div
          key={`bokeh-${bokeh.id}`}
          className="luxury-bokeh"
          style={{
            left: `${bokeh.x}%`,
            top: `${bokeh.y}%`,
            width: `${bokeh.size}px`,
            height: `${bokeh.size}px`,
            animationDuration: `${bokeh.duration}s`,
            animationDelay: `${bokeh.delay}s`,
            opacity: bokeh.opacity,
          }}
        />
      ))}
      
      {/* Floating particles */}
      {particles.map((particle) => (
        <div
          key={`particle-${particle.id}`}
          className="luxury-particle"
          style={{
            left: `${particle.x}%`,
            top: `${particle.y}%`,
            width: `${particle.size}px`,
            height: `${particle.size}px`,
            animationDuration: `${particle.duration}s`,
            animationDelay: `${particle.delay}s`,
            opacity: particle.opacity,
          }}
        />
      ))}
      
      {/* Light rays */}
      <div className="luxury-light-ray luxury-light-ray--1" />
      <div className="luxury-light-ray luxury-light-ray--2" />
      <div className="luxury-light-ray luxury-light-ray--3" />
      
      {/* Smoke/steam effects */}
      <div className="luxury-steam luxury-steam--1" />
      <div className="luxury-steam luxury-steam--2" />
      <div className="luxury-steam luxury-steam--3" />
      
      {/* Food silhouette shapes */}
      <div className="luxury-food-shape luxury-food-shape--1" />
      <div className="luxury-food-shape luxury-food-shape--2" />
      <div className="luxury-food-shape luxury-food-shape--3" />
      <div className="luxury-food-shape luxury-food-shape--4" />
    </div>
  );
}