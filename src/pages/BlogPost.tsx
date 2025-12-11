import { useEffect, useState, Suspense } from "react";
import { useParams, Link } from "react-router-dom";
import { Layout } from "@/components/Layout";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { getBlogPost, type BlogPost, formatDate, authors } from "@/lib/blog";
import { Calendar, User, ArrowLeft, Tag } from "lucide-react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

const BlogPost = () => {
  const { slug } = useParams<{ slug: string }>();
  const [post, setPost] = useState<BlogPost | null>(null);
  const [MDXContent, setMDXContent] = useState<React.ComponentType | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    if (!slug) return;

    const loadPost = async () => {
      try {
        const [postData, mdxModule] = await Promise.all([
          getBlogPost(slug),
          import(`../../content/blog/${slug}.mdx`),
        ]);

        if (postData && mdxModule.default) {
          setPost(postData);
          setMDXContent(() => mdxModule.default);
        } else {
          setError(true);
        }
      } catch (err) {
        console.error("Failed to load blog post:", err);
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    loadPost();
  }, [slug]);

  const author = post?.author ? authors[post.author] : null;

  const getCategoryBadgeVariant = (category: string) => {
    switch (category) {
      case "announcement":
        return "default";
      case "tutorial":
        return "secondary";
      case "release":
        return "destructive";
      case "guide":
        return "outline";
      default:
        return "default";
    }
  };

  if (loading) {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-16">
          <div className="max-w-4xl mx-auto">
            <p className="text-center text-muted-foreground">Loading post...</p>
          </div>
        </div>
      </Layout>
    );
  }

  if (error || !post || !MDXContent) {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-16">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl font-bold mb-4">Post Not Found</h1>
            <p className="text-muted-foreground mb-8">
              The blog post you're looking for doesn't exist or has been removed.
            </p>
            <Link to="/blog">
              <Button>
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Blog
              </Button>
            </Link>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <article className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto">
          {/* Back Button */}
          <Link to="/blog" className="inline-block mb-8">
            <Button variant="ghost" size="sm">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Blog
            </Button>
          </Link>

          {/* Header */}
          <header className="mb-8">
            <div className="flex items-center gap-2 mb-4">
              <Badge variant={getCategoryBadgeVariant(post.category)}>{post.category}</Badge>
            </div>

            <h1 className="text-4xl md:text-5xl font-bold mb-4">{post.title}</h1>

            <div className="flex flex-wrap items-center gap-6 text-muted-foreground mb-6">
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4" />
                <span>{formatDate(post.date)}</span>
              </div>

              {author && (
                <div className="flex items-center gap-2">
                  <Avatar className="h-6 w-6">
                    <AvatarFallback>{author.name[0]}</AvatarFallback>
                  </Avatar>
                  <span>{author.name}</span>
                </div>
              )}
            </div>

            {post.tags.length > 0 && (
              <div className="flex items-center gap-2 flex-wrap">
                <Tag className="h-4 w-4 text-muted-foreground" />
                {post.tags.map((tag) => (
                  <Badge key={tag} variant="outline">
                    {tag}
                  </Badge>
                ))}
              </div>
            )}
          </header>

          <Separator className="mb-8" />

          {/* MDX Content */}
          <div className="prose prose-lg dark:prose-invert max-w-none">
            <Suspense fallback={<div>Loading content...</div>}>
              <MDXContent />
            </Suspense>
          </div>

          <Separator className="my-12" />

          {/* Author Bio */}
          {author && (
            <div className="flex items-start gap-4 p-6 bg-muted/50 rounded-lg">
              <Avatar className="h-16 w-16">
                <AvatarFallback className="text-xl">{author.name[0]}</AvatarFallback>
              </Avatar>
              <div>
                <h3 className="font-semibold text-lg mb-2">About {author.name}</h3>
                {author.bio && <p className="text-muted-foreground mb-2">{author.bio}</p>}
                <div className="flex gap-4 text-sm">
                  {author.github && (
                    <a
                      href={`https://github.com/${author.github}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-primary hover:underline"
                    >
                      GitHub
                    </a>
                  )}
                  {author.twitter && (
                    <a
                      href={`https://twitter.com/${author.twitter}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-primary hover:underline"
                    >
                      Twitter
                    </a>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* Back Button (Bottom) */}
          <div className="mt-12 text-center">
            <Link to="/blog">
              <Button>
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Blog
              </Button>
            </Link>
          </div>
        </div>
      </article>
    </Layout>
  );
};

export default BlogPost;
