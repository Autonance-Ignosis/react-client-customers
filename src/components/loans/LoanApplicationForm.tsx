"use client";

import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { ProgressSteps } from "../ui-custom/ProgressSteps";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { GlassCard } from "../ui-custom/GlassCard";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import axios from "axios";

// Steps configuration
const steps = [
  { id: 0, name: "Loan Detail", title: "Loan Detail" },
  { id: 1, name: "Financial", title: "Financial Details" },
  { id: 2, name: "Loan", title: "Loan Requirements" },
  { id: 3, name: "Credit", title: "Credit Information" },
  { id: 4, name: "Review", title: "Review & Submit" },
];

interface LoanOffer {
  id: number;
  bankId: number;
  offerName: string | null;
  interestRate: number;
  maxTenureInMonths: number;
  maxAmount: number;
  description: string;
}

export function LoanApplicationForm({ loanId }: { loanId?: number }) {
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingOffer, setIsLoadingOffer] = useState(false);
  const [agreeToTerms, setAgreeToTerms] = useState(false);
  const [loanOffer, setLoanOffer] = useState<LoanOffer | null>(null);
  const navigate = useNavigate();

  // Get user data from Redux store
  const { user } = useSelector((state: any) => state.user) || {};

  console.log("User Data:", loanId);

  // Form state
  const [formData, setFormData] = useState({
    userId: user?.id || 1,
    bankAccountId: 1,
    loanOfferId: loanId || 0,
    appliedBankId: 0,
    amount: 500000,
    tenureInMonths: 24,
    interestRate: 9.5,
    creditCriteriaMet: true,
    purpose: "HOME",
    logIncome: 50000,
    debtIncomeRatio: 0.3,
    ficoScore: 700,
    daysWithCreditLine: 365,
    revolvingBalance: 50000,
    revolvingUtilization: 0.25,
    inquiryLast6Months: 1,
    timesLateIn2Years: 0,
    derogatoryPublicRecords: 0,
  });

  useEffect(() => {
    // Fetch loan offer details if loanId is provided
    if (loanId) {
      fetchLoanOffer(loanId);
    }
  }, [loanId]);

  const fetchLoanOffer = async (id: number) => {
    setIsLoadingOffer(true);
    try {
      const { data } = await axios.get(
        `http://localhost:8080/api/loan-offers/${loanId}`
      );

      console.log("Loan Offer Data:", data);

      setLoanOffer(data);
      setFormData((prev) => ({
        ...prev,
        loanOfferId: data.id,
        interestRate: data.interestRate,
        maxTenureInMonths: data.maxTenureInMonths,
        maxAmount: data.maxAmount,
        purpose: data.loanType,
        appliedBankId: data.bankId,
      }));
    } catch (error) {
      console.log(error);
      toast.error("Failed to fetch loan offer details");
    } finally {
      setIsLoadingOffer(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "number" ? parseFloat(value) : value,
    }));
  };

  const handleSelectChange = (name: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSliderChange = (name: string, value: number[]) => {
    setFormData((prev) => ({
      ...prev,
      [name]: value[0],
    }));
  };

  const handleSwitchChange = (name: string, checked: boolean) => {
    setFormData((prev) => ({
      ...prev,
      [name]: checked,
    }));
  };

  const handleCheckboxChange = (name: string, checked: boolean) => {
    setFormData((prev) => ({
      ...prev,
      [name]: checked,
    }));
  };

  const nextStep = () => {
    if (currentStepIndex < steps.length - 1) {
      setCurrentStepIndex((prev) => prev + 1);
    } else {
      handleSubmit();
      navigate("/dashboard");
    }
  };

  const prevStep = () => {
    if (currentStepIndex > 0) {
      setCurrentStepIndex((prev) => prev - 1);
    }
  };

  const handleSubmit = async () => {
    if (!agreeToTerms) {
      toast.error("Please agree to the terms and conditions");
      return;
    }

    setIsLoading(true);
    try {
      // Mock API call - replace with actual API call

      const response = await axios.post(
        "http://localhost:8080/api/loans",
        formData
      );
      console.log("Response:", response.data);
      toast.success("Loan application submitted successfully!");
      // navigate("/dashboard/loans")
    } catch (error) {
      toast.error("Failed to submit loan application");
    } finally {
      setIsLoading(false);
    }
  };

  const renderPersonalInfoStep = () => {
    return (
      <div className="space-y-6">
        {/* <div className="space-y-2">
          <Label htmlFor="userId">User ID</Label>
          <Input
            id="userId"
            name="userId"
            value={formData.userId}
            onChange={handleInputChange}
            disabled
          />
        </div> */}

        <div className="space-y-2">
          {/*  display data fetch using loan id    */}

          <div className="space-y-6">
            <div className="space-y-2">
              <div className="flex justify-center">
                <Label htmlFor="loanDetails">Loan Details</Label>
              </div>

              {loanOffer ? (
                <div className="p-4 bg-black-100 rounded-lg">
                  <p>
                    <strong>Loan Offer Name:</strong> {loanOffer.offerName}
                  </p>
                  <p>
                    <strong>Description:</strong> {loanOffer.description}
                  </p>
                  <p>
                    <strong>Interest Rate:</strong> {loanOffer.interestRate}%
                  </p>
                  <p>
                    <strong>Maximum Loan Amount:</strong> &#8377;
                    {loanOffer.maxAmount.toLocaleString()}
                  </p>
                  <p>
                    <strong>Maximum Tenure:</strong>{" "}
                    {loanOffer.maxTenureInMonths} months
                  </p>
                </div>
              ) : (
                <p>Loading loan details...</p>
              )}
            </div>
          </div>
        </div>

        <div className="space-y-2"></div>
      </div>
    );
  };

  const renderFinancialDetailsStep = () => {
    return (
      <div className="space-y-6">
        <div className="space-y-2">
          <Label htmlFor="logIncome">Monthly Income &#8377;</Label>
          <Input
            id="logIncome"
            name="logIncome"
            type="number"
            min="0"
            value={formData.logIncome}
            onChange={handleInputChange}
          />
        </div>

        <div className="space-y-2">
          <Label>
            Debt-to-Income Ratio: {(formData.debtIncomeRatio * 100).toFixed(0)}%
          </Label>
          <Slider
            defaultValue={[formData.debtIncomeRatio * 100]}
            max={100}
            step={1}
            onValueChange={(value) =>
              handleSliderChange("debtIncomeRatio", [value[0] / 100])
            }
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="revolvingBalance">
            Current Revolving Balance &#8377;
          </Label>
          <Input
            id="revolvingBalance"
            name="revolvingBalance"
            type="number"
            min="0"
            value={formData.revolvingBalance}
            onChange={handleInputChange}
          />
        </div>

        <div className="space-y-2">
          <Label>
            Revolving Utilization:{" "}
            {(formData.revolvingUtilization * 100).toFixed(0)}%
          </Label>
          <Slider
            defaultValue={[formData.revolvingUtilization * 100]}
            max={100}
            step={1}
            onValueChange={(value) =>
              handleSliderChange("revolvingUtilization", [value[0] / 100])
            }
          />
        </div>
      </div>
    );
  };

  const renderLoanRequirementsStep = () => {
    return (
      <div className="space-y-6">
        {loanOffer && (
          <Card className="mb-6 bg-blue-900">
            <CardHeader>
              <CardTitle>{loanOffer.offerName}</CardTitle>
              <CardDescription>{loanOffer.description}</CardDescription>
            </CardHeader>
            <CardContent>
              <p>Interest Rate: {loanOffer.interestRate}%</p>
              <p>
                Maximum Loan Amount: &#8377;
                {loanOffer.maxAmount.toLocaleString()}
              </p>
              <p>Maximum Tenure: {loanOffer.maxTenureInMonths} months</p>
            </CardContent>
          </Card>
        )}

        <div className="space-y-2">
          <Label htmlFor="amount">
            Loan Amount: &#8377;{formData.amount.toLocaleString()}
          </Label>
          <Slider
            defaultValue={[formData.amount]}
            min={100000}
            max={loanOffer?.maxAmount || 1000000}
            step={10000}
            onValueChange={(value) => handleSliderChange("amount", value)}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="tenureInMonths">
            Loan Tenure: {formData.tenureInMonths} months
          </Label>
          <Slider
            defaultValue={[formData.tenureInMonths]}
            min={12}
            max={loanOffer?.maxTenureInMonths || 60}
            step={6}
            onValueChange={(value) =>
              handleSliderChange("tenureInMonths", value)
            }
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="interestRate">
            Interest Rate: {formData.interestRate}%
          </Label>
          <Input
            id="interestRate"
            name="interestRate"
            type="number"
            step="0.1"
            value={formData.interestRate}
            onChange={handleInputChange}
            disabled={!!loanOffer}
          />
        </div>

        {/* Monthly payment calculation */}
        <div className="bg-green-700 p-4 rounded-lg">
          <p className="font-medium">Estimated Monthly Payment</p>
          <p className="text-2xl font-bold">
            &#8377;
            {(
              (formData.amount * (formData.interestRate / 1200)) /
              (1 -
                Math.pow(
                  1 + formData.interestRate / 1200,
                  -formData.tenureInMonths
                ))
            ).toFixed(2)}
          </p>
          <p className="text-sm text-gray-200">
            Total repayment: &#8377;
            {(
              ((formData.amount * (formData.interestRate / 1200)) /
                (1 -
                  Math.pow(
                    1 + formData.interestRate / 1200,
                    -formData.tenureInMonths
                  ))) *
              formData.tenureInMonths
            ).toFixed(2)}
          </p>
        </div>
      </div>
    );
  };

  const renderCreditInfoStep = () => {
    return (
      <div className="space-y-6">
        <div className="space-y-2">
          <Label htmlFor="ficoScore">FICO Credit Score</Label>
          <Input
            id="ficoScore"
            name="ficoScore"
            type="number"
            min="300"
            max="850"
            value={formData.ficoScore}
            onChange={handleInputChange}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="daysWithCreditLine">Days with Credit Line</Label>
          <Input
            id="daysWithCreditLine"
            name="daysWithCreditLine"
            type="number"
            min="0"
            value={formData.daysWithCreditLine}
            onChange={handleInputChange}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="inquiryLast6Months">
            Number of Credit Inquiries (Last 6 Months)
          </Label>
          <Input
            id="inquiryLast6Months"
            name="inquiryLast6Months"
            type="number"
            min="0"
            value={formData.inquiryLast6Months}
            onChange={handleInputChange}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="timesLateIn2Years">
            Late Payments (Last 2 Years)
          </Label>
          <Input
            id="timesLateIn2Years"
            name="timesLateIn2Years"
            type="number"
            min="0"
            value={formData.timesLateIn2Years}
            onChange={handleInputChange}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="derogatoryPublicRecords">
            Derogatory Public Records
          </Label>
          <Input
            id="derogatoryPublicRecords"
            name="derogatoryPublicRecords"
            type="number"
            min="0"
            value={formData.derogatoryPublicRecords}
            onChange={handleInputChange}
          />
        </div>

        <div className="flex items-center space-x-2">
          <Switch
            id="creditCriteriaMet"
            checked={formData.creditCriteriaMet}
            onCheckedChange={(checked) =>
              handleSwitchChange("creditCriteriaMet", checked)
            }
          />
          <Label htmlFor="creditCriteriaMet">
            I confirm that the credit information provided is accurate and
            incase of wrong information banks are allowed to take legal action
            against me.
          </Label>
        </div>
      </div>
    );
  };

  const renderReviewStep = () => {
    // Calculate some summary values
    const monthlyPayment =
      (formData.amount * (formData.interestRate / 1200)) /
      (1 -
        Math.pow(1 + formData.interestRate / 1200, -formData.tenureInMonths));
    const totalRepayment = monthlyPayment * formData.tenureInMonths;
    const totalInterest = totalRepayment - formData.amount;

    return (
      <div className="space-y-6">
        <h3 className="text-lg font-medium">Review Your Application</h3>

        <div className="bg-gray-800 p-4 rounded-lg space-y-4">
          <div>
            <h4 className="font-medium">Loan Details</h4>
            <p>Amount: &#8377;{formData.amount.toLocaleString()}</p>
            <p>
              Purpose:{" "}
              {formData.purpose.charAt(0).toUpperCase() +
                formData.purpose.slice(1)}
            </p>
            <p>Tenure: {formData.tenureInMonths} months</p>
            <p>Interest Rate: {formData.interestRate}%</p>
          </div>

          <div>
            <h4 className="font-medium">Payment Summary</h4>
            <p>Monthly Payment: &#8377;{monthlyPayment.toFixed(2)}</p>
            <p>Total Repayment: &#8377;{totalRepayment.toFixed(2)}</p>
            <p>Total Interest: &#8377;{totalInterest.toFixed(2)}</p>
          </div>

          <div>
            <h4 className="font-medium">Credit Information</h4>
            <p>FICO Score: {formData.ficoScore}</p>
            <p>
              Credit Age: {(formData.daysWithCreditLine / 365).toFixed(1)} years
            </p>
            <p>
              Debt-to-Income Ratio:{" "}
              {(formData.debtIncomeRatio * 100).toFixed(0)}%
            </p>
            <p>Recent Inquiries: {formData.inquiryLast6Months}</p>
          </div>
        </div>

        <div className="flex items-center space-x-2">
          <Checkbox
            id="agreeToTerms"
            checked={agreeToTerms}
            onCheckedChange={(checked) => setAgreeToTerms(checked === true)}
          />
          <Label htmlFor="agreeToTerms" className="text-sm">
            I agree to the terms and conditions, and confirm that all
            information provided is accurate. I understand that providing false
            information may result in my application being rejected.
          </Label>
        </div>
      </div>
    );
  };

  const renderStep = () => {
    switch (currentStepIndex) {
      case 0:
        return renderPersonalInfoStep();
      case 1:
        return renderFinancialDetailsStep();
      case 2:
        return renderLoanRequirementsStep();
      case 3:
        return renderCreditInfoStep();
      case 4:
        return renderReviewStep();
      default:
        return handleSubmit();
    }
  };

  return (
    <div className="max-w-3xl mx-auto">
      <ProgressSteps
        steps={steps}
        currentStep={currentStepIndex}
        className="mb-8"
      />

      <GlassCard className="p-6">
        <div className="space-y-6">{renderStep()}</div>

        <div className="mt-8 flex justify-between">
          <Button
            variant="outline"
            onClick={prevStep}
            disabled={currentStepIndex === 0 || isLoading}
          >
            Back
          </Button>

          <Button onClick={nextStep} disabled={isLoading}>
            {isLoading
              ? "Processing..."
              : currentStepIndex === steps.length - 1
              ? "Submit Application"
              : "Continue"}
          </Button>
        </div>
      </GlassCard>
    </div>
  );
}
