import { ShieldCheck, ListChecks, BarChart3 } from "lucide-react";

export const HowItWorks = () => {
  const steps = [
    {
      icon: ListChecks,
      title: "Svara på 6 frågor",
      desc: "Sektor, datatyp, regelverk och risktolerans avgör hur dimensionerna vägs.",
    },
    {
      icon: BarChart3,
      title: "Vi viktar dina krav",
      desc: "Algoritmen kombinerar dina svar med leverantörens GDPR-, NIS2-, DORA- och suveränitetspoäng.",
    },
    {
      icon: ShieldCheck,
      title: "Få en rankad lista",
      desc: "Se en gauge med ert snitt + komplett rankning och EU-alternativ för icke-EU-leverantörer.",
    },
  ];

  return (
    <section id="how" className="border-y border-border bg-card/30 py-24">
      <div className="container mx-auto px-6">
        <div className="mx-auto max-w-2xl text-center">
          <div className="text-xs uppercase tracking-[0.25em] text-accent">Process</div>
          <h2 className="mt-2 font-display text-4xl font-semibold md:text-5xl">Så fungerar mätaren</h2>
        </div>

        <div className="mx-auto mt-16 grid max-w-5xl gap-6 md:grid-cols-3">
          {steps.map((s, i) => (
            <div key={s.title} className="group relative rounded-2xl border border-border bg-card p-7 transition-all hover:border-primary/40 hover:shadow-[0_0_40px_hsl(var(--primary)/0.15)]">
              <div className="absolute -top-3 left-7 rounded-md border border-border bg-background px-2 py-0.5 font-mono text-[10px] tracking-widest text-accent">
                STEG 0{i + 1}
              </div>
              <s.icon className="h-7 w-7 text-primary" />
              <h3 className="mt-5 font-display text-xl font-semibold">{s.title}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{s.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
