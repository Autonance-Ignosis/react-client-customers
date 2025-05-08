
import React, { useEffect, useRef } from 'react';
import { Button } from "@/components/ui/button";
import { ArrowRight, FileText, UserCheck, CheckCircle, CircleDollarSign } from "lucide-react";

const HeroSection = () => {
  const heroRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate-reveal');
        }
      },
      { threshold: 0.1 }
    );

    const elements = document.querySelectorAll('.hero-animate');
    elements.forEach((el) => observer.observe(el));

    return () => {
      elements.forEach((el) => observer.unobserve(el));
    };
  }, []);

  return (
    <div ref={heroRef} className="min-h-screen pt-20 hero-gradient">
      <div className="container mx-auto px-4 md:px-6 py-20">
        <div className="flex flex-col md:flex-row items-center justify-between gap-12">
          <div className="w-full md:w-1/2 space-y-6">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold hero-animate animate-delay-100">
              Streamline Your <span className="gradient-text">Financial Processes</span> with EMandate
            </h1>
            
            <p className="text-lg text-foreground/80 hero-animate animate-delay-200">
              A comprehensive automated system for KYC verification, loan applications, and mandate processing all in one secure platform.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 hero-animate animate-delay-300">
              <Button className="gap-2 text-md">
                Get Started <ArrowRight className="h-4 w-4" />
              </Button>
              <Button variant="outline" className="gap-2 text-md">
                Learn More
              </Button>
            </div>
            
            <div className="pt-6 hero-animate animate-delay-400">
              <div className="flex items-center space-x-2 text-sm text-foreground/60">
                <CheckCircle className="h-5 w-5 text-success" />
                <span>Trusted by 500+ businesses nationwide</span>
              </div>
            </div>
          </div>
          
          <div className="w-full md:w-1/2 hero-animate animate-delay-200">
            <div className="relative">
              <div className="absolute -top-6 -left-6 w-64 h-64 bg-accent/10 rounded-full filter blur-3xl"></div>
              <div className="absolute -bottom-8 -right-8 w-64 h-64 bg-primary/10 rounded-full filter blur-3xl"></div>
              
              <div className="relative z-10 bg-background/50 backdrop-blur-lg border border-border rounded-2xl p-6 shadow-xl">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-card border border-border rounded-xl p-5 card-highlight animate-float">
                    <UserCheck className="h-10 w-10 text-accent mb-4" />
                    <h3 className="font-semibold text-lg mb-2">Quick KYC Verification</h3>
                    <p className="text-sm text-foreground/70">Complete your verification in minutes, not days</p>
                  </div>
                  
                  <div className="bg-card border border-border rounded-xl p-5 card-highlight animate-float animation-delay-100">
                    <FileText className="h-10 w-10 text-accent mb-4" />
                    <h3 className="font-semibold text-lg mb-2">Smooth Loan Application</h3>
                    <p className="text-sm text-foreground/70">Apply for loans with minimal paperwork</p>
                  </div>
                  
                  <div className="bg-card border border-border rounded-xl p-5 card-highlight animate-float animation-delay-200">
                    <CircleDollarSign className="h-10 w-10 text-accent mb-4" />
                    <h3 className="font-semibold text-lg mb-2">Secure Mandate Setup</h3>
                    <p className="text-sm text-foreground/70">Set up automated payments safely</p>
                  </div>
                  
                  <div className="bg-card border border-border rounded-xl p-5 card-highlight animate-float animation-delay-300">
                    <CheckCircle className="h-10 w-10 text-accent mb-4" />
                    <h3 className="font-semibold text-lg mb-2">Rapid Approvals</h3>
                    <p className="text-sm text-foreground/70">Quick decision making by our partners</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
