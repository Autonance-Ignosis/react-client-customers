
import { useState } from 'react';
import { GlassCard } from '../ui-custom/GlassCard';
import { mockBanks } from '@/lib/mock-data';
import { Check } from 'lucide-react';
import { cn } from '@/lib/utils';

interface BankSelectionCardProps {
  onSelect: (bankId: string) => void;
  selectedBank: string | null;
}

export function BankSelectionCard({ onSelect, selectedBank }: BankSelectionCardProps) {
  return (
    <GlassCard>
      <h3 className="text-lg font-semibold mb-4">Select Your Bank</h3>
      <p className="text-sm text-muted-foreground mb-6">
        Choose the bank account you want to use for automatic EMI payments
      </p>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {mockBanks.map((bank) => (
          <div
            key={bank.id}
            className={cn(
              "border rounded-lg p-4 cursor-pointer transition-all",
              selectedBank === bank.id
                ? "border-primary bg-primary/5"
                : "hover:border-primary/50"
            )}
            onClick={() => onSelect(bank.id)}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <div className="w-10 h-10 rounded-full bg-muted flex items-center justify-center text-2xl">
                  {bank.logo}
                </div>
                <div className="ml-3">
                  <p className="font-medium">{bank.name}</p>
                  <p className="text-sm text-muted-foreground">{bank.accountNumber}</p>
                </div>
              </div>
              
              {selectedBank === bank.id && (
                <div className="w-6 h-6 rounded-full bg-primary flex items-center justify-center">
                  <Check className="w-4 h-4 text-white" />
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
      
      <div className="mt-6 text-sm text-muted-foreground">
        <p>Don't see your bank? <a href="#" className="text-primary underline">Add a new bank account</a></p>
      </div>
    </GlassCard>
  );
}
