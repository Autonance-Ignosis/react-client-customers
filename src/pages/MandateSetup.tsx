// components/mandate/MandateSetup.tsx
import { useEffect, useState } from 'react';
import { BankSelectionCard } from '@/components/mandate/BankSelectionCard';
import { Button } from '@/components/ui/button';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'sonner';
import axios from 'axios';
import { useSelector } from 'react-redux';

interface Bank {
  id: string;
  name: string;
  accountNumber: string;
  logo?: string;
}

export default function MandateSetup() {

  const { id } = useParams();
  console.log('ID from params:', id);

  const {user} = useSelector((state: any) => state.user) || {};
  console.log('User from Redux:', user);

  const [selectedBank, setSelectedBank] = useState<string | null>(null);
  const [selectedBankName, setSelectedBankName] = useState<string | null>(null);

  const [bankId, setBankId] = useState<string[]>([]);


  const [banks, setBanks] = useState<Bank[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(`http://localhost:8083/api/bank-accounts/user/${user?.id}`)
      .then((res) => {
        console.log('Banks:', res.data[0].bankId, res.data.length);
        const ids = res.data.map((item: any) => item.bankId);
        setBankId(ids); // This will trigger the second effect when bankId changes
        console.log('Bank IDs:', ids);
      })
      .catch((err) => {
        console.error('Failed to fetch banks:', err);
        toast.error('Unable to load banks');
      })
      .finally(() => setIsLoading(false));
  }, [user?.id]);


  useEffect(() => {
    if (bankId.length > 0) {
      console.log('Fetching banks with IDs:', bankId);
      axios
        .post('http://localhost:8083/api/banks/by-ids', bankId)
        .then((res) => {
          console.log('List of Banks:', res.data);
          setBanks(res.data); 
        })
        .catch((err) => {
          console.error('Failed to fetch banks:', err);
          toast.error('Unable to load banks');
        })
        .finally(() => setIsLoading(false));
    }
  }, [bankId]);

  const handleBankSelect = (bankId: string) => {
    setSelectedBank(bankId);
  };

  

  const handleNext = () => {
    if (!selectedBank) {
      toast.error('Please select a bank to continue');
      return;
    }
    navigate(`/mandate/apply/${selectedBank}/${id}`);
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">E-Mandate Setup</h1>
        <p className="text-muted-foreground">Set up automatic EMI payments through e-mandate</p>
      </div>

      <BankSelectionCard
        onSelect={handleBankSelect}
        selectedBank={selectedBank}
        banks={banks}
        isLoading={isLoading}
      />

      <div className="flex justify-end">
        <Button onClick={handleNext} disabled={!selectedBank}>
          Continue
        </Button>
      </div>

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
