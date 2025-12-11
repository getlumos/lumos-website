import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Layout } from "@/components/Layout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { getBlogPosts, getAllTags, type BlogPost, formatDate, authors } from "@/lib/blog";
import { Calendar, User, Tag } from "lucide-react";

const Blog = () => {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [filteredPosts, setFilteredPosts] = useState<BlogPost[]>([]);
  const [allTags, setAllTags] = useState<string[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [selectedTag, setSelectedTag] = useState<string>("all");
  const [loading, setLoading] = useState(true);

  const categories = [
    { value: "all", label: "All Posts" },
    { value: "announcement", label: "Announcements" },
    { value: "tutorial", label: "Tutorials" },
    { value: "release", label: "Release Notes" },
    { value: "guide", label: "Guides" },
  ];

  useEffect(() => {
    const loadPosts = async () => {
      try {
        const [postsData, tagsData] = await Promise.all([getBlogPosts(), getAllTags()]);
        setPosts(postsData);
        setFilteredPosts(postsData);
        setAllTags(tagsData);
      } catch (error) {
        console.error("Failed to load blog posts:", error);
      } finally {
        setLoading(false);
      }
    };

    loadPosts();
  }, []);

  useEffect(() => {
    let filtered = posts;

    if (selectedCategory !== "all") {
      filtered = filtered.filter((post) => post.category === selectedCategory);
    }

    if (selectedTag !== "all") {
      filtered = filtered.filter((post) => post.tags.includes(selectedTag));
    }

    setFilteredPosts(filtered);
  }, [selectedCategory, selectedTag, posts]);

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

  return (
    <Layout>
      <div className="container mx-auto px-4 py-16">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Blog</h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            News, tutorials, and insights about LUMOS and Solana development
          </p>
        </div>

        {/* Filters */}
        <div className="mb-8 flex flex-col md:flex-row gap-4 items-center justify-between">
          {/* Category Filter */}
          <div className="flex flex-wrap gap-2">
            {categories.map((cat) => (
              <Button
                key={cat.value}
                variant={selectedCategory === cat.value ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedCategory(cat.value)}
              >
                {cat.label}
              </Button>
            ))}
          </div>

          {/* Tag Filter */}
          <div className="flex items-center gap-2">
            <Tag className="h-4 w-4 text-muted-foreground" />
            <select
              className="border rounded-md px-3 py-1.5 text-sm bg-background"
              value={selectedTag}
              onChange={(e) => setSelectedTag(e.target.value)}
            >
              <option value="all">All Tags</option>
              {allTags.map((tag) => (
                <option key={tag} value={tag}>
                  {tag}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Loading State */}
        {loading && (
          <div className="text-center py-12">
            <p className="text-muted-foreground">Loading posts...</p>
          </div>
        )}

        {/* Posts Grid */}
        {!loading && filteredPosts.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredPosts.map((post) => (
              <Link key={post.slug} to={`/blog/${post.slug}`}>
                <Card className="h-full hover:shadow-lg transition-shadow">
                  {post.image && (
                    <img
                      src={post.image}
                      alt={post.title}
                      className="w-full h-48 object-cover rounded-t-lg"
                    />
                  )}
                  <CardHeader>
                    <div className="flex items-center gap-2 mb-2">
                      <Badge variant={getCategoryBadgeVariant(post.category)}>
                        {post.category}
                      </Badge>
                    </div>
                    <CardTitle className="line-clamp-2">{post.title}</CardTitle>
                    <CardDescription className="line-clamp-2">{post.excerpt}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex flex-col gap-2 text-sm text-muted-foreground">
                      <div className="flex items-center gap-2">
                        <Calendar className="h-4 w-4" />
                        <span>{formatDate(post.date)}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <User className="h-4 w-4" />
                        <span>{authors[post.author]?.name || post.author}</span>
                      </div>
                      {post.tags.length > 0 && (
                        <div className="flex flex-wrap gap-1 mt-2">
                          {post.tags.map((tag) => (
                            <Badge key={tag} variant="outline" className="text-xs">
                              {tag}
                            </Badge>
                          ))}
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        )}

        {/* Empty State */}
        {!loading && filteredPosts.length === 0 && (
          <div className="text-center py-12">
            <p className="text-muted-foreground">No posts found matching your filters.</p>
            <Button
              className="mt-4"
              variant="outline"
              onClick={() => {
                setSelectedCategory("all");
                setSelectedTag("all");
              }}
            >
              Clear Filters
            </Button>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default Blog;
