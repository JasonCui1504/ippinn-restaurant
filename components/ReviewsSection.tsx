import { getRatings, getReviewQuotes } from "@/lib/reviews";

function Stars({ rating }: { rating: number }) {
  const full = Math.floor(rating);
  const partial = rating - full;
  const empty = 5 - Math.ceil(rating);

  return (
    <div className="flex items-center gap-0.5">
      {Array.from({ length: full }).map((_, i) => (
        <svg key={`f${i}`} width="14" height="14" viewBox="0 0 20 20" fill="#C9A96E">
          <path d="M10 1l2.39 4.85 5.35.78-3.87 3.77.91 5.32L10 13.27l-4.78 2.45.91-5.32L2.26 6.63l5.35-.78L10 1z" />
        </svg>
      ))}
      {partial > 0 && (
        <svg key="p" width="14" height="14" viewBox="0 0 20 20">
          <defs>
            <linearGradient id="half">
              <stop offset={`${partial * 100}%`} stopColor="#C9A96E" />
              <stop offset={`${partial * 100}%`} stopColor="#5A504A" />
            </linearGradient>
          </defs>
          <path d="M10 1l2.39 4.85 5.35.78-3.87 3.77.91 5.32L10 13.27l-4.78 2.45.91-5.32L2.26 6.63l5.35-.78L10 1z" fill="url(#half)" />
        </svg>
      )}
      {Array.from({ length: empty }).map((_, i) => (
        <svg key={`e${i}`} width="14" height="14" viewBox="0 0 20 20" fill="#5A504A">
          <path d="M10 1l2.39 4.85 5.35.78-3.87 3.77.91 5.32L10 13.27l-4.78 2.45.91-5.32L2.26 6.63l5.35-.78L10 1z" />
        </svg>
      ))}
    </div>
  );
}

const PLATFORM_ICONS: Record<string, string> = {
  Google: "G",
  Yelp: "Y",
  "Uber Eats": "U",
  DoorDash: "D",
};

export default async function ReviewsSection() {
  const [ratings, quotes] = await Promise.all([
    getRatings(),
    Promise.resolve(getReviewQuotes()),
  ]);

  return (
    <section id="reviews" className="py-28 px-6" style={{ backgroundColor: "#1C1814" }}>
      <div className="max-w-6xl mx-auto">

        {/* Section header */}
        <div className="flex flex-col items-center text-center mb-16">
          <p className="font-body text-xs tracking-[0.4em] uppercase mb-4" style={{ color: "#C9A96E" }}>
            What People Say
          </p>
          <h2 className="font-display text-[clamp(2.5rem,5vw,4rem)] font-light" style={{ color: "#F8F3EA" }}>
            Reviews
          </h2>
          <div className="mt-5" style={{ height: "1px", width: "5rem", backgroundColor: "#3D3530" }} />
        </div>

        {/* Platform rating cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-20">
          {ratings.map((r) => (
            <a
              key={r.platform}
              href={r.url}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex flex-col items-center text-center p-8 border border-[#3D3530] hover:border-[#C9A96E] transition-colors duration-300"
            >
              {/* Platform monogram */}
              <div
                className="w-12 h-12 flex items-center justify-center mb-5 rounded-full transition-colors duration-300"
                style={{ backgroundColor: "#2A2520" }}
              >
                <span className="font-display text-lg" style={{ color: "#C9A96E" }}>
                  {PLATFORM_ICONS[r.platform] ?? r.platform[0]}
                </span>
              </div>

              <p className="font-body text-[10px] tracking-[0.3em] uppercase mb-3" style={{ color: "#A09585" }}>
                {r.platform}
              </p>

              {/* Numeric rating */}
              <p className="font-display text-5xl font-light mb-3" style={{ color: "#F8F3EA" }}>
                {r.rating.toFixed(1)}
              </p>

              <Stars rating={r.rating} />

              <p className="font-body text-xs mt-3" style={{ color: "#A09585" }}>
                {r.reviewCount} reviews
              </p>
            </a>
          ))}
        </div>

        {/* Divider */}
        <div className="mb-16" style={{ height: "1px", backgroundColor: "#3D3530" }} />

        {/* Review quote vignettes */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {quotes.map((q, i) => (
            <div
              key={i}
              className="flex flex-col p-8 border border-[#3D3530]"
              style={{ backgroundColor: "#211D19" }}
            >
              {/* Opening quote mark */}
              <span
                className="font-display text-6xl leading-none mb-4 select-none"
                style={{ color: "#4E4540" }}
              >
                &ldquo;
              </span>

              <p className="font-body text-sm leading-relaxed flex-1 mb-6" style={{ color: "#D4C9BC" }}>
                {q.text}
              </p>

              <div className="flex items-center justify-between">
                <div>
                  <p className="font-display text-base" style={{ color: "#F8F3EA" }}>
                    {q.author}
                  </p>
                  <p className="font-body text-[10px] tracking-[0.25em] uppercase mt-0.5" style={{ color: "#A09585" }}>
                    via {q.platform}
                  </p>
                </div>
                <Stars rating={q.rating} />
              </div>
            </div>
          ))}
        </div>

        {/* CTA to leave a review */}
        <div className="flex justify-center mt-14">
          <a
            href="https://www.yelp.com/biz/ippinn-udon-and-tempura-santa-rosa"
            target="_blank"
            rel="noopener noreferrer"
            className="font-body text-xs tracking-[0.25em] uppercase px-8 py-4 border border-[#3D3530] hover:border-[#C9A96E] transition-colors duration-300"
            style={{ color: "#A09585" }}
          >
            Leave a Review
          </a>
        </div>
      </div>
    </section>
  );
}
