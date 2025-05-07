import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { BanknoteIcon, CreditCard } from "lucide-react";
import { toast } from "sonner";

interface LoanOffer {
  id: number;
  bankId: number;
  offerName: string | null;
  interestRate: number;
  maxTenureInMonths: number | null;
  maxAmount: number;
  description: string;
  loanType: string;
}

const LOAN_TYPES = [
  "ALL",
  "PERSONAL",
  "HOME",
  "CAR",
  "EDUCATIONAL",
  "BUSINESS",
  "PAYDAY",
  "MORTGAGE",
  "STUDENT",
  "AUTO",
  "MEDICAL",
];

export default function LoanOffers() {
  const [allOffers, setAllOffers] = useState<LoanOffer[]>([]);
  const [filteredOffers, setFilteredOffers] = useState<LoanOffer[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedType, setSelectedType] = useState("ALL");
  const navigate = useNavigate();

  // Fetch all loan offers initially
  useEffect(() => {
    const fetchOffers = async () => {
      setLoading(true);
      try {
        const url = "http://localhost:8080/api/loan-offers";
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error("Failed to fetch loan offers");
        }
        const data = await response.json();
        setAllOffers(data);
      } catch (error) {
        console.error("Error fetching loan offers:", error);
        toast.error("Failed to load loan offers. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchOffers();
  }, []);

  // Filter offers based on selected type
  useEffect(() => {
    if (selectedType === "ALL") {
      setFilteredOffers(allOffers);
    } else {
      const filtered = allOffers.filter(
        (offer) => offer.loanType == selectedType
      );

      console.log("Selected type:", selectedType);
      console.log("All offers:", allOffers);
      console.log("Filtered offers:", filtered);
      setFilteredOffers(filtered);
    }
  }, [selectedType, allOffers]);

  const handleApplyNow = (id: number) => {
    navigate(`/loans/apply/${id}`);
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0,
    }).format(amount);
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Loan Offers</h1>
        <p className="text-muted-foreground">
          Browse and compare loan offers from our banking partners
        </p>
      </div>

      {/* Filter Buttons */}
      <div className="flex flex-wrap gap-3">
        {LOAN_TYPES.map((type) => (
          <Button
            key={type}
            variant={selectedType === type ? "default" : "outline"}
            onClick={() => setSelectedType(type)}
          >
            {type}
          </Button>
        ))}
      </div>

      {loading ? (
        <div className="flex justify-center items-center h-64">
          <div className="animate-pulse flex flex-col items-center gap-4">
            <div className="h-8 w-64 bg-muted rounded"></div>
            <div className="h-4 w-48 bg-muted rounded"></div>
            <div className="h-32 w-full max-w-3xl bg-muted rounded"></div>
          </div>
        </div>
      ) : filteredOffers.length === 0 ? (
        <Card>
          <CardContent className="flex flex-col items-center justify-center py-16">
            <CreditCard className="h-16 w-16 text-muted-foreground mb-4" />
            <h2 className="text-xl font-semibold">No Loan Offers Available</h2>
            <p className="text-muted-foreground mt-2">
              Please check back later for new offers.
            </p>
          </CardContent>
        </Card>
      ) : (
        <>
          {/* Offer Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {filteredOffers.map((offer) => (
              <Card key={offer.id} className="overflow-hidden">
                <CardHeader className="bg-primary/5 pb-4">
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle>
                        {offer.offerName || `Loan Offer #${offer.id}`}
                      </CardTitle>
                    </div>
                    <div className="bg-primary/20 p-2 rounded-full">
                      <BanknoteIcon className="h-5 w-5 text-primary" />
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="pt-4">
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-muted-foreground">
                        Interest Rate
                      </span>
                      <span className="font-semibold text-lg">
                        {offer.interestRate}% p.a.
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-muted-foreground">
                        Maximum Amount
                      </span>
                      <span className="font-semibold">
                        {formatCurrency(offer.maxAmount)}
                      </span>
                    </div>
                    {offer.maxTenureInMonths && (
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-muted-foreground">
                          Maximum Tenure
                        </span>
                        <span className="font-semibold">
                          {offer.maxTenureInMonths} months
                        </span>
                      </div>
                    )}
                    <p className="text-sm mt-4">{offer.description}</p>
                  </div>
                </CardContent>
                <CardFooter className="flex justify-end bg-muted/20 border-t">
                  <Button onClick={() => handleApplyNow(offer.id)}>
                    Apply Now
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>

          {/* Compare Table */}
          <div className="mt-8">
            <h2 className="text-xl font-semibold mb-4">Compare All Offers</h2>
            <Card>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Offer</TableHead>
                    <TableHead>Interest Rate</TableHead>
                    <TableHead>Max Amount</TableHead>
                    <TableHead>Max Tenure</TableHead>
                    <TableHead className="text-right">Action</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredOffers.map((offer) => (
                    <TableRow key={`table-${offer.id}`}>
                      <TableCell className="font-medium">
                        {offer.offerName || `Offer #${offer.id}`}
                      </TableCell>
                      <TableCell>{offer.interestRate}% p.a.</TableCell>
                      <TableCell>{formatCurrency(offer.maxAmount)}</TableCell>
                      <TableCell>
                        {offer.maxTenureInMonths
                          ? `${offer.maxTenureInMonths} months`
                          : "N/A"}
                      </TableCell>
                      <TableCell className="text-right">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleApplyNow(offer.id)}
                        >
                          Apply
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Card>
          </div>
        </>
      )}
    </div>
  );
}
