
export interface Product {
  id: string;
  name: string;
  brand: string | null;
  short_description: string | null;
  daily_price: number | null;
  sale_price: number | null;
  image_url: string | null;
  type: 'location' | 'vente' | 'both';
  category_id: string | null;
  category: { name: string } | null;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  created_at: string;
}
