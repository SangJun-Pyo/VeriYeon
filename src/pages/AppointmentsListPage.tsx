import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Calendar } from 'lucide-react';
import { AppShell } from '../components/layout/AppShell';
import { Header } from '../components/layout/Header';
import { BottomNav } from '../components/layout/BottomNav';
import { Button } from '../components/common/Button';
import { useAppStore } from '../store/useAppStore';
import { allMockCards } from '../data/mockCards';

export function AppointmentsListPage() {
  const navigate = useNavigate();
  const appointments = useAppStore((s) => s.appointments);

  return (
    <AppShell showBottomNav>
      <Header title="약속" />
      <div className="px-4 pt-4 pb-8">
        {appointments.length === 0 ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex flex-col items-center justify-center h-64 gap-4"
          >
            <Calendar size={48} style={{ color: 'var(--color-soft-line)' }} />
            <p className="text-sm text-center" style={{ color: 'var(--color-ink)', opacity: 0.45 }}>
              확정된 만남 일정이 없습니다.
            </p>
            <Button variant="secondary" size="md" onClick={() => navigate('/home')}>
              홈으로 가기
            </Button>
          </motion.div>
        ) : (
          <div className="space-y-3">
            {appointments.map((appt) => {
              const card = allMockCards.find((c) => c.id === appt.matchId);
              return (
                <div
                  key={appt.matchId}
                  className="p-4 rounded-2xl cursor-pointer"
                  style={{ backgroundColor: 'var(--color-surface)', border: '1px solid var(--color-soft-line)' }}
                  onClick={() => navigate(`/appointment/${appt.matchId}`)}
                >
                  <p className="font-bold" style={{ color: 'var(--color-ink)' }}>{card?.nickname ?? '상대방'}</p>
                  <p className="text-sm" style={{ color: 'var(--color-ink)', opacity: 0.6 }}>{appt.scheduledAt} · {appt.place}</p>
                </div>
              );
            })}
          </div>
        )}
      </div>
      <BottomNav />
    </AppShell>
  );
}
