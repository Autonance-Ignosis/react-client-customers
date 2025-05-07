
export interface Mandate {
    id?: string;
    loanId: string;
    userId: string;
    bankAccountId: string;
    mandateVariant: string;
    category: string;
    debitType: string;
    seqType: string;
    freqType: string;
    schemaName: string;
    consRefNo: string;
    amount: number;
    startDate: string;
    uptoDate: string;
    upTo40Years: boolean;
    status?: string;
    createdAt?: string;
    updatedAt?: string;
  }
  