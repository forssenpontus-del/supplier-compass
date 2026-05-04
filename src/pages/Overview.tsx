import { useMemo } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight, Info } from "lucide-react";
import { vendors, componentMeta, componentKeys } from "@/data/vendors";
import { rankVendors, riskTone } from "@/lib/scoring";
import { useWeights } from "@/lib/weights-context";
import { RiskBadge, EuAlignedBadge, ScoreBar } from "@/components/ScoreParts";
import { cn } from "@/lib/utils";

const Overview = () => {
  const { weights, setSelectedVendorId } = useWeights();
  const ranked = useMemo(() => rankVendors(weights, vendors), [weights]);

  const avg = Math.round(ranked.reduce((s, r) => s + r.total, 0) / ranked.length);
  const lowRisk = ranked.filter((r) => r.risk === "Low").length;
  const highRisk = ranked.filter((r) => r.risk === "High").length;

  return (
    <div className="container mx-auto max-w-7xl px-4 py-8 md:px-6 md:py-10">
      {/* Heading */}
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <div className="text-xs uppercase tracking-[0.25em] text-muted-foreground">
            Steg 1 — Översikt
          </div>
          <h1 className="mt-1 font-display text-3xl font-semibold md:text-4xl">
            Leverantörsanalys
          </h1>
          <p className="mt-2 max-w-2xl text-sm text-muted-foreground">
            Regelbaserad bedömning av {vendors.length} leverantörer på fyra komponenter:
            data location, security level, incident handling och ownership.
          </p>
        </div>
        <Link
          to="/weights"
          className="inline-flex items-center gap-2 rounded-md border border-border bg-card px-3 py-2 text-xs text-muted-foreground transition hover:border-primary/40 hover:text-foreground"
        >
          Justera vikter <ArrowRight className="h-3 w-3" />
        </Link>
      </div>

      {/* KPI strip */}
      <div className="mt-6 grid gap-3 sm:grid-cols-3">
        <KpiCard label="Genomsnitt" value={`${avg}/100`} hint="Alla leverantörer, viktade" />
        <KpiCard
          label="Låg risk"
          value={`${lowRisk}`}
          hint={`av ${vendors.length} leverantörer`}
          tone="success"
        />
        <KpiCard
          label="Hög risk"
          value={`${highRisk}`}
          hint={`av ${vendors.length} leverantörer`}
          tone="destructive"
        />
      </div>

      {/* Component legend */}
      <div className="mt-6 grid gap-3 md:grid-cols-4">
        {componentKeys.map((k) => (
          <div key={k} className="rounded-lg border border-border bg-card p-3">
            <div className="text-[10px] uppercase tracking-widest text-accent">
              {componentMeta[k].label}
            </div>
            <div className="mt-1 text-xs text-muted-foreground">
              Vikt: <span className="font-mono-num text-foreground">{Math.round(weights[k])}%</span>
            </div>
          </div>
        ))}
      </div>

      {/* Vendor table */}
      <div className="mt-8 overflow-hidden rounded-xl border border-border bg-card">
        <div className="grid grid-cols-[auto_1fr_auto_auto] items-center gap-3 border-b border-border bg-muted/30 px-4 py-2.5 text-[10px] font-medium uppercase tracking-widest text-muted-foreground md:grid-cols-[auto_1fr_2fr_auto_auto]">
          <span>#</span>
          <span>Leverantör</span>
          <span className="hidden md:block">Komponentbidrag</span>
          <span className="text-right">Status</span>
          <span className="text-right">Total</span>
        </div>

        {ranked.map((r, i) => (
          <Link
            key={r.vendor.id}
            to={`/vendor/${r.vendor.id}`}
            onClick={() => setSelectedVendorId(r.vendor.id)}
            className="grid grid-cols-[auto_1fr_auto_auto] items-center gap-3 border-b border-border/60 px-4 py-3 transition hover:bg-muted/30 md:grid-cols-[auto_1fr_2fr_auto_auto]"
          >
            <span className="font-mono-num w-7 text-xs text-muted-foreground">#{i + 1}</span>

            <div className="min-w-0">
              <div className="truncate font-display text-sm font-semibold">{r.vendor.name}</div>
              <div className="truncate text-[11px] text-muted-foreground">
                {r.vendor.category} · {r.vendor.hq}
              </div>
            </div>

            {/* Stacked contribution bar */}
            <div className="hidden md:block">
              <StackedBar score={r} delay={i * 0.03} />
            </div>

            <div className="flex flex-col items-end gap-1">
              <RiskBadge score={r} />
              <EuAlignedBadge aligned={r.euAligned} />
            </div>

            <div className="w-12 text-right">
              <div
                className={cn(
                  "font-mono-num text-xl font-bold tabular-nums",
                  r.risk === "Low" && "text-success",
                  r.risk === "Medium" && "text-warning",
                  r.risk === "High" && "text-destructive"
                )}
              >
                {r.total}
              </div>
            </div>
          </Link>
        ))}
      </div>

      <div className="mt-6 flex items-start gap-2 rounded-lg border border-border bg-card/50 p-4 text-xs text-muted-foreground">
        <Info className="mt-0.5 h-4 w-4 shrink-0 text-accent" />
        <p>
          Poängen baseras på <strong className="text-foreground">förutbestämda regler och viktade kriterier</strong>,
          inte AI-gissningar. Klicka på en leverantör för att se exakt hur poängen byggs upp.
        </p>
      </div>
    </div>
  );
};

const KpiCard = ({
  label,
  value,
  hint,
  tone,
}: {
  label: string;
  value: string;
  hint: string;
  tone?: "success" | "destructive";
}) => (
  <div className="rounded-xl border border-border bg-card p-4">
    <div className="text-[10px] uppercase tracking-widest text-muted-foreground">{label}</div>
    <div
      className={cn(
        "mt-1 font-mono-num text-3xl font-bold tabular-nums",
        tone === "success" && "text-success",
        tone === "destructive" && "text-destructive"
      )}
    >
      {value}
    </div>
    <div className="text-xs text-muted-foreground">{hint}</div>
  </div>
);

const StackedBar = ({
  score,
  delay,
}: {
  score: ReturnType<typeof rankVendors>[number];
  delay: number;
}) => {
  const colors: Record<string, string> = {
    dataLocation: "hsl(var(--primary))",
    securityLevel: "hsl(var(--accent))",
    incidentHandling: "hsl(var(--success))",
    ownership: "hsl(var(--primary-glow))",
  };
  return (
    <div className="space-y-1.5">
      <div className="flex h-2 w-full overflow-hidden rounded-full bg-muted">
        {score.contributions.map((c) => (
          <motion.div
            key={c.key}
            initial={{ width: 0 }}
            animate={{ width: `${c.contribution}%` }}
            transition={{ duration: 0.6, delay }}
            style={{ background: colors[c.key] }}
            title={`${componentMeta[c.key].label}: ${c.contribution.toFixed(1)} pts`}
          />
        ))}
      </div>
      <div className="flex flex-wrap gap-x-3 gap-y-0.5 text-[10px] text-muted-foreground">
        {score.contributions.map((c) => (
          <span key={c.key} className="inline-flex items-center gap-1">
            <span
              className="inline-block h-1.5 w-1.5 rounded-full"
              style={{ background: colors[c.key] }}
            />
            {componentMeta[c.key].label.split(" ")[0]}{" "}
            <span className="font-mono-num text-foreground">{c.contribution.toFixed(0)}</span>
          </span>
        ))}
      </div>
    </div>
  );
};

export default Overview;
