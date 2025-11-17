import { Hero } from "@/components/Hero";
import { Problem } from "@/components/Problem";
import { Features } from "@/components/Features";
import { HowItWorks } from "@/components/HowItWorks";
import { CodeExample } from "@/components/CodeExample";
import { CTA } from "@/components/CTA";
import { Footer } from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Hero />
      <Problem />
      <Features />
      <HowItWorks />
      <CodeExample />
      <CTA />
      <Footer />
    </div>
  );
};

export default Index;
