import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost' | 'danger';
  size?: 'sm' | 'md' | 'lg';
  fullWidth?: boolean;
  loading?: boolean;
}

export function Button({
  variant = 'primary',
  size = 'md',
  fullWidth = false,
  loading = false,
  children,
  className = '',
  disabled,
  ...rest
}: ButtonProps) {
  const base = 'inline-flex items-center justify-center font-semibold rounded-2xl transition-all duration-200 select-none';

  const sizes = {
    sm: 'px-4 py-2 text-sm',
    md: 'px-6 py-3.5 text-base',
    lg: 'px-8 py-4 text-lg',
  };

  const variants = {
    primary: {
      backgroundColor: 'var(--color-deep-teal)',
      color: '#FFFFFF',
    },
    secondary: {
      backgroundColor: 'var(--color-mint)',
      color: 'var(--color-deep-teal)',
    },
    ghost: {
      backgroundColor: 'transparent',
      color: 'var(--color-ink)',
      border: '1.5px solid var(--color-soft-line)',
    },
    danger: {
      backgroundColor: 'var(--color-danger)',
      color: '#FFFFFF',
    },
  };

  const style = variants[variant];

  return (
    <button
      className={`${base} ${sizes[size]} ${fullWidth ? 'w-full' : ''} ${className}`}
      style={{
        ...style,
        opacity: disabled || loading ? 0.5 : 1,
        cursor: disabled || loading ? 'not-allowed' : 'pointer',
      }}
      disabled={disabled || loading}
      {...rest}
    >
      {loading ? (
        <span className="flex items-center gap-2">
          <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24" fill="none">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
          </svg>
          처리 중...
        </span>
      ) : children}
    </button>
  );
}
