
import { useState } from 'react';
import { BankSelectionCard } from '@/components/mandate/BankSelectionCard';
import { MandateConfirmationCard } from '@/components/mandate/MandateConfirmationCard';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import { mockBanks } from '@/lib/mock-data';
import { toast } from 'sonner';

export default function MandateSetup() {
  const [selectedBank, setSelectedBank] = useState<string | null>(null);
  const [step, setStep] = useState(1);
  const navigate = useNavigate();
  
  const handleBankSelect = (bankId: string) => {
    setSelectedBank(bankId);
  };
  
  const handleNext = () => {
    if (!selectedBank) {
      toast.error('Please select a bank to continue');
      return;
    }
    
    setStep(2);
  };
  
  const handleConfirm = () => {
    toast.success('E-Mandate created successfully!');
    navigate('/dashboard');
  };
  
  const selectedBankDetails = mockBanks.find((bank) => bank.id === selectedBank);
  
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">E-Mandate Setup</h1>
        <p className="text-muted-foreground">Set up automatic EMI payments through e-mandate</p>
      </div>
      
      {step === 1 && (
        <>
          <BankSelectionCard onSelect={handleBankSelect} selectedBank={selectedBank} />
          
          <div className="flex justify-end">
            <Button onClick={handleNext} disabled={!selectedBank}>
              Continue
            </Button>
          </div>
        </>
      )}
      
      {step === 2 && selectedBankDetails && (
        <>
          <MandateConfirmationCard 
            bankId={selectedBank}
            bankName={selectedBankDetails.name}
            loanAmount={500000}
            emi={16500}
            onConfirm={handleConfirm}
          />
          
          <div className="flex justify-between">
            <Button variant="outline" onClick={() => setStep(1)}>
              Back
            </Button>
          </div>
        </>
      )}
      
      <div className="text-sm text-muted-foreground bg-muted p-4 rounded-lg">
        <h3 className="font-medium mb-2">About e-Mandate</h3>
        <p className="mb-2">An e-mandate is an electronic authorization for recurring payments from your bank account.</p>
        <ul className="list-disc pl-5 space-y-1">
          <li>Automatic EMI deductions on due dates</li>
          <li>No need to remember due dates or make manual payments</li>
          <li>Secure and RBI compliant process</li>
          <li>Option to cancel or modify anytime</li>
        </ul>
      </div>
    </div>
  );
}
