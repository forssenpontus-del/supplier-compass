import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import { defaultWeights, type Weights } from "@/lib/scoring";

interface Ctx {
  weights: Weights;
  setWeights: (w: Weights) => void;
  reset: () => void;
  selectedVendorId: string | null;
  setSelectedVendorId: (id: string | null) => void;
}

const WeightsContext = createContext<Ctx | null>(null);

const STORAGE_KEY = "vendor-compass:weights";

export const WeightsProvider = ({ children }: { children: ReactNode }) => {
  const [weights, setWeightsState] = useState<Weights>(() => {
    if (typeof window === "undefined") return defaultWeights;
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) return { ...defaultWeights, ...JSON.parse(raw) };
    } catch {}
    return defaultWeights;
  });
  const [selectedVendorId, setSelectedVendorId] = useState<string | null>(null);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(weights));
    } catch {}
  }, [weights]);

  return (
    <WeightsContext.Provider
      value={{
        weights,
        setWeights: setWeightsState,
        reset: () => setWeightsState(defaultWeights),
        selectedVendorId,
        setSelectedVendorId,
      }}
    >
      {children}
    </WeightsContext.Provider>
  );
};

export const useWeights = () => {
  const ctx = useContext(WeightsContext);
  if (!ctx) throw new Error("useWeights must be used within WeightsProvider");
  return ctx;
};
