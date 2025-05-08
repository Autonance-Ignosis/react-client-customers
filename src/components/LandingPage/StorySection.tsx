
import React, { useEffect } from "react";
import { Card } from "@/components/ui/card";
import { UserCheck, FileText, CircleDollarSign, CheckCircle, Clock, Building, Home, MapPin } from "lucide-react";

const StorySection = () => {
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('animate-reveal');
            
            const animatedChildren = entry.target.querySelectorAll('.story-animate-child');
            animatedChildren.forEach((child, index) => {
              setTimeout(() => {
                child.classList.add('animate-reveal');
              }, 150 * (index + 1));
            });
          }
        });
      },
      {
        root: null,
        rootMargin: '0px',
        threshold: 0.1,
      }
    );

    document.querySelectorAll('.story-animate').forEach((element) => {
      observer.observe(element);
    });

    return () => {
      document.querySelectorAll('.story-animate').forEach((element) => {
        observer.unobserve(element);
      });
    };
  }, []);

  return (
    <section
  id="stories"
  className="story-animate py-20 bg-gradient-to-br from-primary/5 to-background opacity-100"
>
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center mb-16 opacity-0 story-animate">
          <p className="text-foreground/70 max-w-3xl mx-auto text-lg leading-relaxed">
            Across India, from bustling cities to remote villages, financial processes are being transformed...
          </p>
        </div>

        <div className="mb-16 story-animate opacity-0">
          <Card className="border-accent/20 p-6 md:p-8 bg-gradient-to-br from-primary/5 to-background overflow-hidden">
            <div className="flex items-center mb-8 opacity-0 story-animate-child">
              <div className="h-1 flex-1 bg-gradient-to-r from-transparent to-primary/30"></div>
              <h3 className="px-4 text-2xl font-medium text-foreground/80">The Everyday Reality</h3>
              <div className="h-1 flex-1 bg-gradient-to-l from-transparent to-primary/30"></div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div className="flex items-start opacity-0 story-animate-child">
                <Clock className="h-6 w-6 text-destructive mr-3 flex-shrink-0 mt-1" />
                <div>
                  <h4 className="font-semibold mb-1">Excessive Time Investment</h4>
                  <p className="text-sm text-foreground/70">
                    The average Indian spends 7-15 days collecting documents, making multiple branch visits, and following up on applications—time away from work and family.
                  </p>
                </div>
              </div>
              
              <div className="flex items-start opacity-0 story-animate-child">
                <Building className="h-6 w-6 text-destructive mr-3 flex-shrink-0 mt-1" />
                <div>
                  <h4 className="font-semibold mb-1">Geographic Limitations</h4>
                  <p className="text-sm text-foreground/70">
                    For the 65% of Indians living in rural areas, banking services often require traveling 25+ kilometers to the nearest branch, adding cost and complexity.
                  </p>
                </div>
              </div>
              
              <div className="flex items-start opacity-0 story-animate-child">
                <FileText className="h-6 w-6 text-destructive mr-3 flex-shrink-0 mt-1" />
                <div>
                  <h4 className="font-semibold mb-1">Documentation Burden</h4>
                  <p className="text-sm text-foreground/70">
                    Multiple copies of the same documents are required across institutions, with 40% of applications rejected due to minor inconsistencies or missing papers.
                  </p>
                </div>
              </div>
              
              <div className="flex items-start opacity-0 story-animate-child">
                <MapPin className="h-6 w-6 text-destructive mr-3 flex-shrink-0 mt-1" />
                <div>
                  <h4 className="font-semibold mb-1">Access Inequality</h4>
                  <p className="text-sm text-foreground/70">
                    Low-income individuals and those with limited formal education often struggle to navigate the complex paperwork and verification processes required.
                  </p>
                </div>
              </div>
            </div>
          </Card>
        </div>

        <div className="mb-16">
          <div className="flex items-center mb-12 opacity-0 story-animate">
            <div className="h-1 flex-1 bg-gradient-to-r from-transparent to-accent/30"></div>
            <h3 className="px-4 text-2xl font-medium text-foreground/80">Lives Being Transformed</h3>
            <div className="h-1 flex-1 bg-gradient-to-l from-transparent to-accent/30"></div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-16">
            <Card className="story-animate opacity-0 border-border overflow-hidden transition-all duration-300 hover:shadow-lg hover:shadow-primary/10 hover:-translate-y-1">
              <div className="relative">
                <div className="absolute -top-3 -left-3 bg-primary text-primary-foreground rounded-full w-12 h-12 flex items-center justify-center shadow-lg">
                  <Home className="h-6 w-6" />
                </div>
                <div className="p-6 pt-8">
                  <div className="mb-4">
                    <h4 className="text-xl font-bold mb-1">Meera's Housing Loan Journey</h4>
                    <p className="text-sm text-accent font-medium">Middle School Teacher, Jaipur</p>
                  </div>
                  
                  <div className="mb-6 space-y-4 text-foreground/80 text-sm">
                    <div className="flex items-start">
                      <div className="w-24 flex-shrink-0 font-bold text-destructive">Before</div>
                      <p>
                        "I spent three weeks visiting the bank repeatedly for my home loan. Each visit meant taking leave from school. They kept asking for additional documents, and the process was exhausting. After 32 days, my loan was finally approved."
                      </p>
                    </div>
                    
                    <div className="flex items-start">
                      <div className="w-24 flex-shrink-0 font-bold text-success">After</div>
                      <p>
                        "With EMandate, I uploaded my KYC details once, applied for my home loan online, and received approval in just 5 days. The e-mandate setup meant I never have to worry about missing a payment. I didn't miss a single day of teaching!"
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-center text-sm bg-success/10 text-success p-2 rounded-md">
                    <CheckCircle className="h-4 w-4 mr-2 flex-shrink-0" />
                    <span className="font-medium">Time saved: 27 days, 6 branch visits eliminated</span>
                  </div>
                </div>
              </div>
            </Card>
            
            <Card className="story-animate opacity-0 border-border overflow-hidden transition-all duration-300 hover:shadow-lg hover:shadow-primary/10 hover:-translate-y-1">
              <div className="relative">
                <div className="absolute -top-3 -left-3 bg-primary text-primary-foreground rounded-full w-12 h-12 flex items-center justify-center shadow-lg">
                  <Building className="h-6 w-6" />
                </div>
                <div className="p-6 pt-8">
                  <div className="mb-4">
                    <h4 className="text-xl font-bold mb-1">Suraj's Small Business Growth</h4>
                    <p className="text-sm text-accent font-medium">Grocery Shop Owner, Rural Maharashtra</p>
                  </div>
                  
                  <div className="mb-6 space-y-4 text-foreground/80 text-sm">
                    <div className="flex items-start">
                      <div className="w-24 flex-shrink-0 font-bold text-destructive">Before</div>
                      <p>
                        "To expand my shop, I needed a small business loan. Living 30km from the nearest bank branch, each visit cost me a full day of business and 500 rupees in travel. The paperwork was confusing, and I was rejected twice before approval."
                      </p>
                    </div>
                    
                    <div className="flex items-start">
                      <div className="w-24 flex-shrink-0 font-bold text-success">After</div>
                      <p>
                        "I used my smartphone to complete my KYC and loan application through EMandate. A local banking correspondent helped me verify my details. My loan was approved in 3 days, and automatic payments mean no more traveling to make monthly installments."
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-center text-sm bg-success/10 text-success p-2 rounded-md">
                    <CheckCircle className="h-4 w-4 mr-2 flex-shrink-0" />
                    <span className="font-medium">Business revenue increased by 40% within three months</span>
                  </div>
                </div>
              </div>
            </Card>
            
            <Card className="story-animate opacity-0 border-border overflow-hidden transition-all duration-300 hover:shadow-lg hover:shadow-primary/10 hover:-translate-y-1">
              <div className="relative">
                <div className="absolute -top-3 -left-3 bg-primary text-primary-foreground rounded-full w-12 h-12 flex items-center justify-center shadow-lg">
                  <UserCheck className="h-6 w-6" />
                </div>
                <div className="p-6 pt-8">
                  <div className="mb-4">
                    <h4 className="text-xl font-bold mb-1">Lakshmi's Emergency Medical Loan</h4>
                    <p className="text-sm text-accent font-medium">Factory Worker, Chennai</p>
                  </div>
                  
                  <div className="mb-6 space-y-4 text-foreground/80 text-sm">
                    <div className="flex items-start">
                      <div className="w-24 flex-shrink-0 font-bold text-destructive">Before</div>
                      <p>
                        "When my father needed emergency heart surgery, I approached multiple lenders. Each required the same documents but in different formats. The emergency loan process took 9 days—days my father didn't have to wait."
                      </p>
                    </div>
                    
                    <div className="flex items-start">
                      <div className="w-24 flex-shrink-0 font-bold text-success">After</div>
                      <p>
                        "Through EMandate's platform, I submitted one KYC verification that multiple lenders accepted. I received loan approval within 24 hours. The hospital started treatment immediately, knowing the payment was secured."
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-center text-sm bg-success/10 text-success p-2 rounded-md">
                    <CheckCircle className="h-4 w-4 mr-2 flex-shrink-0" />
                    <span className="font-medium">Critical treatment initiated 8 days earlier than possible</span>
                  </div>
                </div>
              </div>
            </Card>
            
            <Card className="story-animate opacity-0 border-border overflow-hidden transition-all duration-300 hover:shadow-lg hover:shadow-primary/10 hover:-translate-y-1">
              <div className="relative">
                <div className="absolute -top-3 -left-3 bg-primary text-primary-foreground rounded-full w-12 h-12 flex items-center justify-center shadow-lg">
                  <CircleDollarSign className="h-6 w-6" />
                </div>
                <div className="p-6 pt-8">
                  <div className="mb-4">
                    <h4 className="text-xl font-bold mb-1">Hitech Solutions' Business Transformation</h4>
                    <p className="text-sm text-accent font-medium">Tech Startup, Bangalore</p>
                  </div>
                  
                  <div className="mb-6 space-y-4 text-foreground/80 text-sm">
                    <div className="flex items-start">
                      <div className="w-24 flex-shrink-0 font-bold text-destructive">Before</div>
                      <p>
                        "Managing recurring payments from clients was a nightmare. We had 2 full-time employees just handling paperwork, follow-ups, and reconciliation. Payment delays affected our cash flow and growth plans."
                      </p>
                    </div>
                    
                    <div className="flex items-start">
                      <div className="w-24 flex-shrink-0 font-bold text-success">After</div>
                      <p>
                        "By integrating EMandate's API, we automated our entire client onboarding and payment collection process. Clients complete KYC once and set up mandates that automatically renew. Our collection rate improved from 76% to 98%."
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-center text-sm bg-success/10 text-success p-2 rounded-md">
                    <CheckCircle className="h-4 w-4 mr-2 flex-shrink-0" />
                    <span className="font-medium">Reduced operational costs by ₹15 lakhs annually</span>
                  </div>
                </div>
              </div>
            </Card>
          </div>
        </div>

        <div className="mt-16 p-6 bg-accent/5 rounded-xl story-animate opacity-0">
          <div className="flex flex-col md:flex-row items-center justify-between gap-8">
            <div>
              <h3 className="text-2xl font-bold mb-3">Transforming India's Financial Landscape</h3>
              <p className="text-foreground/70">
                Our platform doesn't just save time—it's democratizing access to financial services for millions of Indians who were previously underserved by traditional banking systems. With just a smartphone, anyone can now complete processes that once required multiple branch visits, stacks of paperwork, and weeks of waiting.
              </p>
            </div>
            <div className="relative">
              <div className="absolute inset-0 rounded-full bg-primary/20 blur-2xl scale-125"></div>
              <div className="relative flex items-center justify-center bg-background border border-primary/30 rounded-full p-6 shadow-xl animate-float">
                <div className="text-center">
                  <div className="text-4xl font-bold text-primary">94%</div>
                  <div className="text-sm font-medium text-foreground/70">reduction in processing time</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default StorySection;
