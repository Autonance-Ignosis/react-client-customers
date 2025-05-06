
const API_BASE_URL = 'http://localhost:8080';
import axios from "axios";

export async function fetchLoanDetails(loanId: any): Promise<any> {
    try {
        const response = await fetch(`${API_BASE_URL}/api/loan-offers/${loanId}`);
        
        console.log(response)
        if (!response.ok) {
            throw new Error(`Error fetching loan details: ${response.statusText}`);
        }
        return await response.json();
    } catch (error) {
        console.error('Failed to fetch loan details:', error);
        throw error;
    }
}


export async function createLoanApplication(loanApplicationData: any): Promise<any> {
    try {
        const response = await fetch(`${API_BASE_URL}/api/loans`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(loanApplicationData),
        });
        if (!response.ok) {
            throw new Error(`Error creating loan application: ${response.statusText}`);
        }
        return await response.json();
    } catch (error) {
        console.error('Failed to create loan application:', error);
        throw error;
    }
}