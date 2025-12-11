/// <reference types="vite/client" />

declare module "*.mdx" {
  import { ComponentType } from "react";
  const Component: ComponentType<Record<string, unknown>>;
  export default Component;
  export const frontmatter: {
    title: string;
    date: string;
    author: string;
    excerpt: string;
    category: string;
    tags: string[];
    image?: string;
  };
}
