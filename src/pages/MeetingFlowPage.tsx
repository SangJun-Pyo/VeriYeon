import { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { MessageSquare, Calendar, MapPin, Lock } from 'lucide-react'
import { AppShell } from '../components/layout/AppShell'
import { Header } from '../components/layout/Header'
import StatusBar from '../components/StatusBar'
import PageTransition from '../components/PageTransition'

const questions = [
  '주말에는 보통 어떤 시간을 보내나요?',
  '결혼 후 가장 중요하게 생각하는 가치는 무엇인가요?',
  '처음 만남에서는 어떤 분위기가 편한가요?',
]

const timeOptions = ['토요일 오후', '일요일 점심', '평일 저녁']
const placeOptions = ['☕ 카페', '🥞 브런치', '🖼️ 전시', '🍷 와인바']

export function MeetingFlowPage() {
  const { matchId } = useParams<{ matchId: string }>()
  const navigate = useNavigate()
  const [step, setStep] = useState(1)
  const [selectedQuestion, setSelectedQuestion] = useState('')
  const [answer, setAnswer] = useState('')
  const [selectedTime, setSelectedTime] = useState('')
  const [selectedPlace, setSelectedPlace] = useState('')

  const StepBar = () => (
    <div className="mb-6 flex items-center gap-2">
      {[1, 2, 3, 4, 5].map((s) => (
        <div
          key={s}
          className="h-1.5 flex-1 rounded-full transition-all duration-300"
          style={{ backgroundColor: s <= step ? 'var(--color-celadon-500)' : 'var(--color-hanji-200)' }}
        />
      ))}
    </div>
  )

  return (
    <AppShell>
      <PageTransition>
        <div className="bg-hanji-texture flex flex-1 flex-col">
          <StatusBar />
          <Header title="만남 준비" showBack />

          <div className="no-scrollbar flex-1 overflow-y-auto px-6 pb-6">
            <StepBar />

            <AnimatePresence mode="wait">
              {step === 1 && (
                <motion.div
                  key="step1"
                  initial={{ opacity: 0, x: 30 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -30 }}
                >
                  <div className="mb-2 flex items-center gap-2">
                    <MessageSquare size={18} style={{ color: 'var(--color-celadon-500)' }} />
                    <p className="text-xs font-semibold" style={{ color: 'var(--color-celadon-500)' }}>STEP 1 / 5</p>
                  </div>
                  <h2 className="mb-2 text-xl font-bold" style={{ fontFamily: 'var(--font-serif)', color: 'var(--color-ink)' }}>
                    전달할 질문을 선택하세요
                  </h2>
                  <p className="mb-6 text-sm" style={{ color: 'var(--color-celadon-500)' }}>
                    선택한 질문과 답변이 상대방에게 전달됩니다.
                  </p>
                  <div className="mb-6 space-y-3">
                    {questions.map((q) => (
                      <button
                        key={q}
                        onClick={() => setSelectedQuestion(q)}
                        className="w-full rounded-2xl p-4 text-left transition-all"
                        style={{
                          backgroundColor: selectedQuestion === q ? 'var(--color-celadon-50)' : 'white',
                          border: `1.5px solid ${selectedQuestion === q ? 'var(--color-celadon-400)' : 'var(--color-hanji-200)'}`,
                        }}
                      >
                        <p className="text-sm font-medium" style={{ color: 'var(--color-ink)' }}>{q}</p>
                      </button>
                    ))}
                  </div>
                  {selectedQuestion && (
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                      <p className="mb-2 text-sm font-bold" style={{ color: 'var(--color-ink)' }}>나의 답변</p>
                      <textarea
                        value={answer}
                        onChange={(e) => setAnswer(e.target.value)}
                        placeholder="한 줄로 간단히 답변해주세요..."
                        rows={3}
                        maxLength={80}
                        className="field resize-none"
                      />
                    </motion.div>
                  )}
                </motion.div>
              )}

              {step === 2 && (
                <motion.div
                  key="step2"
                  initial={{ opacity: 0, x: 30 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -30 }}
                >
                  <div className="mb-2 flex items-center gap-2">
                    <Calendar size={18} style={{ color: 'var(--color-celadon-500)' }} />
                    <p className="text-xs font-semibold" style={{ color: 'var(--color-celadon-500)' }}>STEP 2 / 5</p>
                  </div>
                  <h2 className="mb-4 text-xl font-bold" style={{ fontFamily: 'var(--font-serif)', color: 'var(--color-ink)' }}>
                    만남 일정을 조율하시겠습니까?
                  </h2>
                  <p className="text-sm leading-relaxed" style={{ color: 'var(--color-celadon-500)' }}>
                    상대방과 일정을 조율하면 만남으로 이어질 수 있습니다.
                    양측 모두 동의 시 최종 확정됩니다.
                  </p>
                </motion.div>
              )}

              {step === 3 && (
                <motion.div
                  key="step3"
                  initial={{ opacity: 0, x: 30 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -30 }}
                >
                  <div className="mb-2 flex items-center gap-2">
                    <Calendar size={18} style={{ color: 'var(--color-celadon-500)' }} />
                    <p className="text-xs font-semibold" style={{ color: 'var(--color-celadon-500)' }}>STEP 3 / 5</p>
                  </div>
                  <h2 className="mb-2 text-xl font-bold" style={{ fontFamily: 'var(--font-serif)', color: 'var(--color-ink)' }}>
                    선호 시간을 선택하세요
                  </h2>
                  <div className="mt-4 space-y-3">
                    {timeOptions.map((t) => (
                      <button
                        key={t}
                        onClick={() => setSelectedTime(t)}
                        className="w-full rounded-2xl p-4 text-left transition-all"
                        style={{
                          backgroundColor: selectedTime === t ? 'var(--color-celadon-50)' : 'white',
                          border: `1.5px solid ${selectedTime === t ? 'var(--color-celadon-400)' : 'var(--color-hanji-200)'}`,
                        }}
                      >
                        <p className="text-base font-semibold" style={{ color: 'var(--color-ink)' }}>{t}</p>
                      </button>
                    ))}
                  </div>
                </motion.div>
              )}

              {step === 4 && (
                <motion.div
                  key="step4"
                  initial={{ opacity: 0, x: 30 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -30 }}
                >
                  <div className="mb-2 flex items-center gap-2">
                    <MapPin size={18} style={{ color: 'var(--color-celadon-500)' }} />
                    <p className="text-xs font-semibold" style={{ color: 'var(--color-celadon-500)' }}>STEP 4 / 5</p>
                  </div>
                  <h2 className="mb-2 text-xl font-bold" style={{ fontFamily: 'var(--font-serif)', color: 'var(--color-ink)' }}>
                    선호 장소를 선택하세요
                  </h2>
                  <div className="mt-4 grid grid-cols-2 gap-3">
                    {placeOptions.map((p) => (
                      <button
                        key={p}
                        onClick={() => setSelectedPlace(p)}
                        className="rounded-2xl p-5 text-center transition-all"
                        style={{
                          backgroundColor: selectedPlace === p ? 'var(--color-celadon-50)' : 'white',
                          border: `1.5px solid ${selectedPlace === p ? 'var(--color-celadon-400)' : 'var(--color-hanji-200)'}`,
                        }}
                      >
                        <p className="mb-1 text-2xl">{p.split(' ')[0]}</p>
                        <p className="text-sm font-semibold" style={{ color: 'var(--color-ink)' }}>{p.split(' ')[1]}</p>
                      </button>
                    ))}
                  </div>
                </motion.div>
              )}

              {step === 5 && (
                <motion.div
                  key="step5"
                  initial={{ opacity: 0, x: 30 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -30 }}
                >
                  <div className="mb-2 flex items-center gap-2">
                    <Lock size={18} style={{ color: 'var(--color-gold)' }} />
                    <p className="text-xs font-semibold" style={{ color: 'var(--color-gold)' }}>STEP 5 / 5</p>
                  </div>
                  <h2 className="mb-4 text-xl font-bold" style={{ fontFamily: 'var(--font-serif)', color: 'var(--color-ink)' }}>
                    만남 확정을 위해 상세 정보 공개가 필요합니다
                  </h2>
                  <div
                    className="mb-4 rounded-2xl p-4"
                    style={{ backgroundColor: 'white', border: '1px solid var(--color-hanji-200)' }}
                  >
                    <div className="flex gap-3">
                      <div
                        className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl text-2xl"
                        style={{ backgroundColor: 'var(--color-hanji-100)' }}
                      >
                        📅
                      </div>
                      <div>
                        <p className="text-sm font-bold" style={{ color: 'var(--color-ink)' }}>{selectedTime}</p>
                        <p className="text-sm" style={{ color: 'var(--color-celadon-500)' }}>{selectedPlace}</p>
                      </div>
                    </div>
                  </div>
                  <div
                    className="rounded-2xl p-4"
                    style={{ backgroundColor: 'var(--color-celadon-50)', border: `1.5px solid var(--color-celadon-300)` }}
                  >
                    <p className="mb-1 text-sm font-semibold" style={{ color: 'var(--color-celadon-700)' }}>
                      양측 상세 VP 공개가 필요합니다
                    </p>
                    <p className="text-sm" style={{ color: 'var(--color-celadon-600)' }}>
                      만남 확정 전 실명, 상세 재직·학력 정보, 연락처를 서로 공개합니다.
                      양측이 모두 동의해야 동시에 공개됩니다.
                    </p>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* 하단 버튼 */}
          <div className="space-y-2 px-6 pb-10 pt-2">
            {step === 1 && (
              <button
                className="btn-primary"
                onClick={() => setStep(2)}
                disabled={!selectedQuestion || !answer.trim()}
                style={{ opacity: !selectedQuestion || !answer.trim() ? 0.5 : 1 }}
              >
                다음
              </button>
            )}
            {step === 2 && (
              <>
                <button className="btn-primary" onClick={() => setStep(3)}>조율 시작</button>
                <button className="btn-ghost" onClick={() => navigate('/home')}>나중에</button>
              </>
            )}
            {step === 3 && (
              <button
                className="btn-primary"
                onClick={() => setStep(4)}
                disabled={!selectedTime}
                style={{ opacity: !selectedTime ? 0.5 : 1 }}
              >
                다음
              </button>
            )}
            {step === 4 && (
              <button
                className="btn-primary"
                onClick={() => setStep(5)}
                disabled={!selectedPlace}
                style={{ opacity: !selectedPlace ? 0.5 : 1 }}
              >
                다음
              </button>
            )}
            {step === 5 && (
              <button className="btn-primary" onClick={() => navigate(`/level3/${matchId}`)}>
                Level 3 공개로 이동
              </button>
            )}
          </div>
        </div>
      </PageTransition>
    </AppShell>
  )
}
