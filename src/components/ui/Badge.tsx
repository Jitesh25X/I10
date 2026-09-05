import type { ReactNode } from 'react';

interface BadgeProps {
  children: ReactNode;
  active?: boolean;
  onClick?: () => void;
}

export const Badge = ({ children, active, onClick }: BadgeProps) => {
  return (
    <span
      onClick={onClick}
      className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium cursor-pointer transition-colors ${
        active
          ? 'bg-accent-purple text-white'
          : 'bg-white/10 text-text-muted hover:bg-white/20 hover:text-white'
      }`}
    >
      {children}
    </span>
  );
};
