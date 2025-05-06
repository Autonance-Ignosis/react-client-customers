
import { formatDate } from '@/lib/mock-data';
import { mockEmiHistory } from '@/lib/mock-data';
import { GlassCard } from '../ui-custom/GlassCard';
import { Button } from '@/components/ui/button';
import { StatusBadge } from '../ui-custom/StatusBadge';

export function RecentActivityCard() {
  const recentActivity = mockEmiHistory.slice(0, 4);

  return (
    <GlassCard 
      title="Recent Activity" 
      footer={
        <Button variant="link" className="w-full">View All Activity</Button>
      }
    >
      <div className="space-y-4">
        {recentActivity.map((activity) => (
          <div 
            key={activity.id} 
            className="flex items-center justify-between pb-4 border-b border-border last:border-0 last:pb-0"
          >
            <div className="space-y-1">
              <p className="font-medium">EMI Payment for Loan {activity.loanId}</p>
              <p className="text-sm text-muted-foreground">{formatDate(activity.date)}</p>
            </div>
            <div className="flex flex-col items-end gap-1">
              <span className="font-semibold">₹{activity.amount.toLocaleString('en-IN')}</span>
              <StatusBadge status={activity.status} className="text-xs" />
            </div>
          </div>
        ))}
      </div>
    </GlassCard>
  );
}
