import {
  vendors as allVendors,
  componentKeys,
  type ComponentKey,
  type Vendor,
  type RiskLevel,
} from "@/data/vendors";

export type Weights = Record<ComponentKey, number>;

export const defaultWeights: Weights = {
  dataLocation: 30,
  securityLevel: 25,
  incidentHandling: 20,
  ownership: 25,
};

/** Normalize weights so they sum to 100 (for display + math safety). */
export function normalizeWeights(w: Weights): Weights {
  const sum = componentKeys.reduce((s, k) => s + (w[k] ?? 0), 0) || 1;
  return componentKeys.reduce((acc, k) => {
    acc[k] = (w[k] ?? 0) / sum;
    return acc;
  }, {} as Weights);
}

export interface ComponentContribution {
  key: ComponentKey;
  raw: number; // vendor's 0-100 score in this component
  weight: number; // 0-1
  contribution: number; // raw * weight (max ~100)
}

export interface VendorScore {
  vendor: Vendor;
  total: number; // 0-100
  contributions: ComponentContribution[];
  risk: RiskLevel;
  euAligned: boolean;
}

export function scoreVendor(vendor: Vendor, weights: Weights): VendorScore {
  const norm = normalizeWeights(weights);
  const contributions: ComponentContribution[] = componentKeys.map((k) => {
    const raw = vendor.components[k];
    const weight = norm[k];
    return { key: k, raw, weight, contribution: raw * weight };
  });
  const total = Math.round(contributions.reduce((s, c) => s + c.contribution, 0));
  const risk = riskFromScore(total);
  const euAligned =
    vendor.jurisdiction === "EU" || vendor.jurisdiction === "EEA";
  return { vendor, total, contributions, risk, euAligned };
}

export function rankVendors(weights: Weights, vendors: Vendor[] = allVendors): VendorScore[] {
  return vendors.map((v) => scoreVendor(v, weights)).sort((a, b) => b.total - a.total);
}

export function riskFromScore(score: number): RiskLevel {
  if (score >= 75) return "Low";
  if (score >= 55) return "Medium";
  return "High";
}

export const riskTone: Record<RiskLevel, "success" | "warning" | "destructive"> = {
  Low: "success",
  Medium: "warning",
  High: "destructive",
};

export const riskLabel: Record<RiskLevel, string> = {
  Low: "Risk: Låg",
  Medium: "Risk: Medel",
  High: "Risk: Hög",
};
