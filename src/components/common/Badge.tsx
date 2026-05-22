import { CheckCircle2, Clock, Lock } from 'lucide-react';

interface BadgeProps {
  text: string;
  variant?: 'verified' | 'pending' | 'private' | 'info';
  size?: 'sm' | 'md';
}

export function Badge({ text, variant = 'verified', size = 'md' }: BadgeProps) {
  const sizeMap = {
    sm: 'text-xs px-2 py-0.5 gap-1',
    md: 'text-sm px-3 py-1 gap-1.5',
  };

  const variantMap = {
    verified: {
      backgroundColor: 'var(--color-mint)',
      color: 'var(--color-deep-teal)',
      icon: <CheckCircle2 size={size === 'sm' ? 11 : 13} strokeWidth={2.5} />,
    },
    pending: {
      backgroundColor: '#FEF3C7',
      color: '#92400E',
      icon: <Clock size={size === 'sm' ? 11 : 13} strokeWidth={2.5} />,
    },
    private: {
      backgroundColor: '#F3F4F6',
      color: '#6B7280',
      icon: <Lock size={size === 'sm' ? 11 : 13} strokeWidth={2.5} />,
    },
    info: {
      backgroundColor: '#EFF6FF',
      color: '#1D4ED8',
      icon: null,
    },
  };

  const style = variantMap[variant];

  return (
    <span
      className={`inline-flex items-center font-medium rounded-full ${sizeMap[size]}`}
      style={{ backgroundColor: style.backgroundColor, color: style.color }}
    >
      {style.icon}
      {text}
    </span>
  );
}
