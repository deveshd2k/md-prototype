import { Outlet } from 'react-router'
import { AppTopBar } from '@/components/layout/AppTopBar'
import { OsBar } from '@/components/layout/OsBar'
import { ToastProvider } from '@/components/ui/toast'

// Persistent frame around every screen
export function AppShell() {
  return (
    <ToastProvider>
      <div className="min-h-svh bg-background text-foreground">
        <OsBar />
        <AppTopBar />
        <main>
          <Outlet />
        </main>
      </div>
    </ToastProvider>
  )
}
