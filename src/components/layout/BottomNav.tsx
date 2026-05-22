import { useNavigate, useLocation } from 'react-router-dom'
import { Home, Heart, Calendar, Wallet, User } from 'lucide-react'

const navItems = [
  { icon: Home, label: '홈', path: '/home' },
  { icon: Heart, label: '관심함', path: '/interests' },
  { icon: Calendar, label: '약속', path: '/appointments' },
  { icon: Wallet, label: '지갑', path: '/wallet' },
  { icon: User, label: '마이', path: '/my' },
]

export function BottomNav() {
  const navigate = useNavigate()
  const location = useLocation()

  return (
    <div
      className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-[420px] flex border-t z-50"
      style={{
        borderColor: 'var(--color-hanji-200)',
        backgroundColor: 'var(--color-hanji-50)',
      }}
    >
      {navItems.map(({ icon: Icon, label, path }) => {
        const isActive = location.pathname === path
        return (
          <button
            key={path}
            onClick={() => navigate(path)}
            className="flex-1 flex flex-col items-center justify-center py-3 gap-0.5 transition-opacity"
            style={{ color: isActive ? 'var(--color-celadon-500)' : 'var(--color-celadon-300)' }}
          >
            <Icon size={21} strokeWidth={isActive ? 2.5 : 1.8} />
            <span className="text-[10px] font-medium">{label}</span>
          </button>
        )
      })}
    </div>
  )
}
