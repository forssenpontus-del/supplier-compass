import { motion } from "framer-motion";
import { ShieldCheck, AlertTriangle, ShieldAlert } from "lucide-react";
import { cn } from "@/lib/utils";
import { riskLabel, riskTone, type VendorScore } from "@/lib/scoring";

const toneClasses = {
  success: {
    text: "text-success",
    bg: "bg-success/15",
    border: "border-success/40",
    bar: "from-success to-success/60",
    Icon: ShieldCheck,
  },
  warning: {
    text: "text-warning",
    bg: "bg-warning/15",
    border: "border-warning/40",
    bar: "from-warning to-warning/60",
    Icon: AlertTriangle,
  },
  destructive: {
    text: "text-destructive",
    bg: "bg-destructive/15",
    border: "border-destructive/40",
    bar: "from-destructive to-destructive/60",
    Icon: ShieldAlert,
  },
} as const;

export const RiskBadge = ({ score }: { score: VendorScore }) => {
  const tone = toneClasses[riskTone[score.risk]];
  const Icon = tone.Icon;
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full border px-2.5 py-0.5 text-[10px] font-medium uppercase tracking-wider",
        tone.bg,
        tone.border,
        tone.text
      )}
    >
      <Icon className="h-3 w-3" />
      {riskLabel[score.risk]}
    </span>
  );
};

export const EuAlignedBadge = ({ aligned }: { aligned: boolean }) => (
  <span
    className={cn(
      "inline-flex items-center gap-1 rounded-full border px-2.5 py-0.5 text-[10px] font-medium uppercase tracking-wider",
      aligned
        ? "border-primary/40 bg-primary/10 text-primary-glow"
        : "border-muted bg-muted/30 text-muted-foreground"
    )}
  >
    {aligned ? "EU-aligned" : "Non-EU"}
  </span>
);

export const ScoreBar = ({
  value,
  tone = "primary",
  delay = 0,
}: {
  value: number;
  tone?: "success" | "warning" | "destructive" | "primary";
  delay?: number;
}) => {
  const cls =
    tone === "success"
      ? "from-success to-success/60"
      : tone === "warning"
      ? "from-warning to-warning/60"
      : tone === "destructive"
      ? "from-destructive to-destructive/60"
      : "from-primary to-primary-glow";
  return (
    <div className="h-2 w-full overflow-hidden rounded-full bg-muted">
      <motion.div
        initial={{ width: 0 }}
        animate={{ width: `${Math.max(0, Math.min(100, value))}%` }}
        transition={{ duration: 0.8, delay }}
        className={cn("h-full bg-gradient-to-r", cls)}
      />
    </div>
  );
};
