
import CTASection from "@/components/LandingPage/CTASection";
import FAQSection from "@/components/LandingPage/FAQSection";
import FeaturesSection from "@/components/LandingPage/FeaturesSection";
// import Footer from "@/components/LandingPage/Footer";
import HowItWorksSection from "@/components/LandingPage/HowItWorksSection";
import Navbar from "@/components/LandingPage/Navbar";
import StorySection from "@/components/LandingPage/StorySection";
import TestimonialsSection from "@/components/LandingPage/TestimonialsSection";
import React, { useEffect } from "react";


const LandingPage = () => {
  useEffect(() => {
    const handleSmoothScroll = (e) => {
      e.preventDefault();
  
      const targetId = e.currentTarget.getAttribute('href')?.substring(1);
      if (!targetId) return;
  
      const targetElement = document.getElementById(targetId);
      if (targetElement) {
        window.scrollTo({
          top: targetElement.offsetTop - 80,
          behavior: 'smooth',
        });
      }
    };
  
    const anchors = document.querySelectorAll('a[href^="#"]');
    anchors.forEach(anchor => {
      anchor.addEventListener('click', handleSmoothScroll);
    });
  
    return () => {
      anchors.forEach(anchor => {
        anchor.removeEventListener('click', handleSmoothScroll);
      });
    };
  }, []);
  

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main>
        <StorySection />
        <FeaturesSection />
        <HowItWorksSection />
        <TestimonialsSection />
        <FAQSection />
        <CTASection />
      </main>
      {/* <Footer /> */}
    </div>
  );
};

export default LandingPage;
