// StatusBar - 모바일 상단 상태바 모형 (시간 / 신호 / 배터리)
// 실제 기능은 없고 디자인용.
export default function StatusBar({ dark = false }: { dark?: boolean }) {
  const color = dark ? 'text-white' : 'text-[#2b3e37]'
  return (
    <div className={`flex items-center justify-between px-6 pt-3 text-xs font-semibold ${color}`}>
      <span>9:31</span>
      <div className="flex items-center gap-1.5">
        {/* 신호 */}
        <svg width="16" height="11" viewBox="0 0 16 11" fill="none">
          <rect x="0" y="7" width="3" height="4" rx="0.5" fill="currentColor" />
          <rect x="4.5" y="5" width="3" height="6" rx="0.5" fill="currentColor" />
          <rect x="9" y="2.5" width="3" height="8.5" rx="0.5" fill="currentColor" />
          <rect x="13" y="0" width="3" height="11" rx="0.5" fill="currentColor" />
        </svg>
        {/* 배터리 */}
        <svg width="22" height="11" viewBox="0 0 24 12" fill="none">
          <rect x="0.5" y="0.5" width="20" height="11" rx="3" stroke="currentColor" opacity="0.4" />
          <rect x="2" y="2" width="16" height="8" rx="1.5" fill="currentColor" />
          <rect x="21.5" y="4" width="2" height="4" rx="1" fill="currentColor" opacity="0.4" />
        </svg>
      </div>
    </div>
  )
}
