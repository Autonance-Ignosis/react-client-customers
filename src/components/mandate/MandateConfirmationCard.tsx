
import { GlassCard } from '../ui-custom/GlassCard';
import { Button } from '@/components/ui/button';
import { formatCurrency } from '@/lib/mock-data';
import { AlertCircle } from 'lucide-react';

interface MandateConfirmationCardProps {
  bankId: string | null;
  bankName: string;
  loanAmount: number;
  emi: number;
  onConfirm: () => void;
}

export function MandateConfirmationCard({
  bankId,
  bankName,
  loanAmount,
  emi,
  onConfirm
}: MandateConfirmationCardProps) {
  if (!bankId) return null;

  return (
    <GlassCard>
      <h3 className="text-lg font-semibold mb-4">Confirm Mandate Details</h3>
      
      <div className="space-y-6">
        <div className="bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 rounded-lg p-4 flex">
          <AlertCircle className="w-5 h-5 text-amber-600 dark:text-amber-400 mr-3 flex-shrink-0 mt-0.5" />
          <div>
            <p className="text-sm font-medium text-amber-800 dark:text-amber-300">Important Information</p>
            <p className="text-sm mt-1 text-amber-700 dark:text-amber-400">
              By setting up this e-mandate, you authorize MandateFlow to automatically debit your bank account for EMI payments on the scheduled dates.
            </p>
          </div>
        </div>
        
        <div className="p-4 bg-muted rounded-lg space-y-3">
          <div className="flex justify-between">
            <span className="text-sm text-muted-foreground">Bank Name</span>
            <span className="font-medium">{bankName}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-sm text-muted-foreground">Loan Amount</span>
            <span className="font-medium">{formatCurrency(loanAmount)}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-sm text-muted-foreground">Monthly EMI</span>
            <span className="font-medium">{formatCurrency(emi)}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-sm text-muted-foreground">Mandate Type</span>
            <span className="font-medium">NACH e-Mandate</span>
          </div>
          <div className="flex justify-between">
            <span className="text-sm text-muted-foreground">Start Date</span>
            <span className="font-medium">June 15, 2025</span>
          </div>
          <div className="flex justify-between">
            <span className="text-sm text-muted-foreground">End Date</span>
            <span className="font-medium">May 15, 2028</span>
          </div>
        </div>
        
        <div className="flex items-start">
          <input type="checkbox" id="agree" className="mt-1 mr-2" />
          <label htmlFor="agree" className="text-sm">
            I authorize MandateFlow to debit my account for EMI payments. I have read and agree to the <a href="#" className="text-primary">terms and conditions</a>.
          </label>
        </div>
        
        <Button onClick={onConfirm} className="w-full">
          Create E-Mandate
        </Button>
        
        <p className="text-xs text-center text-muted-foreground">
          You will be redirected to your bank's website to authenticate this mandate setup.
        </p>
      </div>
    </GlassCard>
  );
}
