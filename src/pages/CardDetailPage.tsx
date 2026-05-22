import { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Heart, Star, X } from 'lucide-react'
import { AppShell } from '../components/layout/AppShell'
import { Header } from '../components/layout/Header'
import { Toast } from '../components/common/Toast'
import StatusBar from '../components/StatusBar'
import PageTransition from '../components/PageTransition'
import { useAppStore } from '../store/useAppStore'
import { allMockCards } from '../data/mockCards'

export function CardDetailPage() {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const addInterest = useAppStore((s) => s.addInterest)
  const [isFlipped, setIsFlipped] = useState(false)
  const [toast, setToast] = useState({ visible: false, message: '', type: 'success' as 'success' | 'info' })

  const card = allMockCards.find((c) => c.id === id)

  if (!card) {
    return (
      <AppShell>
        <div className="bg-hanji-texture flex flex-1 flex-col">
          <StatusBar />
          <Header title="프로필 카드" showBack />
          <div className="flex flex-1 items-center justify-center">
            <p className="text-sm" style={{ color: 'var(--color-celadon-400)' }}>카드를 찾을 수 없습니다.</p>
          </div>
        </div>
      </AppShell>
    )
  }

  const showToast = (message: string, type: 'success' | 'info' = 'success') =>
    setToast({ visible: true, message, type })

  const handleLike = () => {
    addInterest(card)
    showToast('관심 목록에 추가했습니다.')
    setTimeout(() => navigate('/home'), 1200)
  }

  const handleSuperLike = () => {
    addInterest({ ...card, superLiked: true })
    showToast('진지한 관심 + Level 2 공개 의사를 표시했습니다.', 'info')
    setTimeout(() => navigate(`/level2/${card.id}`), 1500)
  }

  const handleReject = () => navigate('/home')

  return (
    <AppShell>
      <PageTransition>
        <div className="bg-hanji-texture flex flex-1 flex-col">
          <StatusBar />
          <Header title="프로필 카드" showBack />

          <div className="no-scrollbar flex-1 overflow-y-auto px-6 pb-6">
            <p className="mb-4 text-center text-xs" style={{ color: 'var(--color-celadon-400)' }}>
              카드를 탭하면 검증 배지를 확인할 수 있습니다
            </p>

            {/* 3D 카드 플립 */}
            <div
              className="relative mx-auto cursor-pointer"
              style={{ perspective: '1200px', height: '460px' }}
              onClick={() => setIsFlipped((prev) => !prev)}
            >
              <motion.div
                animate={{ rotateY: isFlipped ? 180 : 0 }}
                transition={{ duration: 0.6, type: 'spring', damping: 20 }}
                className="relative h-full w-full"
                style={{ transformStyle: 'preserve-3d' }}
              >
                {/* 앞면 */}
                <div
                  className="absolute inset-0 flex flex-col overflow-hidden rounded-3xl bg-white"
                  style={{
                    backfaceVisibility: 'hidden',
                    boxShadow: 'var(--shadow-card)',
                    border: '1px solid var(--color-hanji-200)',
                  }}
                >
                  {/* 사진 영역 */}
                  <div
                    className="relative flex flex-1 items-center justify-center text-9xl"
                    style={{ background: 'linear-gradient(135deg, var(--color-celadon-200) 0%, var(--color-celadon-100) 100%)' }}
                  >
                    {card.image}
                    <div
                      className="absolute right-4 top-4 flex items-center gap-1 rounded-full px-2.5 py-1 text-xs font-semibold text-white"
                      style={{ backgroundColor: 'var(--color-celadon-600)' }}
                    >
                      <svg width="11" height="11" viewBox="0 0 24 24" fill="none">
                        <path d="M5 12l5 5L19 7" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                      Verified Face
                    </div>
                  </div>
                  <div className="p-5">
                    <h2
                      className="text-2xl font-bold"
                      style={{ fontFamily: 'var(--font-serif)', color: 'var(--color-ink)' }}
                    >
                      {card.nickname}
                    </h2>
                    <p className="mb-4 mt-1 text-sm" style={{ color: 'var(--color-celadon-500)' }}>
                      {card.ageRange} · {card.region}
                    </p>
                    <div className="flex flex-wrap gap-2">
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
                </div>

                {/* 뒷면 */}
                <div
                  className="absolute inset-0 flex flex-col rounded-3xl p-6 bg-white"
                  style={{
                    backfaceVisibility: 'hidden',
                    transform: 'rotateY(180deg)',
                    boxShadow: 'var(--shadow-card)',
                    border: '1px solid var(--color-hanji-200)',
                  }}
                >
                  <div className="mb-4">
                    <p className="text-xs font-semibold" style={{ color: 'var(--color-celadon-500)' }}>
                      LEVEL 1 — 검증 사실
                    </p>
                    <h3
                      className="text-lg font-bold"
                      style={{ fontFamily: 'var(--font-serif)', color: 'var(--color-ink)' }}
                    >
                      공개된 검증 배지
                    </h3>
                    <p className="mt-1 text-xs" style={{ color: 'var(--color-celadon-400)' }}>
                      원본 정보는 공개되지 않습니다. 검증 사실만 확인됩니다.
                    </p>
                  </div>
                  <div className="flex-1 space-y-3">
                    {card.level1Badges.map((badge, i) => (
                      <motion.div
                        key={badge}
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: isFlipped ? 1 : 0, x: isFlipped ? 0 : 20 }}
                        transition={{ delay: isFlipped ? i * 0.08 : 0 }}
                        className="flex items-center gap-3 rounded-2xl p-3"
                        style={{
                          backgroundColor: 'var(--color-celadon-50)',
                          border: '1px solid var(--color-celadon-200)',
                        }}
                      >
                        <span
                          className="flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full text-white"
                          style={{ backgroundColor: 'var(--color-celadon-500)' }}
                        >
                          <svg width="11" height="11" viewBox="0 0 24 24" fill="none">
                            <path d="M5 12l5 5L19 7" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
                          </svg>
                        </span>
                        <span className="text-sm font-semibold" style={{ color: 'var(--color-celadon-700)' }}>
                          {badge}
                        </span>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </motion.div>
            </div>

            {/* 면 표시 도트 */}
            <div className="mt-4 flex justify-center gap-2">
              <div
                className="h-2 w-2 rounded-full transition-colors"
                style={{ backgroundColor: !isFlipped ? 'var(--color-celadon-500)' : 'var(--color-celadon-200)' }}
              />
              <div
                className="h-2 w-2 rounded-full transition-colors"
                style={{ backgroundColor: isFlipped ? 'var(--color-celadon-500)' : 'var(--color-celadon-200)' }}
              />
            </div>
          </div>

          {/* 하단 액션 버튼 */}
          <div className="flex items-center justify-center gap-5 px-6 pb-10 pt-2">
            <button
              onClick={handleReject}
              className="flex h-16 w-16 items-center justify-center rounded-full bg-white active:scale-95 transition-transform"
              style={{
                border: '1px solid var(--color-hanji-200)',
                color: 'var(--color-celadon-400)',
                boxShadow: 'var(--shadow-soft)',
              }}
              aria-label="거절"
            >
              <X size={26} />
            </button>
            <button
              onClick={handleSuperLike}
              className="flex h-16 w-16 items-center justify-center rounded-full text-white active:scale-95 transition-transform"
              style={{ backgroundColor: 'var(--color-gold)', boxShadow: 'var(--shadow-card)' }}
              aria-label="Super Like"
            >
              <Star size={26} fill="white" />
            </button>
            <button
              onClick={handleLike}
              className="flex h-20 w-20 items-center justify-center rounded-full text-white active:scale-95 transition-transform"
              style={{ backgroundColor: 'var(--color-celadon-500)', boxShadow: 'var(--shadow-card)' }}
              aria-label="관심"
            >
              <Heart size={32} fill="white" />
            </button>
          </div>
        </div>
      </PageTransition>

      <Toast
        message={toast.message}
        type={toast.type}
        isVisible={toast.visible}
        onHide={() => setToast((t) => ({ ...t, visible: false }))}
      />
    </AppShell>
  )
}
