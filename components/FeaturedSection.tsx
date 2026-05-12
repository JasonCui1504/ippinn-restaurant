import Image from "next/image";
import { featuredArticles } from "@/data/featured";
import { fetchOG } from "@/lib/og";

export default async function FeaturedSection() {
  const articles = await Promise.all(
    featuredArticles.map(async (entry) => {
      const og = await fetchOG(entry.url);
      return {
        url: entry.url,
        title: entry.title ?? og.title,
        description: entry.description ?? og.description,
        image: entry.image ?? og.image,
        source: entry.source ?? og.siteName,
      };
    })
  );

  if (articles.length === 0) return null;

  const gridClass =
    articles.length === 1
      ? "grid-cols-1 max-w-lg mx-auto"
      : articles.length === 2
      ? "grid-cols-1 md:grid-cols-2"
      : "grid-cols-1 md:grid-cols-2 lg:grid-cols-3";

  return (
    <section id="featured" className="py-28 px-6" style={{ backgroundColor: "#1C1814" }}>
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col items-center text-center mb-16">
          <p className="font-body text-xs tracking-[0.4em] uppercase mb-4" style={{ color: "#9B2335" }}>
            Press
          </p>
          <h2 className="font-display text-[clamp(2.5rem,5vw,4rem)] font-light" style={{ color: "#F8F3EA" }}>
            As Seen In
          </h2>
          <div className="mt-5" style={{ height: "1px", width: "5rem", backgroundColor: "#3D3530" }} />
        </div>

        <div className={`grid gap-6 ${gridClass}`}>
          {articles.map((article) => (
            <a
              key={article.url}
              href={article.url}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex flex-col border border-[#3D3530] hover:border-accent transition-colors duration-300"
            >
              {/* Thumbnail */}
              <div className="relative w-full overflow-hidden" style={{ aspectRatio: "16/9", backgroundColor: "#2A2520" }}>
                {article.image ? (
                  <Image
                    src={article.image}
                    alt={article.title}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    unoptimized
                  />
                ) : (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="font-display text-5xl opacity-20" style={{ color: "#F8F3EA" }}>一品</span>
                  </div>
                )}
              </div>

              {/* Text */}
              <div className="flex flex-col flex-1 p-6">
                <p className="font-body text-[10px] tracking-[0.35em] uppercase mb-3" style={{ color: "#9B2335" }}>
                  {article.source}
                </p>
                <h3 className="font-display text-xl font-light leading-snug mb-3" style={{ color: "#F8F3EA" }}>
                  {article.title}
                </h3>
                {article.description && (
                  <p className="font-body text-sm leading-relaxed line-clamp-3 flex-1" style={{ color: "#7D7268" }}>
                    {article.description}
                  </p>
                )}
                <div className="mt-5 flex items-center gap-2 font-body text-xs tracking-[0.25em] uppercase text-warm-gray group-hover:text-accent transition-colors duration-200">
                  <span>Read Article</span>
                  <svg width="10" height="10" viewBox="0 0 12 12" fill="none" className="transition-transform duration-300 group-hover:translate-x-1">
                    <path d="M2 10L10 2M10 2H4M10 2V8" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
