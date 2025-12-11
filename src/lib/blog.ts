export interface BlogPost {
  slug: string;
  title: string;
  date: string;
  author: string;
  excerpt: string;
  category: "announcement" | "tutorial" | "release" | "guide";
  tags: string[];
  image?: string;
  content?: string;
}

export interface Author {
  id: string;
  name: string;
  avatar?: string;
  bio?: string;
  twitter?: string;
  github?: string;
}

// Author profiles
export const authors: Record<string, Author> = {
  rector: {
    id: "rector",
    name: "RECTOR",
    bio: "Core maintainer of LUMOS",
    github: "rz1989s",
  },
  team: {
    id: "team",
    name: "LUMOS Team",
    bio: "The LUMOS development team",
    github: "getlumos",
  },
};

// Get all blog posts from the content directory
export const getBlogPosts = async (): Promise<BlogPost[]> => {
  const posts: BlogPost[] = [];

  // Import all MDX files from content/blog
  const modules = import.meta.glob("../../content/blog/*.mdx", { eager: true });

  for (const [path, module] of Object.entries(modules)) {
    const slug = path.split("/").pop()?.replace(".mdx", "") || "";
    const { frontmatter } = module as any;

    if (frontmatter) {
      posts.push({
        slug,
        title: frontmatter.title,
        date: frontmatter.date,
        author: frontmatter.author,
        excerpt: frontmatter.excerpt,
        category: frontmatter.category,
        tags: frontmatter.tags || [],
        image: frontmatter.image,
      });
    }
  }

  // Sort by date (newest first)
  return posts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
};

// Get a single blog post by slug
export const getBlogPost = async (slug: string): Promise<BlogPost | null> => {
  try {
    const module = await import(`../../content/blog/${slug}.mdx`);
    const { frontmatter } = module as any;

    if (frontmatter) {
      return {
        slug,
        title: frontmatter.title,
        date: frontmatter.date,
        author: frontmatter.author,
        excerpt: frontmatter.excerpt,
        category: frontmatter.category,
        tags: frontmatter.tags || [],
        image: frontmatter.image,
      };
    }
  } catch {
    return null;
  }

  return null;
};

// Get posts by category
export const getPostsByCategory = async (category: string): Promise<BlogPost[]> => {
  const posts = await getBlogPosts();
  return posts.filter((post) => post.category === category);
};

// Get posts by tag
export const getPostsByTag = async (tag: string): Promise<BlogPost[]> => {
  const posts = await getBlogPosts();
  return posts.filter((post) => post.tags.includes(tag));
};

// Get all unique tags
export const getAllTags = async (): Promise<string[]> => {
  const posts = await getBlogPosts();
  const tags = new Set<string>();
  posts.forEach((post) => post.tags.forEach((tag) => tags.add(tag)));
  return Array.from(tags).sort();
};

// Format date
export const formatDate = (dateString: string): string => {
  const date = new Date(dateString);
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
};
