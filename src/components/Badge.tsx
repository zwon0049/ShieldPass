import { type PassStatus } from '../types';

interface BadgeProps {
  variant?: 'default' | 'success' | 'warning' | 'danger' | 'secondary';
  size?: 'sm' | 'md' | 'lg';
  children: React.ReactNode;
  className?: string;
}

export function Badge({ variant = 'default', size = 'md', children, className = '' }: BadgeProps) {
  const baseStyles = 'inline-flex items-center font-medium rounded-full';

  const variantStyles = {
    default: 'bg-indigo-100 text-indigo-800 dark:bg-indigo-900 dark:text-indigo-100',
    success: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100',
    warning: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-100',
    danger: 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-100',
    secondary: 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-100',
  };

  const sizeStyles = {
    sm: 'px-2 py-1 text-xs',
    md: 'px-3 py-1.5 text-sm',
    lg: 'px-4 py-2 text-base',
  };

  return (
    <span className={`${baseStyles} ${variantStyles[variant]} ${sizeStyles[size]} ${className}`}>
      {children}
    </span>
  );
}

interface PassStatusBadgeProps {
  status: PassStatus;
  size?: 'sm' | 'md' | 'lg';
}

export function PassStatusBadge({ status, size = 'md' }: PassStatusBadgeProps) {
  const statusConfig = {
    Active: { variant: 'success' as const, icon: '●' },
    Used: { variant: 'warning' as const, icon: '✓' },
    Expired: { variant: 'danger' as const, icon: '✕' },
    Disabled: { variant: 'secondary' as const, icon: '⏸' },
  };

  const config = statusConfig[status];

  return (
    <Badge variant={config.variant} size={size} className="gap-1.5">
      <span>{config.icon}</span>
      {status}
    </Badge>
  );
}
