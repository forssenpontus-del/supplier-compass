const About = () => {
  return (
    <div className="container mx-auto max-w-3xl px-4 py-8 md:px-6 md:py-10">
      <div className="text-xs uppercase tracking-[0.25em] text-muted-foreground">Om</div>
      <h1 className="mt-1 font-display text-3xl font-semibold md:text-4xl">Vendor Compass</h1>
      <p className="mt-3 text-sm text-muted-foreground">
        Vendor Compass är ett oberoende, regelbaserat verktyg som hjälper organisationer att
        bedöma leverantörer mot EU-anpassning, säkerhet och jurisdiktionell risk.
      </p>

      <div className="mt-8 space-y-4">
        <div className="rounded-xl border border-border bg-card p-5">
          <h2 className="font-display text-base font-semibold">Vårt löfte</h2>
          <ul className="mt-2 list-disc space-y-1 pl-5 text-sm text-muted-foreground">
            <li>Inga falska "verifierade"-stämplar.</li>
            <li>Ingen AI-gissning — bara regler ni kan inspektera.</li>
            <li>Ni kontrollerar vikterna och därmed slutsatsen.</li>
          </ul>
        </div>

        <div className="rounded-xl border border-border bg-card p-5">
          <h2 className="font-display text-base font-semibold">Workflow</h2>
          <ol className="mt-2 list-decimal space-y-1 pl-5 text-sm text-muted-foreground">
            <li>Välj leverantör i översikten.</li>
            <li>Granska komponentnedbrytning och regelmotivering.</li>
            <li>Justera vikter om era prioriteringar skiljer sig.</li>
            <li>Använd resultatet som underlag i ert beslut.</li>
          </ol>
        </div>

        <div className="rounded-xl border border-accent/30 bg-accent/5 p-5 text-sm text-muted-foreground">
          Verktyget stödjer beslutsfattande och fungerar <strong className="text-foreground">inte</strong>{" "}
          som officiell certifiering. För juridisk eller regulatorisk bedömning, kontakta er DPO
          eller jurist.
        </div>
      </div>
    </div>
  );
};

export default About;
