export type Role = "buyer" | "admin";
export type OrderStatus = "new" | "paid" | "packed" | "issued" | "cancelled";
export const ORDER_STATUSES: OrderStatus[] = ["new", "paid", "packed", "issued", "cancelled"];

export interface User {
  id: number;
  role: Role;
  email: string;
  firstName: string;
  lastName: string;
  lang: "ru" | "be" | "en";
  phone: string | null;
  registeredAt?: string;
}

export interface BookCard {
  book_id: number;
  isbn: string;
  title: string;
  authors: string;
  genres: string;
  publisher: string;
  publisher_id: number;
  publish_year: number | null;
  pages: number | null;
  price: number;
  currency_code: string;
  price_byn: number;
  stock: number;
  cover_url: string | null;
  annotation: string | null;
  rating: number | null;
  reviews_count: number;
}

export interface BookDetail extends BookCard {
  authorList: { author_id: number; last_name: string; first_name: string }[];
  genreList: { genre_id: number; name: string }[];
}

export interface Page<T> {
  items: T[];
  total: number;
  page: number;
  limit: number;
}

export interface Genre { genre_id: number; name: string; books: number }
export interface Author { author_id: number; last_name: string; first_name: string }
export interface Publisher { publisher_id: number; name: string; country: string | null }
export interface Currency { currency_code: string; name: string; rate_to_byn: number; rate_date: string }

export interface CartItem {
  book_id: number;
  quantity: number;
  title: string;
  authors: string;
  cover_url: string | null;
  stock: number;
  price_byn: number;
  sum_byn: number;
}

export interface Preview {
  subtotal: number;
  discount_name: string | null;
  percent: number;
  discount_sum: number;
  rate_to_byn: number;
  currency: string;
  total: number;
}

export interface OrderRow {
  order_id: number;
  created_at: string;
  status: OrderStatus;
  total: number;
  currency_code: string;
  items?: number;
  subtotal?: number;
  discount_sum?: number;
  email?: string;
  first_name?: string;
  last_name?: string;
}

export interface OrderDetail {
  order_id: number;
  created_at: string;
  status: OrderStatus;
  subtotal: number;
  discount_sum: number;
  total: number;
  currency_code: string;
  rate_at_order: number;
  discount_name: string | null;
  percent: number | null;
  email: string;
  first_name: string;
  last_name: string;
  items: { book_id: number; title: string; quantity: number; price: number; sum: number }[];
}

export interface Review {
  review_id: number;
  user_id: number;
  rating: number;
  body: string;
  created_at: string;
  first_name: string;
  last_name: string;
}

export interface Discount {
  discount_id: number;
  name: string;
  percent: number;
  starts_on: string;
  ends_on: string;
  min_sum: number;
  is_active: boolean;
  used: number;
}

export interface AdminUser {
  user_id: number;
  email: string;
  first_name: string;
  last_name: string;
  phone: string | null;
  lang: string;
  registered_at: string;
  is_active: boolean;
  email_confirmed: boolean;
  role: Role;
  orders: number;
}

export interface Analytics {
  from: string;
  to: string;
  summary: { orders: number; revenue: number; avg_check: number; buyers: number };
  byDay: { day: string; revenue: number }[];
  topBooks: { book_id: number; title: string; sold: number; revenue: number }[];
  byGenre: { name: string; sold: number }[];
  lowStock: { book_id: number; title: string; stock: number }[];
}

export interface ApiError {
  status: number;
  data?: { error: string; message: string };
}
