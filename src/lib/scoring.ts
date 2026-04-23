import type { Vendor } from "@/data/vendors";
import type { Answers } from "@/data/quiz";
import { quizQuestions } from "@/data/quiz";

export interface VendorScore {
  vendor: Vendor;
  score: number; // 0-100
  breakdown: {
    sovereignty: number;
    gdpr: number;
    nis2: number;
    dora: number;
  };
}

export function computeWeights(answers: Answers) {
  const totals = { sovereignty: 1, gdpr: 1, nis2: 1, dora: 1 };
  quizQuestions.forEach((q) => {
    const idx = answers[q.id];
    if (idx === undefined) return;
    const w = q.options[idx]?.weights ?? {};
    (Object.keys(totals) as (keyof typeof totals)[]).forEach((k) => {
      if (w[k] !== undefined) totals[k] *= w[k]!;
    });
  });
  // Normalize so the four weights sum to 4 (avg 1)
  const sum = totals.sovereignty + totals.gdpr + totals.nis2 + totals.dora;
  const factor = 4 / sum;
  return {
    sovereignty: totals.sovereignty * factor,
    gdpr: totals.gdpr * factor,
    nis2: totals.nis2 * factor,
    dora: totals.dora * factor,
  };
}

export function scoreVendor(vendor: Vendor, weights: ReturnType<typeof computeWeights>): VendorScore {
  const weighted =
    vendor.sovereignty * weights.sovereignty +
    vendor.gdpr * weights.gdpr +
    vendor.nis2 * weights.nis2 +
    vendor.dora * weights.dora;
  const score = Math.round(weighted / 4);
  return {
    vendor,
    score: Math.max(0, Math.min(100, score)),
    breakdown: {
      sovereignty: vendor.sovereignty,
      gdpr: vendor.gdpr,
      nis2: vendor.nis2,
      dora: vendor.dora,
    },
  };
}

export function rankVendors(vendors: Vendor[], answers: Answers): VendorScore[] {
  const w = computeWeights(answers);
  return vendors.map((v) => scoreVendor(v, w)).sort((a, b) => b.score - a.score);
}

export function scoreLabel(score: number): { label: string; tone: "success" | "warning" | "destructive" | "primary" } {
  if (score >= 85) return { label: "Utmärkt match", tone: "success" };
  if (score >= 65) return { label: "Stark match", tone: "primary" };
  if (score >= 45) return { label: "Begränsad match", tone: "warning" };
  return { label: "Hög risk", tone: "destructive" };
}
