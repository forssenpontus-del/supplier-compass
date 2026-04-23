import { motion } from "framer-motion";
import { useMemo } from "react";

interface GaugeMeterProps {
  value: number; // 0-100
  size?: number;
  label?: string;
  animated?: boolean;
}

export const GaugeMeter = ({ value, size = 320, label, animated = true }: GaugeMeterProps) => {
  const clamped = Math.max(0, Math.min(100, value));
  const radius = size / 2 - 24;
  const circumference = Math.PI * radius; // semicircle
  const dashOffset = circumference * (1 - clamped / 100);

  // Needle angle: -90deg (left, 0) → 90deg (right, 100)
  const angle = -90 + (clamped / 100) * 180;

  const color = useMemo(() => {
    if (clamped >= 85) return "hsl(var(--success))";
    if (clamped >= 65) return "hsl(var(--primary))";
    if (clamped >= 45) return "hsl(var(--warning))";
    return "hsl(var(--destructive))";
  }, [clamped]);

  return (
    <div className="relative inline-flex flex-col items-center" style={{ width: size }}>
      <svg width={size} height={size / 2 + 40} viewBox={`0 0 ${size} ${size / 2 + 40}`} className="overflow-visible">
        <defs>
          <linearGradient id="gauge-track" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="hsl(var(--destructive))" />
            <stop offset="33%" stopColor="hsl(var(--warning))" />
            <stop offset="66%" stopColor="hsl(var(--primary))" />
            <stop offset="100%" stopColor="hsl(var(--success))" />
          </linearGradient>
          <filter id="gauge-glow">
            <feGaussianBlur stdDeviation="4" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* Background track */}
        <path
          d={`M ${size / 2 - radius} ${size / 2} A ${radius} ${radius} 0 0 1 ${size / 2 + radius} ${size / 2}`}
          fill="none"
          stroke="hsl(var(--muted))"
          strokeWidth={18}
          strokeLinecap="round"
          opacity={0.4}
        />

        {/* Active arc */}
        <motion.path
          d={`M ${size / 2 - radius} ${size / 2} A ${radius} ${radius} 0 0 1 ${size / 2 + radius} ${size / 2}`}
          fill="none"
          stroke="url(#gauge-track)"
          strokeWidth={18}
          strokeLinecap="round"
          strokeDasharray={circumference}
          initial={animated ? { strokeDashoffset: circumference } : false}
          animate={{ strokeDashoffset: dashOffset }}
          transition={{ duration: 1.6, ease: [0.22, 1, 0.36, 1] }}
          filter="url(#gauge-glow)"
        />

        {/* Tick marks */}
        {Array.from({ length: 11 }).map((_, i) => {
          const a = (-90 + (i / 10) * 180) * (Math.PI / 180);
          const r1 = radius + 14;
          const r2 = radius + (i % 5 === 0 ? 22 : 18);
          return (
            <line
              key={i}
              x1={size / 2 + Math.cos(a) * r1}
              y1={size / 2 + Math.sin(a) * r1}
              x2={size / 2 + Math.cos(a) * r2}
              y2={size / 2 + Math.sin(a) * r2}
              stroke="hsl(var(--muted-foreground))"
              strokeWidth={i % 5 === 0 ? 2 : 1}
              opacity={0.6}
            />
          );
        })}

        {/* Needle */}
        <motion.g
          initial={animated ? { rotate: -90 } : false}
          animate={{ rotate: angle }}
          transition={{ duration: 1.6, ease: [0.22, 1, 0.36, 1] }}
          style={{ transformOrigin: `${size / 2}px ${size / 2}px` }}
        >
          <line
            x1={size / 2}
            y1={size / 2}
            x2={size / 2}
            y2={size / 2 - radius + 8}
            stroke={color}
            strokeWidth={4}
            strokeLinecap="round"
            filter="url(#gauge-glow)"
          />
          <circle cx={size / 2} cy={size / 2} r={10} fill={color} filter="url(#gauge-glow)" />
          <circle cx={size / 2} cy={size / 2} r={4} fill="hsl(var(--background))" />
        </motion.g>
      </svg>

      <div className="-mt-12 text-center">
        <motion.div
          initial={animated ? { opacity: 0, y: 8 } : false}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2, duration: 0.5 }}
          className="font-mono-num text-6xl font-bold tabular-nums"
          style={{ color }}
        >
          {Math.round(clamped)}
          <span className="text-2xl text-muted-foreground">/100</span>
        </motion.div>
        {label && (
          <div className="mt-2 text-xs uppercase tracking-[0.25em] text-muted-foreground">{label}</div>
        )}
      </div>
    </div>
  );
};
