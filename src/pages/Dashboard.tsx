import { useState, useEffect } from 'react';
import { GlassCard } from '@/components/ui-custom/GlassCard';
import { StatsCard } from '@/components/dashboard/StatsCard';
import { LoanSummaryCard } from '@/components/dashboard/LoanSummaryCard';
import { RecentActivityCard } from '@/components/dashboard/RecentActivityCard';
import { CreditCard, Calendar, ArrowUpRight, AlertCircle } from 'lucide-react';
import axios from 'axios';
import { useSelector } from 'react-redux';


export default function Dashboard() {
  const [userBankAccounts, setUserBankAccounts] = useState([]);
  const [loading, setLoading] = useState(true);

  const { user } = useSelector((state: any) => state.user) || {};

  const mockLoans = [
    { id: "1", amount: 5000, emi: 1500, nextEmiDate: "2025-05-10", status: "active", mandateStatus: "active" },
    { id: "2", amount: 12000, emi: 2500, nextEmiDate: "2025-06-05", status: "active", mandateStatus: "inactive" }
  ];

  const totalLoanAmount = mockLoans.reduce((acc, loan) => acc + loan.amount, 0);
  const totalEmi = mockLoans.reduce((acc, loan) => acc + loan.emi, 0);
  const activeMandates = mockLoans.filter(loan => loan.mandateStatus === 'active').length;

  const upcomingEmi = mockLoans.find(loan => loan.nextEmiDate)?.emi || 0;
  const upcomingDate = mockLoans.find(loan => loan.nextEmiDate)?.nextEmiDate || null;

  // Fetch user bank accounts
  useEffect(() => {
    const fetchBankAccounts = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/api/bank-accounts/user/${user.id}`);
        setUserBankAccounts(response.data);
        console.log("User Bank Accounts:", response.data);
      } catch (error) {
        console.error("Error fetching bank accounts", error);
      } finally {
        setLoading(false);
      }
    };

    fetchBankAccounts();
  }, [user.id]);

  // If loading data, show loading message
  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold">Dashboard</h1>
        <p className="text-muted-foreground">Welcome back to your loan dashboard</p>
      </div>

      {/* Stats Overview */}
      {/* <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatsCard
          title="Total Loan Amount"
          value={`₹${totalLoanAmount.toLocaleString()}`}
          icon={<CreditCard className="w-5 h-5" />}
        />

        <StatsCard
          title="Monthly EMI"
          value={`₹${totalEmi.toLocaleString()}`}
          description="Due on: 15th of every month"
          icon={<Calendar className="w-5 h-5" />}
        />

        <StatsCard
          title="Active Mandates"
          value={activeMandates}
          description={`Out of ${mockLoans.length} loans`}
          icon={<ArrowUpRight className="w-5 h-5" />}
        />

        <StatsCard
          title="Next Payment"
          value={`₹${upcomingEmi.toLocaleString()}`}
          description={upcomingDate ? `Due on: ${new Date(upcomingDate).toLocaleDateString('en-IN', { month: 'short', day: 'numeric' })}` : 'No upcoming payment'}
          icon={<AlertCircle className="w-5 h-5" />}
          trend={{ value: 0, positive: true }}
        />
      </div> */}

      {/* Loan Summary */}
      {/* <div>
        <h2 className="text-xl font-semibold mb-4">Your Loans</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {mockLoans.map((loan) => (
            <LoanSummaryCard
              key={loan.id}
              loanId={loan.id}
              amount={loan.amount}
              emi={loan.emi}
              nextEmiDate={loan.nextEmiDate}
              status={loan.status}
              mandateStatus={loan.mandateStatus}
            />
          ))}
        </div>
      </div> */}

      {/* Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <RecentActivityCard />
        </div>

        <div>
          <GlassCard title="Bank Accounts" className="h-full">
            <div className="space-y-4">
              {userBankAccounts.length > 0 ? (
                userBankAccounts.map((account) => (
                  <div key={account.id} className="flex justify-between items-center">
                    <span className="text-sm">Bank Account: {account.accountNo}</span>
                    <span className="text-xs bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300 px-2 py-1 rounded-full">
                      {account.verified ? 'Verified' : 'Pending'}
                    </span>
                  </div>
                ))
              ) : (
                <p>No bank accounts linked</p>
              )}
            </div>
          </GlassCard>
        </div>
      </div>

      {/* KYC Status */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div>
          <GlassCard title="KYC Status" className="h-full">
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-sm">PAN Card</span>
                {user.kycStatus === 'VERIFIED' ? (
                  <span className="text-xs bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300 px-2 py-1 rounded-full">
                    Verified
                  </span>
                ) : (
                  <span className="text-xs bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300 px-2 py-1 rounded-full">
                    Pending
                  </span>
                )}

              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm">Aadhaar</span>
                {user.kycStatus === 'VERIFIED' ? (
                  <span className="text-xs bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300 px-2 py-1 rounded-full">
                    Verified
                  </span>
                ) : (
                  <span className="text-xs bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300 px-2 py-1 rounded-full">
                    Pending
                  </span>
                )}
              </div>

              <a href="/kyc" className="text-primary text-sm hover:underline block text-center mt-2">
                Complete KYC
              </a>
            </div>
          </GlassCard>
        </div>
      </div>
    </div>
  );
}
