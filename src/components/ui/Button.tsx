import type { ButtonHTMLAttributes, ReactNode } from 'react';
import { Link } from 'react-router-dom';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  variant?: 'primary' | 'secondary' | 'outline';
  href?: string;
  external?: boolean;
}

export const Button = ({
  children,
  variant = 'primary',
  href,
  external,
  className = '',
  disabled,
  ...props
}: ButtonProps) => {
  const baseStyle = "inline-flex items-center justify-center px-6 py-3 rounded-md font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-background-dark disabled:opacity-50 disabled:cursor-not-allowed";
  
  const variants = {
    primary: "bg-accent-gold text-background-dark hover:bg-yellow-500 focus:ring-accent-gold",
    secondary: "bg-white/10 text-white hover:bg-white/20 focus:ring-white",
    outline: "border border-accent-gold text-accent-gold hover:bg-accent-gold/10 focus:ring-accent-gold"
  };

  const classes = `${baseStyle} ${variants[variant]} ${className}`;

  if (href) {
    if (external) {
      return (
        <a
          href={disabled ? undefined : href}
          target="_blank"
          rel="noopener noreferrer"
          className={`${classes} ${disabled ? 'opacity-50 cursor-not-allowed pointer-events-none' : ''}`}
        >
          {children}
        </a>
      );
    }
    return (
      <Link to={href} className={classes}>
        {children}
      </Link>
    );
  }

  return (
    <button className={classes} disabled={disabled} {...props}>
      {children}
    </button>
  );
};
