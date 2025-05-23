import MandateApplicationForm from "@/components/mandate/MandateApplicationForm";
import { mockBanks } from "@/lib/mock-data";
import { useParams } from "react-router-dom";
import { MainLayout } from "@/components/layout/MainLayout";

export default function MandateApplication() {
  const { bankAccountId } = useParams<{ bankAccountId: string }>();
  const { loanId } = useParams<{ loanId: string }>();

  console.log(bankAccountId);

  if (!bankAccountId?.trim()) {
    return <div className="text-red-500">Valid Bank ID is required</div>;
  }

  // const selectedBankDetails = mockBanks.find((bank) => bank.id === bankId);

  const loanAmount = 110000;
  const emi = 10000;

  if (loanAmount <= 0 || emi <= 0) {
    return (
      <div className="text-red-500">
        Loan Amount and EMI must be positive values
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <MandateApplicationForm
        bankAccountId={bankAccountId}
        loanAmount={loanAmount}
        emi={emi}
        loanId={loanId}
      // onConfirm={() => {
      //   <MainLayout />;
      // }}
      />
    </div>
  );
}
