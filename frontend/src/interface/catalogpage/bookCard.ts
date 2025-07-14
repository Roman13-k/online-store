import { ShopInterface } from "../shoppage/shop";

export interface BookCardInterface {
  id: string;
  title: string;
  description: string;
  price: number;
  publishing: string;
  isbn: string;
  series: string;
  year: number;
  images: string[];
  comments: number;
  rating: number;
  typeBook: string;
  category: string;
  category_slug: string;
  shop: ShopInterface;
}
