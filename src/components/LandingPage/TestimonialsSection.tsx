
import React, { useEffect, useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight, Star } from "lucide-react";

const testimonials = [
  {
    id: 1,
    name: "Sarah Johnson",
    role: "Small Business Owner",
    content: "EMandate Flow completely transformed our loan process. The KYC verification that used to take days was completed in less than an hour. The automated mandate system ensures our repayments are always on time without any manual intervention.",
    rating: 5,
    companyName: "StyleBoutique Inc."
  },
  {
    id: 2,
    name: "Michael Chen",
    role: "Startup Founder",
    content: "As a tech startup founder, I appreciate efficient systems. EMandate Flow's streamlined process from KYC to loan approval helped us secure funding quickly during our critical growth phase. The platform is intuitive and remarkably effective.",
    rating: 5,
    companyName: "NexGen Solutions"
  },
  {
    id: 3,
    name: "Priya Patel",
    role: "Finance Director",
    content: "The level of automation in EMandate Flow is impressive. Our company has saved countless hours on paperwork and follow-ups. The transparent approval process and real-time updates keep everyone informed at each stage.",
    rating: 4,
    companyName: "Horizon Enterprises"
  },
  {
    id: 4,
    name: "David Wilson",
    role: "Retail Chain Owner",
    content: "Expanding our chain of stores required swift financing. EMandate Flow's rapid KYC verification and loan approval process helped us open three new locations on schedule. The mandate system makes repayment management effortless.",
    rating: 5,
    companyName: "Urban Market"
  },
  {
    id: 5,
    name: "Emma Rodriguez",
    role: "Healthcare Administrator",
    content: "Our medical practice needed equipment financing quickly. The EMandate system made the entire process from application to approval seamless. The customer support team was exceptionally helpful throughout the process.",
    rating: 4,
    companyName: "Wellness Medical Center"
  }
];

const TestimonialsSection = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState<'next' | 'prev'>('next');
  const [isAnimating, setIsAnimating] = useState(false);

  const visibleTestimonials = () => {
    const result = [];
    for (let i = 0; i < 3; i++) {
      const index = (currentIndex + i) % testimonials.length;
      result.push(testimonials[index]);
    }
    return result;
  };

  const handlePrev = () => {
    if (isAnimating) return;
    
    setIsAnimating(true);
    setDirection('prev');
    setCurrentIndex((prevIndex) => 
      prevIndex === 0 ? testimonials.length - 1 : prevIndex - 1
    );
    
    setTimeout(() => {
      setIsAnimating(false);
    }, 500);
  };

  const handleNext = () => {
    if (isAnimating) return;
    
    setIsAnimating(true);
    setDirection('next');
    setCurrentIndex((prevIndex) => 
      (prevIndex + 1) % testimonials.length
    );
    
    setTimeout(() => {
      setIsAnimating(false);
    }, 500);
  };

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

    document.querySelectorAll('.testimonial-animate').forEach((element) => {
      observer.observe(element);
    });

    return () => {
      document.querySelectorAll('.testimonial-animate').forEach((element) => {
        observer.unobserve(element);
      });
    };
  }, []);

  return (
    <section id="testimonials" className="py-20 testimonial-gradient">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center mb-16 testimonial-animate">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Trusted by Businesses Nationwide
          </h2>
          <p className="text-foreground/70 max-w-2xl mx-auto">
            See what our customers are saying about their experience with EMandate Flow.
          </p>
        </div>

        <div className="relative testimonial-animate">
          <div className="flex flex-col md:flex-row gap-6 overflow-hidden">
            {visibleTestimonials().map((testimonial, index) => (
              <Card 
                key={testimonial.id} 
                className={`flex-1 p-6 transition-all duration-500 card-highlight ${
                  isAnimating 
                    ? direction === 'next' 
                      ? index === 0 ? 'animate-slide-out-left' : '' 
                      : index === 2 ? 'animate-slide-out-right' : ''
                    : ''
                }`}
              >
                <div className="flex justify-between items-center mb-4">
                  <div>
                    <h4 className="font-semibold text-lg">{testimonial.name}</h4>
                    <p className="text-sm text-foreground/70">{testimonial.role}</p>
                    <p className="text-xs text-accent">{testimonial.companyName}</p>
                  </div>
                  <div className="flex">
                    {[...Array(5)].map((_, i) => (
                      <Star 
                        key={i} 
                        className={`h-4 w-4 ${i < testimonial.rating ? 'text-accent fill-accent' : 'text-gray-300'}`} 
                      />
                    ))}
                  </div>
                </div>
                <p className="text-foreground/80 text-sm">{testimonial.content}</p>
              </Card>
            ))}
          </div>

          <div className="flex justify-center mt-8 gap-4">
            <Button 
              variant="outline" 
              size="icon" 
              className="rounded-full" 
              onClick={handlePrev}
              disabled={isAnimating}
            >
              <ChevronLeft className="h-5 w-5" />
            </Button>
            <Button 
              variant="outline" 
              size="icon" 
              className="rounded-full" 
              onClick={handleNext}
              disabled={isAnimating}
            >
              <ChevronRight className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
