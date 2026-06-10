import Image from "next/image";
import Link from "next/link";
import { Card } from "@/components/ui/Card";
import { PillBadge } from "@/components/ui/PillBadge";
import { Button } from "@/components/ui/Button";

export default function FeaturedArticle() {
  return (
    <div className="py-8">
      <Card className="flex flex-col lg:flex-row overflow-hidden group h-full cursor-pointer p-0" hoverEffect={false}>
        {/* Left: Image */}
        <div className="w-full lg:w-[55%] relative aspect-[16/9] lg:aspect-auto overflow-hidden">
          <Image
            src="/images/nutrition_pillar.png"
            alt="Featured Article"
            fill
            className="object-cover transition-transform duration-700 group-hover:scale-105"
          />
        </div>

        {/* Right: Content */}
        <div className="w-full lg:w-[45%] p-8 lg:p-12 flex flex-col items-start justify-center bg-white relative z-10 transition-transform duration-300 group-hover:-translate-y-1 lg:group-hover:translate-y-0 lg:group-hover:-translate-x-1 shadow-[-10px_0_30px_rgba(0,0,0,0.05)] lg:rounded-l-3xl -mt-6 lg:mt-0">
          
          <div className="flex items-center gap-3 mb-6">
            <span className="font-heading text-xs font-bold text-accent tracking-widest bg-accent-light px-3 py-1 rounded-full uppercase">
              Featured
            </span>
            <PillBadge active={false}>Fitness</PillBadge>
          </div>

          <h2 className="font-display text-3xl lg:text-4xl text-dark mb-4 leading-tight group-hover:text-primary transition-colors">
            Sun Salutation Secrets: Elevate Your Wellness with Surya Namaskar
          </h2>

          <p className="text-text-secondary text-lg leading-relaxed mb-8 line-clamp-3">
            Discover the ancient practice of Surya Namaskar and how 12 flowing poses can transform your morning routine and overall health. Perfect for beginners and advanced practitioners alike.
          </p>

          <Link href="/blog/sun-salutation-secrets" className="mb-8">
            <Button variant="primary">Read Article &rarr;</Button>
          </Link>

          <div className="mt-auto pt-6 border-t border-border flex items-center gap-4 w-full">
            <div className="w-10 h-10 rounded-full bg-primary/20 relative overflow-hidden shrink-0">
              <Image 
                src="/images/fitness_pillar.png" 
                alt="Author" 
                fill 
                className="object-cover"
              />
            </div>
            <div className="flex flex-col">
              <span className="font-heading font-semibold text-sm text-dark">Dr. Sarah Jenkins</span>
              <span className="text-text-muted text-xs">Dec 12, 2024 · 5 min read</span>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
}
