
import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { CheckCircle, Home } from 'lucide-react';
import { Navigate, useNavigate } from 'react-router-dom';

const CTASection: React.FC = () => {
  const fadeInUpVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.6 }
    }
  };
  
  const staggerContainerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const navigate = useNavigate();
  
  return (
    <section className="py-16 bg-gradient-to-r from-primary/5 to-accent/5">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeInUpVariants}
          className="text-center mb-10"
        >
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">Join India's Digital Financial Revolution</h2>
          <p className="text-gray-600 max-w-3xl mx-auto">
            Be part of the transformation that's helping millions of Indians overcome bureaucratic barriers. Our platform reduces weeks of paperwork and multiple branch visits to just minutes of simple, digital interaction—accessible even from remote villages.
          </p>
        </motion.div>
        
        <motion.div
          variants={staggerContainerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto mb-12"
        >
          <BenefitCard 
            description="Complete KYC verification in minutes, not weeks—even from remote villages with just a smartphone"
          />
          <BenefitCard 
            description="Apply for loans with pre-verified KYC data—eliminating repeated document submissions and reducing rejection rates by 60%"
          />
          <BenefitCard 
            description="Set up automated payment mandates that save rural citizens from traveling 25+ kilometers monthly just to make loan payments"
          />
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <Button
              size="lg"
              className="bg-primary hover:bg-primary/90 text-primary-foreground px-8 py-6 text-lg rounded-full"
              onClick={()=>navigate("/home")}
            >
              Get Started Today
          </Button>

        </motion.div>
      </div>
    </section>
  );
};

const BenefitCard: React.FC<{ description: string }> = ({ description }) => {
  return (
    <motion.div 
      variants={{
        hidden: { opacity: 0, y: 20 },
        visible: { 
          opacity: 1, 
          y: 0,
          transition: { duration: 0.5 }
        }
      }}
      className="bg-white p-6 rounded-lg shadow-sm"
    >
      <div className="flex mb-4">
        <CheckCircle className="h-6 w-6 text-green-500 mr-2 flex-shrink-0" />
      </div>
      <p className="text-gray-700">{description}</p>
    </motion.div>
  );
};

export default CTASection;