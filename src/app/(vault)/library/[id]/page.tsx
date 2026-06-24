import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { ChevronLeft } from "lucide-react";
import { PillBadge } from "@/components/ui/PillBadge";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { sql } from "@/lib/db";
import { ArticleBodyClientWrapper } from "@/components/blog/ArticleBodyClientWrapper";
import { AuthorBioCard } from "@/components/blog/AuthorBioCard";
import { MOCK_ARTICLES } from "@/lib/mockData";

export default async function VaultArticlePage({ params }: { params: { id: string } }) {
  let post = null;
  let publishDate = '';

  try {
    // Try to fetch from DB first
    // We check both id and slug just in case
    const posts = await sql`
      SELECT * FROM articles 
      WHERE (id::text = ${params.id} OR slug = ${params.id}) AND status = 'published'
    `;

    if (posts.length > 0) {
      post = posts[0];
      publishDate = new Date(post.publish_date).toLocaleDateString('en-US', {
        month: 'long', day: 'numeric', year: 'numeric'
      });
    }
  } catch (err) {
    console.error('Failed to fetch article from DB, using mock data fallback', err);
  }

  // Fallback to mock data if DB fails or no post found
  if (!post) {
    const mockPost = MOCK_ARTICLES.find(a => a.id === params.id || a.slug === params.id);
    if (!mockPost) {
      notFound();
    }
    
    // Construct a db-like post object from mock
    post = {
      title: mockPost.title,
      category: mockPost.category,
      author_name: "HealthGhuru Expert",
      author_credential: "MD",
      author_avatar: "/images/exercise_plank.png",
      read_time: mockPost.readTime,
      hero_image_url: mockPost.image,
      hero_image_alt: mockPost.title,
      excerpt: mockPost.excerpt,
      blocks: [
        { type: "paragraph", content: "This is a placeholder article body from the mock data. The actual content cannot be loaded right now." },
        { type: "paragraph", content: "Stay healthy by eating well, sleeping enough, and exercising regularly." }
      ]
    };
    publishDate = new Date(mockPost.date).toLocaleDateString('en-US', {
      month: 'long', day: 'numeric', year: 'numeric'
    });
  }

  return (
    <article className="pb-24 pt-8 bg-surface animate-in fade-in duration-500">
      <div className="max-w-[760px] mx-auto">
        
        {/* Back Link */}
        <ScrollReveal variant="fadeIn">
          <div className="mb-8">
            <Link 
              href="/library" 
              className="inline-flex items-center text-sm font-medium text-text-muted hover:text-primary transition-colors"
            >
              <ChevronLeft size={16} className="mr-1" />
              Back to Library
            </Link>
          </div>
        </ScrollReveal>

        <div className="bg-white rounded-3xl p-8 sm:p-12 shadow-sm border border-border">
          {/* Header */}
          <ScrollReveal variant="fadeUp" delay={0.1}>
            <div className="mb-6 flex items-center justify-between">
              <PillBadge active>{post.category}</PillBadge>
            </div>
            <h1 className="font-display text-3xl sm:text-4xl leading-[1.2] text-dark mb-8">
              {post.title}
            </h1>

            <div className="flex items-center gap-4 py-6 border-t border-b border-border mb-10">
              <div className="w-12 h-12 rounded-full relative overflow-hidden bg-surface-alt shrink-0">
                <Image 
                  src={post.author_avatar || "/images/exercise_plank.png"} 
                  alt={post.author_name || "Author"} 
                  fill 
                  className="object-cover"
                />
              </div>
              <div className="flex flex-col">
                <span className="font-heading font-semibold text-text-primary">{post.author_name}</span>
                <span className="text-text-muted text-sm">
                  {post.author_credential && <span className="text-primary mr-2 font-medium">{post.author_credential}</span>}
                  {publishDate} · {post.read_time} min read
                </span>
              </div>
            </div>
          </ScrollReveal>

          {/* Hero Image */}
          <ScrollReveal variant="scaleUp" delay={0.2} className="mb-10">
            <div className="relative w-full aspect-[16/9] rounded-2xl overflow-hidden shadow-sm border border-border">
              <Image
                src={post.hero_image_url || "/images/exercise_push.png"}
                alt={post.hero_image_alt || post.title}
                fill
                className="object-cover"
                priority
              />
            </div>
            {post.hero_image_alt && (
              <p className="text-sm text-center mt-3 italic text-text-muted">
                {post.hero_image_alt}
              </p>
            )}
          </ScrollReveal>

          {/* Article Body */}
          <ScrollReveal variant="fadeIn" delay={0.3}>
            <p className="text-lg sm:text-xl text-text-secondary leading-relaxed mb-10 font-medium">
              {post.excerpt}
            </p>
            
            <ArticleBodyClientWrapper blocks={post.blocks || []} />
          </ScrollReveal>

          {/* Tags */}
          {post.tags && post.tags.length > 0 && (
            <div className="mt-12 flex gap-2 flex-wrap">
              {post.tags.map((tag: string) => (
                <PillBadge key={tag} active={false} className="text-xs py-1">
                  {tag}
                </PillBadge>
              ))}
            </div>
          )}

          {/* Author Bio Card */}
          <div className="mt-12 pt-12 border-t border-border">
            <AuthorBioCard 
              name={post.author_name}
              avatarUrl={post.author_avatar || "/images/exercise_plank.png"}
              credential={post.author_credential}
              bio="Specializing in holistic health and preventative care, dedicated to helping people live their healthiest lives through evidence-based lifestyle changes."
            />
          </div>
        </div>

      </div>
    </article>
  );
}
