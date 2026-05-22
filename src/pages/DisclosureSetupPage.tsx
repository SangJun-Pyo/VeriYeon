import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { AppShell } from '../components/layout/AppShell'
import { Header } from '../components/layout/Header'
import StatusBar from '../components/StatusBar'
import PageTransition from '../components/PageTransition'
import { Modal } from '../components/common/Modal'
import { useAppStore } from '../store/useAppStore'
import type { DisclosurePolicy } from '../types'

const fields: {
  key: keyof Omit<DisclosurePolicy, 'photo'>
  label: string
  levels: { value: DisclosurePolicy[keyof Omit<DisclosurePolicy, 'photo'>]; label: string; desc: string }[]
}[] = [
  {
    key: 'education',
    label: '학력',
    levels: [
      { value: 'level1', label: 'Level 1', desc: '학사 이상 충족' },
      { value: 'level2', label: 'Level 2', desc: '국내 4년제 졸업' },
      { value: 'level3', label: 'Level 3', desc: 'OO대학교 컴퓨터공학과' },
    ],
  },
  {
    key: 'employment',
    label: '직장',
    levels: [
      { value: 'level1', label: 'Level 1', desc: '재직 상태 검증 완료' },
      { value: 'level2', label: 'Level 2', desc: 'IT 업계 재직' },
      { value: 'level3', label: 'Level 3', desc: 'OO회사 개발팀' },
    ],
  },
  {
    key: 'income',
    label: '소득',
    levels: [
      { value: 'level1', label: 'Level 1', desc: '설정 소득 기준 충족' },
      { value: 'level2', label: 'Level 2', desc: '소득 5~7천 구간' },
      { value: 'level3', label: 'Level 3', desc: '연소득 6,500만 원' },
    ],
  },
  {
    key: 'marital',
    label: '혼인상태',
    levels: [
      { value: 'level1', label: 'Level 1', desc: '결혼 가능 상태 충족' },
      { value: 'level2', label: 'Level 2', desc: '혼인상태 검증 완료' },
      { value: 'level3', label: 'Level 3', desc: '미혼 검증 완료 (법원 기준)' },
    ],
  },
]

