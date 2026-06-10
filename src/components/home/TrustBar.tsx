import { AnimatedCounter } from "@/components/ui/AnimatedCounter";

export default function TrustBar() {
  return (
    <section className="bg-dark py-12 border-t border-b border-primary-dark">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-0">
          
          <div className="flex flex-col items-center text-center px-6 border-white/20 md:border-r">
            <AnimatedCounter value={20000} suffix="+" className="font-mono text-4xl lg:text-5xl text-accent mb-2 font-bold" />
            <span className="font-heading text-white text-sm uppercase tracking-widest">Expert Articles</span>
          </div>

          <div className="flex flex-col items-center text-center px-6 border-white/20 md:border-r">
            <AnimatedCounter value={100} suffix="%" className="font-mono text-4xl lg:text-5xl text-accent mb-2 font-bold" />
            <span className="font-heading text-white text-sm uppercase tracking-widest">Science-Backed</span>
          </div>

          <div className="flex flex-col items-center text-center px-6">
            <div className="font-mono text-4xl lg:text-5xl text-accent mb-2 font-bold flex items-center gap-2">
              Expert <span className="text-2xl text-white">✓</span>
            </div>
            <span className="font-heading text-white text-sm uppercase tracking-widest">Medical Review</span>
          </div>

        </div>
      </div>
    </section>
  );
}
