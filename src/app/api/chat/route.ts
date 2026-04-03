import { NextRequest, NextResponse } from 'next/server';
import Anthropic from '@anthropic-ai/sdk';

const client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });

type Product = {
    id: string;
    name: string;
    slug: string;
    regular_price: number;
    sale_price: number | null;
    effective_price: number; 
    featured_image_url: string | null;
    category_name: string | null;
};

let cachedProductList: { str: string; map: Record<string, Product> } | null = null;
let cacheTime = 0;
const CACHE_TTL = 10 * 60 * 1000; 

// Fetch products from your NestJS API and format as a product list string
const getProductList = async (): Promise<{ productListStr: string; productsMap: Record<string, Product> }> => {
    const now = Date.now();
    if (cachedProductList && now - cacheTime < CACHE_TTL) {
        return cachedProductList;
    }
    
    try {
        const res = await fetch(`${process.env.API_BASE_URL}/products`, {
            cache: 'force-cache',
            headers: { 'Cache-Control': 'max-age=300' },
        });
        const data = await res.json();
        // console.log('API response:', JSON.stringify(data).slice(0, 200));
        const products: Product[] = Array.isArray(data) ? data : [];

        const productsMap: Record<string, Product> = {};
        products.forEach((p) => { productsMap[p.slug] = p; });

        const productListStr = products
        .map((p) => {
            const price = p.sale_price
            ? `$${(p.sale_price / 100).toFixed(2)} (was $${(p.regular_price / 100).toFixed(2)})`
            : `$${(p.regular_price / 100).toFixed(2)}`;
            const cat = p.category_name ? ` | ${p.category_name}` : '';
            return `- ${p.name} | ${price} | slug: ${p.slug}${cat}`;
        })
        .join('\n');

        return { productListStr, productsMap };
    } catch (err) {
        console.error('Failed to fetch products:', err);
        return { productListStr: '(product list unavailable)', productsMap: {} };
    }
}

export const POST = async (req: NextRequest) => {
    const { messages } = await req.json();

    const { productListStr, productsMap } = await getProductList();

    const systemPrompt = `You are Fei Fei, a friendly shopping assistant for Sniff N Frolic — a Canadian pet lifestyle brand. You only recommend products from the inventory below.
        INVENTORY:
        ${productListStr}

        Rules:
        - Respond in friendly, natural English
        - Ask about the pet (dog or cat, size, age, any needs) if it helps narrow recommendations
        - Keep replies concise — 1–3 sentences before product suggestions
        - When recommending products, append a PRODUCTS_JSON block at the end with the product slugs EXACTLY as listed:

        PRODUCTS_JSON:
        [{"slug":"exact-slug-here"},{"slug":"another-slug"}]

        Recommend 2–3 products max. Only use slugs from the inventory above. For general chat, omit PRODUCTS_JSON.`;

    const response = await client.messages.create({
        model: 'claude-haiku-4-5-20251001',
        max_tokens: 1024,
        system: systemPrompt,
        messages,
    });

    const raw = response.content
        .filter((b) => b.type === 'text')
        .map((b) => (b as { type: 'text'; text: string }).text)
        .join('');

    let text = raw;
    let products: Product[] = [];

    const idx = raw.indexOf('PRODUCTS_JSON:');
    if (idx !== -1) {
        text = raw.slice(0, idx).trim();
        try {
        const slugs: { slug: string }[] = JSON.parse(raw.slice(idx + 14).trim());
        products = slugs
            .map((s) => productsMap[s.slug])
            .filter(Boolean);
        } catch {
        // malformed JSON — just skip products
        }
    }

    return NextResponse.json({ text, products });
}