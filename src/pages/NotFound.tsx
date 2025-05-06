import FuzzyText from "@/components/ui-custom/FuzzyText";

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-black text-white">
      <FuzzyText baseIntensity={0.2} hoverIntensity={1.88} enableHover={true}>
        404 Not Found
      </FuzzyText>
    </div>
  );
}
