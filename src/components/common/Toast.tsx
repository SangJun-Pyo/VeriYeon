import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle2, AlertCircle } from 'lucide-react';
import { useEffect } from 'react';

interface ToastProps {
  message: string;
  type?: 'success' | 'error' | 'info';
  isVisible: boolean;
  onHide: () => void;
  duration?: number;
}

export function Toast({ message, type = 'success', isVisible, onHide, duration = 3000 }: ToastProps) {
  useEffect(() => {
    if (isVisible) {
      const timer = setTimeout(onHide, duration);
      return () => clearTimeout(timer);
    }
  }, [isVisible, onHide, duration]);

  const colors = {
    success: { bg: 'var(--color-deep-teal)', icon: <CheckCircle2 size={16} /> },
    error: { bg: 'var(--color-danger)', icon: <AlertCircle size={16} /> },
    info: { bg: 'var(--color-ink)', icon: null },
  };

  const color = colors[type];

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 30 }}
          className="fixed bottom-24 left-1/2 -translate-x-1/2 z-[100] flex items-center gap-2 px-5 py-3 rounded-2xl shadow-lg text-sm font-medium text-white"
          style={{ backgroundColor: color.bg, maxWidth: '340px', width: 'calc(100% - 40px)' }}
        >
          {color.icon}
          <span className="flex-1 break-all">{message}</span>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
