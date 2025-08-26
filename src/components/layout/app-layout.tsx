import { SidebarProvider, SidebarTrigger, SidebarInset } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/app-sidebar"
import { ReactNode } from "react"

interface AppLayoutProps {
  children: ReactNode
}

export function AppLayout({ children }: AppLayoutProps) {
  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-gradient-surface">
        <AppSidebar />
        
        <SidebarInset className="flex-1">
          {/* Header */}
          <header className="h-14 flex items-center gap-4 px-6 border-b border-border/50 bg-card/30 backdrop-blur-sm">
            <SidebarTrigger className="md:hidden" />
            
            <div className="flex items-center gap-2">
              <h2 className="text-lg font-semibold">ADAS Motorcycle System</h2>
            </div>
            
            <div className="ml-auto flex items-center gap-4">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <div className="w-2 h-2 bg-success rounded-full animate-pulse"></div>
                System Online
              </div>
            </div>
          </header>

          {/* Main Content */}
          <main className="flex-1 p-6">
            {children}
          </main>
        </SidebarInset>
      </div>
    </SidebarProvider>
  )
}