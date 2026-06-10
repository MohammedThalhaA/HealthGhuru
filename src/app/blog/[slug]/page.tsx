import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { Share2, MessageCircle, Link as LinkIcon } from "lucide-react";
import { BLOG_POSTS } from "@/lib/constants";
import { PillBadge } from "@/components/ui/PillBadge";
import { ScrollReveal } from "@/components/ui/ScrollReveal";

export async function generateStaticParams() {
  return BLOG_POSTS.map((post) => ({
    slug: post.slug,
  }));
}

export function generateMetadata({ params }: { params: { slug: string } }) {
  const post = BLOG_POSTS.find((p) => p.slug === params.slug);
  if (!post) return { title: "Post Not Found" };

  return {
    title: `${post.title} | HealthGhuru Blog`,
    description: post.excerpt,
  };
}

export default function BlogPostPage({ params }: { params: { slug: string } }) {
  const post = BLOG_POSTS.find((p) => p.slug === params.slug);

  if (!post) {
    notFound();
  }

  // Find a consistent image based on index (just for mockup)
  const index = BLOG_POSTS.findIndex(p => p.slug === params.slug);
  const images = [
    "/images/mental_health_pillar.png",
    "/images/sleep_pillar.png",
    "/images/exercise_push.png",
    "/images/exercise_pull.png",
    "/images/exercise_squats.png",
  ];
  const heroImage = images[index] || images[0];

  return (
    <article className="pt-32 pb-24 bg-white">
      <div className="max-w-[760px] mx-auto px-4 sm:px-6">
        
        {/* Breadcrumbs */}
        <ScrollReveal variant="fadeIn">
          <div className="flex items-center gap-2 text-sm text-text-muted font-heading mb-6">
            <Link href="/" className="hover:text-primary transition-colors">Home</Link>
            <span>/</span>
            <Link href="/blog" className="hover:text-primary transition-colors">Blog</Link>
            <span>/</span>
            <span className="text-text-primary truncate">{post.title}</span>
          </div>
        </ScrollReveal>

        {/* Header */}
        <ScrollReveal variant="fadeUp" delay={0.1}>
          <div className="mb-6">
            <PillBadge active>{post.category}</PillBadge>
          </div>
          <h1 className="font-display text-4xl sm:text-5xl lg:text-[56px] leading-[1.1] text-dark mb-8">
            {post.title}
          </h1>

          <div className="flex items-center gap-4 py-6 border-t border-b border-border mb-10">
            <div className="w-12 h-12 rounded-full relative overflow-hidden bg-surface-alt shrink-0">
              <Image 
                src="/images/exercise_plank.png" 
                alt="Author" 
                fill 
                className="object-cover"
              />
            </div>
            <div className="flex flex-col">
              <span className="font-heading font-semibold text-text-primary">Dr. Sarah Jenkins</span>
              <span className="text-text-muted text-sm">{post.date} · {post.readTime}</span>
            </div>
          </div>
        </ScrollReveal>

        {/* Hero Image */}
        <ScrollReveal variant="scaleUp" delay={0.2} className="relative w-full aspect-[16/9] rounded-2xl overflow-hidden mb-12 shadow-lg">
          <Image
            src={heroImage}
            alt={post.title}
            fill
            className="object-cover"
            priority
          />
        </ScrollReveal>

        {/* Article Body */}
        <ScrollReveal variant="fadeIn" delay={0.3} className="prose prose-lg prose-green max-w-none font-body text-text-primary leading-[1.8]">
          <p className="text-xl text-text-secondary leading-relaxed mb-8">
            {post.excerpt}
          </p>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
          </p>
          <h2>The Core Principles</h2>
          <p>
            Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.
          </p>
          <blockquote>
            &quot;Health is a state of complete harmony of the body, mind and spirit. When one is free from physical disabilities and mental distractions, the gates of the soul open.&quot;
          </blockquote>
          <p>
            Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem.
          </p>
        </ScrollReveal>

        {/* Footer actions */}
        <div className="mt-16 pt-8 border-t border-border flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="flex gap-2">
            <PillBadge active={false} className="text-xs py-1">Wellness</PillBadge>
            <PillBadge active={false} className="text-xs py-1">{post.category}</PillBadge>
          </div>

          <div className="flex items-center gap-4">
            <span className="font-heading text-sm text-text-muted font-medium">Share:</span>
            <button className="w-10 h-10 rounded-full bg-surface-alt flex items-center justify-center text-primary hover:bg-primary hover:text-white transition-colors">
              <Share2 size={18} />
            </button>
            <button className="w-10 h-10 rounded-full bg-surface-alt flex items-center justify-center text-primary hover:bg-primary hover:text-white transition-colors">
              <MessageCircle size={18} />
            </button>
            <button className="w-10 h-10 rounded-full bg-surface-alt flex items-center justify-center text-primary hover:bg-primary hover:text-white transition-colors">
              <LinkIcon size={18} />
            </button>
          </div>
        </div>

      </div>
    </article>
  );
}
