import { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Link } from 'lucide-react'
import { AppShell } from '../components/layout/AppShell'
import { Header } from '../components/layout/Header'
import { Toast } from '../components/common/Toast'
import StatusBar from '../components/StatusBar'
import PageTransition from '../components/PageTransition'
import { useAppStore } from '../store/useAppStore'
import { createMockHash } from '../services/chainService'

const disclosureItems = [
  { label: '학력', value: '국내 4년제 졸업' },
  { label: '직장', value: 'IT 업계 재직' },
  { label: '소득', value: '소득 5~7천 구간' },
  { label: '거주지', value: '서울권 거주' },
  { label: '혼인상태', value: '혼인상태 검증 완료' },
]

export function Level2ConsentPage() {
  const { matchId } = useParams<{ matchId: string }>()
  const navigate = useNavigate()
  const addChainLog = useAppStore((s) => s.addChainLog)
  const [loading, setLoading] = useState(false)
  const [toast, setToast] = useState({ visible: false, message: '' })

  const handleConsent = async () => {
    setLoading(true)
    await new Promise((r) => setTimeout(r, 1000))
    const log = createMockHash('LEVEL_2_CONSENT')
    addChainLog(log)
    setToast({ visible: true, message: `체인 기록 완료: ${log.txHash.substring(0, 20)}...` })
    setTimeout(() => navigate(`/meeting/${matchId}`), 2000)
    setLoading(false)
  }

  return (
    <AppShell>
      <PageTransition>
        <div className="bg-hanji-texture flex flex-1 flex-col">
          <StatusBar />
          <Header title="범주형 정보 공개" showBack />

          <div className="no-scrollbar flex-1 overflow-y-auto px-6 pb-6">
            <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="mb-6">
              <h2
                className="mb-2 text-xl font-bold"
                style={{ fontFamily: 'var(--font-serif)', color: 'var(--color-ink)' }}
              >
                범주형 정보를 서로 공개하시겠습니까?
              </h2>
              <p className="text-sm leading-relaxed" style={{ color: 'var(--color-celadon-500)' }}>
                Level 2 정보는 원본이 아닌 범주 형태로만 공개됩니다.
                양측의 동의 기록이 블록체인에 저장됩니다.
              </p>
            </motion.div>

            {/* 공개 항목 */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.15 }}
              className="mb-6 overflow-hidden rounded-3xl"
              style={{ border: `1.5px solid var(--color-celadon-300)`, backgroundColor: 'white' }}
            >
              <div className="px-4 py-3" style={{ backgroundColor: 'var(--color-celadon-50)' }}>
                <p className="text-sm font-bold" style={{ color: 'var(--color-celadon-700)' }}>공개 예정 항목</p>
              </div>
              <div style={{ borderColor: 'var(--color-hanji-200)' }}>
                {disclosureItems.map((item, i) => (
                  <motion.div
                    key={item.label}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.2 + i * 0.07 }}
                    className="flex items-center gap-3 px-4 py-3.5"
                    style={{ borderTop: i > 0 ? '1px solid var(--color-hanji-100)' : undefined }}
                  >
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" style={{ color: 'var(--color-celadon-500)', flexShrink: 0 }}>
                      <path d="M5 12l5 5L19 7" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                    <div className="flex flex-1 justify-between">
                      <span className="text-sm font-medium" style={{ color: 'var(--color-celadon-500)' }}>{item.label}</span>
                      <span className="text-sm font-semibold" style={{ color: 'var(--color-ink)' }}>{item.value}</span>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* 체인 안내 */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="flex gap-3 rounded-2xl p-4"
              style={{ backgroundColor: 'var(--color-hanji-100)', border: '1px solid var(--color-hanji-200)' }}
            >
              <Link size={16} style={{ color: 'var(--color-gold)', marginTop: 2, flexShrink: 0 }} />
              <div>
                <p className="mb-0.5 text-xs font-semibold" style={{ color: 'var(--color-gold)' }}>블록체인 기록</p>
                <p className="text-xs leading-relaxed" style={{ color: 'var(--color-celadon-500)' }}>
                  동의 사실과 해시값만 OmniOne Chain에 기록됩니다.
                  원본 정보는 절대 체인에 저장되지 않습니다.
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
            <button className="btn-ghost" onClick={() => navigate('/home')}>
              나중에
            </button>
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
