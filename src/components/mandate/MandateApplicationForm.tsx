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
import { Search, CreditCard, Phone, Mail } from "lucide-react";
import { ProgressSteps } from "@/components/ui-custom/ProgressSteps";
import axios from "axios";
import { DatePicker } from "../ui-custom/Date-Picker";
import { useSelector } from "react-redux";
import { Bank } from "@/types/loan";

interface MandateApplicationFormProps {
  bankId: string;
  loanAmount: number;
  emi: number;
  loanId: string;
  onConfirm: () => void;
}

// Steps configuration
const steps = [
  { id: 0, name: "Credit Details", description: "Credit account information" },
  { id: 1, name: "Mandate Details", description: "E-mandate specifics" },
  { id: 2, name: "Debit Details", description: "Debit account information" },
  { id: 3, name: "Contact Details", description: "Communication details" },
];

export default function MandateApplicationForm({
  bankId,
  loanAmount,
  emi,
  loanId,
  onConfirm,
}: MandateApplicationFormProps) {
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [agreeToTerms, setAgreeToTerms] = useState(false);
  const [startDate, setStartDate] = useState<Date>(new Date());
  const [endDate, setEndDate] = useState<Date | undefined>(undefined);
  const [upTo40Years, setUpTo40Years] = useState(false);
  

  // Form state
  const [formData, setFormData] = useState({
    // Credit Card Details
    creditAccountNo: "",
    creditAccountName: "",
    creditIfscCode: "",

    // Mandate Details
    mandateVariant: "E-NACH (Aadhaar, Netbanking)",
    category: "",
    debitType: "",
    schemaName: "",
    amount: emi,
    startDate: new Date().toISOString().split("T")[0],
    uptoDate: "",
    upTo40Years: false,
    consRefNo: "",

    // Debit Card Details
    accountNo: "",
    accountName: "",
    accountType: "",
    ifscCode: "",
    panNo: "",
    destBank: "",

    // Contact Details
    phoneNo: "",
    mobileNo: "",
    emailId: "",
  });

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
    setFormData((prev) => ({
      ...prev,
      [name]: checked,
    }));

    // Handle special case for 40 years checkbox
    if (name === "upTo40Years" && checked) {
      // Calculate 40 years from today
      const today = new Date();
      const futureDate = new Date();
      futureDate.setFullYear(today.getFullYear() + 40);
      setFormData((prev) => ({
        ...prev,
        uptoDate: futureDate.toISOString().split("T")[0],
      }));
    }
  };

  const user = useSelector((state: any) => state.user);
  console.log("User from Redux:", user);

  useEffect(() => {
    axios
      .get(`http://localhost:8083/api/bank-accounts/${bankId}/${user.user.id}`)
      .then((res) => {
        setFormData((prev) => ({
          ...prev,
          creditAccountNo: res.data[0].accountNo,
        }));
        console.log("Fetched bank account:", res.data);
      })
      .catch((err) => {
        console.error("Failed to fetch bank account:", err);
      })
      .finally(() => setIsLoading(false));

    axios
      .get(`http://localhost:8083/api/banks/id/${bankId}`)
      .then((res) => {
        console.log("Fetched bank:", res.data);

        if (res.data) {
          setFormData((prev) => ({
            ...prev,
            creditAccountName: res.data.name,
            creditIfscCode: res.data.ifsc,
          }));
        }
      })
      .catch((err) => {
        console.error("Failed to fetch bank:", err);
      });

           

  }, [bankId, user.user.id]); 



  const nextStep = () => {
    // Validate current step
    if (!validateCurrentStep()) {
      return;
    }

    if (currentStepIndex < steps.length - 1) {
      setCurrentStepIndex((prev) => prev + 1);
    } else {
      handleSubmit();
    }
  };

  const prevStep = () => {
    if (currentStepIndex > 0) {
      setCurrentStepIndex((prev) => prev - 1);
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
          toast.error("Please fill all credit card details");
          return false;
        }
        break;
      case 1: // Mandate Details
        if (
          !formData.category ||
          !formData.debitType ||
          !formData.schemaName ||
          !formData.startDate
        ) {
          toast.error("Please fill all mandate details");
          return false;
        }
        break;
      case 2: // Debit Card Details
        if (
          !formData.accountNo ||
          !formData.accountName ||
          !formData.accountType ||
          !formData.ifscCode
        ) {
          toast.error("Please fill all debit card details");
          return false;
        }
        break;
      case 3: // Contact Details
        if (!formData.mobileNo || !formData.emailId) {
          toast.error("Please fill all required contact details");
          return false;
        }
        if (!validateEmail(formData.emailId)) {
          toast.error("Please enter a valid email address");
          return false;
        }
        break;
    }
    return true;
  };

  const validateEmail = (email: string) => {
    // Basic email validation
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const handleSubmit = async () => {
    setIsLoading(true);
    // Simulate API call

    setIsLoading(false);
    console.log("Form submitted:", formData);

    const payload = {
      loanId: loanId,
      userId: user.user.id,
      bankAccountId: bankId,
      mandateVariant: "E_NACH_AADHAAR_NETBANKING_CREDITCARD",
      category: formData.category,
      debitType: formData.debitType,
      seqType: "RECURRING",
      freqType: "MONTHLY",
      schemaName: formData.schemaName,
      consRefNo: formData.consRefNo,
      amount: formData.amount,
      startDate: formData.startDate,
      uptoDate: formData.uptoDate,
      upTo40Years: formData.upTo40Years,
      debitAccountNumber: formData.accountNo,
      debitAccountName: formData.accountName,
      accountType: formData.accountType,
      debitIfscCode: formData.ifscCode,
      panNumber: formData.panNo,
      destinationBank: formData.destBank,
      phoneNo: formData.phoneNo,
      mobileNo: formData.mobileNo,
      emailId: formData.emailId,
    };

    try {
      const response = await axios.post(
        "http://localhost:8085/api/mandates",
        payload
      );
      console.log("Mandate submitted:", response.data);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.error(
          "Mandate submission failed:",
          error.response?.data || error.message
        );
      } else {
        console.error("Unknown error:", error);
      }
    }

    onConfirm();
  };
  
  

  // Render Credit Card Details Step
  const renderCreditCardDetailsStep = () => {
    
    return (
        
      <div className="space-y-6">
        <h3 className="text-lg font-medium">Credit Account Detail (Sponsor)</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
              onChange={handleInputChange}
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
        <h3 className="text-lg font-medium">Mandate Details</h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="mandateVariant" className="flex">
              Mandate Variant <span className="text-red-500 ml-1">*</span>
            </Label>
            <Select
              value={formData.mandateVariant}
              onValueChange={(value) =>
                handleSelectChange("mandateVariant", value)
              }
            >
              <SelectTrigger>
                <SelectValue placeholder="Select Mandate Variant" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="E-NACH (Aadhaar, Netbanking)">
                  E-NACH (Aadhaar, Netbanking)
                </SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="category" className="flex">
              Category <span className="text-red-500 ml-1">*</span>
            </Label>
            <Select
              onValueChange={(value) =>
                setFormData((prev) => ({ ...prev, category: value }))
              }
            >
              <SelectTrigger>
                <SelectValue placeholder="Select Category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="BILL_PAYMENT_CREDIT_CARD">
                  Bill Payment - Credit Card
                </SelectItem>
                <SelectItem value="B2B_CORPORATE">B2B Corporate</SelectItem>
                <SelectItem value="SUBSCRIPTION_FEES">
                  Subscription Fees
                </SelectItem>
                <SelectItem value="INSUARANCE_PREMIUM">
                  Insurance Premium
                </SelectItem>
                <SelectItem value="INSUARANCE_OTHER_PAYMENT">
                  Insurance Other Payment
                </SelectItem>
                <SelectItem value="EMI_LOAN_REPAYMENT">
                  EMI Loan Repayment
                </SelectItem>
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
                <SelectItem value="FIXED">Fixed</SelectItem>
                <SelectItem value="VARIABLE">Variable</SelectItem>
                <SelectItem value="ONE_TIME">One Time</SelectItem>
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
              Amount <span className="text-red-500 ml-1">*</span>
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

          <div className="space-y-2">
            <Label htmlFor="consRefNo" className="flex">
              Cons. Ref. No. <span className="text-red-500 ml-1">*</span>
            </Label>
            <Input
              id="consRefNo"
              name="consRefNo"
              value={formData.consRefNo}
              onChange={handleInputChange}
              placeholder="Enter Reference Number"
            />
          </div>
        </div>
      </div>
    );
  };

  // Render Debit Card Details Step
  const renderDebitCardDetailsStep = () => {
    return (
      <div className="space-y-6">
        <h3 className="text-lg font-medium">
          Debit Account Detail (Destination)
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="accountNo" className="flex">
              A/c No. <span className="text-red-500 ml-1">*</span>
            </Label>
            <Input
              id="accountNo"
              name="accountNo"
              value={formData.accountNo}
              onChange={handleInputChange}
              placeholder="Enter Account Number"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="accountName" className="flex">
              Account Name <span className="text-red-500 ml-1">*</span>
            </Label>
            <Input
              id="accountName"
              name="accountName"
              value={formData.accountName}
              onChange={handleInputChange}
              placeholder="Enter Account Name"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="accountType" className="flex">
              A/c Type <span className="text-red-500 ml-1">*</span>
            </Label>
            <Select
              onValueChange={(value) =>
                setFormData((prev) => ({ ...prev, accountType: value }))
              }
            >
              <SelectTrigger>
                <SelectValue placeholder="-Select-" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="SAVINGS">Savings</SelectItem>
                <SelectItem value="CURRENT">Current</SelectItem>
                <SelectItem value="OTHERS">Others</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="ifscCode" className="flex">
              IFSC Code <span className="text-red-500 ml-1">*</span>
            </Label>
            <Input
              id="ifscCode"
              name="ifscCode"
              value={formData.ifscCode}
              onChange={handleInputChange}
              placeholder="Enter IFSC Code"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="panNo" className="flex">
              PAN No. <span className="text-red-500 ml-1">*</span>
            </Label>
            <Input
              id="panNo"
              name="panNo"
              value={formData.panNo}
              onChange={handleInputChange}
              placeholder="Enter PAN Number"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="destBank" className="flex">
              Dest. Bank <span className="text-red-500 ml-1">*</span>
            </Label>
            <Select
              onValueChange={(value) =>
                setFormData((prev) => ({ ...prev, destBank: value }))
              }
            >
              <SelectTrigger>
                <SelectValue placeholder="Select Destination Bank" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="STATE_BANK_OF_INDIA">
                  State Bank of India
                </SelectItem>
                <SelectItem value="HDFC_BANK">HDFC Bank</SelectItem>
                <SelectItem value="ICICI_BANK">ICICI Bank</SelectItem>
                <SelectItem value="AXIS_BANK">Axis Bank</SelectItem>
                <SelectItem value="PUNJAB_NATIONAL_BANK">
                  Punjab National Bank
                </SelectItem>
                <SelectItem value="KOTAK_MAHINDRA_BANK">
                  Kotak Mahindra Bank
                </SelectItem>
                <SelectItem value="BANK_OF_BARODA">Bank of Baroda</SelectItem>
                <SelectItem value="YES_BANK">Yes Bank</SelectItem>
                <SelectItem value="CANARA_BANK">Canara Bank</SelectItem>
                <SelectItem value="UNION_BANK_OF_INDIA">
                  Union Bank of India
                </SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>
    );
  };

  // Render Contact Details Step
  const renderContactDetailsStep = () => {
    return (
      <div className="space-y-6">
        <h3 className="text-lg font-medium">Contact Detail</h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="phoneNo">Phone No.</Label>
            <Input
              id="phoneNo"
              name="phoneNo"
              value={formData.phoneNo}
              onChange={handleInputChange}
              placeholder="Enter Phone Number"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="mobileNo" className="flex">
              Mobile No. <span className="text-red-500 ml-1">*</span>
            </Label>
            <Input
              id="mobileNo"
              name="mobileNo"
              value={formData.mobileNo}
              onChange={handleInputChange}
              placeholder="Enter Mobile Number"
            />
          </div>

          <div className="space-y-2 md:col-span-2">
            <Label htmlFor="emailId" className="flex">
              Email Id <span className="text-red-500 ml-1">*</span>
            </Label>
            <Input
              id="emailId"
              name="emailId"
              value={formData.emailId}
              onChange={handleInputChange}
              placeholder="Enter Email Address"
            />
          </div>

          <div className="md:col-span-2 mt-4">
            <div className="flex items-center space-x-2">
              <Checkbox
                id="agreeToTerms"
                checked={agreeToTerms}
                onCheckedChange={(checked) => setAgreeToTerms(checked === true)}
              />
              <Label htmlFor="agreeToTerms" className="text-sm">
                I authorize the bank to debit my account as per the mandate
                instructions. I have read and agree to the terms and conditions.
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
        return renderDebitCardDetailsStep();
      case 3:
        return renderContactDetailsStep();
      default:
        return null;
    }
  };

  return (
    <Card className="p-6">
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
          disabled={
            isLoading ||
            (currentStepIndex === steps.length - 1 && !agreeToTerms)
          }
        >
          {isLoading
            ? "Processing..."
            : currentStepIndex === steps.length - 1
            ? "Submit Application"
            : "Continue"}
        </Button>
      </div>
    </Card>
  );
}
