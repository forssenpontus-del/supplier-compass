import { Outlet, Link } from "react-router-dom";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/AppSidebar";

const AppLayout = () => {
  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full">
        <AppSidebar />

        <div className="flex flex-1 flex-col">
          <header className="sticky top-0 z-30 flex h-14 items-center justify-between border-b border-border bg-background/80 px-4 backdrop-blur-xl">
            <div className="flex items-center gap-3">
              <SidebarTrigger />
              <div className="hidden sm:block">
                <div className="text-xs uppercase tracking-[0.2em] text-muted-foreground">
                  Dashboard
                </div>
              </div>
            </div>
            <Link
              to="/methodology"
              className="rounded-md border border-border bg-card px-3 py-1.5 text-xs text-muted-foreground transition hover:border-primary/40 hover:text-foreground"
            >
              Hur poängen beräknas →
            </Link>
          </header>

          <main className="flex-1">
            <Outlet />
          </main>

          <footer className="border-t border-border bg-card/40 px-6 py-4 text-center text-[11px] text-muted-foreground">
            Verktyget stödjer beslutsfattande och fungerar <strong className="text-foreground">inte</strong> som
            officiell certifiering. Resultaten baseras på regler & offentlig data — inte AI-gissningar.
          </footer>
        </div>
      </div>
    </SidebarProvider>
  );
};

export default AppLayout;
