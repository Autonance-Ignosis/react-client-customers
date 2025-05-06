
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

export default function HomePage() {
  const navigate = useNavigate();
  
  const { user } = useSelector((state: any) => state.user) || {};
  console.log("HomePage rendered",user);
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold mb-6">Welcome to MandateFlow</h1>
        <p className="text-xl text-muted-foreground mb-8">
          Simplifying your loan management process with seamless mandate setup and document management.
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-card p-6 rounded-lg shadow-sm border border-border">
            <h2 className="text-2xl font-semibold mb-4">Loan Application</h2>
            <p className="mb-4">Quick and hassle-free loan applications. Get approvals faster with our streamlined process.</p>
            <Button onClick={() => navigate('/loans/apply')}>Apply Now</Button>
          </div>
          
          <div className="bg-card p-6 rounded-lg shadow-sm border border-border">
            <h2 className="text-2xl font-semibold mb-4">Document Management</h2>
            <p className="mb-4">Securely upload and manage your KYC documents in one place for faster verification.</p>
            <Button onClick={() => navigate('/kyc')}>Upload Documents</Button>
          </div>
        </div>
        
        <div className="mt-12 bg-card p-6 rounded-lg shadow-sm border border-border">
          <h2 className="text-2xl font-semibold mb-4">How It Works</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="flex flex-col items-center text-center">
              <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                <span className="text-primary font-bold text-lg">1</span>
              </div>
              <h3 className="font-medium mb-2">Apply for Loan</h3>
              <p className="text-muted-foreground">Fill out our simple application form with your details.</p>
            </div>
            
            <div className="flex flex-col items-center text-center">
              <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                <span className="text-primary font-bold text-lg">2</span>
              </div>
              <h3 className="font-medium mb-2">Upload Documents</h3>
              <p className="text-muted-foreground">Provide your KYC documents for verification.</p>
            </div>
            
            <div className="flex flex-col items-center text-center">
              <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                <span className="text-primary font-bold text-lg">3</span>
              </div>
              <h3 className="font-medium mb-2">Setup Mandate</h3>
              <p className="text-muted-foreground">Complete the mandate setup for automatic repayments.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
