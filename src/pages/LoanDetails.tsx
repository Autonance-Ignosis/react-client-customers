import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Calendar, CreditCard, DollarSign, Clock, AlertCircle, CheckCircle, Info, Plus, Building, Currency } from 'lucide-react';
import { useNavigate, useParams } from 'react-router-dom';

export default function LoanDetailsPage() {
    const loanId = useParams().loanId;
    const [loanDetails, setLoanDetails] = useState(null);
    const [mandateDetails, setMandateDetails] = useState([]);
    const [bankAccount, setBankAccount] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchLoanDetails = async () => {
            setLoading(true);
            try {
                // Fetch loan details
                const loanResponse = await fetch(`http://localhost:8080/api/loans/${loanId}`);
                if (!loanResponse.ok) {
                    throw new Error(`Failed to fetch loan details: ${loanResponse.status}`);
                }
                const loanData = await loanResponse.json();
                setLoanDetails(loanData);

                // Fetch mandate details
                const mandateResponse = await fetch(`http://localhost:8080/api/mandates/loan/${loanId}`);
                if (!mandateResponse.ok) {
                    throw new Error(`Failed to fetch mandate details: ${mandateResponse.status}`);
                }
                const mandateData = await mandateResponse.json();
                setMandateDetails(mandateData);

                // Fetch bank account details if we have bankAccountId from loan
                if (loanData && loanData.bankAccountId) {
                    const bankResponse = await fetch(`http://localhost:8080/api/bank-accounts/${loanData.bankAccountId}`);
                    if (!bankResponse.ok) {
                        console.error(`Warning: Failed to fetch bank account: ${bankResponse.status}`);
                    } else {
                        const bankData = await bankResponse.json();
                        setBankAccount(bankData);
                    }
                }
            } catch (err) {
                setError(err.message);
                console.error(err);
            } finally {
                setLoading(false);
            }
        };

        if (loanId) {
            fetchLoanDetails();
        }
    }, [loanId]);

    const formatCurrency = (amount) => {
        return new Intl.NumberFormat('en-IN', {
            style: 'currency',
            currency: 'INR',
            maximumFractionDigits: 0
        }).format(amount);
    };

    const getStatusColor = (status) => {
        switch (status) {
            case 'APPROVED':
                return 'bg-green-100 text-green-800';
            case 'PENDING':
                return 'bg-yellow-100 text-yellow-800';
            case 'REJECTED':
                return 'bg-red-100 text-red-800';
            default:
                return 'bg-gray-100 text-gray-800';
        }
    };

    const getMandateStatusBadge = (status) => {
        switch (status) {
            case 'APPROVED':
                return <Badge className="bg-green-100 text-green-800 hover:bg-green-200">{status}</Badge>;
            case 'PENDING':
                return <Badge className="bg-yellow-100 text-yellow-800 hover:bg-yellow-200">{status}</Badge>;
            default:
                return <Badge>{status}</Badge>;
        }
    };

    const navigate = useNavigate();
    const appyMandate = (loanId) => {
        navigate(`/mandate/${loanId}`);
    }


    if (loading) {
        return (
            <div className="flex items-center justify-center h-96">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
                    <p className="mt-4 text-lg">Loading loan details...</p>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="flex items-center justify-center h-96">
                <Card className="w-full max-w-2xl">
                    <CardHeader className="bg-red-50">
                        <CardTitle className="flex items-center">
                            <AlertCircle className="mr-2 h-5 w-5" />
                            Error Loading Data
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="pt-6">
                        <p>{error}</p>
                        <Button className="mt-4" onClick={() => window.location.reload()}>
                            Try Again
                        </Button>
                    </CardContent>
                </Card>
            </div>
        );
    }

    if (!loanDetails) {
        return (
            <div className="flex items-center justify-center h-96">
                <Card className="w-full max-w-2xl">
                    <CardHeader className="bg-orange-50">
                        <CardTitle className="flex items-center">
                            <Info className="mr-2 h-5 w-5" />
                            No Loan Found
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="pt-6">
                        <p>No loan details found for ID: {loanId}</p>
                    </CardContent>
                </Card>
            </div>
        );
    }

    return (
        <div className="container mx-auto py-8 px-4">
            <h1 className="text-3xl font-bold mb-6">Loan Details</h1>

            {/* Loan Summary Card */}
            <Card className="mb-8">
                <CardHeader className="pb-2">
                    <div className="flex justify-between items-center">
                        {/* <CardTitle>Loan #{loanDetails.id}</CardTitle> */}
                        <div className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(loanDetails.status)}`}>
                            {loanDetails.status}
                        </div>
                    </div>
                    <CardDescription>Applied on {new Date(loanDetails.appliedAt).toLocaleDateString()}</CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        <div>
                            <p className="text-sm text-gray-500 mb-1">Loan Amount</p>
                            <p className="text-2xl font-bold flex items-center">
                                <DollarSign className="h-5 w-5 mr-1 text-gray-400" />
                                {formatCurrency(loanDetails.amount)}
                            </p>
                        </div>
                        <div>
                            <p className="text-sm text-gray-500 mb-1">EMI Amount</p>
                            <p className="text-2xl font-bold flex items-center">
                                <CreditCard className="h-5 w-5 mr-1 text-gray-400" />
                                {formatCurrency(loanDetails.emi)}
                            </p>
                        </div>
                        <div>
                            <p className="text-sm text-gray-500 mb-1">Next EMI Date</p>
                            <p className="text-lg font-semibold flex items-center">
                                <Calendar className="h-5 w-5 mr-1 text-gray-400" />
                                {new Date(loanDetails.nextEmiDate).toLocaleDateString()}
                            </p>
                        </div>
                        <div>
                            <p className="text-sm text-gray-500 mb-1">Interest Rate</p>
                            <p className="text-xl font-semibold">{loanDetails.interestRate}%</p>
                        </div>
                        <div>
                            <p className="text-sm text-gray-500 mb-1">Tenure</p>
                            <p className="text-xl font-semibold flex items-center">
                                <Clock className="h-5 w-5 mr-1 text-gray-400" />
                                {loanDetails.tenureInMonths} months
                            </p>
                        </div>
                        <div>
                            <p className="text-sm text-gray-500 mb-1">Purpose</p>
                            <p className="text-xl font-semibold capitalize">{loanDetails.purpose}</p>
                        </div>
                    </div>

                    <Separator className="my-6" />

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <h3 className="text-lg font-medium mb-3">Financial Information</h3>
                            <div className="space-y-2">
                                <div className="flex justify-between">
                                    <span className="text-gray-500">Monthly Income</span>
                                    <span className="font-medium">{formatCurrency(loanDetails.logIncome)}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-gray-500">Debt-to-Income Ratio</span>
                                    <span className="font-medium">{(loanDetails.debtIncomeRatio * 100).toFixed(1)}%</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-gray-500">Revolving Balance</span>
                                    <span className="font-medium">{formatCurrency(loanDetails.revolvingBalance)}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-gray-500">Revolving Utilization</span>
                                    <span className="font-medium">{(loanDetails.revolvingUtilization * 100).toFixed(1)}%</span>
                                </div>
                            </div>
                        </div>
                        <div>
                            <h3 className="text-lg font-medium mb-3">Credit Information</h3>
                            <div className="space-y-2">
                                <div className="flex justify-between">
                                    <span className="text-gray-500">FICO Score</span>
                                    <span className="font-medium">{loanDetails.ficoScore}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-gray-500">Days with Credit Line</span>
                                    <span className="font-medium">{loanDetails.daysWithCreditLine}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-gray-500">Credit Inquiries (Last 6 Months)</span>
                                    <span className="font-medium">{loanDetails.inquiryLast6Months}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-gray-500">Late Payments (Last 2 Years)</span>
                                    <span className="font-medium">{loanDetails.timesLateIn2Years}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-gray-500">Default Risk</span>
                                    <span className="font-medium">{(loanDetails.defaultRiskProbability * 100).toFixed(2)}%</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </CardContent>
                <CardFooter className="flex justify-end gap-4 pt-2">
                    <Button variant="outline">Download Details</Button>
                    <Button>Contact Support</Button>
                </CardFooter>
            </Card>

            {/* Bank Account Card */}
            {/* {bankAccount && (
                <Card className="mb-8">
                    <CardHeader className="pb-2">
                        <CardTitle className="flex items-center">
                            <Currency className="mr-2 h-5 w-5" />
                            Payment Source
                        </CardTitle>
                        <CardDescription>Bank account from which EMIs will be deducted</CardDescription>
                    </CardHeader>
                    <CardContent className="pb-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            <div>
                                <p className="text-sm text-gray-500 mb-1">Account Number</p>
                                <p className="text-xl font-medium">{bankAccount.accountNo}</p>
                            </div>
                            <div>
                                <p className="text-sm text-gray-500 mb-1">Current Balance</p>
                                <p className="text-xl font-medium flex items-center">
                                    <DollarSign className="h-5 w-5 mr-1 text-gray-400" />
                                    {formatCurrency(bankAccount.balance)}
                                </p>
                            </div>
                            <div>
                                <p className="text-sm text-gray-500 mb-1">Status</p>
                                <div className="flex items-center gap-2">
                                    {bankAccount.verified ? (
                                        <Badge className="bg-green-100 text-green-800 hover:bg-green-200">Verified</Badge>
                                    ) : (
                                        <Badge className="bg-yellow-100 text-yellow-800 hover:bg-yellow-200">Pending Verification</Badge>
                                    )}
                                    {bankAccount.salarySource && (
                                        <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-200">Salary Account</Badge>
                                    )}
                                </div>
                            </div>
                        </div>
                    </CardContent>
                    {!bankAccount.verified && (
                        <CardFooter className="pt-0">
                            <Button size="sm" variant="outline">Complete Verification</Button>
                        </CardFooter>
                    )}
                </Card>
            )} */}

            {/* Mandate Details Card */}
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-2xl font-bold">Payment Mandates</h2>
                <Button
                    onClick={() => appyMandate(loanId)}
                    className="flex items-center gap-2"
                >
                    <Plus className="h-4 w-4" />
                    Apply New Mandate
                </Button>
            </div>
            {mandateDetails.length > 0 ? (
                <div className="grid grid-cols-1 gap-4">
                    {mandateDetails.map((mandate) => (
                        <Card key={mandate.id}>
                            <CardHeader className="pb-2">
                                <div className="flex justify-between items-center">
                                    {/* <CardTitle className="text-lg">Mandate #{mandate.id}</CardTitle> */}
                                    {getMandateStatusBadge(mandate.status)}
                                </div>
                                <CardDescription>Created on {new Date(mandate.createdAt).toLocaleDateString()}</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                                    <div>
                                        <p className="text-sm text-gray-500 mb-1">Amount</p>
                                        <p className="text-xl font-medium">{formatCurrency(mandate.amount)}</p>
                                    </div>
                                    <div>
                                        <p className="text-sm text-gray-500 mb-1">Type</p>
                                        <p className="text-xl font-medium">{mandate.debitType.replace('_', ' ')}</p>
                                    </div>
                                    <div>
                                        <p className="text-sm text-gray-500 mb-1">Frequency</p>
                                        <p className="text-xl font-medium">{mandate.freqType}</p>
                                    </div>
                                    <div>
                                        <p className="text-sm text-gray-500 mb-1">Valid From</p>
                                        <p className="text-xl font-medium">{new Date(mandate.startDate).toLocaleDateString()}</p>
                                    </div>
                                    <div>
                                        <p className="text-sm text-gray-500 mb-1">Valid Until</p>
                                        <p className="text-xl font-medium">{new Date(mandate.uptoDate).toLocaleDateString()}</p>
                                    </div>
                                    <div>
                                        <p className="text-sm text-gray-500 mb-1">Mandate Type</p>
                                        <p className="text-xl font-medium">{mandate.mandateVariant.split('_').map(word =>
                                            word.charAt(0) + word.slice(1).toLowerCase()).join(' ')}</p>
                                    </div>
                                </div>

                                {bankAccount && (
                                    <div className="mt-4 p-3 bg-gray-50 dark:bg-gray-800 rounded-md flex items-center">
                                        <CreditCard className="h-5 w-5 text-gray-500 dark:text-gray-400 mr-3" />
                                        <div>
                                            <p className="font-medium text-gray-900 dark:text-gray-100">Payment Source: {bankAccount.accountNo}</p>
                                            <p className="text-sm text-gray-600 dark:text-gray-400">
                                                Current Balance: {formatCurrency(bankAccount.balance)}
                                            </p>
                                        </div>
                                    </div>
                                )}

                                {mandate.predictionStatus && (
                                    <div className="mt-4 p-3 bg-blue-50 dark:bg-blue-900 rounded-md">
                                        <div className="flex items-start">
                                            <CheckCircle className="h-5 w-5 text-blue-500 dark:text-blue-300 mt-0.5 mr-2" />
                                            <div>
                                                <p className="font-medium text-gray-900 dark:text-gray-100">Prediction: {mandate.predictionStatus}</p>
                                                <p className="text-sm text-gray-600 dark:text-gray-400">
                                                    Approval probability: {(mandate.predictionProbability * 100).toFixed(1)}%
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </CardContent>
                            <CardFooter className="flex justify-end gap-4 pt-0">
                                <Button variant="outline" size="sm">View Details</Button>
                                {mandate.status === 'PENDING' && (
                                    <Button size="sm">Complete Setup</Button>
                                )}
                            </CardFooter>
                        </Card>
                    ))}
                </div>
            ) : (
                <Card>
                    <CardContent className="py-6">
                        <div className="text-center">
                            <p className="text-lg text-gray-500">No payment mandates found for this loan.</p>
                            <Button
                                className="mt-4"
                                onClick={() => appyMandate(loanId)}
                            >
                                Set Up Payment Mandate
                            </Button>
                        </div>
                    </CardContent>
                </Card>
            )}
        </div>
    );
}