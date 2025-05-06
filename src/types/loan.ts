export interface LoanRequestDto {
    userId: number;
    loanOfferId: number;
    bankAccountId: number;
    amount: number;
    tenureInMonths: number;
    interestRate: number;
    // ML-specific features
    creditCriteriaMet: boolean;
    purpose: string;
    logIncome: number;
    debtIncomeRatio: number;
    ficoScore: number;
    daysWithCreditLine: number;
    revolvingBalance: number;
    revolvingUtilization: number;
    inquiryLast6Months: number;
    timesLateIn2Years: number;
    derogatoryPublicRecords: number;
}

export interface Bank {
    id: string;
    name: string;
    logo: string;
    ifscPrefix: string;
}

export interface BankAccount {
    id: number;
    userId: number;
    bankId: string;
    accountNumber: string;
    ifscCode: string;
    accountHolderName: string;
}