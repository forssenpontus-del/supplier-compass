import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { Activity } from "lucide-react";

interface ScanningProps {
  onDone: () => void;
}

const steps = [
  "Analyserar leverantörsregister…",
  "Vägar GDPR-, NIS2- och DORA-poäng…",
  "Bedömer jurisdiktionsrisk…",
  "Rangordnar EuroStack-kompatibilitet…",
];

export const Scanning = ({ onDone }: ScanningProps) => {
  const [idx, setIdx] = useState(0);

  useEffect(() => {
    const t1 = setInterval(() => setIdx((i) => Math.min(i + 1, steps.length - 1)), 600);
    const t2 = setTimeout(onDone, 2600);
    return () => {
      clearInterval(t1);
      clearTimeout(t2);
    };
  }, [onDone]);

  return (
    <section className="container mx-auto flex min-h-[70vh] max-w-2xl flex-col items-center justify-center px-6 text-center">
      <div className="relative mb-10 flex h-32 w-32 items-center justify-center rounded-full border border-primary/30 bg-primary/5">
        <div className="absolute inset-0 animate-ping rounded-full border border-primary/40" />
        <div className="absolute inset-4 animate-pulse-glow rounded-full bg-gradient-to-br from-primary/30 to-accent/20 blur-md" />
        <Activity className="relative h-12 w-12 text-primary" />
      </div>

      <h2 className="font-display text-3xl font-semibold md:text-4xl">Mäter kompatibilitet…</h2>
      <p className="mt-3 max-w-md text-muted-foreground">
        Vi vägar svar mot 19 leverantörer i fyra dimensioner.
      </p>

      <div className="mt-10 w-full max-w-md space-y-2 text-left font-mono text-sm">
        {steps.map((s, i) => (
          <motion.div
            key={s}
            initial={{ opacity: 0 }}
            animate={{ opacity: i <= idx ? 1 : 0.25 }}
            className="flex items-center gap-3"
          >
            <span className={`h-1.5 w-1.5 rounded-full ${i <= idx ? "bg-accent" : "bg-muted"}`} />
            <span className={i <= idx ? "text-foreground" : "text-muted-foreground"}>{s}</span>
            {i === idx && <span className="ml-auto animate-pulse text-primary">●●●</span>}
          </motion.div>
        ))}
      </div>
    </section>
  );
};
