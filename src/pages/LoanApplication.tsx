
import { LoanApplicationForm } from '@/components/loans/LoanApplicationForm';
import { useParams } from 'react-router-dom';


export default function LoanApplication() {
  const { loanId } = useParams<{ loanId: string }>();

  if (!loanId) {
    return <div className="text-red-500">Loan ID is required</div>;
  }
  if (isNaN(Number(loanId))) {
    return <div className="text-red-500">Invalid Loan ID</div>;
  }



  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Apply for a Loan</h1>
        <p className="text-muted-foreground">Complete the form below to apply for a new loan</p>
      </div>

      <LoanApplicationForm
        loanId={parseInt(loanId)}
      />
    </div>
  );
}

