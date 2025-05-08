
import React, { useEffect } from "react";
import { UserCheck, FileText, CircleDollarSign, CheckCircle, X } from "lucide-react";

const HowItWorksSection = () => {
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('animate-reveal');
          }
        });
      },
      {
        root: null,
        rootMargin: '0px',
        threshold: 0.1,
      }
    );

    document.querySelectorAll('.process-animate').forEach((element) => {
      observer.observe(element);
    });

    return () => {
      document.querySelectorAll('.process-animate').forEach((element) => {
        observer.unobserve(element);
      });
    };
  }, []);

  return (
    <section id="how-it-works" className="py-20 bg-gradient-to-br from-primary/5 to-background">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center mb-16 process-animate">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            How EMandate Flow Works
          </h2>
          <p className="text-foreground/70 max-w-2xl mx-auto">
            Our streamlined process makes financial operations simple and efficient for all stakeholders.
          </p>
        </div>

        <div className="relative">
          {/* Process Flow Visualization */}
          <div className="hidden md:block absolute left-0 right-0 top-1/2 h-1 bg-accent/30" />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {/* Customer Journey */}
            <div className="process-animate">
              <div className="bg-card border border-border rounded-xl shadow-lg overflow-hidden">
                <div className="bg-primary p-4 text-primary-foreground">
                  <h3 className="text-xl font-semibold">Customer Journey</h3>
                </div>
                <div className="p-6 space-y-6">
                  <div className="flex gap-4">
                    <div className="flex-shrink-0 h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                      <span className="font-bold">1</span>
                    </div>
                    <div>
                      <h4 className="font-medium flex items-center gap-2">
                        <UserCheck className="h-5 w-5 text-accent" /> KYC Verification
                      </h4>
                      <p className="text-sm text-foreground/70 mt-1">
                        Customer submits identity documents through the secure portal
                      </p>
                    </div>
                  </div>

                  <div className="flex gap-4">
                    <div className="flex-shrink-0 h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                      <span className="font-bold">2</span>
                    </div>
                    <div>
                      <h4 className="font-medium flex items-center gap-2">
                        <FileText className="h-5 w-5 text-accent" /> Loan Application
                      </h4>
                      <p className="text-sm text-foreground/70 mt-1">
                        Customer fills the loan application form with pre-filled KYC data
                      </p>
                    </div>
                  </div>

                  <div className="flex gap-4">
                    <div className="flex-shrink-0 h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                      <span className="font-bold">3</span>
                    </div>
                    <div>
                      <h4 className="font-medium flex items-center gap-2">
                        <CircleDollarSign className="h-5 w-5 text-accent" /> Mandate Setup
                      </h4>
                      <p className="text-sm text-foreground/70 mt-1">
                        Customer authorizes automated payment mandate for loan repayments
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Admin Process */}
            <div className="process-animate">
              <div className="bg-card border border-border rounded-xl shadow-lg overflow-hidden">
                <div className="bg-accent p-4 text-accent-foreground">
                  <h3 className="text-xl font-semibold">Admin Verification</h3>
                </div>
                <div className="p-6 space-y-6">
                  <div className="flex gap-4">
                    <div className="flex-shrink-0 h-10 w-10 rounded-full bg-accent/10 flex items-center justify-center">
                      <span className="font-bold">1</span>
                    </div>
                    <div>
                      <h4 className="font-medium flex items-center gap-2">
                        Document Review
                      </h4>
                      <p className="text-sm text-foreground/70 mt-1">
                        Admin reviews submitted KYC documents for authenticity
                      </p>
                    </div>
                  </div>

                  <div className="flex gap-4">
                    <div className="flex-shrink-0 h-10 w-10 rounded-full bg-accent/10 flex items-center justify-center">
                      <span className="font-bold">2</span>
                    </div>
                    <div>
                      <h4 className="font-medium flex items-center gap-2">
                        Verification Process
                      </h4>
                      <p className="text-sm text-foreground/70 mt-1">
                        Cross-checking information with government databases
                      </p>
                    </div>
                  </div>

                  <div className="flex gap-4">
                    <div className="flex-shrink-0 h-10 w-10 rounded-full bg-accent/10 flex items-center justify-center">
                      <span className="font-bold">3</span>
                    </div>
                    <div>
                      <h4 className="font-medium flex items-center gap-2">
                        <CheckCircle className="h-5 w-5 text-success" /> KYC Approval
                      </h4>
                      <p className="text-sm text-foreground/70 mt-1">
                        Admin approves KYC verification, unlocking further services
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Bank Approval */}
            <div className="process-animate">
              <div className="bg-card border border-border rounded-xl shadow-lg overflow-hidden">
                <div className="bg-primary p-4 text-primary-foreground">
                  <h3 className="text-xl font-semibold">Bank Process</h3>
                </div>
                <div className="p-6 space-y-6">
                  <div className="flex gap-4">
                    <div className="flex-shrink-0 h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                      <span className="font-bold">1</span>
                    </div>
                    <div>
                      <h4 className="font-medium flex items-center gap-2">
                        Loan Assessment
                      </h4>
                      <p className="text-sm text-foreground/70 mt-1">
                        Bank reviews loan application and approved KYC details
                      </p>
                    </div>
                  </div>

                  <div className="flex gap-4">
                    <div className="flex-shrink-0 h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                      <span className="font-bold">2</span>
                    </div>
                    <div>
                      <h4 className="font-medium">Decision Process</h4>
                      <div className="flex space-x-3 mt-1">
                        <div className="flex items-center text-xs bg-success/10 text-success px-2 py-1 rounded">
                          <CheckCircle className="h-3 w-3 mr-1" /> Approve
                        </div>
                        <div className="flex items-center text-xs bg-destructive/10 text-destructive px-2 py-1 rounded">
                          <X className="h-3 w-3 mr-1" /> Reject
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="flex gap-4">
                    <div className="flex-shrink-0 h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                      <span className="font-bold">3</span>
                    </div>
                    <div>
                      <h4 className="font-medium flex items-center gap-2">
                        <CircleDollarSign className="h-5 w-5 text-accent" /> Funds Disbursement
                      </h4>
                      <p className="text-sm text-foreground/70 mt-1">
                        For approved loans, funds are transferred and mandate activated
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorksSection;
