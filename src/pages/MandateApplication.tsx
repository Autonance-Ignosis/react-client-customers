import MandateApplicationForm from "@/components/mandate/MandateApplicationForm";
import { mockBanks } from "@/lib/mock-data";
import { useParams } from "react-router-dom";
import { MainLayout } from "@/components/layout/MainLayout";


export default function MandateApplication() {


  const { bankId } = useParams<{ bankId: string }>();
  const {loanId} = useParams<{ loanId: string }>();


  console.log(bankId);

  if (!bankId?.trim()) {
    return <div className="text-red-500">Valid Bank ID is required</div>;
  }

  const selectedBankDetails = mockBanks.find((bank) => bank.id === bankId);
  

  const loanAmount = 50000;
  const emi = 1000;
  

  if (loanAmount <= 0 || emi <= 0) {
    return <div className="text-red-500">Loan Amount and EMI must be positive values</div>;
  }

  return (
    <div className="space-y-6">

      <MandateApplicationForm
              bankId={bankId} 
              loanAmount={loanAmount}
              emi={emi} 
              loanId={loanId}
              onConfirm={()=>{<MainLayout/>}}      
            />
    </div>
  );
}
