import React, { useEffect, useState } from 'react';

interface Particle {
  id: number;
  x: number;
  y: number;
  color: string;
  size: number;
  vx: number;
  vy: number;
  rotation: number;
  rotationSpeed: number;
}

interface ConfettiProps {
  active: boolean;
  onComplete?: () => void;
  durationMs?: number;
}

const COLORS = ['#5B5FEF', '#6CCBFF', '#34C759', '#FFB020', '#FF477E', '#FF006E'];

export const Confetti: React.FC<ConfettiProps> = ({ active, onComplete, durationMs = 3500 }) => {
  const [particles, setParticles] = useState<Particle[]>([]);

  useEffect(() => {
    if (active) {
      const generated: Particle[] = Array.from({ length: 60 }).map((_, idx) => ({
        id: idx,
        x: 50 + (Math.random() - 0.5) * 40,
        y: 40 + (Math.random() - 0.5) * 20,
        color: COLORS[Math.floor(Math.random() * COLORS.length)],
        size: 8 + Math.random() * 8,
        vx: (Math.random() - 0.5) * 12,
        vy: -10 - Math.random() * 12,
        rotation: Math.random() * 360,
        rotationSpeed: (Math.random() - 0.5) * 15
      }));

      setParticles(generated);

      const timer = setTimeout(() => {
        setParticles([]);
        if (onComplete) onComplete();
      }, durationMs);

      return () => clearTimeout(timer);
    }
  }, [active, durationMs, onComplete]);

  if (!active || particles.length === 0) return null;

  return (
    <div className="fixed inset-0 pointer-events-none z-50 overflow-hidden">
      {particles.map(p => (
        <div
          key={p.id}
          className="absolute rounded-sm animate-pop-in"
          style={{
            left: `${p.x}%`,
            top: `${p.y}%`,
            width: `${p.size}px`,
            height: `${p.size * 1.5}px`,
            backgroundColor: p.color,
            transform: `translate(${p.vx * 15}px, ${Math.abs(p.vy) * 25}px) rotate(${p.rotation}deg)`,
            transition: 'all 2.5s cubic-bezier(0.1, 0.8, 0.3, 1)',
            opacity: 0.95
          }}
        />
      ))}
    </div>
  );
};
