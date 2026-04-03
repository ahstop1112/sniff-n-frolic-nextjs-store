export type Product = {
  id: string;
  name: string;
  slug: string;
  regular_price: number;
  sale_price: number | null;
  effective_price: number;
  featured_image_url: string | null;
  stock_status: 'instock' | 'outofstock';
};

export type Message = {
  role: 'user' | 'assistant';
  content: string;
  products?: Product[];
};