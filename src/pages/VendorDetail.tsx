import { useMemo } from "react";
import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, MapPin, Building2, ShieldCheck, FileText, AlertCircle } from "lucide-react";
import { vendors, componentMeta, componentKeys } from "@/data/vendors";
import { scoreVendor, riskTone, normalizeWeights } from "@/lib/scoring";
import { useWeights } from "@/lib/weights-context";
import { RiskBadge, EuAlignedBadge, ScoreBar } from "@/components/ScoreParts";
import { cn } from "@/lib/utils";

const VendorDetail = () => {
  const { id } = useParams();
  const { weights } = useWeights();
  const vendor = vendors.find((v) => v.id === id);

  if (!vendor) {
    return (
      <div className="container mx-auto px-6 py-16">
        <p className="text-muted-foreground">Leverantören hittades inte.</p>
        <Link to="/" className="mt-4 inline-block text-primary-glow">
          ← Tillbaka till översikt
        </Link>
      </div>
    );
  }

  const score = useMemo(() => scoreVendor(vendor, weights), [vendor, weights]);
  const norm = normalizeWeights(weights);
  const tone = riskTone[score.risk];

  return (
    <div className="container mx-auto max-w-6xl px-4 py-8 md:px-6 md:py-10">
      <Link
        to="/"
        className="inline-flex items-center gap-1.5 text-xs text-muted-foreground transition hover:text-foreground"
      >
        <ArrowLeft className="h-3 w-3" /> Översikt
      </Link>

      {/* Header */}
      <div className="mt-4 flex flex-wrap items-start justify-between gap-4">
        <div>
          <div className="text-xs uppercase tracking-[0.25em] text-muted-foreground">
            Steg 2 — Analys
          </div>
          <h1 className="mt-1 font-display text-3xl font-semibold md:text-4xl">
            {vendor.name}
          </h1>
          <div className="mt-2 flex flex-wrap items-center gap-2 text-xs text-muted-foreground">
            <span className="inline-flex items-center gap-1">
              <MapPin className="h-3 w-3" /> {vendor.hq}
            </span>
            <span className="inline-flex items-center gap-1">
              <Building2 className="h-3 w-3" /> {vendor.parent ?? vendor.name}
            </span>
            <span>· {vendor.category}</span>
          </div>
          <p className="mt-3 max-w-2xl text-sm text-muted-foreground">{vendor.description}</p>
          <div className="mt-3 flex flex-wrap gap-2">
            <RiskBadge score={score} />
            <EuAlignedBadge aligned={score.euAligned} />
          </div>
        </div>

        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className={cn(
            "flex h-32 w-32 flex-col items-center justify-center rounded-2xl border bg-card",
            tone === "success" && "border-success/40",
            tone === "warning" && "border-warning/40",
            tone === "destructive" && "border-destructive/40"
          )}
        >
          <div className="text-[10px] uppercase tracking-widest text-muted-foreground">
            Total
          </div>
          <div
            className={cn(
              "font-mono-num text-5xl font-bold tabular-nums",
              tone === "success" && "text-success",
              tone === "warning" && "text-warning",
              tone === "destructive" && "text-destructive"
            )}
          >
            {score.total}
          </div>
          <div className="text-[10px] text-muted-foreground">/ 100</div>
        </motion.div>
      </div>

      {/* Component breakdown */}
      <section className="mt-8">
        <h2 className="font-display text-xl font-semibold">Komponentnedbrytning</h2>
        <p className="mt-1 text-xs text-muted-foreground">
          Varje komponent visas med sin råpoäng (0–100), aktuell vikt och bidrag till totalen.
        </p>

        <div className="mt-4 space-y-3">
          {score.contributions.map((c, i) => (
            <motion.div
              key={c.key}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
              className="rounded-xl border border-border bg-card p-4"
            >
              <div className="flex flex-wrap items-baseline justify-between gap-2">
                <div>
                  <div className="font-display text-sm font-semibold">
                    {componentMeta[c.key].label}
                  </div>
                  <div className="text-[11px] text-muted-foreground">
                    {componentMeta[c.key].description}
                  </div>
                </div>
                <div className="text-right">
                  <div className="font-mono-num text-2xl font-bold tabular-nums text-foreground">
                    {Math.round(c.contribution)}
                  </div>
                  <div className="text-[10px] uppercase tracking-widest text-muted-foreground">
                    bidrag
                  </div>
                </div>
              </div>

              <div className="mt-3 grid gap-3 md:grid-cols-[1fr_auto]">
                <ScoreBar value={c.raw} delay={i * 0.05} />
                <div className="flex shrink-0 items-center gap-3 text-[11px] text-muted-foreground font-mono-num">
                  <span>
                    Råpoäng: <span className="text-foreground">{c.raw}</span>
                  </span>
                  <span>×</span>
                  <span>
                    Vikt: <span className="text-foreground">{Math.round(norm[c.key] * 100)}%</span>
                  </span>
                  <span>=</span>
                  <span className="text-foreground">{c.contribution.toFixed(1)}</span>
                </div>
              </div>

              <p className="mt-3 rounded-md bg-muted/30 p-3 text-xs text-muted-foreground">
                <span className="font-semibold text-foreground">Regel:</span>{" "}
                {vendor.rationale[c.key]}
              </p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Facts */}
      <section className="mt-8 grid gap-4 md:grid-cols-2">
        <div className="rounded-xl border border-border bg-card p-4">
          <div className="flex items-center gap-2 text-[11px] uppercase tracking-widest text-accent">
            <ShieldCheck className="h-3.5 w-3.5" /> Certifieringar
          </div>
          <div className="mt-3 flex flex-wrap gap-1.5">
            {vendor.certifications.map((c) => (
              <span
                key={c}
                className="rounded border border-border bg-background px-2 py-0.5 text-[11px] text-muted-foreground"
              >
                {c}
              </span>
            ))}
          </div>
        </div>
        <div className="rounded-xl border border-border bg-card p-4">
          <div className="flex items-center gap-2 text-[11px] uppercase tracking-widest text-accent">
            <MapPin className="h-3.5 w-3.5" /> Data residency
          </div>
          <div className="mt-3 flex flex-wrap gap-1.5">
            {vendor.dataResidency.map((c) => (
              <span
                key={c}
                className="rounded border border-border bg-background px-2 py-0.5 text-[11px] text-muted-foreground"
              >
                {c}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Recommendation */}
      <section className="mt-8">
        <div className="text-xs uppercase tracking-[0.25em] text-muted-foreground">
          Steg 3 — Rekommendation
        </div>
        <h2 className="mt-1 font-display text-xl font-semibold">Vad detta betyder</h2>

        <div
          className={cn(
            "mt-3 rounded-xl border p-5 text-sm",
            tone === "success" && "border-success/40 bg-success/5",
            tone === "warning" && "border-warning/40 bg-warning/5",
            tone === "destructive" && "border-destructive/40 bg-destructive/5"
          )}
        >
          {score.risk === "Low" && (
            <p>
              <strong className="text-success">Låg risk:</strong> {vendor.name} bedöms vara
              välanpassad efter dina vikter. Lämpar sig för EU-aligned-arkitekturer.
            </p>
          )}
          {score.risk === "Medium" && (
            <p>
              <strong className="text-warning">Medel risk:</strong> {vendor.name} har styrkor men
              även exponering. Genomför en risk- & legalbedömning innan kritisk användning.
            </p>
          )}
          {score.risk === "High" && (
            <p>
              <strong className="text-destructive">Hög risk:</strong> {vendor.name} har betydande
              jurisdiktionell eller säkerhetsexponering enligt era vikter.
              {vendor.euAlternative && (
                <>
                  {" "}
                  Överväg EU-alternativ:{" "}
                  <span className="text-foreground">{vendor.euAlternative}</span>.
                </>
              )}
            </p>
          )}
        </div>

        <div className="mt-3 flex items-start gap-2 rounded-md border border-border bg-card/50 p-3 text-[11px] text-muted-foreground">
          <AlertCircle className="mt-0.5 h-3.5 w-3.5 shrink-0 text-accent" />
          Detta verktyg stödjer beslutsfattande och fungerar inte som officiell certifiering.
        </div>
      </section>
    </div>
  );
};

export default VendorDetail;
