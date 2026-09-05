import type { ReactNode } from 'react';

interface BadgeProps {
  children: ReactNode;
  active?: boolean;
  onClick?: () => void;
  className?: string;
}

export const Badge = ({ children, active, onClick, className = '' }: BadgeProps) => {
  const isInteractive = Boolean(onClick);

  return (
    <span
      role={isInteractive ? 'button' : undefined}
      tabIndex={isInteractive ? 0 : undefined}
      onClick={onClick}
      onKeyDown={isInteractive ? (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          onClick?.();
        }
      } : undefined}
      className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold tracking-wide transition-glass duration-200 ease-smooth transform-gpu ${
        isInteractive ? 'cursor-pointer select-none active:scale-95' : 'cursor-default'
      } ${
        active
          ? 'bg-accent-gold text-background-dark shadow-sm'
          : 'bg-white/10 text-text-muted hover:bg-white/15 hover:text-white border border-white/10'
      } ${className}`}
    >
      {children}
    </span>
  );
};
