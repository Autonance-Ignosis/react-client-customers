
import { Check } from 'lucide-react';
import { cn } from '@/lib/utils';

interface Step {
  id: number;
  name: string;
  description?: string;
}

interface ProgressStepsProps {
  steps: Step[];
  currentStep: number;
  className?: string;
  showDescriptions?: boolean;
}

export function ProgressSteps({
  steps,
  currentStep,
  className,
  showDescriptions = false
}: ProgressStepsProps) {
  return (
    <div className={cn("flex flex-col w-full py-4", className)}>
      {/* Step indicators and connecting lines */}
      <div className="relative flex items-center justify-between w-full">
        {steps.map((step, index) => (
          <div key={step.id} className="flex items-center relative">
            {/* Connecting line before current step */}
            {index > 0 && (
              <div
                className={cn(
                  "absolute right-full h-1 -translate-y-1/2 top-1/2",
                  "w-full max-w-[80px] md:max-w-[120px] transition-all duration-500 ease-in-out",
                  currentStep > step.id
                    ? "bg-primary"
                    : "bg-muted"
                )}
                style={{ right: "calc(50% + 1rem)" }}
              />
            )}

            {/* Step circle */}
            <div
              className={cn(
                "relative z-10 flex items-center justify-center",
                "rounded-full shadow-md transition-all duration-300 ease-in-out",
                "w-9 h-9 sm:w-10 sm:h-10 md:w-12 md:h-12",
                currentStep > step.id
                  ? "bg-primary text-primary-foreground scale-100"
                  : currentStep === step.id
                    ? "border-2 border-primary bg-primary/10 text-primary scale-110"
                    : "border border-muted bg-card text-muted-foreground scale-90"
              )}
            >
              {currentStep > step.id ? (
                <Check className="h-5 w-5" />
              ) : (
                <span className="text-sm font-semibold">{step.id + 1}</span>
              )}
            </div>

            {/* Connecting line after current step */}
            {index < steps.length - 1 && (
              <div
                className={cn(
                  "absolute left-full h-1 -translate-y-1/2 top-1/2",
                  "w-full max-w-[80px] md:max-w-[120px] transition-all duration-500 ease-in-out",
                  currentStep > step.id + 1
                    ? "bg-primary"
                    : "bg-muted"
                )}
                style={{ left: "calc(50% + 1rem)" }}
              />
            )}
          </div>
        ))}
      </div>

      {/* Step labels */}
      <div className="flex items-start justify-between mt-4 w-full">
        {steps.map((step) => (
          <div
            key={`label-${step.id}`}
            className={cn(
              "flex flex-col items-center text-center",
              "max-w-[100px] md:max-w-[150px] transition-all duration-300 px-1",
              currentStep === step.id && "transform translate-y-1"
            )}
          >
            <p
              className={cn(
                "font-medium transition-colors duration-300",
                "text-xs sm:text-sm",
                currentStep >= step.id
                  ? "text-primary"
                  : "text-muted-foreground"
              )}
            >
              {step.name}
            </p>
            {showDescriptions && step.description && (
              <p
                className={cn(
                  "text-[10px] sm:text-xs mt-1 transition-opacity duration-300",
                  currentStep === step.id
                    ? "opacity-100"
                    : "opacity-70"
                )}
              >
                {step.description}
              </p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}