export function DisclosureSetupPage() {
  const navigate = useNavigate()
  const setDisclosurePolicy = useAppStore((s) => s.setDisclosurePolicy)
  const [policy, setPolicy] = useState<Omit<DisclosurePolicy, 'photo'>>({
    education: 'level1',
    employment: 'level1',
    income: 'level1',
    marital: 'level1',
  })
  const [showModal, setShowModal] = useState(false)
  const [expandedKey, setExpandedKey] = useState<string | null>(null)

  const handleSave = () => setShowModal(true)

  const handleConsent = () => {
    setDisclosurePolicy({ ...policy, photo: 'verified_only' })
    setShowModal(false)
    navigate('/profile')
  }

  return (
    <AppShell>
      <PageTransition>
        <div className="bg-hanji-texture flex flex-1 flex-col">
          <StatusBar />
          <Header title="내 정보 공개 방식 설정" showBack />

          <div className="no-scrollbar flex-1 overflow-y-auto px-6 pb-6">
            <p className="mb-6 text-sm leading-relaxed" style={{ color: 'var(--color-celadon-500)' }}>
              상대에게 공개할 정보 수준을
              <br />항목별로 선택해주세요.
            </p>

            {/* Level 범례 */}
            <div className="mb-5 grid grid-cols-3 gap-2">
              {[
                { level: 'L1', desc: '검증 사실만', bg: 'var(--color-celadon-100)', fg: 'var(--color-celadon-600)' },
                { level: 'L2', desc: '범주형 정보', bg: 'var(--color-hanji-200)', fg: 'var(--color-ink)' },
                { level: 'L3', desc: '상세 정보', bg: '#fde8e2', fg: '#b03a2e' },
              ].map(({ level, desc, bg, fg }) => (
                <div
                  key={level}
                  className="rounded-xl p-2.5 text-center"
                  style={{ backgroundColor: bg }}
                >
                  <p className="text-sm font-bold" style={{ color: fg }}>{level}</p>
                  <p className="text-xs" style={{ color: fg, opacity: 0.7 }}>{desc}</p>
                </div>
              ))}
            </div>

            {/* 항목 리스트 */}
            <div className="overflow-hidden rounded-3xl border" style={{ borderColor: 'var(--color-hanji-200)', backgroundColor: 'white', boxShadow: 'var(--shadow-soft)' }}>
              {fields.map((field, i) => {
                const isExpanded = expandedKey === field.key
                const currentLevel = field.levels.find((l) => l.value === policy[field.key])

                return (
                  <div key={field.key}>
                    {/* 헤더 행 */}
                    <motion.button
                      onClick={() => setExpandedKey(isExpanded ? null : field.key)}
                      initial={{ opacity: 0, x: 12 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.04 }}
                      className="flex w-full items-center justify-between px-5 py-4 text-left transition-colors active:bg-celadon-50"
                      style={{
                        borderTop: i !== 0 ? `1px solid var(--color-hanji-100)` : undefined,
                      }}
                    >
                      <span className="text-base" style={{ color: 'var(--color-ink)' }}>{field.label}</span>
                      <div className="flex items-center gap-2.5">
                        <span className="text-sm font-medium" style={{ color: 'var(--color-celadon-600)' }}>
                          {currentLevel?.label}
                        </span>
                        <svg
                          width="16" height="16" viewBox="0 0 24 24" fill="none"
                          style={{
                            color: 'var(--color-celadon-400)',
                            transform: isExpanded ? 'rotate(180deg)' : 'none',
                            transition: 'transform 0.2s',
                          }}
                        >
                          <path d="M6 9l6 6 6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                      </div>
                    </motion.button>

                    {/* 확장 옵션 */}
                    {isExpanded && (
                      <div className="px-5 pb-3" style={{ borderTop: `1px solid var(--color-hanji-100)` }}>
                        <div className="space-y-2 pt-3">
                          {field.levels.map((level) => {
                            const isSelected = policy[field.key] === level.value
                            return (
                              <button
                                key={level.value as string}
                                onClick={() => setPolicy((prev) => ({ ...prev, [field.key]: level.value }))}
                                className="flex w-full items-center justify-between rounded-2xl px-4 py-3 text-left transition-colors"
                                style={{
                                  backgroundColor: isSelected ? 'var(--color-celadon-50)' : 'var(--color-hanji-50)',
                                  border: `1.5px solid ${isSelected ? 'var(--color-celadon-400)' : 'var(--color-hanji-200)'}`,
                                }}
                              >
                                <div>
                                  <span
                                    className="mr-2 text-xs font-bold"
                                    style={{ color: isSelected ? 'var(--color-celadon-600)' : 'var(--color-celadon-300)' }}
                                  >
                                    {level.label}
                                  </span>
                                  <span className="text-sm" style={{ color: 'var(--color-ink)' }}>
                                    {level.desc}
                                  </span>
                                </div>
                                <span
                                  className="flex h-5 w-5 items-center justify-center rounded-full border-2 transition-colors"
                                  style={{
                                    borderColor: isSelected ? 'var(--color-celadon-500)' : 'var(--color-hanji-300)',
                                    backgroundColor: isSelected ? 'var(--color-celadon-500)' : 'transparent',
                                  }}
                                >
                                  {isSelected && (
                                    <svg width="10" height="10" viewBox="0 0 24 24" fill="none">
                                      <path d="M5 12l5 5L19 7" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
                                    </svg>
                                  )}
                                </span>
                              </button>
                            )
                          })}
                        </div>
                      </div>
                    )}
                  </div>
                )
              })}
            </div>

            <p className="mt-5 text-center text-xs leading-relaxed" style={{ color: 'var(--color-celadon-400)' }}>
              선택한 범위 내에서만 정보가 공개됩니다.
              <br />관계 단계가 높아질 때 단계적으로 공개됩니다.
            </p>
          </div>

          {/* 하단 버튼 */}
          <div className="px-6 pb-10 pt-2">
            <button className="btn-primary" onClick={handleSave}>
              저장하기
            </button>
          </div>
        </div>
      </PageTransition>

      {/* DID 동의 모달 */}
      <Modal isOpen={showModal} onClose={() => setShowModal(false)} title="DID 동의 확인">
        <div className="space-y-4 mt-2">
          <p className="text-sm leading-relaxed" style={{ color: 'var(--color-ink)', opacity: 0.7 }}>
            아래 항목에 대한 공개 정책을 DID 서명으로 확정합니다.
          </p>
          <div className="space-y-2">
            {fields.map((f) => (
              <div
                key={f.key}
                className="flex items-center justify-between py-2"
                style={{ borderBottom: `1px solid var(--color-hanji-200)` }}
              >
                <span className="text-sm font-medium" style={{ color: 'var(--color-ink)' }}>{f.label}</span>
                <span className="text-sm" style={{ color: 'var(--color-celadon-600)' }}>
                  {f.levels.find((l) => l.value === policy[f.key])?.desc}
                </span>
              </div>
            ))}
          </div>
          <button className="btn-primary mt-4" onClick={handleConsent}>
            동의하고 계속하기
          </button>
        </div>
      </Modal>
    </AppShell>
  )
}
