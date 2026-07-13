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

    const wheelGradient = ctx.createRadialGradient(cx, cy, radius * 0.2, cx, cy, radius);
    wheelGradient.addColorStop(0, '#ffffff');
    wheelGradient.addColorStop(0.7, '#f7f7f7');
    wheelGradient.addColorStop(1, '#ececec');

    ctx.save();
    ctx.beginPath();
    ctx.arc(cx, cy, radius, 0, 2 * Math.PI);
    ctx.fillStyle = wheelGradient;
    ctx.fill();
    ctx.restore();

    ctx.save();
    ctx.beginPath();
    ctx.arc(cx, cy, radius * 0.95, 0, 2 * Math.PI);
    ctx.strokeStyle = 'rgba(0,0,0,0.12)';
    ctx.lineWidth = 10;
    ctx.stroke();
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
      ctx.strokeStyle = 'rgba(255,255,255,0.8)';
      ctx.lineWidth = 1.8;
      ctx.stroke();

      // Divider line from center to outer edge
      ctx.save();
      ctx.beginPath();
      ctx.moveTo(cx, cy);
      ctx.lineTo(cx + Math.cos(startA + sliceAngle) * radius, cy + Math.sin(startA + sliceAngle) * radius);
      ctx.strokeStyle = 'rgba(255,255,255,0.28)';
      ctx.lineWidth = 1.1;
      ctx.stroke();
      ctx.restore();

      // Text
      ctx.save();
      ctx.translate(cx, cy);
      ctx.rotate(startA + sliceAngle / 2);
      ctx.textAlign = 'center';

      const fontSize = Math.max(10, radius * 0.07);
      ctx.font = `bold ${fontSize}px Inter, system-ui, sans-serif`;
      ctx.fillStyle = prize.textColor;
      ctx.shadowColor = 'rgba(0,0,0,0.25)';
      ctx.shadowBlur = 2;

      const labelRadius = radius * 0.72;
      const emojiY = -radius * 0.04;
      const labelY = radius * 0.06;

      ctx.font = `${Math.max(12, radius * 0.09)}px serif`;
      ctx.fillText(prize.emoji, labelRadius * 0.9, emojiY);

      ctx.font = `bold ${fontSize}px Inter, system-ui, sans-serif`;
      ctx.fillText(prize.label, labelRadius * 0.9, labelY, radius * 0.7);

      ctx.restore();
    });

    // Center circle
    ctx.beginPath();
    ctx.arc(cx, cy, radius * 0.14, 0, 2 * Math.PI);
    ctx.fillStyle = '#ffffff';
    ctx.shadowColor = 'rgba(0,0,0,0.18)';
    ctx.shadowBlur = 12;
    ctx.fill();
    ctx.strokeStyle = '#e53e3e';
    ctx.lineWidth = 2.5;
    ctx.stroke();

    // Center logo
    ctx.font = `${radius * 0.1}px serif`;
    ctx.textAlign = 'center';
    ctx.shadowBlur = 0;
    ctx.fillText('🥟', cx, cy + radius * 0.035);

    // Outer ring
    ctx.beginPath();
    ctx.arc(cx, cy, radius, 0, 2 * Math.PI);
    ctx.strokeStyle = '#b45309';
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
        width={480}
        height={480}
        className="rounded-full shadow-[0_20px_55px_rgba(0,0,0,0.35)]"
        style={{ maxWidth: '100%', maxHeight: '100%' }}
      />
    </div>
  );
}
