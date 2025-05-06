import { Bank } from '@/types/loan';

const API_BASE_URL = 'http://localhost:8080';

export async function fetchBanks(): Promise<Bank[]> {
    try {
        const response = await fetch(`${API_BASE_URL}/api/banks`);

        if (!response.ok) {
            throw new Error(`Error fetching banks: ${response.statusText}`);
        }

        return await response.json();
    } catch (error) {
        console.error('Failed to fetch banks:', error);

        // Fallback to mock data in case API is not available
        return [
            { id: 'HDFC', name: 'HDFC Bank', logo: '🏦', ifscPrefix: 'HDFC' },
            { id: 'ICICI', name: 'ICICI Bank', logo: '🏦', ifscPrefix: 'ICIC' },
            { id: 'SBI', name: 'State Bank of India', logo: '🏦', ifscPrefix: 'SBIN' },
            { id: 'AXIS', name: 'Axis Bank', logo: '🏦', ifscPrefix: 'UTIB' },
            { id: 'KOTAK', name: 'Kotak Mahindra Bank', logo: '🏦', ifscPrefix: 'KKBK' },
        ];
    }
}

export async function createBankAccount(accountData: {
    userId: number;
    bankId: string;
    accountNumber: string;
    ifscCode: string;
    accountHolderName: string;
}) {
    try {
        const response = await fetch(`${API_BASE_URL}/api/bank-accounts`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(accountData),
        });

        if (!response.ok) {
            throw new Error(`Error creating bank account: ${response.statusText}`);
        }

        return await response.json();
    } catch (error) {
        console.error('Failed to create bank account:', error);
        throw error;
    }
}