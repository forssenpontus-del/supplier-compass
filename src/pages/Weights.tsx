import { Link } from "react-router-dom";
import { RotateCcw, ArrowRight } from "lucide-react";
import { Slider } from "@/components/ui/slider";
import { Button } from "@/components/ui/button";
import { componentKeys, componentMeta } from "@/data/vendors";
import { useWeights } from "@/lib/weights-context";
import { normalizeWeights } from "@/lib/scoring";

const Weights = () => {
  const { weights, setWeights, reset } = useWeights();
  const norm = normalizeWeights(weights);

  return (
    <div className="container mx-auto max-w-3xl px-4 py-8 md:px-6 md:py-10">
      <div className="text-xs uppercase tracking-[0.25em] text-muted-foreground">
        Inställningar
      </div>
      <h1 className="mt-1 font-display text-3xl font-semibold md:text-4xl">
        Justera vikter
      </h1>
      <p className="mt-2 max-w-xl text-sm text-muted-foreground">
        Hur viktig är varje komponent för er? Vikterna normaliseras automatiskt så att summan blir
        100%. Ändringar påverkar alla rankningar omedelbart.
      </p>

      <div className="mt-8 space-y-6">
        {componentKeys.map((k) => (
          <div key={k} className="rounded-xl border border-border bg-card p-5">
            <div className="flex flex-wrap items-baseline justify-between gap-2">
              <div>
                <div className="font-display text-base font-semibold">
                  {componentMeta[k].label}
                </div>
                <div className="text-xs text-muted-foreground">
                  {componentMeta[k].description}
                </div>
              </div>
              <div className="text-right">
                <div className="font-mono-num text-2xl font-bold tabular-nums">
                  {Math.round(norm[k] * 100)}%
                </div>
                <div className="text-[10px] uppercase tracking-widest text-muted-foreground">
                  effektiv vikt
                </div>
              </div>
            </div>

            <div className="mt-4">
              <Slider
                value={[weights[k]]}
                min={0}
                max={100}
                step={1}
                onValueChange={(v) => setWeights({ ...weights, [k]: v[0] })}
              />
              <div className="mt-1.5 flex justify-between text-[10px] text-muted-foreground font-mono-num">
                <span>0</span>
                <span>Råvikt: {weights[k]}</span>
                <span>100</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-8 flex flex-wrap items-center gap-3">
        <Button variant="outline" onClick={reset} className="gap-2">
          <RotateCcw className="h-4 w-4" /> Återställ standard
        </Button>
        <Link to="/">
          <Button className="gap-2 bg-primary text-primary-foreground">
            Se uppdaterad rankning <ArrowRight className="h-4 w-4" />
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default Weights;
