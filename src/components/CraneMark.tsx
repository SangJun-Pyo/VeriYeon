export function CraneMark({ className = '', style }: { className?: string; style?: React.CSSProperties }) {
  return (
    <svg viewBox="0 0 120 80" fill="none" className={className} style={style} aria-hidden>
      <path d="M10 55 C30 50 35 35 50 30 C58 27 70 28 78 22 C85 17 92 14 104 12"
        stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" opacity="0.7" />
      <path d="M50 30 C52 38 56 44 64 48 C58 50 50 48 46 42"
        stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" opacity="0.7" />
      <path d="M104 12 l6 -3 m-6 3 l4 4"
        stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" opacity="0.7" />
      <circle cx="100" cy="14" r="1.6" fill="currentColor" opacity="0.7" />
    </svg>
  )
}

export function SealMark({ className = '', style }: { className?: string; style?: React.CSSProperties }) {
  return (
    <svg viewBox="0 0 64 64" fill="none" className={className} style={style} aria-hidden>
      <circle cx="32" cy="32" r="30" stroke="currentColor" strokeWidth="2" opacity="0.85" />
      <circle cx="32" cy="32" r="24" stroke="currentColor" strokeWidth="1" opacity="0.4" />
      <path d="M16 38 c4 -6 10 -6 14 0 c4 -6 10 -6 14 0"
        stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" opacity="0.7" />
      <path d="M22 26 c3 -4 7 -4 10 0 c3 -4 7 -4 10 0"
        stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" opacity="0.55" />
    </svg>
  )
}
