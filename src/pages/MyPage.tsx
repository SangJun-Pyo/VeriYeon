import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ChevronRight, Settings, LogOut } from 'lucide-react'
import { AppShell } from '../components/layout/AppShell'
import { Header } from '../components/layout/Header'
import { BottomNav } from '../components/layout/BottomNav'
import StatusBar from '../components/StatusBar'
import PageTransition from '../components/PageTransition'
import { SealMark } from '../components/CraneMark'
import { useAppStore } from '../store/useAppStore'

export function MyPage() {
  const navigate = useNavigate()
  const { myProfile, did, logout, chainLogs } = useAppStore()

  const handleLogout = () => {
    logout()
    navigate('/')
  }

  const menuItems = [
    { label: '공개 정책 변경', path: '/disclosure', icon: <Settings size={18} /> },
    { label: '내 VC 지갑', path: '/wallet', icon: <SealMark className="h-5 w-5" /> },
  ]

  return (
    <AppShell showBottomNav>
      <PageTransition>
        <div className="bg-hanji-texture flex flex-1 flex-col">
          <StatusBar />
          <Header title="마이" showBack={false} />

          <div className="no-scrollbar flex-1 overflow-y-auto px-6 pb-10">
            {/* 프로필 헤더 */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex flex-col items-center py-4"
            >
              <div
                className="flex h-16 w-16 items-center justify-center rounded-full text-4xl"
                style={{ backgroundColor: 'var(--color-celadon-100)' }}
              >
                {myProfile?.profileImage ?? '🌱'}
              </div>
              <p
                className="mt-3 text-2xl font-bold"
                style={{ fontFamily: 'var(--font-serif)', color: 'var(--color-ink)' }}
              >
                {myProfile?.nickname ?? '—'}
              </p>
              {myProfile?.mbti && (
                <p className="mt-1 text-sm" style={{ color: 'var(--color-celadon-500)' }}>{myProfile.mbti}</p>
              )}
              <div className="mt-2 flex gap-2">
                <span
                  className="rounded-full px-2.5 py-1 text-xs font-semibold"
                  style={{ backgroundColor: 'var(--color-celadon-100)', color: 'var(--color-celadon-600)' }}
                >
                  본인확인
                </span>
                <span
                  className="rounded-full px-2.5 py-1 text-xs font-semibold"
                  style={{ backgroundColor: 'var(--color-celadon-100)', color: 'var(--color-celadon-600)' }}
                >
                  실사 인증
                </span>
              </div>
            </motion.div>

            {/* DID */}
            {did && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.1 }}
                className="card mb-4"
              >
                <p className="mb-1 text-xs" style={{ color: 'var(--color-celadon-400)' }}>내 DID</p>
                <p className="break-all font-mono text-xs" style={{ color: 'var(--color-celadon-600)' }}>
                  {did.length > 40 ? `${did.substring(0, 40)}...` : did}
                </p>
              </motion.div>
            )}

            {/* 프로필 정보 */}
            {myProfile && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.1 }}
                className="card mb-4"
              >
                <div className="grid grid-cols-2 gap-3">
                  {[
                    { label: '결혼 희망', value: myProfile.marriageTimeline },
                    { label: '지역', value: myProfile.region },
                    { label: '취미', value: myProfile.hobbies.slice(0, 2).join(', ') },
                    { label: '가치관', value: myProfile.values.slice(0, 2).join(', ') || '—' },
                  ].map(({ label, value }) => (
                    <div key={label}>
                      <p className="mb-0.5 text-xs" style={{ color: 'var(--color-celadon-400)' }}>{label}</p>
                      <p className="text-sm font-semibold" style={{ color: 'var(--color-ink)' }}>{value || '—'}</p>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}

            {/* 체인 로그 타임라인 */}
            {chainLogs.length > 0 && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
                className="card mb-4"
              >
                <p className="mb-3 text-sm font-bold" style={{ color: 'var(--color-ink)' }}>최근 체인 기록</p>
                <ul className="space-y-4">
                  {chainLogs.slice(0, 3).map((log, i) => (
                    <motion.li
                      key={log.id}
                      initial={{ opacity: 0, x: 12 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.2 + i * 0.06 }}
                      className="flex items-start gap-3"
                    >
                      <span
                        className="mt-0.5 flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full text-white"
                        style={{ backgroundColor: 'var(--color-celadon-500)' }}
                      >
                        <svg width="13" height="13" viewBox="0 0 24 24" fill="none">
                          <path d="M5 12l5 5L19 7" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                      </span>
                      <div className="flex-1">
                        <p className="text-sm font-semibold" style={{ color: 'var(--color-ink)' }}>{log.eventType}</p>
                        <p className="mt-0.5 font-mono text-[11px]" style={{ color: 'var(--color-celadon-300)' }}>
                          tx {log.txHash.substring(0, 28)}...
                        </p>
                      </div>
                    </motion.li>
                  ))}
                </ul>
              </motion.div>
            )}

            {/* 메뉴 */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.25 }}
              className="overflow-hidden rounded-3xl mb-6"
              style={{ border: '1px solid var(--color-hanji-200)', backgroundColor: 'white', boxShadow: 'var(--shadow-soft)' }}
            >
              {menuItems.map(({ label, path, icon }, i) => (
                <button
                  key={path}
                  onClick={() => navigate(path)}
                  className="flex w-full items-center justify-between px-5 py-4 transition-colors active:bg-celadon-50"
                  style={{
                    borderTop: i > 0 ? '1px solid var(--color-hanji-100)' : undefined,
                  }}
                >
                  <div className="flex items-center gap-3" style={{ color: 'var(--color-ink)' }}>
                    <span style={{ color: 'var(--color-celadon-500)' }}>{icon}</span>
                    <span className="text-sm font-medium">{label}</span>
                  </div>
                  <ChevronRight size={16} style={{ color: 'var(--color-celadon-300)' }} />
                </button>
              ))}
            </motion.div>

            {/* 로그아웃 */}
            <button className="btn-ghost" onClick={handleLogout}>
              <LogOut size={16} className="mr-2" />
              로그아웃
            </button>
          </div>
        </div>
      </PageTransition>
      <BottomNav />
    </AppShell>
  )
}
