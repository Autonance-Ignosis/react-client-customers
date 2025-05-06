
import { cn } from '@/lib/utils';
import { Badge } from '@/components/ui/badge';

type StatusType = 'success' | 'warning' | 'error' | 'info' | 'default';

interface StatusBadgeProps {
  status: string;
  type?: StatusType;
  className?: string;
}

export function StatusBadge({ status, type = 'default', className }: StatusBadgeProps) {
  const getStatusColor = () => {
    const statusMap: Record<string, StatusType> = {
      active: 'success',
      verified: 'success',
      paid: 'success',
      approved: 'success',
      completed: 'success',
      
      pending: 'warning',
      processing: 'warning',
      "in-progress": 'warning',
      "in progress": 'warning',
      review: 'warning',
      
      failed: 'error',
      rejected: 'error',
      expired: 'error',
      
      required: 'info',
      optional: 'info',
      
      inactive: 'default',
    };
    
    return statusMap[status.toLowerCase()] || type;
  };
  
  const statusType = getStatusColor();
  
  const variantClasses = {
    success: 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300 border-green-200 dark:border-green-800',
    warning: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300 border-yellow-200 dark:border-yellow-800',
    error: 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300 border-red-200 dark:border-red-800',
    info: 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300 border-blue-200 dark:border-blue-800',
    default: 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300 border-gray-200 dark:border-gray-700',
  };
  
  return (
    <Badge 
      className={cn('font-medium border', variantClasses[statusType], className)}
      variant="outline"
    >
      {status}
    </Badge>
  );
}
