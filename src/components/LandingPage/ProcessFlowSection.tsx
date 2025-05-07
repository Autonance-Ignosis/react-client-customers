
import React, { useEffect, useState } from "react";
import { UserCheck, FileText, CircleDollarSign, CheckCircle, Clock, ShieldCheck } from "lucide-react";

const ProcessFlowSection = () => {
  const [activeStep, setActiveStep] = useState(0);
  
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          startAnimation();
        }
      },
      { threshold: 0.3 }
    );
    
    const section = document.getElementById('process-flow-section');
    if (section) observer.observe(section);
    
    return () => {
      if (section) observer.unobserve(section);
    };
  }, []);
  
  const startAnimation = () => {
    let step = 0;
    const interval = setInterval(() => {
      setActiveStep(step);
      step++;
      if (step > 5) {
        clearInterval(interval);
        setTimeout(() => {
          setActiveStep(0);
          startAnimation();
        }, 3000);
      }
    }, 2000);
    
    return () => clearInterval(interval);
  };
  
  const steps = [
    {
      id: 0,
      title: "Customer Registration",
      icon: UserCheck,
      description: "Customer creates account and starts the KYC process",
    },
    {
      id: 1,
      title: "KYC Verification",
      icon: ShieldCheck,
      description: "Submit identity documents through the secure portal",
    },
    {
      id: 2, 
      title: "Loan Application",
      icon: FileText,
      description: "Customer fills loan application with pre-verified KYC data",
    },
    {
      id: 3,
      title: "Admin Verification",
      icon: CheckCircle,
      description: "Our team validates documents and information",
    },
    {
      id: 4,
      title: "Bank Approval",
      icon: CircleDollarSign,
      description: "Bank reviews application and makes credit decision",
    },
    {
      id: 5,
      title: "Mandate Setup",
      icon: Clock,
      description: "Automated payment schedule established for repayments",
    },
  ];

  return (
    <section id="process-flow-section" className="py-20 bg-gradient-to-br from-accent/5 to-background">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Experience Our Seamless Process
          </h2>
          <p className="text-foreground/70 max-w-2xl mx-auto">
            See how our fully integrated system works from registration to approval.
          </p>
        </div>
        
        <div className="relative">
          {/* Timeline connector */}
          <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-1 bg-primary/20 transform -translate-x-1/2 z-0"></div>
          
          <div className="space-y-24 relative z-10">
            {steps.map((step, index) => {
              const IconComponent = step.icon;
              const isActive = activeStep === step.id;
              const isPast = activeStep > step.id;
              
              return (
                <div 
                  key={step.id}
                  className={`flex flex-col md:flex-row items-center gap-8 transition-all duration-1000 ease-in-out
                    ${isActive ? 'opacity-100 scale-105' : 'opacity-50 scale-100'}
                    ${(index % 2 === 1) ? 'md:flex-row-reverse' : ''}`}
                >
                  <div className={`w-full md:w-2/5 transition-transform duration-1000 
                    ${isActive ? 'translate-y-0' : (index % 2 === 0 ? '-translate-y-4' : 'translate-y-4')}`}>
                    <h3 className={`text-xl font-bold mb-2 transition-colors duration-500 
                      ${isActive ? 'text-primary' : 'text-foreground'}`}>
                      {step.title}
                    </h3>
                    <p className="text-foreground/70">{step.description}</p>
                  </div>
                  
                  <div className="flex items-center justify-center">
                    <div 
                      className={`h-16 w-16 rounded-full flex items-center justify-center transition-all duration-500
                        ${isActive ? 'bg-primary text-primary-foreground scale-125' : 
                          isPast ? 'bg-success text-success-foreground' : 'bg-muted text-muted-foreground'}`}
                    >
                      <IconComponent className="h-8 w-8" />
                    </div>
                  </div>
                  
                  <div className={`w-full md:w-2/5 transition-transform duration-1000
                    ${isActive ? 'translate-y-0' : (index % 2 === 0 ? 'translate-y-4' : '-translate-y-4')}`}>
                    {/* This side is intentionally left empty for the alternating layout */}
                    {index % 2 === 1 && (
                      <>
                        <h3 className={`md:hidden text-xl font-bold mb-2 transition-colors duration-500
                          ${isActive ? 'text-primary' : 'text-foreground'}`}>
                          {step.title}
                        </h3>
                        <p className="md:hidden text-foreground/70">{step.description}</p>
                      </>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProcessFlowSection;
