import { componentKeys, componentMeta } from "@/data/vendors";

const Methodology = () => {
  return (
    <div className="container mx-auto max-w-3xl px-4 py-8 md:px-6 md:py-10">
      <div className="text-xs uppercase tracking-[0.25em] text-muted-foreground">
        Transparens
      </div>
      <h1 className="mt-1 font-display text-3xl font-semibold md:text-4xl">
        Så beräknas poängen
      </h1>
      <p className="mt-3 text-sm text-muted-foreground">
        Det här är ett <strong className="text-foreground">regelbaserat</strong> verktyg.
        Poängen är inte gissad av en AI-modell — den är resultatet av en deterministisk
        formel som ni själva kan justera och inspektera.
      </p>

      <section className="mt-8">
        <h2 className="font-display text-xl font-semibold">Formeln</h2>
        <pre className="mt-3 overflow-x-auto rounded-lg border border-border bg-card p-4 text-xs text-foreground">
{`total = Σ ( komponent_råpoäng × normaliserad_vikt )

där komponenter ∈ { Data location, Security level,
                    Incident handling, Ownership }
och  Σ vikter = 100 %`}
        </pre>
      </section>

      <section className="mt-8">
        <h2 className="font-display text-xl font-semibold">De fyra komponenterna</h2>
        <div className="mt-3 space-y-3">
          {componentKeys.map((k) => (
            <div key={k} className="rounded-lg border border-border bg-card p-4">
              <div className="font-display text-base font-semibold">
                {componentMeta[k].label}
              </div>
              <p className="mt-1 text-sm text-muted-foreground">
                {componentMeta[k].description}
              </p>
            </div>
          ))}
        </div>
      </section>

      <section className="mt-8">
        <h2 className="font-display text-xl font-semibold">Risknivå</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          Totalpoängen mappas till en neutral risknivå:
        </p>
        <ul className="mt-3 space-y-1.5 text-sm">
          <li className="flex items-center gap-2">
            <span className="inline-block h-2 w-2 rounded-full bg-success" />
            <span className="font-mono-num text-foreground">≥ 75</span> — Risk: Låg
          </li>
          <li className="flex items-center gap-2">
            <span className="inline-block h-2 w-2 rounded-full bg-warning" />
            <span className="font-mono-num text-foreground">55 – 74</span> — Risk: Medel
          </li>
          <li className="flex items-center gap-2">
            <span className="inline-block h-2 w-2 rounded-full bg-destructive" />
            <span className="font-mono-num text-foreground">&lt; 55</span> — Risk: Hög
          </li>
        </ul>
      </section>

      <section className="mt-8">
        <h2 className="font-display text-xl font-semibold">Källor</h2>
        <ul className="mt-3 list-disc space-y-1.5 pl-5 text-sm text-muted-foreground">
          <li>Leverantörens publika certifieringar (ISO 27001, SOC 2, BSI C5, SecNumCloud m.fl.)</li>
          <li>Officiella jurisdiktions- och ägandedata</li>
          <li>EU-regelverk: GDPR, NIS2 (2022/2555), DORA (2022/2554)</li>
          <li>Schrems II-domen och tillämpning på CLOUD Act / FISA 702</li>
        </ul>
      </section>

      <section className="mt-8 rounded-xl border border-accent/30 bg-accent/5 p-5">
        <h2 className="font-display text-base font-semibold text-accent">
          Inte en certifiering
        </h2>
        <p className="mt-2 text-sm text-muted-foreground">
          Detta verktyg stödjer beslutsfattande och fungerar <strong className="text-foreground">inte</strong>{" "}
          som officiell certifiering eller juridisk rådgivning. Ingen "EuroStack Verified"-stämpel
          eller liknande auktoritetsanspråk utfärdas.
        </p>
      </section>
    </div>
  );
};

export default Methodology;
