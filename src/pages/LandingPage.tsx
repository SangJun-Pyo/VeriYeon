import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { AppShell } from '../components/layout/AppShell'
import StatusBar from '../components/StatusBar'
import PageTransition from '../components/PageTransition'
import { SealMark } from '../components/CraneMark'

const STEPS = [
  { label: '사주 성향 정리', state: 'done' as const },
  { label: '관계 준비도 계산', state: 'active' as const },
  { label: '리포트 시각화', state: 'pending' as const },
]

export function LandingPage() {
  const navigate = useNavigate()
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const target = 78
    const start = performance.now()
    const duration = 1400
    let raf = 0

    const tick = (now: number) => {
      const t = Math.min((now - start) / duration, 1)
      const eased = 1 - Math.pow(1 - t, 3)
      setProgress(Math.round(eased * target))
      if (t < 1) raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [])

  return (
    <AppShell>
      <PageTransition>
        <div
          className="relative flex flex-1 flex-col overflow-hidden"
          style={{ backgroundColor: 'var(--color-hanji-50, #fdfcf8)' }}
        >
          <CloudWaveBackdrop />
          <StatusBar />

          <div className="relative z-10 flex flex-1 flex-col">
            {/* 상단 로고 행 */}
            <motion.div
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="mt-4 flex items-center justify-center gap-2.5"
            >
              <SealMark
                className="h-10 w-10"
                style={{ color: 'var(--color-celadon-500, #4e7567)' }}
              />
              <span
                className="text-3xl font-extrabold"
                style={{ fontFamily: 'var(--font-serif)', color: 'var(--color-ink, #2b3e37)' }}
              >
                사주연
              </span>
              <span
                className="-ml-1 mt-1 inline-flex h-4 w-4 items-center justify-center rounded-[3px] text-[8px] font-bold text-white"
                style={{ backgroundColor: 'var(--color-cinnabar, #c0563f)' }}
              >
                印
              </span>
              <FlyingCrane
                className="ml-1 h-12 w-16"
                style={{ color: 'var(--color-celadon-400, #6a9183)' }}
              />
            </motion.div>

            {/* 대제목 */}
            <motion.h1
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15, duration: 0.55 }}
              className="mt-7 px-8 text-center text-[2rem] font-extrabold leading-[1.3]"
              style={{ fontFamily: 'var(--font-serif)', color: 'var(--color-ink, #2b3e37)' }}
            >
              AI 관계 준비도 리포트
              <br />
              생성 중
            </motion.h1>

            {/* 부제 */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.5 }}
              className="mt-3 px-8 text-center text-[15px] leading-relaxed"
              style={{ color: 'var(--color-celadon-500, #4e7567)' }}
            >
              사주 궁합과 입력 정보를 바탕으로
              <br />
              당신만의 분석 리포트를 만들고 있어요.
            </motion.p>

            {/* 청자 호랑이 마스코트 */}
            <div className="relative mt-2 flex flex-1 items-center justify-center">
              <motion.div
                initial={{ opacity: 0, scale: 0.92 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.35, duration: 0.6, ease: 'easeOut' }}
                className="relative"
              >
                <motion.div
                  animate={{ y: [0, -8, 0] }}
                  transition={{ duration: 3.5, repeat: Infinity, ease: 'easeInOut' }}
                >
                  <CeladonTiger className="h-64 w-64" />
                </motion.div>
                <WaterBase className="absolute -bottom-4 left-1/2 h-20 w-72 -translate-x-1/2" />
              </motion.div>

              <Sparkle className="absolute left-8 top-1/3 h-4 w-4" delay={0} />
              <Sparkle className="absolute right-10 top-1/4 h-3 w-3" delay={0.6} />
              <Sparkle className="absolute bottom-10 right-16 h-5 w-5" delay={1.1} />
              <Sparkle className="absolute bottom-16 left-12 h-3 w-3" delay={1.6} />
            </div>

            {/* 진행 영역 */}
            <div className="px-7 pb-8">
              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.45, duration: 0.5 }}
                className="flex items-center gap-3"
              >
                <div
                  className="relative h-11 flex-1 overflow-hidden rounded-full"
                  style={{ backgroundColor: 'var(--color-celadon-100, #dde8e2)' }}
                >
                  <motion.div
                    className="h-full rounded-full"
                    style={{ background: 'linear-gradient(90deg, #9db8ad, #7ba293)' }}
                    animate={{ width: `${progress}%` }}
                    transition={{ ease: 'easeOut' }}
                  />
                </div>
                <span
                  className="min-w-[3.2rem] text-right text-2xl font-bold"
                  style={{ fontFamily: 'var(--font-serif)', color: 'var(--color-celadon-600, #3d5e52)' }}
                >
                  {progress}
                  <span className="text-base font-semibold">%</span>
                </span>
              </motion.div>

              <div
                className="mt-6 flex items-center justify-center gap-2 text-lg font-bold"
                style={{ fontFamily: 'var(--font-serif)', color: 'var(--color-celadon-600, #3d5e52)' }}
              >
                <Diamond />
                <span>궁합 패턴 분석 중...</span>
                <Diamond />
              </div>

              <div className="mt-4 flex items-center justify-center gap-0.5">
                {STEPS.map((step, i) => (
                  <div key={step.label} className="flex items-center">
                    <StepChip label={step.label} state={step.state} />
                    {i < STEPS.length - 1 && (
                      <span
                        className="mx-0.5 text-[10px] tracking-tight"
                        style={{ color: 'var(--color-celadon-300, #92b2a5)' }}
                      >
                        •••
                      </span>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* 하단 안내 + 매듭 장식 */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.7 }}
              className="flex flex-col items-center gap-2 pb-10 cursor-pointer"
              onClick={() => navigate('/login')}
            >
              <p
                className="text-lg font-bold"
                style={{ fontFamily: 'var(--font-serif)', color: 'var(--color-celadon-600, #3d5e52)' }}
              >
                잠시만 기다려 주세요
              </p>
              <KnotDivider className="h-3 w-28" />
            </motion.div>
          </div>
        </div>
      </PageTransition>
    </AppShell>
  )
}

// ============================================================
// 장식 SVG 컴포넌트들
// ============================================================

function CloudWaveBackdrop() {
  const c = 'var(--color-celadon-200, #bcd0c7)'
  return (
    <div className="pointer-events-none absolute inset-0 z-0" aria-hidden>
      <Cloud className="absolute left-2 top-24 h-10 w-24" color={c} opacity={0.35} />
      <Cloud className="absolute right-4 top-40 h-8 w-20" color={c} opacity={0.3} />
      <svg className="absolute right-3 top-10 h-24 w-24" viewBox="0 0 100 100" fill="none">
        <circle cx="50" cy="50" r="40" stroke={c} strokeWidth="1.5" opacity="0.3" />
        <circle cx="50" cy="50" r="30" stroke={c} strokeWidth="1" opacity="0.25" />
        <path d="M30 50 q20 -16 40 0 q-20 16 -40 0" stroke={c} strokeWidth="1" opacity="0.3" />
      </svg>
      <svg className="absolute left-5 top-1/3 h-20 w-20" viewBox="0 0 80 80" fill="none">
        <circle cx="40" cy="40" r="34" stroke={c} strokeWidth="1.5" opacity="0.25" />
        <rect x="26" y="26" width="28" height="28" stroke={c} strokeWidth="1.5" opacity="0.3" />
        <path d="M40 26 v28 M26 40 h28" stroke={c} strokeWidth="1.5" opacity="0.3" />
      </svg>
      <svg className="absolute left-0 top-[46%] h-40 w-full" viewBox="0 0 400 160" fill="none" preserveAspectRatio="none">
        <path d="M0 110 C80 70 140 130 210 95 C270 65 330 110 400 80" stroke={c} strokeWidth="2" opacity="0.4" />
        <path d="M0 130 C90 95 150 150 220 118 C285 88 340 128 400 100" stroke={c} strokeWidth="1.5" opacity="0.3" />
      </svg>
      <svg className="absolute bottom-0 left-0 h-32 w-full" viewBox="0 0 400 130" fill="none" preserveAspectRatio="xMidYMax slice">
        <path d="M-10 90 q30 -28 60 -8 q10 -26 44 -16 q22 -22 52 0 q28 -16 56 6 q34 -10 60 12 q26 -6 52 10 q20 -4 46 8 l0 40 l-420 0 z" fill={c} opacity="0.18" />
        <path d="M40 110 q22 -18 44 -4 M150 104 q24 -16 50 -2 M280 110 q22 -16 46 -2" stroke={c} strokeWidth="1.2" opacity="0.3" fill="none" />
      </svg>
    </div>
  )
}

function Cloud({ className = '', color, opacity = 0.3 }: { className?: string; color: string; opacity?: number }) {
  return (
    <svg className={className} viewBox="0 0 100 40" fill="none" aria-hidden>
      <path d="M10 30 q-6 -14 10 -16 q4 -12 18 -6 q10 -10 22 0 q14 -4 18 10 q10 2 6 12 z" stroke={color} strokeWidth="1.5" opacity={opacity} fill="none" />
      <path d="M18 30 q8 -8 16 -2 M44 28 q8 -8 16 -2" stroke={color} strokeWidth="1" opacity={opacity} />
    </svg>
  )
}

function FlyingCrane({ className = '', style }: { className?: string; style?: React.CSSProperties }) {
  return (
    <svg className={className} style={style} viewBox="0 0 80 60" fill="none" aria-hidden>
      <path d="M14 40 C26 36 34 34 46 30 C54 27 60 24 68 18" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M68 18 C72 16 74 12 72 9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      <circle cx="71" cy="8" r="2" fill="#c0563f" />
      <path d="M73 8 l5 -2" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
      <path d="M40 31 C42 22 48 16 58 14 C50 20 46 26 44 33" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" fill="currentColor" fillOpacity="0.08" />
      <path d="M20 40 C22 46 26 50 32 52 M28 38 C30 45 34 49 40 51" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" opacity="0.7" />
      <path d="M16 41 l-6 8 M19 40 l-4 9" stroke="currentColor" strokeWidth="1" strokeLinecap="round" opacity="0.7" />
    </svg>
  )
}

function CeladonTiger({ className = '' }: { className?: string }) {
  const blue = '#3a5ba8'
  const blueLight = '#6f8fc9'
  const gold = '#c2a25a'
  const body = '#ffffff'
  const shade = '#e8eef5'
  return (
    <svg className={className} viewBox="0 0 240 220" fill="none" aria-hidden>
      <defs>
        <radialGradient id="tigerBody" cx="40%" cy="35%" r="75%">
          <stop offset="0%" stopColor={body} />
          <stop offset="100%" stopColor={shade} />
        </radialGradient>
        <filter id="tigerShadow" x="-30%" y="-30%" width="160%" height="160%">
          <feDropShadow dx="0" dy="6" stdDeviation="6" floodColor="#5b7a9a" floodOpacity="0.18" />
        </filter>
      </defs>
      <g filter="url(#tigerShadow)">
        <path d="M188 150 C214 140 224 108 210 86 C204 76 214 70 220 78" stroke={body} strokeWidth="15" strokeLinecap="round" fill="none" />
        <path d="M188 150 C214 140 224 108 210 86 C204 76 214 70 220 78" stroke={blue} strokeWidth="3" strokeLinecap="round" strokeDasharray="2 13" fill="none" opacity="0.85" />
        <circle cx="219" cy="79" r="6" fill={gold} />
        <ellipse cx="158" cy="150" rx="46" ry="40" fill="url(#tigerBody)" />
        <ellipse cx="104" cy="148" rx="44" ry="36" fill="url(#tigerBody)" />
        <path d="M150 178 q6 22 -2 30 q-12 2 -12 -10 l2 -18 z" fill="url(#tigerBody)" />
        <path d="M178 176 q10 20 4 30 q-12 4 -14 -8 l2 -18 z" fill="url(#tigerBody)" />
        <path d="M86 168 q-8 24 -4 34 q12 4 16 -8 l-2 -22 z" fill="url(#tigerBody)" />
        <path d="M112 174 q0 22 2 30 q12 2 12 -10 l-4 -18 z" fill="url(#tigerBody)" />
        <circle cx="86" cy="200" r="4" fill={blue} opacity="0.85" />
        <circle cx="120" cy="202" r="3.5" fill={blue} opacity="0.85" />
        <circle cx="146" cy="206" r="3" fill={blue} opacity="0.7" />
        <circle cx="180" cy="204" r="3" fill={blue} opacity="0.7" />
        <g stroke={blue} strokeWidth="4" strokeLinecap="round" opacity="0.85">
          <path d="M150 120 q8 6 6 16" />
          <path d="M164 124 q9 7 7 18" />
          <path d="M178 132 q9 8 6 18" />
          <path d="M150 156 q9 4 8 14" />
          <path d="M168 158 q9 5 7 16" />
        </g>
        <ellipse cx="86" cy="118" rx="48" ry="44" fill="url(#tigerBody)" />
        <path d="M52 84 q-6 -20 12 -22 q6 12 2 24 z" fill="url(#tigerBody)" />
        <path d="M120 84 q6 -20 -12 -22 q-6 12 -2 24 z" fill="url(#tigerBody)" />
        <path d="M56 82 q-2 -12 8 -14 q3 8 1 16 z" fill={gold} opacity="0.7" />
        <path d="M116 82 q2 -12 -8 -14 q-3 8 -1 16 z" fill={gold} opacity="0.7" />
        <g stroke={blue} strokeWidth="4" strokeLinecap="round">
          <path d="M86 74 v22" />
          <path d="M74 80 h24" />
          <path d="M74 90 h24" opacity="0.9" />
          <path d="M68 96 q-6 6 -4 14" opacity="0.8" />
          <path d="M104 96 q6 6 4 14" opacity="0.8" />
        </g>
        <g stroke={blueLight} strokeWidth="3" strokeLinecap="round" opacity="0.85">
          <path d="M44 116 q8 2 12 8" />
          <path d="M46 128 q9 1 13 6" />
          <path d="M128 116 q-8 2 -12 8" />
          <path d="M126 128 q-9 1 -13 6" />
        </g>
        <ellipse cx="68" cy="116" rx="9" ry="11" fill="#1f2d4d" />
        <ellipse cx="104" cy="116" rx="9" ry="11" fill="#1f2d4d" />
        <circle cx="71" cy="112" r="3" fill="#ffffff" />
        <circle cx="107" cy="112" r="3" fill="#ffffff" />
        <path d="M60 108 q8 -3 16 1 M96 108 q8 -3 16 1" stroke={blue} strokeWidth="2" strokeLinecap="round" fill="none" opacity="0.6" />
        <path d="M82 130 h12 l-6 6 z" fill={gold} />
        <path d="M88 136 q-6 8 -14 8 M88 136 q6 8 14 8" stroke={blue} strokeWidth="2.5" strokeLinecap="round" fill="none" />
        <path d="M64 150 q22 14 44 0" stroke={blueLight} strokeWidth="2.5" fill="none" opacity="0.8" />
        <circle cx="86" cy="162" r="11" fill="#ffffff" stroke={blue} strokeWidth="2" />
        <path d="M86 156 q5 4 0 8 q-5 -4 0 -8 M80 162 q4 -5 8 0 q-4 5 -8 0" stroke={blue} strokeWidth="1.6" fill="none" />
        <path d="M86 173 v8" stroke={blueLight} strokeWidth="2" />
        <path d="M82 181 q4 8 8 0" fill="#b9c7da" />
        <path d="M82 181 v6 M86 182 v7 M90 181 v6" stroke="#b9c7da" strokeWidth="1.4" strokeLinecap="round" />
      </g>
    </svg>
  )
}

function WaterBase({ className = '' }: { className?: string }) {
  const c = 'var(--color-celadon-200, #bcd0c7)'
  return (
    <svg className={className} viewBox="0 0 280 70" fill="none" aria-hidden preserveAspectRatio="none">
      <ellipse cx="140" cy="40" rx="130" ry="24" fill={c} opacity="0.25" />
      <path d="M30 44 C90 28 150 56 250 36" stroke={c} strokeWidth="2" opacity="0.4" fill="none" />
      <path d="M50 54 C110 40 170 62 240 48" stroke={c} strokeWidth="1.5" opacity="0.3" fill="none" />
    </svg>
  )
}

function Sparkle({ className = '', delay = 0 }: { className?: string; delay?: number }) {
  return (
    <motion.svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden
      animate={{ opacity: [0.2, 1, 0.2], scale: [0.8, 1, 0.8] }}
      transition={{ duration: 2.4, repeat: Infinity, delay, ease: 'easeInOut' }}
    >
      <path d="M12 2 C13 8 16 11 22 12 C16 13 13 16 12 22 C11 16 8 13 2 12 C8 11 11 8 12 2 Z" fill="var(--color-celadon-300, #92b2a5)" opacity="0.7" />
    </motion.svg>
  )
}

function Diamond() {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden>
      <path d="M7 1 L13 7 L7 13 L1 7 Z" fill="var(--color-celadon-400, #6a9183)" opacity="0.8" />
    </svg>
  )
}

