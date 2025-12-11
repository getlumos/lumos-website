import fs from "fs";
import path from "path";

interface BlogPost {
  slug: string;
  title: string;
  date: string;
  author: string;
  excerpt: string;
  category: string;
  tags: string[];
}

const SITE_URL = "https://lumos-lang.org";
const BLOG_URL = `${SITE_URL}/blog`;

// Parse frontmatter from MDX file
function parseFrontmatter(content: string): Record<string, any> {
  const match = content.match(/^---\n([\s\S]*?)\n---/);
  if (!match) return {};

  const frontmatter: Record<string, any> = {};
  const lines = match[1].split("\n");

  for (const line of lines) {
    const [key, ...valueParts] = line.split(":");
    if (key && valueParts.length) {
      const value = valueParts.join(":").trim().replace(/^["']|["']$/g, "");

      // Handle arrays
      if (value.startsWith("[") && value.endsWith("]")) {
        frontmatter[key.trim()] = value
          .slice(1, -1)
          .split(",")
          .map((v) => v.trim().replace(/^["']|["']$/g, ""));
      } else {
        frontmatter[key.trim()] = value;
      }
    }
  }

  return frontmatter;
}

// Get all blog posts
function getBlogPosts(): BlogPost[] {
  const blogDir = path.join(process.cwd(), "content", "blog");
  const files = fs.readdirSync(blogDir).filter((file) => file.endsWith(".mdx"));

  const posts = files.map((file) => {
    const slug = file.replace(".mdx", "");
    const content = fs.readFileSync(path.join(blogDir, file), "utf-8");
    const frontmatter = parseFrontmatter(content);

    return {
      slug,
      title: frontmatter.title || "",
      date: frontmatter.date || "",
      author: frontmatter.author || "",
      excerpt: frontmatter.excerpt || "",
      category: frontmatter.category || "",
      tags: frontmatter.tags || [],
    };
  });

  // Sort by date (newest first)
  return posts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

// Escape XML special characters
function escapeXml(text: string): string {
  return text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

// Generate RSS feed
function generateRSS(): string {
  const posts = getBlogPosts();
  const buildDate = new Date().toUTCString();

  let rss = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>LUMOS Blog</title>
    <link>${BLOG_URL}</link>
    <description>News, tutorials, and insights about LUMOS and Solana development</description>
    <language>en-us</language>
    <lastBuildDate>${buildDate}</lastBuildDate>
    <atom:link href="${SITE_URL}/rss.xml" rel="self" type="application/rss+xml" />
`;

  for (const post of posts) {
    const postUrl = `${BLOG_URL}/${post.slug}`;
    const pubDate = new Date(post.date).toUTCString();

    rss += `
    <item>
      <title>${escapeXml(post.title)}</title>
      <link>${postUrl}</link>
      <guid>${postUrl}</guid>
      <pubDate>${pubDate}</pubDate>
      <description>${escapeXml(post.excerpt)}</description>
      <category>${escapeXml(post.category)}</category>
      <author>${escapeXml(post.author)}</author>
    </item>`;
  }

  rss += `
  </channel>
</rss>`;

  return rss;
}

// Main
const rss = generateRSS();
const outputPath = path.join(process.cwd(), "public", "rss.xml");
fs.writeFileSync(outputPath, rss, "utf-8");
console.log(`✅ RSS feed generated at ${outputPath}`);
