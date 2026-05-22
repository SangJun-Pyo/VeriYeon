import { useParams, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Calendar, MapPin, Clock, AlertTriangle } from 'lucide-react'
import { AppShell } from '../components/layout/AppShell'
import { Header } from '../components/layout/Header'
import { BottomNav } from '../components/layout/BottomNav'
import StatusBar from '../components/StatusBar'
import PageTransition from '../components/PageTransition'
import { allMockCards } from '../data/mockCards'

export function AppointmentPage() {
  const { matchId } = useParams<{ matchId: string }>()
  const navigate = useNavigate()
  const card = allMockCards.find((c) => c.id === matchId)

  return (
    <AppShell showBottomNav>
      <PageTransition>
        <div className="bg-hanji-texture flex flex-1 flex-col">
          <StatusBar />
          <Header title="만남 일정" showBack />

          <div className="no-scrollbar flex-1 overflow-y-auto px-6 pb-8">
            {/* 매칭 상대 */}
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-6 flex items-center gap-4 rounded-2xl bg-white p-4"
              style={{ border: '1px solid var(--color-hanji-200)', boxShadow: 'var(--shadow-soft)' }}
            >
              <div
                className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl text-3xl"
                style={{ backgroundColor: 'var(--color-celadon-100)' }}
              >
                {card?.image ?? '🌸'}
              </div>
              <div>
                <p
                  className="text-lg font-bold"
                  style={{ fontFamily: 'var(--font-serif)', color: 'var(--color-ink)' }}
                >
                  {card?.nickname ?? '상대방'}
                </p>
                <p className="text-sm" style={{ color: 'var(--color-celadon-500)' }}>
                  {card?.ageRange} · {card?.region}
                </p>
                <span
                  className="mt-1 inline-block rounded-full px-2.5 py-0.5 text-xs font-semibold"
                  style={{ backgroundColor: 'var(--color-celadon-100)', color: 'var(--color-celadon-600)' }}
                >
                  Level 3 공개 완료
                </span>
              </div>
            </motion.div>

            {/* 확정 일정 카드 */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.1 }}
              className="mb-4 rounded-2xl p-4 text-white"
              style={{
                background: 'linear-gradient(135deg, var(--color-celadon-700) 0%, var(--color-celadon-500) 100%)',
              }}
            >
              <p className="mb-3 text-xs font-medium opacity-70">확정된 만남 일정</p>
              <div className="mb-3 flex items-center gap-3">
                <Calendar size={18} />
                <div>
                  <p className="text-sm font-medium opacity-70">일정</p>
                  <p className="text-base font-bold">토요일 오후</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <MapPin size={18} />
                <div>
                  <p className="text-sm font-medium opacity-70">장소</p>
                  <p className="text-base font-bold">☕ 카페 (상호 조율 예정)</p>
                </div>
              </div>
            </motion.div>

            {/* 공개된 상세 정보 */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="mb-4 overflow-hidden rounded-3xl"
              style={{ border: '1px solid var(--color-hanji-200)', backgroundColor: 'white' }}
            >
              <div className="px-4 py-3" style={{ backgroundColor: 'var(--color-hanji-100)' }}>
                <p className="text-sm font-bold" style={{ color: 'var(--color-ink)' }}>공개된 상세 정보</p>
              </div>
              {[
                { label: '실명', value: '김지연' },
                { label: '재직', value: 'OO회사 개발팀' },
                { label: '학력', value: 'OO대학교 컴퓨터공학과' },
                { label: '혼인상태', value: '미혼 검증 완료' },
                { label: '연락처', value: '010-XXXX-XXXX' },
              ].map((item, i) => (
                <div
                  key={item.label}
                  className="flex items-center justify-between px-4 py-3"
                  style={{ borderTop: i > 0 ? '1px solid var(--color-hanji-100)' : undefined }}
                >
                  <div className="flex items-center gap-2">
                    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" style={{ color: 'var(--color-celadon-400)' }}>
                      <path d="M5 12l5 5L19 7" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                    <span className="text-sm" style={{ color: 'var(--color-celadon-500)' }}>{item.label}</span>
                  </div>
                  <span className="text-sm font-semibold" style={{ color: 'var(--color-ink)' }}>{item.value}</span>
                </div>
              ))}
            </motion.div>

            {/* 만료 안내 */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.35 }}
              className="mb-6 flex gap-3 rounded-2xl p-4"
              style={{ backgroundColor: '#FEF3C7', border: '1px solid #D97706' }}
            >
              <Clock size={16} style={{ color: '#D97706', marginTop: 2 }} />
              <div>
                <p className="mb-0.5 text-xs font-semibold" style={{ color: '#92400E' }}>열람권 만료 예정</p>
                <p className="text-xs" style={{ color: '#92400E', opacity: 0.8 }}>
                  만남 종료 24시간 후 상세 정보 열람권이 자동 만료됩니다.
                </p>
              </div>
            </motion.div>

            {/* 액션 버튼 */}
            <div className="space-y-2">
              <button className="btn-ghost" onClick={() => {}}>일정 변경 요청</button>
              <button className="btn-ghost" onClick={() => navigate('/home')}>만남 종료</button>
              <button
                className="flex w-full items-center justify-center gap-2 py-3 text-sm font-medium"
                style={{ color: 'var(--color-cinnabar)' }}
              >
                <AlertTriangle size={15} />
                신고하기
              </button>
            </div>
          </div>
        </div>
      </PageTransition>
      <BottomNav />
    </AppShell>
  )
}
