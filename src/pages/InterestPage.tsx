import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, CheckCircle2 } from 'lucide-react';
import { AppShell } from '../components/layout/AppShell';
import { Header } from '../components/layout/Header';
import { BottomNav } from '../components/layout/BottomNav';
import { Button } from '../components/common/Button';
import { useAppStore } from '../store/useAppStore';

export function InterestPage() {
  const navigate = useNavigate();
  const interests = useAppStore((s) => s.interests);
  const removeInterest = useAppStore((s) => s.removeInterest);

  return (
    <AppShell showBottomNav>
      <Header title="관심함" />
      <div className="px-4 pt-4 pb-8">
        <AnimatePresence>
          {interests.length === 0 ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex flex-col items-center justify-center h-64 gap-4"
            >
              <Heart size={48} style={{ color: 'var(--color-soft-line)' }} />
              <p className="text-sm text-center" style={{ color: 'var(--color-ink)', opacity: 0.45 }}>
                아직 관심을 표시한 카드가 없습니다.
                <br />홈에서 마음에 드는 카드를 찾아보세요.
              </p>
              <Button variant="secondary" size="md" onClick={() => navigate('/home')}>
                홈으로 가기
              </Button>
            </motion.div>
          ) : (
            <div className="space-y-3">
              {interests.map((card, i) => (
                <motion.div
                  key={card.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  transition={{ delay: i * 0.06 }}
                  className="flex items-center gap-4 p-4 rounded-2xl"
                  style={{ backgroundColor: 'var(--color-surface)', border: '1px solid var(--color-soft-line)' }}
                >
                  <div
                    className="w-14 h-14 rounded-2xl flex items-center justify-center text-3xl shrink-0"
                    style={{ backgroundColor: 'var(--color-mint)' }}
                  >
                    {card.image}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-0.5">
                      <p className="text-base font-bold" style={{ color: 'var(--color-ink)' }}>{card.nickname}</p>
                      {card.superLiked && (
                        <span className="text-xs px-1.5 py-0.5 rounded-full font-medium" style={{ backgroundColor: 'var(--color-gold)', color: '#FFF' }}>
                          Super
                        </span>
                      )}
                    </div>
                    <p className="text-xs mb-1" style={{ color: 'var(--color-ink)', opacity: 0.55 }}>
                      {card.ageRange} · {card.region}
                    </p>
                    <div className="flex items-center gap-1">
                      <CheckCircle2 size={11} style={{ color: 'var(--color-teal)' }} />
                      <span className="text-xs" style={{ color: 'var(--color-teal)' }}>{card.level1Badges.length}개 검증</span>
                    </div>
                  </div>
                  <div className="flex flex-col gap-2">
                    <Button variant="primary" size="sm" onClick={() => navigate(`/level2/${card.id}`)}>
                      Level 2 공개
                    </Button>
                    <button
                      onClick={() => removeInterest(card.id)}
                      className="text-xs text-center py-1"
                      style={{ color: 'var(--color-danger)' }}
                    >
                      삭제
                    </button>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </AnimatePresence>
      </div>
      <BottomNav />
    </AppShell>
  );
}
