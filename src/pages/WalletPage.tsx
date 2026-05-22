import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { AppShell } from '../components/layout/AppShell'
import { Header } from '../components/layout/Header'
import { BottomNav } from '../components/layout/BottomNav'
import StatusBar from '../components/StatusBar'
import { SealMark } from '../components/CraneMark'
import { getMockVCs } from '../services/vcService'
import type { VerifiableCredential } from '../types'

export function WalletPage() {
  const navigate = useNavigate()
  const [vcs, setVcs] = useState<VerifiableCredential[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    getMockVCs().then((data) => {
      setVcs(data)
      setLoading(false)
    })
  }, [])

  const verifiedCount = vcs.filter((v) => v.status === 'verified').length

  return (
    <AppShell showBottomNav>
      <div className="bg-hanji-texture flex flex-1 flex-col">
        <StatusBar />
        <Header title="VC 지갑" showBack={false} />

        <div className="no-scrollbar flex-1 overflow-y-auto px-6 pb-10">
          {/* 헤더 요약 */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-col items-center py-4"
          >
            <div
              className="flex h-16 w-16 items-center justify-center rounded-full"
              style={{
                backgroundColor: 'var(--color-celadon-100)',
                color: 'var(--color-celadon-600)',
              }}
            >
              <SealMark className="h-10 w-10" />
            </div>
            <p className="mt-3 text-sm" style={{ color: 'var(--color-celadon-400)' }}>검증 현황</p>
            <p
              className="text-3xl font-extrabold"
              style={{ fontFamily: 'var(--font-serif)', color: 'var(--color-celadon-600)' }}
            >
              {loading ? '—' : `${verifiedCount}/${vcs.length} 완료`}
            </p>
            <p className="mt-1 text-xs" style={{ color: 'var(--color-celadon-400)' }}>
              OmniOne Chain 검증 기반
            </p>
          </motion.div>

          {/* VC 타임라인 리스트 */}
          <div className="card mt-2">
            {loading ? (
              <ul className="space-y-4">
                {Array.from({ length: 6 }).map((_, i) => (
                  <li key={i} className="flex items-start gap-3 animate-pulse">
                    <div className="mt-0.5 h-6 w-6 rounded-full" style={{ backgroundColor: 'var(--color-celadon-100)' }} />
                    <div className="flex-1 space-y-1.5">
                      <div className="h-3 w-32 rounded" style={{ backgroundColor: 'var(--color-celadon-100)' }} />
                      <div className="h-2 w-24 rounded" style={{ backgroundColor: 'var(--color-hanji-200)' }} />
                    </div>
                  </li>
                ))}
              </ul>
            ) : (
              <ul className="space-y-4">
                {vcs.map((vc, i) => (
                  <motion.li
                    key={vc.id}
                    initial={{ opacity: 0, x: 12 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.1 + i * 0.06 }}
                    className="flex items-start gap-3"
                  >
                    {/* 상태 아이콘 */}
                    <span
                      className="mt-0.5 flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full text-white"
                      style={{
                        backgroundColor:
                          vc.status === 'verified'
                            ? 'var(--color-celadon-500)'
                            : 'var(--color-celadon-200)',
                      }}
                    >
                      {vc.status === 'verified' ? (
                        <svg width="13" height="13" viewBox="0 0 24 24" fill="none">
                          <path d="M5 12l5 5L19 7" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                      ) : (
                        <span className="text-[10px] font-bold" style={{ color: 'var(--color-celadon-500)' }}>!</span>
                      )}
                    </span>

                    <div className="flex-1">
                      <p className="text-sm font-semibold" style={{ color: 'var(--color-ink)' }}>
                        {vc.level1Label}
                      </p>
                      <p className="text-xs" style={{ color: 'var(--color-celadon-400)' }}>
                        {vc.level2Label}
                      </p>
                      {vc.expiresInDays !== undefined && (
                        <p className="mt-0.5 text-xs" style={{ color: 'var(--color-gold)' }}>
                          {vc.expiresInDays}일 후 만료
                        </p>
                      )}
                    </div>

                    {/* 상태 배지 */}
                    <span
                      className="shrink-0 rounded-full px-2 py-0.5 text-[11px] font-semibold"
                      style={{
                        backgroundColor:
                          vc.status === 'verified'
                            ? 'var(--color-celadon-100)'
                            : 'var(--color-hanji-200)',
                        color:
                          vc.status === 'verified'
                            ? 'var(--color-celadon-600)'
                            : 'var(--color-celadon-300)',
                      }}
                    >
                      {vc.status === 'verified' ? '검증됨' : vc.status === 'needs_refresh' ? '갱신 필요' : '대기'}
                    </span>
                  </motion.li>
                ))}
              </ul>
            )}
          </div>

          <p className="mt-5 text-center text-xs leading-relaxed" style={{ color: 'var(--color-celadon-400)' }}>
            모든 VC는 OmniOne Chain에 해시만 기록됩니다.
            <br />원본 정보는 기기에서 벗어나지 않습니다.
          </p>
        </div>

        {/* 하단 버튼 */}
        <div className="px-6 pb-10 pt-2">
          <button className="btn-primary" onClick={() => navigate('/disclosure')}>
            공개 정책 설정하기
          </button>
        </div>
      </div>
      <BottomNav />
    </AppShell>
  )
}
