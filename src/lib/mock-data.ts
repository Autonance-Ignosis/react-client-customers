
export const mockUser = {
  id: '1',
  name: 'Alex Johnson',
  email: 'alex.johnson@example.com',
  avatarUrl: 'https://github.com/shadcn.png',
};

export const mockLoans = [
  {
    id: 'L1001',
    amount: 500000,
    tenure: 36,
    emi: 16500,
    interestRate: 9.5,
    disbursementDate: '2023-10-15',
    status: 'active',
    nextEmiDate: '2025-05-15',
    totalPaid: 148500,
    remainingAmount: 351500,
    mandateStatus: 'active',
  },
  {
    id: 'L1002',
    amount: 250000,
    tenure: 24,
    emi: 11450,
    interestRate: 8.75,
    disbursementDate: '2024-01-10',
    status: 'active',
    nextEmiDate: '2025-05-10',
    totalPaid: 45800,
    remainingAmount: 204200,
    mandateStatus: 'active',
  },
  {
    id: 'L1003',
    amount: 100000,
    tenure: 12,
    emi: 8900,
    interestRate: 8.5,
    disbursementDate: '2024-03-22',
    status: 'pending',
    nextEmiDate: null,
    totalPaid: 0,
    remainingAmount: 100000,
    mandateStatus: 'pending',
  },
];

export const mockBanks = [
  {
    id: 'B1',
    name: 'HDFC Bank',
    logo: '🏦',
    accountNumber: '****2345',
  },
  {
    id: 'B2',
    name: 'ICICI Bank',
    logo: '🏦',
    accountNumber: '****7890',
  },
  {
    id: 'B3',
    name: 'SBI',
    logo: '🏦',
    accountNumber: '****5678',
  },
  {
    id: 'B4',
    name: 'Axis Bank',
    logo: '🏦',
    accountNumber: '****1234',
  },
  {
    id: 'B5',
    name: 'Kotak Mahindra Bank',
    logo: '🏦',
    accountNumber: '****6789',
  },
];

export const mockNotifications = [
  {
    id: 'N1',
    title: 'EMI Payment Due',
    message: 'Your EMI payment of ₹16,500 for loan L1001 is due tomorrow',
    date: '2025-05-01',
    read: false,
    type: 'reminder',
  },
  {
    id: 'N2',
    title: 'KYC Verified',
    message: 'Your KYC documents have been verified successfully',
    date: '2025-04-28',
    read: true,
    type: 'success',
  },
  {
    id: 'N3',
    title: 'Loan Approved',
    message: 'Your loan application L1002 has been approved',
    date: '2025-04-20',
    read: true,
    type: 'success',
  },
  {
    id: 'N4',
    title: 'EMI Payment Successful',
    message: 'Your EMI payment of ₹16,500 for loan L1001 was successful',
    date: '2025-04-15',
    read: true,
    type: 'success',
  },
  {
    id: 'N5',
    title: 'Mandate Registration Failed',
    message: 'Your mandate registration failed. Please try again.',
    date: '2025-04-10',
    read: false,
    type: 'error',
  },
];

export const mockKycProgress = {
  panCard: {
    status: 'verified',
    message: 'PAN card verified successfully',
    lastUpdated: '2025-04-15',
  },
  aadhaar: {
    status: 'pending',
    message: 'Aadhaar verification in progress',
    lastUpdated: '2025-04-28',
  },
  salarySlips: {
    status: 'required',
    message: 'Please upload your last 3 months salary slips',
    lastUpdated: null,
  },
  bankStatements: {
    status: 'verified',
    message: 'Bank statements verified successfully',
    lastUpdated: '2025-04-20',
  },
};

export const mockEmiHistory = [
  {
    id: 'EMI1',
    loanId: 'L1001',
    amount: 16500,
    date: '2025-04-15',
    status: 'paid',
  },
  {
    id: 'EMI2',
    loanId: 'L1001',
    amount: 16500,
    date: '2025-03-15',
    status: 'paid',
  },
  {
    id: 'EMI3',
    loanId: 'L1001',
    amount: 16500,
    date: '2025-02-15',
    status: 'paid',
  },
  {
    id: 'EMI4',
    loanId: 'L1002',
    amount: 11450,
    date: '2025-04-10',
    status: 'paid',
  },
  {
    id: 'EMI5',
    loanId: 'L1002',
    amount: 11450,
    date: '2025-03-10',
    status: 'paid',
  },
];

export const formatCurrency = (amount: number) => {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(amount);
};

export const formatDate = (dateString: string | null) => {
  if (!dateString) return 'N/A';
  
  const options: Intl.DateTimeFormatOptions = { 
    year: 'numeric', 
    month: 'short', 
    day: 'numeric' 
  };
  
  return new Date(dateString).toLocaleDateString('en-IN', options);
};
