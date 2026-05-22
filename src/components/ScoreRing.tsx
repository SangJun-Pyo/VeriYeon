import { motion } from 'framer-motion'

// ScoreRing - 원형 점수 게이지. 신뢰 점수, 궁합 점수 등에서 재사용.
interface ScoreRingProps {
  score: number // 0~100
  label?: string
  sublabel?: string
  size?: number
}

export default function ScoreRing({ score, label, sublabel, size = 180 }: ScoreRingProps) {
  const stroke = 12
  const radius = (size - stroke) / 2
  const circumference = 2 * Math.PI * radius
  const offset = circumference * (1 - score / 100)

  return (
    <div className="relative inline-flex items-center justify-center" style={{ width: size, height: size }}>
      <svg width={size} height={size} className="-rotate-90">
        <circle cx={size / 2} cy={size / 2} r={radius} fill="none" stroke="#dde8e2" strokeWidth={stroke} />
        <motion.circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke="#4e7567"
          strokeWidth={stroke}
          strokeLinecap="round"
          strokeDasharray={circumference}
          initial={{ strokeDashoffset: circumference }}
          animate={{ strokeDashoffset: offset }}
          transition={{ duration: 1.1, ease: 'easeOut', delay: 0.2 }}
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
        {label && <span className="text-xs font-medium" style={{ color: 'var(--color-celadon-400)' }}>{label}</span>}
        <motion.span
          className="font-serif text-5xl font-extrabold"
          style={{ color: 'var(--color-celadon-600)', fontFamily: 'var(--font-serif)' }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
        >
          {score}%
        </motion.span>
        {sublabel && (
          <span className="mt-1 text-xs font-medium" style={{ color: 'var(--color-celadon-500)' }}>{sublabel}</span>
        )}
      </div>
    </div>
  )
}
