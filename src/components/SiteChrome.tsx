import { Activity } from "lucide-react";

export const SiteHeader = () => {
  return (
    <header className="sticky top-0 z-40 border-b border-border/60 bg-background/70 backdrop-blur-xl">
      <div className="container mx-auto flex h-16 items-center justify-between px-6">
        <a href="/" className="flex items-center gap-2.5">
          <div className="relative flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-to-br from-primary to-primary/60 shadow-[0_0_20px_hsl(var(--primary)/0.5)]">
            <Activity className="h-4 w-4 text-primary-foreground" />
            <div className="absolute -bottom-1 -right-1 h-2.5 w-2.5 rounded-full bg-accent ring-2 ring-background" />
          </div>
          <div className="leading-none">
            <div className="font-display text-base font-bold tracking-tight">EuroStack Meter</div>
            <div className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground">Vendor sovereignty index</div>
          </div>
        </a>

        <nav className="hidden items-center gap-7 text-sm text-muted-foreground md:flex">
          <a href="#how" className="transition hover:text-foreground">Så funkar det</a>
          <a href="#ranking" className="transition hover:text-foreground">Rankning</a>
          <a href="#about" className="transition hover:text-foreground">Om</a>
        </nav>

        <div className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
          v1.0 · <span className="text-accent">live</span>
        </div>
      </div>
    </header>
  );
};

export const SiteFooter = () => {
  return (
    <footer id="about" className="border-t border-border bg-card/40">
      <div className="container mx-auto grid gap-10 px-6 py-16 md:grid-cols-3">
        <div>
          <div className="font-display text-lg font-semibold">EuroStack Meter</div>
          <p className="mt-3 max-w-xs text-sm text-muted-foreground">
            En oberoende mätare för digital suveränitet i EU. Inspirerad av bredbandskollen.se.
          </p>
        </div>
        <div>
          <div className="text-xs uppercase tracking-widest text-muted-foreground">Källor</div>
          <ul className="mt-3 space-y-2 text-sm">
            <li>EU Cloud Code of Conduct</li>
            <li>NIS2-direktivet (2022/2555)</li>
            <li>DORA-förordningen (2022/2554)</li>
            <li>GDPR & Schrems II-domen</li>
          </ul>
        </div>
        <div>
          <div className="text-xs uppercase tracking-widest text-muted-foreground">Disclaimer</div>
          <p className="mt-3 text-sm text-muted-foreground">
            Resultaten är indikativa och baseras på offentligt tillgänglig information.
            Inte juridisk rådgivning.
          </p>
        </div>
      </div>
      <div className="border-t border-border py-5 text-center text-xs text-muted-foreground">
        © {new Date().getFullYear()} EuroStack Meter · 🇪🇺
      </div>
    </footer>
  );
};
