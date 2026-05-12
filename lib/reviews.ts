export interface PlatformRating {
  platform: string;
  rating: number;
  reviewCount: string;
  url: string;
}

export interface ReviewQuote {
  text: string;
  author: string;
  rating: number;
  platform: string;
}

// ─── Static fallback data ────────────────────────────────────────────────────
// Update these whenever you want fresher numbers
const STATIC_RATINGS: PlatformRating[] = [
  {
    platform: "Google",
    rating: 4.6,
    reviewCount: "562",
    url: "https://www.google.com/search?q=Ippinn+Udon+%26+Tempura#lrd=0x8084478aecd656cf:0xb94438bf56c9a307,1,,,,",
  },
  {
    platform: "Yelp",
    rating: 4.4,
    reviewCount: "723",
    url: "https://www.yelp.com/biz/ippinn-udon-and-tempura-santa-rosa",
  },
  {
    platform: "Uber Eats",
    rating: 4.8,
    reviewCount: "700+",
    url: "https://www.ubereats.com/store/ippinn-udon/ijgfUR1LVi22D7WIHnfR3A",
  },
  {
    platform: "DoorDash",
    rating: 4.8,
    reviewCount: "5,000+",
    url: "https://www.doordash.com/en/store/ippinn-udon-&-tempura-santa-rosa-539147/",
  },
];

const STATIC_QUOTES: ReviewQuote[] = [
  {
    text: "What a find! Stumbled into this place while hungry visiting the area. It was great! You order with trays down an assembly line and pay at the end. Miso soup and sides are given to you first. Main dishes come out after. Great service! We had a baby as well and even he loved the udon and veggie tempura.",
    author: "John V.",
    rating: 5,
    platform: "Yelp",
  },
  {
    text: "I absolutely love this place, the food is prepared for you right before your eyes and is definitely fresh. I have gotten to know a few of the employees, they're always helpful and friendly.",
    author: "Tracy M.",
    rating: 5,
    platform: "Yelp",
  },
  {
    text: "Awesome food. Delicious as always. They have a mix of chinese and japanese noodle dishes, and its incredibly tasty. They make everything fresh. Their dumplings are made by a person in the back, and upon walking in, you can see the noodle machine going. Owner is such a kind person.",
    author: "Jason C.",
    rating: 5,
    platform: "Google",
  },
  {
    text: "The four different udons were delicious! The owner is very friendly and came out to ask about the quality and taste. The noodles were made fresh in the noodle shop! Many varieties.",
    author: "Ray C.",
    rating: 5,
    platform: "Google",
  },
];

// ─── Yelp Fusion API ─────────────────────────────────────────────────────────
async function fetchYelpRating(): Promise<PlatformRating | null> {
  const apiKey = process.env.YELP_API_KEY;
  if (!apiKey) return null;

  try {
    const res = await fetch(
      "https://api.yelp.com/v3/businesses/ippinn-udon-and-tempura-santa-rosa",
      {
        headers: { Authorization: `Bearer ${apiKey}` },
        next: { revalidate: 86400 },
      }
    );
    if (!res.ok) return null;
    const data = await res.json();
    return {
      platform: "Yelp",
      rating: data.rating,
      reviewCount: data.review_count.toLocaleString(),
      url: data.url,
    };
  } catch {
    return null;
  }
}

// ─── Google Places API ───────────────────────────────────────────────────────
async function fetchGoogleRating(): Promise<PlatformRating | null> {
  const apiKey = process.env.GOOGLE_PLACES_API_KEY;
  const placeId = process.env.GOOGLE_PLACE_ID;
  if (!apiKey || !placeId) return null;

  try {
    const res = await fetch(
      `https://maps.googleapis.com/maps/api/place/details/json?place_id=${placeId}&fields=rating,user_ratings_total&key=${apiKey}`,
      { next: { revalidate: 86400 } }
    );
    if (!res.ok) return null;
    const data = await res.json();
    const result = data.result;
    if (!result) return null;
    return {
      platform: "Google",
      rating: result.rating,
      reviewCount: result.user_ratings_total.toLocaleString() + "+",
      url: `https://www.google.com/maps/place/?q=place_id:${placeId}`,
    };
  } catch {
    return null;
  }
}

// ─── Public entry point ──────────────────────────────────────────────────────
export async function getRatings(): Promise<PlatformRating[]> {
  const [yelp, google] = await Promise.all([
    fetchYelpRating(),
    fetchGoogleRating(),
  ]);

  return STATIC_RATINGS.map((s) => {
    if (s.platform === "Yelp" && yelp) return yelp;
    if (s.platform === "Google" && google) return google;
    return s;
  });
}

export function getReviewQuotes(): ReviewQuote[] {
  return STATIC_QUOTES;
}
