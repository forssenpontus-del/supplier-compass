import { motion } from "framer-motion";
import { ArrowRight, ShieldCheck, Globe2, Lock } from "lucide-react";
import { Button } from "@/components/ui/button";

interface HeroProps {
  onStart: () => void;
}

export const Hero = ({ onStart }: HeroProps) => {
  return (
    <section className="relative overflow-hidden">
      <div className="absolute inset-0 grid-bg pointer-events-none" />
      <div className="container relative mx-auto px-6 pt-24 pb-20 lg:pt-32 lg:pb-28">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="mx-auto max-w-3xl text-center"
        >
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-4 py-1.5 text-xs font-medium text-primary-glow backdrop-blur">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-primary" />
            </span>
            EU DIGITAL SOVEREIGNTY · NIS2 · GDPR · DORA
          </div>

          <h1 className="font-display text-5xl font-bold leading-[1.05] tracking-tight md:text-7xl">
            Mät dina leverantörer mot{" "}
            <span className="text-gradient-eu">EuroStack</span>
          </h1>

          <p className="mt-6 text-lg leading-relaxed text-muted-foreground md:text-xl">
            Bredbandskollen — fast för leverantörer. Få på 60 sekunder en kompatibilitetspoäng
            som visar hur väl era leverantörer följer EU-suveränitet, GDPR, NIS2 och DORA.
          </p>

          <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Button
              size="lg"
              onClick={onStart}
              className="group h-14 gap-2 bg-primary px-8 text-base font-semibold text-primary-foreground shadow-[var(--shadow-glow)] transition-all hover:shadow-[0_0_80px_hsl(var(--primary)/0.5)]"
            >
              Starta mätning
              <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
            </Button>
            <a
              href="#how"
              className="text-sm text-muted-foreground underline-offset-4 transition hover:text-foreground hover:underline"
            >
              Så fungerar det →
            </a>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.3 }}
          className="mx-auto mt-20 grid max-w-4xl grid-cols-1 gap-px overflow-hidden rounded-2xl border border-border bg-border md:grid-cols-3"
        >
          {[
            { icon: Globe2, label: "EU-suveränitet", value: "20+ leverantörer", sub: "Cloud, AI, fintech" },
            { icon: ShieldCheck, label: "Regelverk", value: "GDPR · NIS2 · DORA", sub: "Vägt per sektor" },
            { icon: Lock, label: "Jurisdiktion", value: "EU vs. icke-EU", sub: "CLOUD Act-analys" },
          ].map((s) => (
            <div key={s.label} className="bg-card p-6">
              <s.icon className="h-5 w-5 text-accent" />
              <div className="mt-4 text-xs uppercase tracking-widest text-muted-foreground">{s.label}</div>
              <div className="mt-1 font-display text-xl font-semibold">{s.value}</div>
              <div className="text-sm text-muted-foreground">{s.sub}</div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};
