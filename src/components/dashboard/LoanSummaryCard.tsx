
import { ArrowRight, CreditCard } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { GlassCard } from '../ui-custom/GlassCard';
import { StatusBadge } from '../ui-custom/StatusBadge';
import { formatCurrency, formatDate } from '@/lib/mock-data';

interface LoanSummaryCardProps {
  loanId: string;
  amount: number;
  emi: number;
  nextEmiDate: string | null;
  status: string;
  mandateStatus: string;
}

export function LoanSummaryCard({
  loanId,
  amount,
  emi,
  nextEmiDate,
  status,
  mandateStatus,
}: LoanSummaryCardProps) {
  return (
    <GlassCard hover className="h-full">
      <div className="flex flex-col h-full">
        <div className="flex justify-between items-start mb-4">
          <div>
            <h3 className="font-semibold text-lg">Loan {loanId}</h3>
            <p className="text-2xl font-bold mt-1">{formatCurrency(amount)}</p>
          </div>
          <StatusBadge status={status} />
        </div>
        
        <div className="space-y-4 flex-grow">
          <div className="flex justify-between">
            <span className="text-sm text-muted-foreground">Monthly EMI</span>
            <span className="font-medium">{formatCurrency(emi)}</span>
          </div>
          
          <div className="flex justify-between">
            <span className="text-sm text-muted-foreground">Next EMI Date</span>
            <span className="font-medium">{formatDate(nextEmiDate)}</span>
          </div>
          
          <div className="flex justify-between">
            <span className="text-sm text-muted-foreground">Mandate Status</span>
            <StatusBadge status={mandateStatus} className="text-xs" />
          </div>
        </div>
        
        <div className="mt-4 pt-4 border-t border-border flex justify-between">
          <Button variant="outline" size="sm" className="h-8">
            <CreditCard className="h-3.5 w-3.5 mr-2" />
            Pay EMI
          </Button>
          <Button variant="ghost" size="sm" className="h-8">
            Details <ArrowRight className="ml-1 h-3.5 w-3.5" />
          </Button>
        </div>
      </div>
    </GlassCard>
  );
}
