import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { AppShell } from '../components/layout/AppShell'
import StatusBar from '../components/StatusBar'
import PageTransition from '../components/PageTransition'
import { SealMark, CraneMark } from '../components/CraneMark'

export function LandingPage() {
  const navigate = useNavigate()

  return (
    <AppShell>
      <PageTransition>
        <div className="bg-hanji-texture flex flex-1 flex-col">
          <StatusBar />

          {/* 배경 장식: 우상단 학 */}
          <CraneMark
            className="pointer-events-none absolute right-2 top-16 w-32"
            style={{ color: 'var(--color-celadon-300)' }}
          />

          <div className="flex flex-1 flex-col items-center justify-center px-8 text-center">
            {/* 로고 인장 */}
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.1, duration: 0.5 }}
              style={{ color: 'var(--color-celadon-500)' }}
            >
              <SealMark
                className="h-16 w-16"
                style={{ animation: 'float 4s ease-in-out infinite' }}
              />
            </motion.div>

            {/* 브랜드명 */}
            <motion.h1
              initial={{ y: 12, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.25, duration: 0.5 }}
              className="mt-6 text-5xl font-extrabold tracking-tight"
              style={{ fontFamily: 'var(--font-serif)', color: 'var(--color-ink)' }}
            >
              베리연
            </motion.h1>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="mt-2 text-sm tracking-[0.4em]"
              style={{ fontFamily: 'var(--font-serif)', color: 'var(--color-celadon-400)' }}
            >
              V E R I Y E O N
            </motion.p>

            {/* 슬로건 */}
            <motion.div
              initial={{ y: 12, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.5 }}
              className="mt-10"
            >
              <p
                className="text-xl font-bold leading-relaxed"
                style={{ fontFamily: 'var(--font-serif)', color: 'var(--color-ink)' }}
              >
                만나기 전에,
                <br />필요한 것만 증명한다.
              </p>
              <p className="mt-4 text-sm leading-relaxed" style={{ color: 'var(--color-celadon-500)' }}>
                검증은 강하게, 공개는 단계적으로,
                <br />만남은 신중하게.
              </p>
            </motion.div>
          </div>

          {/* 하단 버튼 영역 */}
          <motion.div
            initial={{ y: 24, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.65, duration: 0.5 }}
            className="space-y-3 px-8 pb-10"
          >
            <button className="btn-primary" onClick={() => navigate('/login')}>
              시작하기
            </button>
            <button className="btn-ghost" onClick={() => navigate('/login')}>
              로그인
            </button>
          </motion.div>
        </div>
      </PageTransition>
    </AppShell>
  )
}
