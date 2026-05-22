import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { AppShell } from '../components/layout/AppShell'
import StatusBar from '../components/StatusBar'
import PageTransition from '../components/PageTransition'
import { SealMark, CraneMark } from '../components/CraneMark'
import { useAppStore } from '../store/useAppStore'
import { mockDidLogin } from '../services/didService'

const STEPS = ['모바일 신분증 인증', 'DID 지갑 연결', 'Verified Face 인증']

export function DidLoginPage() {
  const navigate = useNavigate()
  const login = useAppStore((s) => s.login)
  const [progress, setProgress] = useState(0)
  const [isDone, setIsDone] = useState(false)

  useEffect(() => {
    let mounted = true
    // 3초에 걸쳐 0→100% 진행
    const total = 3000
    const interval = 50
    const step = (100 * interval) / total
    const timer = setInterval(() => {
      if (!mounted) return
      setProgress((prev) => {
        const next = Math.min(prev + step, 100)
        if (next >= 100) {
          clearInterval(timer)
          setTimeout(() => {
            if (mounted) setIsDone(true)
          }, 400)
        }
        return next
      })
    }, interval)
    return () => {
      mounted = false
      clearInterval(timer)
    }
  }, [])

  useEffect(() => {
    if (!isDone) return
    mockDidLogin().then((did) => {
      login(did.did)
      setTimeout(() => navigate('/wallet'), 600)
    })
  }, [isDone, login, navigate])

  const roundedProgress = Math.round(progress)
  const activeStep = roundedProgress >= 100 ? 3 : roundedProgress >= 66 ? 2 : roundedProgress >= 33 ? 1 : 0

  return (
    <AppShell>
      <PageTransition>
        <div
          className="bg-hanji-texture relative flex flex-1 flex-col items-center overflow-hidden"
        >
          <StatusBar />

          {/* 배경 장식 */}
          <CraneMark
            className="pointer-events-none absolute right-0 top-20 w-36"
            style={{ color: 'var(--color-celadon-200)' }}
          />
          <div
            className="pointer-events-none absolute left-4 top-44 h-16 w-16 rounded-full border opacity-40"
            style={{ borderColor: 'var(--color-celadon-100)' }}
          />

          {/* 로고 */}
          <div className="mt-6 flex items-center gap-2" style={{ color: 'var(--color-celadon-500)' }}>
            <SealMark className="h-9 w-9" />
            <span
              className="text-2xl font-extrabold"
              style={{ fontFamily: 'var(--font-serif)', color: 'var(--color-ink)' }}
            >
              베리연
            </span>
          </div>

          {/* 제목 */}
          <h1
            className="mt-8 px-8 text-center text-3xl font-extrabold leading-snug"
            style={{ fontFamily: 'var(--font-serif)', color: 'var(--color-ink)' }}
          >
            본인 인증 중
          </h1>
          <p className="mt-3 px-8 text-center text-sm leading-relaxed" style={{ color: 'var(--color-celadon-500)' }}>
            모바일 신분증과 DID 지갑을 연결하고 있어요.
            <br />원본 정보는 기기에서 벗어나지 않습니다.
          </p>

          {/* 인장 애니메이션 */}
          <motion.div
            className="my-8 flex h-44 w-44 items-center justify-center"
            animate={{ y: [0, -10, 0] }}
            transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
            style={{ color: 'var(--color-celadon-400)' }}
          >
            <SealMark className="h-40 w-40" />
          </motion.div>

          {/* 진행 바 */}
          <div className="w-full px-8">
            <div
              className="relative h-7 w-full overflow-hidden rounded-full"
              style={{ backgroundColor: 'var(--color-celadon-100)' }}
            >
              <motion.div
                className="h-full rounded-full"
                style={{ backgroundColor: 'var(--color-celadon-500)' }}
                animate={{ width: `${progress}%` }}
                transition={{ ease: 'easeOut' }}
              />
              <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs font-bold text-white mix-blend-difference">
                {roundedProgress}%
              </span>
            </div>

            <p
              className="mt-5 text-center text-base font-bold"
              style={{ fontFamily: 'var(--font-serif)', color: 'var(--color-celadon-600)' }}
            >
              ✦ DID 검증 진행 중... ✦
            </p>

            {/* 단계 칩 */}
            <div className="mt-4 flex items-center justify-between gap-1">
              {STEPS.map((step, i) => {
                const done = i < activeStep
                const active = i === activeStep
                return (
                  <div key={step} className="flex flex-1 items-center">
                    <div
                      className="flex flex-1 items-center justify-center gap-1.5 rounded-full px-2 py-2 text-[11px] font-medium transition-colors"
                      style={{
                        backgroundColor: done
                          ? 'var(--color-celadon-500)'
                          : active
                            ? 'var(--color-celadon-100)'
                            : 'var(--color-hanji-100)',
                        color: done
                          ? 'white'
                          : active
                            ? 'var(--color-celadon-600)'
                            : 'var(--color-celadon-300)',
                      }}
                    >
                      {done ? (
                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none">
                          <path d="M5 12l5 5L19 7" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                      ) : (
                        <span className={active ? 'animate-pulse' : ''}>○</span>
                      )}
                      <span className="whitespace-nowrap">{step}</span>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>

          <p
            className="mt-auto pb-10 pt-8 text-lg font-bold"
            style={{ fontFamily: 'var(--font-serif)', color: 'var(--color-celadon-600)' }}
          >
            잠시만 기다려 주세요
          </p>
        </div>
      </PageTransition>
    </AppShell>
  )
}
