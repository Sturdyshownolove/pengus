import React, { useEffect, useRef } from 'react';
import { ParticleType } from '../../types';

interface DestinationParticleCanvasProps {
  type: ParticleType;
  className?: string;
}

interface Particle {
  x: number;
  y: number;
  size: number;
  speedY: number;
  speedX: number;
  color: string;
  angle: number;
  angularVelocity: number;
  phase: number;
  wobbleSpeed: number;
  wobbleAmp: number;
  pulseSpeed: number;
  pulsePhase: number;
  alpha: number;
  isStar?: boolean;
  width?: number;
  height?: number;
  flipAngle?: number;
  flipSpeed?: number;
}

const SAKURA_COLORS = ['#FFB7C5', '#FF69B4', '#FFC0CB', '#FFB6C1'];
const SNOW_COLORS = ['#FFFFFF', 'rgba(224, 247, 250, 0.9)', 'rgba(207, 248, 255, 0.85)'];
const GOLD_COLORS = ['#FFD700', '#FFF8DC', '#FFA500', '#FFE4B5'];
const BUBBLE_COLORS = ['rgba(255, 255, 255, 0.4)', 'rgba(200, 240, 255, 0.45)', 'rgba(225, 245, 255, 0.35)'];
const CONFETTI_COLORS = ['#FF4081', '#00E676', '#FFEB3B', '#29B6F6', '#E040FB'];

function createParticles(type: ParticleType, width: number, height: number): Particle[] {
  const particles: Particle[] = [];
  let count = 35;

  if (type === 'snow') count = 45;
  else if (type === 'gold_sparkles') count = 40;
  else if (type === 'bubbles') count = 25;
  else if (type === 'confetti') count = 40;
  else if (type === 'warm_glow') count = 18;

  for (let i = 0; i < count; i++) {
    const x = Math.random() * width;
    const y = Math.random() * height;

    if (type === 'sakura') {
      particles.push({
        x,
        y,
        size: 6 + Math.random() * 6,
        speedY: 0.8 + Math.random() * 1.0,
        speedX: 0,
        color: SAKURA_COLORS[Math.floor(Math.random() * SAKURA_COLORS.length)],
        angle: Math.random() * Math.PI * 2,
        angularVelocity: (Math.random() - 0.5) * 0.03,
        phase: Math.random() * Math.PI * 2,
        wobbleSpeed: 0.02 + Math.random() * 0.03,
        wobbleAmp: 0.6 + Math.random() * 0.8,
        pulseSpeed: 0,
        pulsePhase: 0,
        alpha: 0.8 + Math.random() * 0.2,
      });
    } else if (type === 'snow') {
      particles.push({
        x,
        y,
        size: 2 + Math.random() * 4,
        speedY: 0.5 + Math.random() * 1.0,
        speedX: 0,
        color: SNOW_COLORS[Math.floor(Math.random() * SNOW_COLORS.length)],
        angle: 0,
        angularVelocity: 0,
        phase: Math.random() * Math.PI * 2,
        wobbleSpeed: 0.015 + Math.random() * 0.025,
        wobbleAmp: 0.4 + Math.random() * 0.6,
        pulseSpeed: 0,
        pulsePhase: 0,
        alpha: 0.7 + Math.random() * 0.3,
      });
    } else if (type === 'gold_sparkles') {
      particles.push({
        x,
        y,
        size: 3 + Math.random() * 5,
        speedY: -(0.4 + Math.random() * 0.8),
        speedX: (Math.random() - 0.5) * 0.4,
        color: GOLD_COLORS[Math.floor(Math.random() * GOLD_COLORS.length)],
        angle: Math.random() * Math.PI * 2,
        angularVelocity: (Math.random() - 0.5) * 0.02,
        phase: 0,
        wobbleSpeed: 0,
        wobbleAmp: 0,
        pulseSpeed: 0.03 + Math.random() * 0.05,
        pulsePhase: Math.random() * Math.PI * 2,
        alpha: 0.8,
        isStar: Math.random() > 0.4,
      });
    } else if (type === 'bubbles') {
      particles.push({
        x,
        y,
        size: 5 + Math.random() * 9,
        speedY: -(0.6 + Math.random() * 1.0),
        speedX: 0,
        color: BUBBLE_COLORS[Math.floor(Math.random() * BUBBLE_COLORS.length)],
        angle: 0,
        angularVelocity: 0,
        phase: Math.random() * Math.PI * 2,
        wobbleSpeed: 0.02 + Math.random() * 0.03,
        wobbleAmp: 0.5 + Math.random() * 0.8,
        pulseSpeed: 0,
        pulsePhase: 0,
        alpha: 0.6,
      });
    } else if (type === 'confetti') {
      particles.push({
        x,
        y,
        size: 8,
        speedY: 1.5 + Math.random() * 1.5,
        speedX: (Math.random() - 0.5) * 0.6,
        color: CONFETTI_COLORS[Math.floor(Math.random() * CONFETTI_COLORS.length)],
        angle: Math.random() * Math.PI * 2,
        angularVelocity: (Math.random() - 0.5) * 0.06,
        phase: 0,
        wobbleSpeed: 0,
        wobbleAmp: 0,
        pulseSpeed: 0,
        pulsePhase: 0,
        alpha: 1,
        width: 6 + Math.random() * 4,
        height: 8 + Math.random() * 6,
        flipAngle: Math.random() * Math.PI * 2,
        flipSpeed: 0.05 + Math.random() * 0.08,
      });
    } else if (type === 'warm_glow') {
      particles.push({
        x,
        y,
        size: 30 + Math.random() * 30,
        speedY: -(0.2 + Math.random() * 0.4),
        speedX: (Math.random() - 0.5) * 0.3,
        color: 'rgba(255, 179, 0, 0.25)',
        angle: 0,
        angularVelocity: 0,
        phase: 0,
        wobbleSpeed: 0,
        wobbleAmp: 0,
        pulseSpeed: 0.015 + Math.random() * 0.02,
        pulsePhase: Math.random() * Math.PI * 2,
        alpha: 0.25,
      });
    }
  }

  return particles;
}

