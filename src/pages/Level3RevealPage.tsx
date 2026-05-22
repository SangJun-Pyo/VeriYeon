import { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ShieldAlert, Link } from 'lucide-react'
import { AppShell } from '../components/layout/AppShell'
import { Header } from '../components/layout/Header'
import { Toast } from '../components/common/Toast'
import StatusBar from '../components/StatusBar'
import PageTransition from '../components/PageTransition'
import { useAppStore } from '../store/useAppStore'
import { createMockHash } from '../services/chainService'

const revealItems = [
  { label: '실명', value: '김지연', sensitive: true },
  { label: '상세 재직 정보', value: 'OO회사 개발팀', sensitive: false },
  { label: '상세 학력 정보', value: 'OO대학교 컴퓨터공학과', sensitive: false },
  { label: '혼인상태 검증', value: '미혼 검증 완료', sensitive: false },
  { label: '연락처', value: '010-XXXX-XXXX', sensitive: true },
  { label: 'Verified Face 최근 인증', value: '2026-05-22', sensitive: false },
]

export function Level3RevealPage() {
  const { matchId } = useParams<{ matchId: string }>()
  const navigate = useNavigate()
  const addChainLog = useAppStore((s) => s.addChainLog)
  const [loading, setLoading] = useState(false)
  const [toast, setToast] = useState({ visible: false, message: '' })

  const handleConsent = async () => {
    setLoading(true)
    await new Promise((r) => setTimeout(r, 1000))
    const log = createMockHash('LEVEL_3_DISCLOSURE')
    addChainLog(log)
    setToast({ visible: true, message: `Level 3 공개 완료: ${log.txHash.substring(0, 18)}...` })
    setTimeout(() => navigate(`/appointment/${matchId}`), 2000)
    setLoading(false)
  }

  return (
    <AppShell>
      <PageTransition>
        <div className="bg-hanji-texture flex flex-1 flex-col">
          <StatusBar />
          <Header title="상세 정보 공개" showBack />

          <div className="no-scrollbar flex-1 overflow-y-auto px-6 pb-6">
            {/* 경고 배너 */}
            <motion.div
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-6 flex gap-3 rounded-2xl p-4"
              style={{ backgroundColor: '#FEF3C7', border: '1.5px solid #D97706' }}
            >
              <ShieldAlert size={18} style={{ color: '#D97706', marginTop: 1, flexShrink: 0 }} />
              <div>
                <p className="mb-0.5 text-sm font-bold" style={{ color: '#92400E' }}>Level 3 — 상세 정보 공개</p>
                <p className="text-sm leading-relaxed" style={{ color: '#92400E', opacity: 0.85 }}>
                  만남 전 상세 정보를 서로 확인하시겠습니까?
                  양측이 모두 동의해야 동시에 공개됩니다.
                </p>
              </div>
            </motion.div>

            {/* 공개 항목 */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.1 }}
              className="mb-6 overflow-hidden rounded-3xl"
              style={{ border: '1px solid var(--color-hanji-200)', backgroundColor: 'white' }}
            >
              <div className="px-4 py-3" style={{ backgroundColor: 'var(--color-hanji-100)' }}>
                <p className="text-sm font-bold" style={{ color: 'var(--color-ink)' }}>공개 예정 항목</p>
              </div>
              {revealItems.map((item, i) => (
                <motion.div
                  key={item.label}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.15 + i * 0.06 }}
                  className="flex items-center justify-between px-4 py-3.5"
                  style={{ borderTop: i > 0 ? '1px solid var(--color-hanji-100)' : undefined }}
                >
                  <div className="flex items-center gap-2">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" style={{ color: 'var(--color-celadon-400)' }}>
                      <path d="M5 12l5 5L19 7" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                    <span className="text-sm" style={{ color: 'var(--color-celadon-500)' }}>{item.label}</span>
                  </div>
                  <span
                    className="text-sm font-semibold"
                    style={{ color: item.sensitive ? 'var(--color-cinnabar)' : 'var(--color-ink)' }}
                  >
                    {item.value}
                  </span>
                </motion.div>
              ))}
            </motion.div>

            {/* 체인 안내 */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="flex gap-3 rounded-2xl p-4"
              style={{ backgroundColor: 'var(--color-hanji-100)', border: '1px solid var(--color-hanji-200)' }}
            >
              <Link size={16} style={{ color: 'var(--color-gold)', marginTop: 2 }} />
              <div>
                <p className="mb-0.5 text-xs font-semibold" style={{ color: 'var(--color-gold)' }}>블록체인 기록</p>
                <p className="text-xs leading-relaxed" style={{ color: 'var(--color-celadon-500)' }}>
                  공개 동의 사실만 체인에 기록됩니다.
                  실명·연락처 원본은 체인에 저장되지 않습니다.
                  열람권은 만남 종료 시 자동 만료됩니다.
                </p>
              </div>
            </motion.div>
          </div>

          {/* 하단 버튼 */}
          <div className="space-y-2 px-6 pb-10 pt-2">
            <button
              className="btn-primary"
              onClick={handleConsent}
              disabled={loading}
              style={{ opacity: loading ? 0.7 : 1 }}
            >
              {loading ? '처리 중...' : '동의하고 공개'}
            </button>
            <button className="btn-ghost" onClick={() => navigate(-1)}>취소</button>
          </div>
        </div>
      </PageTransition>

      <Toast
        message={toast.message}
        isVisible={toast.visible}
        onHide={() => setToast((t) => ({ ...t, visible: false }))}
      />
    </AppShell>
  )
}
