import { useNavigate } from 'react-router-dom'

interface HeaderProps {
  title: string
  showBack?: boolean
  onBack?: () => void
  rightElement?: React.ReactNode
}

export function Header({ title, showBack = false, onBack, rightElement }: HeaderProps) {
  const navigate = useNavigate()
  const handleBack = onBack ?? (() => navigate(-1))

  return (
    <div className="relative flex items-center justify-center px-4 py-3">
      <div className="absolute left-3">
        {showBack && (
          <button
            onClick={handleBack}
            className="flex h-9 w-9 items-center justify-center rounded-full active:bg-celadon-50"
            style={{ color: 'var(--color-celadon-600)' }}
            aria-label="뒤로가기"
          >
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
              <path d="M15 18l-6-6 6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
        )}
      </div>
      <h1
        className="text-lg font-bold"
        style={{ fontFamily: 'var(--font-serif)', color: 'var(--color-ink)' }}
      >
        {title}
      </h1>
      <div className="absolute right-3 flex justify-end">
        {rightElement}
      </div>
    </div>
  )
}
