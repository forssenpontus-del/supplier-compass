import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight, ShieldCheck, ListChecks, BarChart3, Globe2, Lock, FileText } from "lucide-react";
import { Button } from "@/components/ui/button";

const Landing = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen">
      {/* Top bar */}
      <header className="sticky top-0 z-40 border-b border-border/60 bg-background/70 backdrop-blur-xl">
        <div className="container mx-auto flex h-16 items-center justify-between px-6">
          <div className="flex items-center gap-2.5">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-to-br from-primary to-primary/60 shadow-[0_0_20px_hsl(var(--primary)/0.5)]">
              <BarChart3 className="h-4 w-4 text-primary-foreground" />
            </div>
            <div className="leading-none">
              <div className="font-display text-base font-bold tracking-tight">Vendor Compass</div>
              <div className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
                EU sovereignty index
              </div>
            </div>
          </div>
          <nav className="hidden items-center gap-7 text-sm text-muted-foreground md:flex">
            <a href="#how" className="transition hover:text-foreground">Så funkar det</a>
            <button
              onClick={() => navigate("/dashboard")}
              className="transition hover:text-foreground"
            >
              Dashboard
            </button>
            <button
              onClick={() => navigate("/methodology")}
              className="transition hover:text-foreground"
            >
              Metodik
            </button>
          </nav>
        </div>
      </header>

      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 grid-bg pointer-events-none" />
        <div className="container relative mx-auto px-6 pt-20 pb-16 lg:pt-28 lg:pb-24">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mx-auto max-w-3xl text-center"
          >
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-4 py-1.5 text-xs font-medium text-primary-glow backdrop-blur">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-primary" />
              </span>
              REGELBASERAD · TRANSPARENT · INGEN AI-GISSNING
            </div>

            <h1 className="font-display text-5xl font-bold leading-[1.05] tracking-tight md:text-7xl">
              Hitta era mest{" "}
              <span className="text-gradient-eu">EU-anpassade</span> leverantörer
            </h1>

            <p className="mt-6 text-lg leading-relaxed text-muted-foreground md:text-xl">
              Svara på 6 frågor. Få en transparent regelbaserad poäng på data location,
              security level, incident handling och ownership — för 19 leverantörer.
            </p>

            <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Button
                size="lg"
                onClick={() => navigate("/quiz")}
                className="group h-14 gap-2 bg-primary px-8 text-base font-semibold text-primary-foreground shadow-[var(--shadow-glow)] transition-all hover:shadow-[0_0_80px_hsl(var(--primary)/0.5)]"
              >
                Starta frågeformulär
                <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
              </Button>
              <button
                onClick={() => navigate("/dashboard")}
                className="text-sm text-muted-foreground underline-offset-4 transition hover:text-foreground hover:underline"
              >
                Hoppa direkt till dashboard →
              </button>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mx-auto mt-16 grid max-w-4xl grid-cols-1 gap-px overflow-hidden rounded-2xl border border-border bg-border md:grid-cols-3"
          >
            {[
              { icon: Globe2, label: "Data location", value: "Var datan ligger", sub: "EU vs icke-EU" },
              { icon: ShieldCheck, label: "Security level", value: "Certifieringar", sub: "ISO 27001, C5, SOC 2" },
              { icon: Lock, label: "Ownership", value: "Moderbolag", sub: "CLOUD Act-analys" },
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

      {/* How it works */}
      <section id="how" className="border-y border-border bg-card/30 py-20">
        <div className="container mx-auto px-6">
          <div className="mx-auto max-w-2xl text-center">
            <div className="text-xs uppercase tracking-[0.25em] text-accent">Process</div>
            <h2 className="mt-2 font-display text-4xl font-semibold md:text-5xl">Tre steg till klarhet</h2>
          </div>

          <div className="mx-auto mt-12 grid max-w-5xl gap-6 md:grid-cols-3">
            {[
              {
                icon: ListChecks,
                title: "1. Svara på 6 frågor",
                desc: "Sektor, datatyp, regelverk och risktolerans — vi översätter svaren till vikter.",
              },
              {
                icon: BarChart3,
                title: "2. Se analysen",
                desc: "Dashboard visar leverantörer rankade på fyra transparenta komponenter.",
              },
              {
                icon: FileText,
                title: "3. Få rekommendationer",
                desc: "Borrar ner i varje leverantör: råpoäng × vikt = bidrag, med regelmotivering.",
              },
            ].map((s, i) => (
              <div
                key={s.title}
                className="group rounded-2xl border border-border bg-card p-7 transition-all hover:border-primary/40 hover:shadow-[0_0_40px_hsl(var(--primary)/0.15)]"
              >
                <s.icon className="h-7 w-7 text-primary" />
                <h3 className="mt-5 font-display text-xl font-semibold">{s.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{s.desc}</p>
              </div>
            ))}
          </div>

          <div className="mx-auto mt-12 max-w-3xl rounded-xl border border-accent/30 bg-accent/5 p-5 text-center text-sm text-muted-foreground">
            Verktyget stödjer beslutsfattande och fungerar{" "}
            <strong className="text-foreground">inte</strong> som officiell certifiering.
            Inga "verifierade"-stämplar utfärdas.
          </div>
        </div>
      </section>

      <footer className="border-t border-border bg-card/40 py-8 text-center text-xs text-muted-foreground">
        © {new Date().getFullYear()} Vendor Compass · Regelbaserad · Open methodology
      </footer>
    </div>
  );
};

export default Landing;
