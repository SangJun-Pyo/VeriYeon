import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { AppShell } from '../components/layout/AppShell'
import { Header } from '../components/layout/Header'
import StatusBar from '../components/StatusBar'
import PageTransition from '../components/PageTransition'
import { useAppStore } from '../store/useAppStore'

const mbtiOptions = ['INTJ','INTP','ENTJ','ENTP','INFJ','INFP','ENFJ','ENFP','ISTJ','ISFJ','ESTJ','ESFJ','ISTP','ISFP','ESTP','ESFP']
const hobbyOptions = ['독서','영화감상','요리','산책','운동','여행','음악','미술','사진','카페투어','게임','등산','볼링','수영','요가','클라이밍']
const valueOptions = ['신뢰','성장','배려','유머','안정','자유','창의성','가족','건강','경제적 안정']
const timelineOptions = ['1년 내', '1~2년 내', '2~3년 내', '3년 이후', '아직 모름']
const avatarOptions = ['🌱', '🌸', '🌿', '🌙', '📚', '🌊', '🎋', '🍃', '⛰️', '🌺']

function Labeled({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <label className="mb-2 block text-sm font-semibold" style={{ color: 'var(--color-ink)' }}>{label}</label>
      {children}
    </div>
  )
}

export function ProfileSetupPage() {
  const navigate = useNavigate()
  const setProfile = useAppStore((s) => s.setProfile)

  const [avatar, setAvatar] = useState('🌱')
  const [nickname, setNickname] = useState('')
  const [mbti, setMbti] = useState('')
  const [hobbies, setHobbies] = useState<string[]>([])
  const [intro, setIntro] = useState('')
  const [values, setValues] = useState<string[]>([])
  const [timeline, setTimeline] = useState('')

  const toggleHobby = (h: string) =>
    setHobbies((prev) => prev.includes(h) ? prev.filter((x) => x !== h) : [...prev, h])
  const toggleValue = (v: string) =>
    setValues((prev) => prev.includes(v) ? prev.filter((x) => x !== v) : [...prev, v])

  const isValid = nickname.trim() && mbti && hobbies.length > 0 && timeline

  const handleSave = () => {
    setProfile({
      id: 'user-me',
      nickname: nickname.trim(),
      ageRange: '30대 초반',
      region: '서울 강남권',
      profileImage: avatar,
      mbti,
      hobbies,
      intro: intro.trim(),
      values,
      marriageTimeline: timeline,
      verifiedFace: true,
    })
    navigate('/home')
  }

  return (
    <AppShell>
      <PageTransition>
        <div className="bg-hanji-texture flex flex-1 flex-col">
          <StatusBar />
          <Header title="프로필 설정" showBack />

          <div className="no-scrollbar flex-1 overflow-y-auto px-6 pb-6">
            <p className="mb-6 text-sm leading-relaxed" style={{ color: 'var(--color-celadon-500)' }}>
              신뢰 매칭을 위해
              <br />기본 정보를 입력해주세요.
            </p>

            <div className="space-y-6">
              {/* 아바타 선택 */}
              <Labeled label="프로필 아바타">
                <div className="flex flex-wrap gap-2">
                  {avatarOptions.map((a) => (
                    <button
                      key={a}
                      onClick={() => setAvatar(a)}
                      className="flex h-12 w-12 items-center justify-center rounded-2xl text-2xl transition-all"
                      style={{
                        backgroundColor: avatar === a ? 'var(--color-celadon-100)' : 'white',
                        border: `2px solid ${avatar === a ? 'var(--color-celadon-400)' : 'var(--color-hanji-200)'}`,
                      }}
                    >
                      {a}
                    </button>
                  ))}
                </div>
              </Labeled>

              {/* 닉네임 */}
              <Labeled label="닉네임 *">
                <input
                  className="field"
                  value={nickname}
                  onChange={(e) => setNickname(e.target.value)}
                  placeholder="사용할 닉네임을 입력하세요"
                  maxLength={12}
                />
              </Labeled>

              {/* MBTI */}
              <Labeled label="MBTI *">
                <div className="grid grid-cols-4 gap-2">
                  {mbtiOptions.map((m) => (
                    <button
                      key={m}
                      onClick={() => setMbti(m)}
                      className="rounded-xl py-2 text-sm font-medium transition-all"
                      style={{
                        backgroundColor: mbti === m ? 'var(--color-celadon-500)' : 'white',
                        color: mbti === m ? 'white' : 'var(--color-ink)',
                        border: `1.5px solid ${mbti === m ? 'var(--color-celadon-500)' : 'var(--color-hanji-200)'}`,
                      }}
                    >
                      {m}
                    </button>
                  ))}
                </div>
              </Labeled>

              {/* 취미 */}
              <Labeled label="취미 (복수 선택) *">
                <div className="flex flex-wrap gap-2">
                  {hobbyOptions.map((h) => (
                    <button
                      key={h}
                      onClick={() => toggleHobby(h)}
                      className="rounded-full px-3 py-1.5 text-sm transition-all"
                      style={{
                        backgroundColor: hobbies.includes(h) ? 'var(--color-celadon-100)' : 'white',
                        color: hobbies.includes(h) ? 'var(--color-celadon-600)' : 'var(--color-ink)',
                        border: `1.5px solid ${hobbies.includes(h) ? 'var(--color-celadon-400)' : 'var(--color-hanji-200)'}`,
                      }}
                    >
                      {h}
                    </button>
                  ))}
                </div>
              </Labeled>

              {/* 자기소개 */}
              <Labeled label="자기소개">
                <div className="relative">
                  <textarea
                    value={intro}
                    onChange={(e) => setIntro(e.target.value)}
                    placeholder="간단한 자기소개를 입력하세요 (선택)"
                    rows={3}
                    maxLength={100}
                    className="field resize-none"
                  />
                  <p className="mt-1 text-right text-xs" style={{ color: 'var(--color-celadon-300)' }}>
                    {intro.length}/100
                  </p>
                </div>
              </Labeled>

              {/* 가치관 */}
              <Labeled label="관계 가치관 (최대 3개)">
                <div className="flex flex-wrap gap-2">
                  {valueOptions.map((v) => (
                    <button
                      key={v}
                      onClick={() => (values.length < 3 || values.includes(v)) ? toggleValue(v) : undefined}
                      className="rounded-full px-3 py-1.5 text-sm transition-all"
                      style={{
                        backgroundColor: values.includes(v) ? 'var(--color-gold)' : 'white',
                        color: values.includes(v) ? 'white' : 'var(--color-ink)',
                        border: `1.5px solid ${values.includes(v) ? 'var(--color-gold)' : 'var(--color-hanji-200)'}`,
                        opacity: values.length >= 3 && !values.includes(v) ? 0.4 : 1,
                      }}
                    >
                      {v}
                    </button>
                  ))}
                </div>
              </Labeled>

              {/* 결혼 희망 시기 */}
              <Labeled label="결혼 희망 시기 *">
                <div className="grid grid-cols-3 gap-2">
                  {timelineOptions.map((t) => (
                    <button
                      key={t}
                      onClick={() => setTimeline(t)}
                      className="rounded-xl py-2.5 text-sm font-medium transition-all"
                      style={{
                        backgroundColor: timeline === t ? 'var(--color-celadon-500)' : 'white',
                        color: timeline === t ? 'white' : 'var(--color-ink)',
                        border: `1.5px solid ${timeline === t ? 'var(--color-celadon-500)' : 'var(--color-hanji-200)'}`,
                      }}
                    >
                      {t}
                    </button>
                  ))}
                </div>
              </Labeled>

              {/* 개인정보 안내 */}
              <p
                className="rounded-2xl px-4 py-3 text-center text-xs leading-relaxed"
                style={{ backgroundColor: 'var(--color-celadon-50)', color: 'var(--color-celadon-500)' }}
              >
                입력된 정보는 매칭 목적으로만 사용되며
                <br />원본은 기기에서 벗어나지 않습니다.
              </p>
            </div>
          </div>

          {/* 하단 버튼 */}
          <div className="px-6 pb-10 pt-2">
            <button
              className="btn-primary"
              onClick={handleSave}
              disabled={!isValid}
              style={{ opacity: isValid ? 1 : 0.5 }}
            >
              저장하고 시작하기
            </button>
          </div>
        </div>
      </PageTransition>
    </AppShell>
  )
}
