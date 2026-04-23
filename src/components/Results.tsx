import { motion } from "framer-motion";
import { useMemo, useState } from "react";
import { AlertTriangle, ArrowRight, RotateCcw, Shield, MapPin, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { GaugeMeter } from "./GaugeMeter";
import { vendors, categories } from "@/data/vendors";
import type { Answers } from "@/data/quiz";
import { rankVendors, scoreLabel, computeWeights } from "@/lib/scoring";
import { cn } from "@/lib/utils";

interface ResultsProps {
  answers: Answers;
  onRestart: () => void;
}

export const Results = ({ answers, onRestart }: ResultsProps) => {
  const [category, setCategory] = useState<string>("All");
  const ranked = useMemo(() => rankVendors(vendors, answers), [answers]);
  const weights = useMemo(() => computeWeights(answers), [answers]);

  const filtered = category === "All" ? ranked : ranked.filter((r) => r.vendor.category === category);
  const top = ranked[0];
  const overall = Math.round(ranked.slice(0, 5).reduce((s, r) => s + r.score, 0) / 5);

  return (
    <section className="container mx-auto px-6 py-16">
      {/* Top: gauge + summary */}
      <div className="grid gap-12 lg:grid-cols-[auto_1fr] lg:gap-16">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
          className="flex justify-center lg:justify-start"
        >
          <GaugeMeter value={overall} size={360} label="Topp-5 EuroStack-snitt" />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex flex-col justify-center"
        >
          <div className="text-xs uppercase tracking-[0.25em] text-accent">Resultat</div>
          <h2 className="mt-2 font-display text-4xl font-semibold leading-tight md:text-5xl">
            Bästa match: <span className="text-gradient-eu">{top.vendor.name}</span>
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">{top.vendor.description}</p>

          <div className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-4">
            {[
              { k: "sovereignty" as const, label: "Suveränitet" },
              { k: "gdpr" as const, label: "GDPR" },
              { k: "nis2" as const, label: "NIS2" },
              { k: "dora" as const, label: "DORA" },
            ].map((d) => (
              <div key={d.k} className="rounded-lg border border-border bg-card p-3">
                <div className="text-[10px] uppercase tracking-widest text-muted-foreground">{d.label}</div>
                <div className="mt-1 flex items-baseline gap-1">
                  <span className="font-mono-num text-2xl font-bold">{Math.round(top.breakdown[d.k])}</span>
                  <span className="text-xs text-muted-foreground">/100</span>
                </div>
                <div className="mt-1 text-[10px] text-accent/70">vikt × {weights[d.k].toFixed(1)}</div>
              </div>
            ))}
          </div>

          <div className="mt-8 flex flex-wrap gap-3">
            <Button onClick={onRestart} variant="outline" className="gap-2">
              <RotateCcw className="h-4 w-4" /> Gör om mätningen
            </Button>
            <a href="#ranking">
              <Button className="gap-2 bg-primary text-primary-foreground">
                Se full rankning <ArrowRight className="h-4 w-4" />
              </Button>
            </a>
          </div>
        </motion.div>
      </div>

      {/* Filter */}
      <div id="ranking" className="mt-24">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <div className="text-xs uppercase tracking-[0.25em] text-muted-foreground">Leverantörsrankning</div>
            <h3 className="mt-1 font-display text-3xl font-semibold">Alla leverantörer, viktade efter dina svar</h3>
          </div>
          <div className="flex flex-wrap gap-2">
            {["All", ...categories].map((c) => (
              <button
                key={c}
                onClick={() => setCategory(c)}
                className={cn(
                  "rounded-full border px-3 py-1.5 text-xs font-medium transition",
                  category === c
                    ? "border-primary bg-primary text-primary-foreground"
                    : "border-border bg-card text-muted-foreground hover:border-primary/40 hover:text-foreground"
                )}
              >
                {c}
              </button>
            ))}
          </div>
        </div>

        <div className="mt-8 space-y-3">
          {filtered.map((r, i) => (
            <VendorRow key={r.vendor.id} rank={ranked.indexOf(r) + 1} score={r} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
};

const VendorRow = ({
  rank,
  score,
  index,
}: {
  rank: number;
  score: ReturnType<typeof rankVendors>[number];
  index: number;
}) => {
  const [open, setOpen] = useState(false);
  const { vendor, breakdown } = score;
  const tone = scoreLabel(score.score);
  const isNonEU = vendor.jurisdiction === "US" || vendor.jurisdiction === "CN";

  const toneClass = {
    success: "text-success",
    primary: "text-primary-glow",
    warning: "text-warning",
    destructive: "text-destructive",
  }[tone.tone];

  const barColor = {
    success: "from-success to-success/60",
    primary: "from-primary to-primary-glow",
    warning: "from-warning to-warning/60",
    destructive: "from-destructive to-destructive/60",
  }[tone.tone];

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.04 }}
      className="overflow-hidden rounded-xl border border-border bg-card"
    >
      <button onClick={() => setOpen(!open)} className="flex w-full items-center gap-4 p-4 text-left transition hover:bg-muted/30">
        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg border border-border bg-background font-mono-num text-sm font-bold text-muted-foreground">
          #{rank}
        </div>

        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-center gap-2">
            <span className="font-display text-lg font-semibold">{vendor.name}</span>
            {isNonEU && (
              <span className="inline-flex items-center gap-1 rounded-full bg-destructive/15 px-2 py-0.5 text-[10px] font-medium uppercase tracking-wider text-destructive">
                <AlertTriangle className="h-3 w-3" /> {vendor.jurisdiction}
              </span>
            )}
            {vendor.jurisdiction === "EU" && (
              <span className="inline-flex items-center gap-1 rounded-full bg-primary/15 px-2 py-0.5 text-[10px] font-medium uppercase tracking-wider text-primary-glow">
                <Shield className="h-3 w-3" /> EU
              </span>
            )}
          </div>
          <div className="mt-0.5 flex items-center gap-3 text-xs text-muted-foreground">
            <span>{vendor.category}</span>
            <span className="flex items-center gap-1"><MapPin className="h-3 w-3" /> {vendor.hq}</span>
          </div>
        </div>

        {/* Mini bar (hidden on mobile) */}
        <div className="hidden w-40 md:block">
          <div className="h-2 overflow-hidden rounded-full bg-muted">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${score.score}%` }}
              transition={{ duration: 0.8, delay: index * 0.04 }}
              className={cn("h-full bg-gradient-to-r", barColor)}
            />
          </div>
        </div>

        <div className="text-right">
          <div className={cn("font-mono-num text-2xl font-bold tabular-nums", toneClass)}>{score.score}</div>
          <div className={cn("text-[10px] uppercase tracking-widest", toneClass)}>{tone.label}</div>
        </div>

        <ChevronDown className={cn("h-4 w-4 shrink-0 text-muted-foreground transition-transform", open && "rotate-180")} />
      </button>

      {open && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          className="border-t border-border bg-background/50 p-5"
        >
          <p className="text-sm text-muted-foreground">{vendor.description}</p>
          <div className="mt-4 grid grid-cols-2 gap-3 md:grid-cols-4">
            {(["sovereignty", "gdpr", "nis2", "dora"] as const).map((k) => (
              <div key={k}>
                <div className="text-[10px] uppercase tracking-widest text-muted-foreground">{k}</div>
                <div className="mt-1 flex items-center gap-2">
                  <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-muted">
                    <div className="h-full bg-gradient-to-r from-primary to-accent" style={{ width: `${breakdown[k]}%` }} />
                  </div>
                  <span className="font-mono-num text-xs font-semibold">{breakdown[k]}</span>
                </div>
              </div>
            ))}
          </div>
          {vendor.euAlternative && (
            <div className="mt-4 rounded-lg border border-accent/30 bg-accent/10 p-3 text-sm">
              <span className="font-semibold text-accent">EU-alternativ: </span>
              <span className="text-foreground">{vendor.euAlternative}</span>
            </div>
          )}
          <div className="mt-3 flex flex-wrap gap-1.5">
            {vendor.dataResidency.map((r) => (
              <span key={r} className="rounded border border-border bg-card px-2 py-0.5 text-[10px] text-muted-foreground">
                {r}
              </span>
            ))}
          </div>
        </motion.div>
      )}
    </motion.div>
  );
};
