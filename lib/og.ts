export type OGData = {
  url: string;
  title: string;
  description: string | null;
  image: string | null;
  siteName: string;
};

export async function fetchOG(url: string): Promise<OGData> {
  const domain = new URL(url).hostname.replace("www.", "");
  try {
    const res = await fetch(url, {
      headers: { "User-Agent": "Mozilla/5.0 (compatible; IppinnBot/1.0)" },
      next: { revalidate: 86400 },
    });
    const html = await res.text();

    const get = (prop: string) =>
      html.match(new RegExp(`<meta[^>]+property=["']og:${prop}["'][^>]+content=["']([^"']*?)["']`, "i"))?.[1]?.trim() ??
      html.match(new RegExp(`<meta[^>]+content=["']([^"']*?)["'][^>]+property=["']og:${prop}["']`, "i"))?.[1]?.trim() ??
      null;

    const titleTag = html.match(/<title[^>]*>([^<]+)<\/title>/i)?.[1]?.trim() ?? null;

    return {
      url,
      title: get("title") ?? titleTag ?? url,
      description: get("description"),
      image: get("image"),
      siteName: get("site_name") ?? domain,
    };
  } catch {
    return { url, title: url, description: null, image: null, siteName: domain };
  }
}
