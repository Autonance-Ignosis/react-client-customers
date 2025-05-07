import { useEffect, useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { toast } from "sonner";
import { Search, CreditCard } from "lucide-react";
import { ProgressSteps } from "@/components/ui-custom/ProgressSteps";
import axios from "axios";
import { DatePicker } from "@/components/ui-custom/Date-Picker";
import { useSelector } from "react-redux";
import { Mandate } from "@/types/Mandate";
import { useNavigate } from "react-router-dom";

interface MandateApplicationFormProps {
  bankId: string;
  loanAmount: number;
  emi: number;
  loanId: string;
  // onConfirm: () => void;
}

// Enum values for dropdown selections
const MANDATE_VARIANTS = {
  E_NACH_AADHAAR_NETBANKING_CREDITCARD: "E-NACH (Aadhaar, Netbanking, Credit Card)"
};

const CATEGORY_TYPES = {
  BILL_PAYMENT_CREDIT_CARD: "Bill Payment - Credit Card",
  B2B_CORPORATE: "B2B Corporate",
  SUBSCRIPTION_FEES: "Subscription Fees",
  INSUARANCE_PREMIUM: "Insurance Premium",
  INSUARANCE_OTHER_PAYMENT: "Insurance Other Payment",
  EMI_LOAN_REPAYMENT: "EMI Loan Repayment"
};

const FREQUENCY_TYPES = {
  ADHO: "Ad-hoc",
  INTRA_DAY: "Intra-day",
  DAILY: "Daily",
  WEEKLY: "Weekly",
  MONTHLY: "Monthly",
  BY_MONTHLY: "Bi-monthly",
  QUARTERLY: "Quarterly",
  SEMI_ANNUALLY: "Semi-annually",
  YEARLY: "Yearly"
};

const DEBIT_TYPES = {
  FIXED: "Fixed",
  VARIABLE: "Variable",
  ONE_TIME: "One Time"
};

const SEQUENCE_TYPES = {
  RECURRING: "Recurring",
  ONE_TIME: "One Time"
};

// Steps configuration
const steps = [
  { id: 0, name: "Credit Details", description: "Credit account information" },
  { id: 1, name: "Mandate Details", description: "E-mandate specifics" },
  { id: 2, name: "Contact Details", description: "Communication details" },
];

export default function MandateApplicationForm({
  bankId,
  emi,
  loanId,
  // onConfirm,
}: MandateApplicationFormProps) {
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [agreeToTerms, setAgreeToTerms] = useState(false);
  const [startDate, setStartDate] = useState<Date>(new Date());
  const [endDate, setEndDate] = useState<Date | undefined>(undefined);
  const [upTo40Years, setUpTo40Years] = useState(false);
  const user = useSelector((state: any) => state.user);

  // Form state
  const [formData, setFormData] = useState({
    // Credit Card Details
    creditAccountNo: "",
    creditAccountName: "",
    creditIfscCode: "",

    // Mandate Details
    mandateVariant: "E_NACH_AADHAAR_NETBANKING_CREDITCARD",
    category: "",
    debitType: "",
    seqType: "RECURRING", // Default to RECURRING
    freqType: "MONTHLY", // Default to MONTHLY
    schemaName: "",
    amount: emi,
    startDate: new Date().toISOString().split("T")[0],
    uptoDate: "",
    upTo40Years: false,
    consRefNo: "",

    // Contact Details
    phoneNo: "",
    mobileNo: "",
    emailId: "",
  });

  const navigate = useNavigate();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSelectChange = (name: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleCheckboxChange = (name: string, checked: boolean) => {
    if (name === "upTo40Years") {
      setUpTo40Years(checked);

      // Calculate 40 years from today if checked
      if (checked) {
        const today = new Date();
        const futureDate = new Date();
        futureDate.setFullYear(today.getFullYear() + 40);
        setEndDate(futureDate);
        setFormData((prev) => ({
          ...prev,
          uptoDate: futureDate.toISOString().split("T")[0],
          upTo40Years: checked,
        }));
      } else {
        setEndDate(undefined);
        setFormData((prev) => ({
          ...prev,
          uptoDate: "",
          upTo40Years: checked,
        }));
      }
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: checked,
      }));
    }
  };

  // Fetch bank account and bank details
  useEffect(() => {
    setIsLoading(true);

    // Fetch bank account details
    if (user && user.user && user.user.id) {
      axios
        .get(
          `http://localhost:8080/api/bank-accounts/${bankId}/${user.user.id}`
        )
        .then((res) => {
          if (res.data && res.data.length > 0) {
            setFormData((prev) => ({
              ...prev,
              creditAccountNo: res.data[0].accountNo || "",
              mobileNo: user.user.phone || "",
              emailId: user.user.email || "",
            }));
            console.log("Fetched bank account:", res.data);
          }
        })
        .catch((err) => {
          console.error("Failed to fetch bank account:", err);
          toast.error("Failed to load bank account details");
        });

      // Fetch bank details
      axios
        .get(`http://localhost:8080/api/banks/id/${bankId}`)
        .then((res) => {
          console.log("Fetched bank:", res.data);
          if (res.data) {
            setFormData((prev) => ({
              ...prev,
              creditAccountName: res.data.name || "",
              creditIfscCode: res.data.ifsc || "",
            }));
          }
        })
        .catch((err) => {
          console.error("Failed to fetch bank:", err);
          toast.error("Failed to load bank details");
        })
        .finally(() => setIsLoading(false));
    } else {
      setIsLoading(false);
    }
  }, [bankId, user]);

  useEffect(() => {
    // Update form data when start date changes
    if (startDate) {
      setFormData((prev) => ({
        ...prev,
        startDate: startDate.toISOString().split("T")[0],
      }));
    }

    // Update form data when end date changes
    if (endDate) {
      setFormData((prev) => ({
        ...prev,
        uptoDate: endDate.toISOString().split("T")[0],
      }));
    }
  }, [startDate, endDate]);

  const nextStep = () => {
    // Validate current step
    if (!validateCurrentStep()) {
      return;
    }

    if (currentStepIndex < steps.length - 1) {
      setCurrentStepIndex((prev) => prev + 1);
      window.scrollTo(0, 0); // Scroll to top when changing steps
    } else {
      handleSubmit();
      // navigate("/dashboard");
    }
  };

  const prevStep = () => {
    if (currentStepIndex > 0) {
      setCurrentStepIndex((prev) => prev - 1);
      window.scrollTo(0, 0); // Scroll to top when changing steps
    }
  };

  const validateCurrentStep = () => {
    switch (currentStepIndex) {
      case 0: // Credit Details
        if (
          !formData.creditAccountNo ||
          !formData.creditAccountName ||
          !formData.creditIfscCode
        ) {
          toast.error("Please fill all credit account details");
          return false;
        }
        break;
      case 1: // Mandate Details
        if (
          !formData.category ||
          !formData.debitType ||
          !formData.seqType ||
          !formData.freqType ||
          !formData.schemaName ||
          !formData.amount ||
          !formData.startDate ||
          (!formData.uptoDate && !upTo40Years) ||
          !formData.consRefNo
        ) {
          toast.error("Please fill all mandate details");
          return false;
        }
        break;
      case 2: // Contact Details
        if (!agreeToTerms) {
          toast.error("Please agree to the terms and conditions");
          return false;
        }
        break;
    }
    return true;
  };

  const validateEmail = (email: string) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const handleSubmit = async () => {
    if (!validateCurrentStep()) {
      return;
    }

    setIsLoading(true);

    const mandatePayload: Mandate = {
      loanId: loanId,
      userId: user.user.id,
      bankAccountId: bankId,
      mandateVariant: formData.mandateVariant,
      category: formData.category,
      debitType: formData.debitType,
      seqType: formData.seqType,
      freqType: formData.freqType,
      schemaName: formData.schemaName,
      consRefNo: formData.consRefNo,
      amount: Number(formData.amount),
      startDate: formData.startDate,
      uptoDate: formData.uptoDate,
      upTo40Years: formData.upTo40Years,
    };

    console.log("Mandate Payload:", mandatePayload);

    try {
      const response = await axios.post(
        "http://localhost:8080/api/mandates",
        mandatePayload
      );
      console.log("Mandate submitted:", response.data);
      toast.success("Mandate application submitted successfully");
      // onConfirm();
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.error(
          "Mandate submission failed:",
          error.response?.data || error.message
        );
        toast.error(
          `Submission failed: ${error.response?.data?.message || "Please try again later"
          }`
        );
      } else {
        console.error("Unknown error:", error);
        toast.error("An unexpected error occurred");
      }
    } finally {
      setIsLoading(false);
    }
  };

  // Render Credit Card Details Step
  const renderCreditCardDetailsStep = () => {
    return (
      <div className="space-y-6">
        <div className="flex items-center gap-2 mb-4">
          <CreditCard className="h-6 w-6 text-primary" />
          <h3 className="text-lg font-medium">Credit Account Details</h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <Label htmlFor="creditAccountNo" className="flex">
              Credit A/c No. <span className="text-red-500 ml-1">*</span>
            </Label>
            <div className="relative">
              <Input
                id="creditAccountNo"
                name="creditAccountNo"
                value={formData.creditAccountNo}
                placeholder="Enter Credit Account Number"
                disabled={true}
                className="pr-10"
              />
              <Button
                type="button"
                variant="ghost"
                size="icon"
                className="absolute right-0 top-0 h-full"
                onClick={() => toast.info("Searching for account...")}
              >
                <Search className="h-4 w-4" />
              </Button>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="creditAccountName" className="flex">
              Credit A/c Name <span className="text-red-500 ml-1">*</span>
            </Label>
            <Input
              id="creditAccountName"
              name="creditAccountName"
              value={formData.creditAccountName}
              placeholder="Enter Credit Account Name"
              disabled={true}
            />
          </div>

          <div className="space-y-2 md:col-span-2">
            <Label htmlFor="creditIfscCode" className="flex">
              IFSC Code <span className="text-red-500 ml-1">*</span>
            </Label>
            <Input
              id="creditIfscCode"
              name="creditIfscCode"
              value={formData.creditIfscCode}
              placeholder="Enter Credit IFSC Code"
              disabled={true}
            />
          </div>
        </div>
      </div>
    );
  };

  // Render Mandate Details Step
  const renderMandateDetailsStep = () => {
    return (
      <div className="space-y-6">
        <div className="flex items-center gap-2 mb-4">
          <CreditCard className="h-6 w-6 text-primary" />
          <h3 className="text-lg font-medium">Mandate Details</h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <Label htmlFor="mandateVariant" className="flex">
              Mandate Variant <span className="text-red-500 ml-1">*</span>
            </Label>
            <Select
              value={formData.mandateVariant}
              onValueChange={(value) =>
                handleSelectChange("mandateVariant", value)
              }
              disabled={true}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select Mandate Variant" />
              </SelectTrigger>
              <SelectContent>
                {Object.entries(MANDATE_VARIANTS).map(([value, label]) => (
                  <SelectItem key={value} value={value}>
                    {label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="category" className="flex">
              Category <span className="text-red-500 ml-1">*</span>
            </Label>
            <Select
              value={formData.category}
              onValueChange={(value) =>
                setFormData((prev) => ({ ...prev, category: value }))
              }
            >
              <SelectTrigger>
                <SelectValue placeholder="Select Category" />
              </SelectTrigger>
              <SelectContent>
                {Object.entries(CATEGORY_TYPES).map(([value, label]) => (
                  <SelectItem key={value} value={value}>
                    {label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="seqType" className="flex">
              Sequence Type <span className="text-red-500 ml-1">*</span>
            </Label>
            <Select
              value={formData.seqType}
              onValueChange={(value) =>
                setFormData((prev) => ({ ...prev, seqType: value }))
              }
            >
              <SelectTrigger>
                <SelectValue placeholder="Select Sequence Type" />
              </SelectTrigger>
              <SelectContent>
                {Object.entries(SEQUENCE_TYPES).map(([value, label]) => (
                  <SelectItem key={value} value={value}>
                    {label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="freqType" className="flex">
              Frequency Type <span className="text-red-500 ml-1">*</span>
            </Label>
            <Select
              value={formData.freqType}
              onValueChange={(value) =>
                setFormData((prev) => ({ ...prev, freqType: value }))
              }
            >
              <SelectTrigger>
                <SelectValue placeholder="Select Frequency Type" />
              </SelectTrigger>
              <SelectContent>
                {Object.entries(FREQUENCY_TYPES).map(([value, label]) => (
                  <SelectItem key={value} value={value}>
                    {label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="debitType" className="flex">
              Debit Type <span className="text-red-500 ml-1">*</span>
            </Label>
            <Select
              value={formData.debitType}
              onValueChange={(value) =>
                setFormData((prev) => ({ ...prev, debitType: value }))
              }
            >
              <SelectTrigger>
                <SelectValue placeholder="Select Debit Type" />
              </SelectTrigger>
              <SelectContent>
                {Object.entries(DEBIT_TYPES).map(([value, label]) => (
                  <SelectItem key={value} value={value}>
                    {label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="schemaName" className="flex">
              Schema Name <span className="text-red-500 ml-1">*</span>
            </Label>
            <Input
              id="schemaName"
              name="schemaName"
              value={formData.schemaName}
              onChange={handleInputChange}
              placeholder="Enter Schema Name"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="amount" className="flex">
              Amount (₹) <span className="text-red-500 ml-1">*</span>
            </Label>
            <Input
              id="amount"
              name="amount"
              type="number"
              value={formData.amount}
              onChange={handleInputChange}
              placeholder="Enter Amount"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="consRefNo" className="flex">
              Consumer Ref. No. <span className="text-red-500 ml-1">*</span>
            </Label>
            <Input
              id="consRefNo"
              name="consRefNo"
              value={formData.consRefNo}
              onChange={handleInputChange}
              placeholder="Enter Reference Number"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="startDate" className="flex">
              Start Date <span className="text-red-500 ml-1">*</span>
            </Label>
            <DatePicker
              id="startDate"
              name="startDate"
              date={startDate}
              setDate={(date) => date && setStartDate(date)}
              placeholder="Select Start Date"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="uptoDate" className="flex">
              Upto Date <span className="text-red-500 ml-1">*</span>
            </Label>
            <div className="space-y-2">
              <DatePicker
                id="uptoDate"
                name="uptoDate"
                date={endDate}
                setDate={setEndDate}
                disabled={upTo40Years}
                placeholder="Select End Date"
              />
              <div className="flex items-center space-x-2 mt-2">
                <Checkbox
                  id="upTo40Years"
                  checked={upTo40Years}
                  onCheckedChange={(checked) =>
                    handleCheckboxChange("upTo40Years", checked === true)
                  }
                />
                <Label htmlFor="upTo40Years" className="text-sm">
                  Up to 40 years
                </Label>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  // Render Contact Details Step
  const renderContactDetailsStep = () => {
    return (
      <div className="space-y-6">
        <div className="flex items-center gap-2 mb-4">
          <CreditCard className="h-6 w-6 text-primary" />
          <h3 className="text-lg font-medium">Terms and Conditions</h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="md:col-span-2 mt-4 p-4 bg-muted/30 rounded-lg border">
            <div className="flex items-start space-x-3">
              <Checkbox
                id="agreeToTerms"
                checked={agreeToTerms}
                onCheckedChange={(checked) => setAgreeToTerms(checked === true)}
                className="mt-1"
              />
              <Label htmlFor="agreeToTerms" className="text-sm">
                I authorize the bank to debit my account as per the mandate
                instructions. I have read and agree to the terms and conditions.
                I understand that this authorization will remain in effect until
                I cancel it in writing, and I agree to notify the bank of any
                changes in my account information or termination of this
                authorization at least 15 days prior to the next billing date.
              </Label>
            </div>
          </div>
        </div>
      </div>
    );
  };

  // Render current step
  const renderStep = () => {
    switch (currentStepIndex) {
      case 0:
        return renderCreditCardDetailsStep();
      case 1:
        return renderMandateDetailsStep();
      case 2:
        return renderContactDetailsStep();
      default:
        return null;
    }
  };

  return (
    <Card className="p-6 shadow-md">
      <ProgressSteps
        steps={steps}
        currentStep={currentStepIndex}
        className="mb-8"
        showDescriptions={true}
      />

      <div className="space-y-6">{renderStep()}</div>

      <div className="mt-8 flex justify-between">
        <Button
          variant="outline"
          onClick={prevStep}
          disabled={currentStepIndex === 0 || isLoading}
        >
          Back
        </Button>

        <Button
          onClick={nextStep}
          disabled={isLoading}
          className="bg-primary hover:bg-primary/90"
        >
          {isLoading ? (
            <div className="flex items-center gap-2">
              <div className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent"></div>
              Processing...
            </div>
          ) : currentStepIndex === steps.length - 1 ? (
            "Submit Application"
          ) : (
            "Continue"
          )}
        </Button>
      </div>
    </Card>
  );
}