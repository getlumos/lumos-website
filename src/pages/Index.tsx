import { Hero } from "@/components/Hero";
import { Problem } from "@/components/Problem";
import { QuickStart } from "@/components/QuickStart";
import { Features } from "@/components/Features";
import { WhenToUse } from "@/components/WhenToUse";
import { HowItWorks } from "@/components/HowItWorks";
import { Documentation } from "@/components/Documentation";
import { CodeExample } from "@/components/CodeExample";
import { CTA } from "@/components/CTA";
import { Layout } from "@/components/Layout";

const Index = () => {
  return (
    <Layout withNavbarSpace={false}>
      <Hero />
      <Problem />
      <QuickStart />
      <Features />
      <WhenToUse />
      <HowItWorks />
      <Documentation />
      <CodeExample />
      <CTA />
    </Layout>
  );
};

export default Index;
