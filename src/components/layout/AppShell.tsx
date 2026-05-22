import type { ReactNode } from 'react'

interface AppShellProps {
  children: ReactNode
  showBottomNav?: boolean
}

export function AppShell({ children, showBottomNav = false }: AppShellProps) {
  return (
    <div className="flex min-h-screen items-start justify-center" style={{ backgroundColor: 'var(--color-celadon-900)' }}>
      <div
        className="phone-frame sm:rounded-[2.5rem] sm:shadow-2xl"
        style={{ boxShadow: '0 0 0 1px rgba(0,0,0,0.1)' }}
      >
        <div className={`flex flex-1 flex-col ${showBottomNav ? 'pb-20' : ''}`}>
          {children}
        </div>
      </div>
    </div>
  )
}
