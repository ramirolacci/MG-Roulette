import { useRef, useState, useEffect } from 'react';
import { Prize } from '../types';

interface RouletteProps {
  prizes: Prize[];
  targetIndex: number;
  spinning: boolean;
  onSpinEnd: () => void;
}

const SPIN_DURATION = 5000; // ms

export default function Roulette({ prizes, targetIndex, spinning, onSpinEnd }: RouletteProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animRef = useRef<number>(0);
  const startTimeRef = useRef<number>(0);
  const currentAngleRef = useRef<number>(0);
  const [displayAngle, setDisplayAngle] = useState(0);

  const count = prizes.length;
  const sliceAngle = (2 * Math.PI) / count;

  const drawWheel = (angle: number) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const cx = canvas.width / 2;
    const cy = canvas.height / 2;
    const radius = cx - 8;

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Shadow
    ctx.save();
    ctx.shadowColor = 'rgba(0,0,0,0.3)';
    ctx.shadowBlur = 24;
    ctx.beginPath();
    ctx.arc(cx, cy, radius, 0, 2 * Math.PI);
    ctx.fillStyle = '#fff';
    ctx.fill();
    ctx.restore();

    prizes.forEach((prize, i) => {
      const startA = angle + i * sliceAngle;
      const endA = startA + sliceAngle;

      // Slice
      ctx.beginPath();
      ctx.moveTo(cx, cy);
      ctx.arc(cx, cy, radius, startA, endA);
      ctx.closePath();
      ctx.fillStyle = prize.color;
      ctx.fill();
      ctx.strokeStyle = 'rgba(255,255,255,0.6)';
      ctx.lineWidth = 2;
      ctx.stroke();

      // Text
      ctx.save();
      ctx.translate(cx, cy);
      ctx.rotate(startA + sliceAngle / 2);
      ctx.textAlign = 'right';

      // Emoji
      ctx.font = `${radius * 0.12}px serif`;
      ctx.fillText(prize.emoji, radius * 0.82, radius * 0.05);

      // Label
      const fontSize = Math.max(10, radius * 0.075);
      ctx.font = `bold ${fontSize}px Inter, system-ui, sans-serif`;
      ctx.fillStyle = prize.textColor;
      ctx.shadowColor = 'rgba(0,0,0,0.4)';
      ctx.shadowBlur = 4;

      const maxWidth = radius * 0.6;
      const words = prize.label.split(' ');
      if (words.length <= 2 || prize.label.length <= 10) {
        ctx.fillText(prize.label, radius * 0.8, radius * 0.06);
      } else {
        const mid = Math.ceil(words.length / 2);
        ctx.fillText(words.slice(0, mid).join(' '), radius * 0.8, -fontSize * 0.4, maxWidth);
        ctx.fillText(words.slice(mid).join(' '), radius * 0.8, fontSize * 0.7, maxWidth);
      }

      ctx.restore();
    });

    // Center circle
    ctx.beginPath();
    ctx.arc(cx, cy, radius * 0.12, 0, 2 * Math.PI);
    ctx.fillStyle = '#fff';
    ctx.shadowColor = 'rgba(0,0,0,0.2)';
    ctx.shadowBlur = 8;
    ctx.fill();
    ctx.strokeStyle = '#E53E3E';
    ctx.lineWidth = 3;
    ctx.stroke();

    // Center logo
    ctx.font = `${radius * 0.1}px serif`;
    ctx.textAlign = 'center';
    ctx.shadowBlur = 0;
    ctx.fillText('🥟', cx, cy + radius * 0.035);

    // Outer ring
    ctx.beginPath();
    ctx.arc(cx, cy, radius, 0, 2 * Math.PI);
    ctx.strokeStyle = '#C53030';
    ctx.lineWidth = 4;
    ctx.stroke();
  };

  useEffect(() => {
    drawWheel(displayAngle);
  }, [prizes, displayAngle]);

  useEffect(() => {
    if (!spinning) return;

    const targetAngle =
      2 * Math.PI * 5 + // 5 full rotations
      (2 * Math.PI - targetIndex * sliceAngle - sliceAngle / 2); // land on target

    const startAngle = currentAngleRef.current;
    startTimeRef.current = performance.now();

    const easeOut = (t: number) => 1 - Math.pow(1 - t, 4);

    const animate = (now: number) => {
      const elapsed = now - startTimeRef.current;
      const progress = Math.min(elapsed / SPIN_DURATION, 1);
      const easedProgress = easeOut(progress);
      const angle = startAngle + easedProgress * targetAngle;

      currentAngleRef.current = angle % (2 * Math.PI);
      setDisplayAngle(angle);
      drawWheel(angle);

      if (progress < 1) {
        animRef.current = requestAnimationFrame(animate);
      } else {
        onSpinEnd();
      }
    };

    animRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animRef.current);
  }, [spinning]);

  return (
    <div className="relative flex items-center justify-center">
      {/* Pointer */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1 z-20 flex flex-col items-center">
        <div className="w-0 h-0 border-l-[14px] border-r-[14px] border-t-[28px] border-l-transparent border-r-transparent border-t-gold drop-shadow-lg" />
      </div>

      <canvas
        ref={canvasRef}
        width={360}
        height={360}
        className="rounded-full shadow-2xl"
        style={{ maxWidth: '100%', maxHeight: '100%' }}
      />
    </div>
  );
}
