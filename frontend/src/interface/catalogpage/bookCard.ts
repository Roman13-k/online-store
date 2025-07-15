import { ShopInterface } from "../shoppage/shop";

export interface BookCardInterface {
  id: string;
  title: string;
  description: string;
  characteristics: string;
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

export interface CommentsIntrerface {
  count: number;
  result: CommentInterface[];
  rateArray: number[];
}

export interface CommentInterface {
  id: string;
  rate: number;
  userName: string;
  date: Date;
  text: string;
  cover?: string;
}