export const DestinationParticleCanvas: React.FC<DestinationParticleCanvasProps> = ({
  type,
  className = '',
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animFrameId: number;
    let width = canvas.offsetWidth || canvas.clientWidth || 300;
    let height = canvas.offsetHeight || canvas.clientHeight || 150;

    const setupCanvasSize = () => {
      if (!canvas || !ctx) return;
      width = canvas.offsetWidth || canvas.clientWidth || 300;
      height = canvas.offsetHeight || canvas.clientHeight || 150;
      const dpr = window.devicePixelRatio || 1;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    setupCanvasSize();
    window.addEventListener('resize', setupCanvasSize);

    const particles = createParticles(type, width, height);

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];

        if (type === 'sakura') {
          p.y += p.speedY;
          p.phase += p.wobbleSpeed;
          p.x += Math.sin(p.phase) * p.wobbleAmp;
          p.angle += p.angularVelocity;

          if (p.y > height + 20) {
            p.y = -20;
            p.x = Math.random() * width;
          }

          ctx.save();
          ctx.translate(p.x, p.y);
          ctx.rotate(p.angle);
          ctx.fillStyle = p.color;
          ctx.globalAlpha = p.alpha;
          ctx.beginPath();
          ctx.ellipse(0, 0, p.size, p.size * 0.5, 0, 0, Math.PI * 2);
          ctx.fill();
          ctx.restore();
        } else if (type === 'snow') {
          p.y += p.speedY;
          p.phase += p.wobbleSpeed;
          p.x += Math.sin(p.phase) * p.wobbleAmp;

          if (p.y > height + 10) {
            p.y = -10;
            p.x = Math.random() * width;
          }

          const grad = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.size);
          grad.addColorStop(0, p.color);
          grad.addColorStop(0.5, p.color);
          grad.addColorStop(1, 'rgba(255, 255, 255, 0)');
          ctx.fillStyle = grad;
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
          ctx.fill();
        } else if (type === 'gold_sparkles') {
          p.y += p.speedY;
          p.x += p.speedX;
          p.pulsePhase += p.pulseSpeed;
          p.angle += p.angularVelocity;

          if (p.y < -15) {
            p.y = height + 15;
            p.x = Math.random() * width;
          }
          if (p.x < -10) p.x = width + 10;
          if (p.x > width + 10) p.x = -10;

          const currentAlpha = 0.2 + 0.8 * Math.abs(Math.sin(p.pulsePhase));
          ctx.save();
          ctx.translate(p.x, p.y);
          ctx.rotate(p.angle);
          ctx.globalAlpha = currentAlpha;
          ctx.fillStyle = p.color;

          if (p.isStar) {
            ctx.beginPath();
            const rOuter = p.size;
            const rInner = p.size * 0.25;
            for (let k = 0; k < 8; k++) {
              const r = k % 2 === 0 ? rOuter : rInner;
              const a = (k * Math.PI) / 4;
              if (k === 0) ctx.moveTo(Math.cos(a) * r, Math.sin(a) * r);
              else ctx.lineTo(Math.cos(a) * r, Math.sin(a) * r);
            }
            ctx.closePath();
            ctx.fill();
          } else {
            ctx.beginPath();
            ctx.arc(0, 0, p.size * 0.6, 0, Math.PI * 2);
            ctx.fill();
          }
          ctx.restore();
        } else if (type === 'bubbles') {
          p.y += p.speedY;
          p.phase += p.wobbleSpeed;
          p.x += Math.sin(p.phase) * p.wobbleAmp;

          if (p.y < -20) {
            p.y = height + 20;
            p.x = Math.random() * width;
          }

          ctx.save();
          ctx.strokeStyle = p.color;
          ctx.lineWidth = 1.5;
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
          ctx.stroke();

          ctx.fillStyle = 'rgba(255, 255, 255, 0.6)';
          ctx.beginPath();
          ctx.arc(p.x - p.size * 0.3, p.y - p.size * 0.3, Math.max(1, p.size * 0.2), 0, Math.PI * 2);
          ctx.fill();
          ctx.restore();
        } else if (type === 'confetti') {
          p.y += p.speedY;
          p.x += p.speedX;
          p.angle += p.angularVelocity;
          if (p.flipAngle !== undefined && p.flipSpeed !== undefined) {
            p.flipAngle += p.flipSpeed;
          }

          if (p.y > height + 20) {
            p.y = -20;
            p.x = Math.random() * width;
          }
          if (p.x < -10) p.x = width + 10;
          if (p.x > width + 10) p.x = -10;

          ctx.save();
          ctx.translate(p.x, p.y);
          ctx.rotate(p.angle);
          const flipScaleY = Math.cos(p.flipAngle || 0);
          ctx.scale(1, flipScaleY);
          ctx.fillStyle = p.color;
          const pw = p.width || 8;
          const ph = p.height || 10;
          ctx.fillRect(-pw / 2, -ph / 2, pw, ph);
          ctx.restore();
        } else if (type === 'warm_glow') {
          p.y += p.speedY;
          p.x += p.speedX;
          p.pulsePhase += p.pulseSpeed;

          if (p.y < -p.size - 10) {
            p.y = height + p.size + 10;
            p.x = Math.random() * width;
          }
          if (p.x < -p.size) p.x = width + p.size;
          if (p.x > width + p.size) p.x = -p.size;

          const r = p.size * (0.85 + 0.25 * Math.sin(p.pulsePhase));
          const currentAlpha = 0.25 * (0.7 + 0.3 * Math.sin(p.pulsePhase));
          const grad = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, r);
          grad.addColorStop(0, `rgba(255, 220, 100, ${currentAlpha})`);
          grad.addColorStop(0.5, `rgba(255, 179, 0, ${currentAlpha * 0.6})`);
          grad.addColorStop(1, 'rgba(255, 179, 0, 0)');

          ctx.fillStyle = grad;
          ctx.beginPath();
          ctx.arc(p.x, p.y, r, 0, Math.PI * 2);
          ctx.fill();
        }
      }

      animFrameId = requestAnimationFrame(render);
    };

    animFrameId = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(animFrameId);
      window.removeEventListener('resize', setupCanvasSize);
    };
  }, [type]);

  return (
    <canvas
      ref={canvasRef}
      className={`w-full h-full pointer-events-none block ${className}`}
    />
  );
};

export default DestinationParticleCanvas;
