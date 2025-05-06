
import { GlassCard } from '../ui-custom/GlassCard';
import { Bell, Calendar, CheckCircle, AlertTriangle, XCircle } from 'lucide-react';
import { formatDate } from '@/lib/mock-data';
import { cn } from '@/lib/utils';

interface NotificationCardProps {
  id: string;
  title: string;
  message: string;
  date: string;
  read: boolean;
  type: 'reminder' | 'success' | 'error' | 'info';
  onMarkAsRead?: (id: string) => void;
}

export function NotificationCard({
  id,
  title,
  message,
  date,
  read,
  type,
  onMarkAsRead
}: NotificationCardProps) {
  const getIcon = () => {
    switch (type) {
      case 'reminder':
        return <Calendar className="w-5 h-5 text-amber-500" />;
      case 'success':
        return <CheckCircle className="w-5 h-5 text-green-500" />;
      case 'error':
        return <XCircle className="w-5 h-5 text-red-500" />;
      default:
        return <Bell className="w-5 h-5 text-blue-500" />;
    }
  };
  
  const getTypeStyles = () => {
    switch (type) {
      case 'reminder':
        return 'border-amber-200 dark:border-amber-800';
      case 'success':
        return 'border-green-200 dark:border-green-800';
      case 'error':
        return 'border-red-200 dark:border-red-800';
      default:
        return 'border-blue-200 dark:border-blue-800';
    }
  };
  
  return (
    <GlassCard 
      className={cn(
        "transition-all duration-300 border-l-4",
        getTypeStyles(),
        !read && "bg-accent/50 dark:bg-accent/30"
      )}
    >
      <div className="flex">
        <div className="mr-4 mt-1">
          {getIcon()}
        </div>
        <div className="flex-1">
          <div className="flex justify-between items-start">
            <h3 className="font-medium">{title}</h3>
            {!read && (
              <button
                onClick={() => onMarkAsRead?.(id)}
                className="text-xs text-primary hover:text-primary/80"
              >
                Mark as read
              </button>
            )}
          </div>
          <p className="text-sm text-muted-foreground mt-1">{message}</p>
          <p className="text-xs text-muted-foreground mt-2">{formatDate(date)}</p>
        </div>
      </div>
    </GlassCard>
  );
}
