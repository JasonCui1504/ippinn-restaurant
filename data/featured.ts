// ─────────────────────────────────────────────────────────────
// ADD PRESS / NEWS ARTICLES HERE
// Each entry needs at least a `url`. Everything else is optional —
// leave it out and we'll pull the title, image, and blurb from the
// article's Open Graph tags automatically.
// ─────────────────────────────────────────────────────────────

export type FeaturedArticle = {
  url: string;
  title?: string;       // override the OG title
  description?: string; // override the OG description
  image?: string;       // override the OG image (use a /public path or https URL)
  source?: string;      // override the publication name
};

export const featuredArticles: FeaturedArticle[] = [
  {
    url: "https://www.sonomamag.com/slurp-all-you-want-at-ippinn-udon-in-santa-rosa/",
    source: "Sonoma Magazine",
  },
  {
    url: "https://www.sonomacounty.com/profiles/ippinn-udon-and-tempura/",
    source: "Sonoma County Tourism",
  },
  // Paste more article URLs below this line ↓
];
