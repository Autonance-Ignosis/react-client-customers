
import { forwardRef } from 'react';
import { cn } from '@/lib/utils';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';

interface GlassCardProps extends React.HTMLAttributes<HTMLDivElement> {
  title?: string;
  className?: string;
  children: React.ReactNode;
  footer?: React.ReactNode;
  gradient?: boolean;
  hover?: boolean;
  floating?: boolean;
}

export const GlassCard = forwardRef<HTMLDivElement, GlassCardProps>(({
  title,
  className,
  children,
  footer,
  gradient = false,
  hover = false,
  floating = false,
  ...props
}, ref) => {
  return (
    <Card
      ref={ref}
      className={cn(
        'glass-card rounded-xl',
        gradient && 'bg-gradient-to-br from-white/80 to-white/40 dark:from-slate-800/80 dark:to-slate-900/60',
        hover && 'hover-card',
        floating && 'floating-card',
        className
      )}
      {...props}
    >
      {title && (
        <CardHeader className="pb-3">
          <CardTitle>{title}</CardTitle>
        </CardHeader>
      )}
      <CardContent className="pb-6">{children}</CardContent>
      {footer && (
        <CardFooter>{footer}</CardFooter>
      )}
    </Card>
  );
});

GlassCard.displayName = 'GlassCard';