function KnotDivider({ className = '' }: { className?: string }) {
  const c = 'var(--color-celadon-300, #92b2a5)'
  return (
    <svg className={className} viewBox="0 0 120 14" fill="none" aria-hidden>
      <path d="M2 7 H46" stroke={c} strokeWidth="1.2" opacity="0.6" />
      <path d="M74 7 H118" stroke={c} strokeWidth="1.2" opacity="0.6" />
      <path d="M52 7 q4 -6 8 0 q4 6 8 0 q-4 -6 -8 0 q-4 6 -8 0 Z" stroke={c} strokeWidth="1.4" fill="none" />
    </svg>
  )
}

function StepChip({ label, state }: { label: string; state: 'done' | 'active' | 'pending' }) {
  const isDone = state === 'done'
  const isActive = state === 'active'
  return (
    <div
      className="flex items-center gap-1 rounded-full border px-2.5 py-2 text-[11px] font-medium"
      style={{
        borderColor: isDone ? 'var(--color-celadon-400, #6a9183)' : 'var(--color-celadon-200, #bcd0c7)',
        backgroundColor: isDone ? 'var(--color-celadon-50, #f1f5f3)' : 'transparent',
        color: isDone ? 'var(--color-celadon-600, #3d5e52)' : isActive ? 'var(--color-celadon-500, #4e7567)' : 'var(--color-celadon-300, #92b2a5)',
      }}
    >
      {isDone ? (
        <span className="flex h-3.5 w-3.5 items-center justify-center rounded-full text-white" style={{ backgroundColor: 'var(--color-celadon-500, #4e7567)' }}>
          <svg width="9" height="9" viewBox="0 0 24 24" fill="none">
            <path d="M5 12l5 5L19 7" stroke="currentColor" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </span>
      ) : isActive ? (
        <svg className="h-3.5 w-3.5 animate-spin" viewBox="0 0 24 24" fill="none">
          <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="3" opacity="0.25" />
          <path d="M21 12 a9 9 0 0 0 -9 -9" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
        </svg>
      ) : (
        <svg className="h-3.5 w-3.5" viewBox="0 0 24 24" fill="none">
          <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="2.5" strokeDasharray="3 3" />
        </svg>
      )}
      <span className="whitespace-nowrap">{label}</span>
    </div>
  )
}
