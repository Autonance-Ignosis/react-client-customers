// components/ui/skeleton.tsx
import React from 'react';
import { cn } from '@/lib/utils';

export function Skeleton({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        'bg-muted relative overflow-hidden rounded-md',
        'animate-pulse',
        className
      )}
    >
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-shimmer" />
    </div>
  );
}
