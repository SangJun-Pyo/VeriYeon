import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { Sparkles, Heart } from 'lucide-react'
import { AppShell } from '../components/layout/AppShell'
import { BottomNav } from '../components/layout/BottomNav'
import StatusBar from '../components/StatusBar'
import { useAppStore } from '../store/useAppStore'
import { dailyCards, bonusCards } from '../data/mockCards'
import type { MatchCard } from '../types'

function MatchCardItem({ card, onClick }: { card: MatchCard; onClick: () => void }) {
  const score = card.compatibilityScore ?? 80

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.96 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.4 }}
      onClick={onClick}
      className="cursor-pointer overflow-hidden rounded-3xl bg-white active:scale-[0.98] transition-all"
      style={{ boxShadow: 'var(--shadow-card)' }}
    >
      {/* 사진 영역 */}
      <div
        className="relative flex h-64 items-center justify-center text-6xl"
        style={{ background: 'linear-gradient(135deg, var(--color-celadon-200) 0%, var(--color-celadon-100) 100%)' }}
      >
        {card.image}
        {/* 검증 배지 */}
        <span
          className="absolute right-3 top-3 rounded-full px-3 py-1 text-xs font-semibold text-white"
          style={{ backgroundColor: 'var(--color-celadon-600)' }}
        >
          {card.level1Badges.length}개 검증 완료
        </span>
        {/* 궁합 점수 */}
        <div
          className="absolute bottom-3 left-3 flex flex-col items-center rounded-2xl px-3 py-1.5"
          style={{ backgroundColor: 'rgba(43,62,55,0.75)' }}
        >
          <span className="text-[10px] font-medium text-white opacity-80">궁합</span>
          <span className="text-sm font-bold text-white">{score}%</span>
        </div>
      </div>

      {/* 프로필 정보 */}
      <div className="p-5">
        <div className="flex items-baseline gap-2">
          <h2
            className="text-2xl font-bold"
            style={{ fontFamily: 'var(--font-serif)', color: 'var(--color-ink)' }}
          >
            {card.nickname}
          </h2>
          <span className="text-base" style={{ color: 'var(--color-celadon-500)' }}>{card.ageRange}</span>
        </div>
        <p className="mt-1 text-sm" style={{ color: 'var(--color-celadon-500)' }}>{card.region}</p>

        {/* 호환 키워드 칩 */}
        <div className="mt-4 flex flex-wrap gap-2">
          {card.compatibilityKeywords.map((kw) => (
            <span
              key={kw}
              className="rounded-full px-3 py-1.5 text-sm font-medium"
              style={{ backgroundColor: 'var(--color-celadon-50)', color: 'var(--color-celadon-600)' }}
            >
              {kw}
            </span>
          ))}
        </div>
      </div>
    </motion.div>
  )
}

export function HomePage() {
  const navigate = useNavigate()
  const myProfile = useAppStore((s) => s.myProfile)
  const [showBonus, setShowBonus] = useState(false)
  const [loadingAI, setLoadingAI] = useState(false)

  const handleAICards = async () => {
    setLoadingAI(true)
    await new Promise((r) => setTimeout(r, 2000))
    setLoadingAI(false)
    setShowBonus(true)
  }

  return (
    <AppShell showBottomNav>
      <div className="bg-hanji-texture flex flex-1 flex-col">
        <StatusBar />

        <div className="no-scrollbar flex-1 overflow-y-auto px-6 pb-6">
          {/* 인사말 */}
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="py-4">
            <p className="text-sm" style={{ color: 'var(--color-celadon-400)' }}>
              {myProfile?.nickname ?? '회원'}님, 안녕하세요
            </p>
            <h1
              className="text-2xl font-bold"
              style={{ fontFamily: 'var(--font-serif)', color: 'var(--color-ink)' }}
            >
              오늘의 인연 카드
            </h1>
          </motion.div>

          {/* 일일 카드 */}
          <div className="space-y-5">
            {dailyCards.map((card, i) => (
              <motion.div
                key={card.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
              >
                <MatchCardItem card={card} onClick={() => navigate(`/card/${card.id}`)} />
              </motion.div>
            ))}
          </div>

          {/* AI 카드 버튼 */}
          {!showBonus && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }} className="mt-5">
              <button
                className="btn-ghost"
                onClick={handleAICards}
                disabled={loadingAI}
                style={{ opacity: loadingAI ? 0.7 : 1 }}
              >
                {loadingAI ? (
                  <span className="flex items-center gap-2">
                    <svg className="h-4 w-4 animate-spin" viewBox="0 0 24 24" fill="none">
                      <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3" strokeOpacity="0.3" />
                      <path d="M12 2a10 10 0 0 1 10 10" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
                    </svg>
                    AI 분석 중...
                  </span>
                ) : (
                  <span className="flex items-center gap-2">
                    <Sparkles size={16} style={{ color: 'var(--color-gold)' }} />
                    AI 궁합 카드 보기
                  </span>
                )}
              </button>
            </motion.div>
          )}

          <AnimatePresence>
            {showBonus && (
              <>
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="mt-6 mb-4 flex items-center gap-2"
                >
                  <Heart size={16} fill="var(--color-cinnabar)" style={{ color: 'var(--color-cinnabar)' }} />
                  <p
                    className="text-sm font-semibold"
                    style={{ fontFamily: 'var(--font-serif)', color: 'var(--color-cinnabar)' }}
                  >
                    AI 추천 카드
                  </p>
                </motion.div>
                <div className="space-y-5">
                  {bonusCards.map((card, i) => (
                    <motion.div
                      key={card.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: i * 0.15 }}
                    >
                      <MatchCardItem card={card} onClick={() => navigate(`/card/${card.id}`)} />
                    </motion.div>
                  ))}
                </div>
              </>
            )}
          </AnimatePresence>
        </div>
      </div>
      <BottomNav />
    </AppShell>
  )
}
