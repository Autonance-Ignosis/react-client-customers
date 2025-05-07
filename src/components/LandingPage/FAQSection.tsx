
import React, { useState } from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const FAQSection = () => {
  const faqs = [
    {
      question: "What is EMandate Flow?",
      answer:
        "EMandate Flow is a comprehensive automated system that streamlines KYC verification, loan application processes, and payment mandate setup. It connects customers, administrators, and banking institutions in one secure platform.",
    },
    {
      question: "How secure is the KYC verification process?",
      answer:
        "Our KYC verification process uses bank-level security with 256-bit encryption for all document uploads and transfers. All data is protected in compliance with industry standards and regulations to ensure the highest level of security for your personal information.",
    },
    {
      question: "How long does the KYC verification process take?",
      answer:
        "With our automated system, the KYC verification process typically takes minutes rather than days. Once you submit your documents, our system performs initial verification, followed by admin review. You'll receive real-time updates on your verification status.",
    },
    {
      question: "Can I apply for multiple types of loans?",
      answer:
        "Yes, our platform supports various loan types including personal loans, business loans, home loans, and more. Once your KYC is verified, you can apply for multiple loan products that suit your needs.",
    },
    {
      question: "How does the mandate setup work?",
      answer:
        "The mandate setup allows for automatic recurring payments from your account. After your loan is approved, you can authorize the system to automatically deduct payments on scheduled dates. This can be modified or cancelled according to your bank's policies.",
    },
    {
      question: "What happens if my loan application is rejected?",
      answer:
        "If your loan application is rejected, you'll receive a notification with the reason. Our system offers recommendations for improving your application for future submissions. You can reapply after addressing the issues mentioned in the rejection notice.",
    },
    {
      question: "Is there a fee for using EMandate Flow?",
      answer:
        "Basic KYC verification is typically free. Fees may apply for certain premium services or expedited processing. Any applicable fees will be clearly displayed before you proceed with a paid service.",
    },
  ];

  return (
    <section id="faq" className="py-20 bg-background">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Frequently Asked Questions
          </h2>
          <p className="text-foreground/70 max-w-2xl mx-auto">
            Find answers to common questions about our platform and services.
          </p>
        </div>

        <div className="max-w-3xl mx-auto">
          <Accordion type="single" collapsible className="w-full">
            {faqs.map((faq, index) => (
              <AccordionItem key={index} value={`item-${index}`} className="border-b border-border">
                <AccordionTrigger className="text-left font-medium py-4">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-foreground/70 pb-4">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  );
};

export default FAQSection;
