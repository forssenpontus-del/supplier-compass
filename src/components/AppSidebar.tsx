import { NavLink } from "react-router-dom";
import { Activity, BarChart3, SlidersHorizontal, BookOpen, Info, ListChecks, Home } from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";

const items = [
  { title: "Start", url: "/", icon: Home },
  { title: "Frågeformulär", url: "/quiz", icon: ListChecks },
  { title: "Översikt", url: "/dashboard", icon: BarChart3 },
  { title: "Vikter", url: "/weights", icon: SlidersHorizontal },
  { title: "Metodik", url: "/methodology", icon: BookOpen },
  { title: "Om", url: "/about", icon: Info },
];

export function AppSidebar() {
  const { state } = useSidebar();
  const collapsed = state === "collapsed";

  return (
    <Sidebar collapsible="icon">
      <SidebarHeader className="border-b border-sidebar-border p-4">
        <div className="flex items-center gap-2.5">
          <div className="relative flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-gradient-to-br from-primary to-primary/60 shadow-[0_0_20px_hsl(var(--primary)/0.4)]">
            <Activity className="h-4 w-4 text-primary-foreground" />
          </div>
          {!collapsed && (
            <div className="leading-none">
              <div className="font-display text-sm font-bold tracking-tight">Vendor Compass</div>
              <div className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
                EU sovereignty index
              </div>
            </div>
          )}
        </div>
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Navigering</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <NavLink
                      to={item.url}
                      end
                      className={({ isActive }) =>
                        `flex items-center gap-2 ${
                          isActive ? "bg-sidebar-accent text-sidebar-accent-foreground" : ""
                        }`
                      }
                    >
                      <item.icon className="h-4 w-4" />
                      {!collapsed && <span>{item.title}</span>}
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
