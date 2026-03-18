import dotenv from "dotenv";
dotenv.config();

const baseUrl = process.env.WOO_API_BASE_URL!;
const consumerKey = process.env.WOO_CONSUMER_KEY!;
const consumerSecret = process.env.WOO_CONSUMER_SECRET!;

if (!baseUrl) {
  throw new Error("Missing WC_API_URL in apps/backend/.env");
}

if (!consumerKey) {
  throw new Error("Missing WC_CONSUMER_KEY in apps/backend/.env");
}

if (!consumerSecret) {
  throw new Error("Missing WC_CONSUMER_SECRET in apps/backend/.env");
}

export const fetchWooProducts = async (page: number) => {
  const url = new URL(`${baseUrl}/products`);
  url.searchParams.set("per_page", "100"); 
  url.searchParams.set("page", String(page));
  url.searchParams.set("consumer_key", consumerKey);
  url.searchParams.set("consumer_secret", consumerSecret);
  url.searchParams.set("consumer_key", consumerKey);
  url.searchParams.set("consumer_secret", consumerSecret);

  const res = await fetch(url.toString());

  if (!res.ok) {
    throw new Error(`Woo fetch failed: ${res.status} ${res.statusText}`);
  }

  return res.json();
};