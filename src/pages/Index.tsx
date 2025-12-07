import { Hero } from "@/components/Hero";
import { Problem } from "@/components/Problem";
import { Features } from "@/components/Features";
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
      <Features />
      <HowItWorks />
      <Documentation />
      <CodeExample />
      <CTA />
    </Layout>
  );
};

export default Index;
