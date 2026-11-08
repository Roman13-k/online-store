import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type {
  AdminUser, Analytics, Author, BookCard, BookDetail, CartItem, Currency, Discount, Genre,
  OrderDetail, OrderRow, OrderStatus, Page, Preview, Publisher, Review, User,
} from "@/lib/types";

export const API_URL = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:4000";

export interface BookQuery {
  q?: string;
  genre?: number;
  minPrice?: number;
  maxPrice?: number;
  inStock?: boolean;
  sort?: "title" | "price" | "year" | "rating" | "new";
  dir?: "asc" | "desc";
  page?: number;
  limit?: number;
}

const clean = (o: object) =>
  Object.fromEntries(Object.entries(o).filter(([, v]) => v !== undefined && v !== "" && v !== null));

// Браузер не обращается к базе: все операции идут через REST-интерфейс сервера
export const api = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({ baseUrl: `${API_URL}/api`, credentials: "include" }),
  tagTypes: ["Me", "Books", "Book", "Cart", "Orders", "Reviews", "Dict", "Users", "Discounts", "Currencies", "Analytics"],
  endpoints: (b) => ({
    me: b.query<{ user: User | null }, void>({ query: () => "/auth/me", providesTags: ["Me"] }),
    login: b.mutation<{ ok: boolean }, { email: string; password: string; admin?: boolean }>({
      query: ({ admin, ...body }) => ({ url: admin ? "/auth/admin/login" : "/auth/login", method: "POST", body }),
      invalidatesTags: ["Me", "Cart", "Orders"],
    }),
    logout: b.mutation<{ ok: boolean }, void>({
      query: () => ({ url: "/auth/logout", method: "POST" }),
      invalidatesTags: ["Me", "Cart", "Orders"],
    }),
    register: b.mutation<{ id: number }, Record<string, string>>({
      query: (body) => ({ url: "/auth/register", method: "POST", body }),
    }),
    confirm: b.mutation<{ confirmed: boolean }, string>({
      query: (token) => ({ url: "/auth/confirm", method: "POST", body: { token } }),
    }),
    updateProfile: b.mutation<{ ok: boolean }, Partial<User>>({
      query: (body) => ({ url: "/auth/me", method: "PUT", body }),
      invalidatesTags: ["Me"],
    }),

    books: b.query<Page<BookCard>, BookQuery>({
      query: (q) => ({ url: "/books", params: clean(q) }),
      providesTags: ["Books"],
    }),
    book: b.query<BookDetail, number>({ query: (id) => `/books/${id}`, providesTags: (_r, _e, id) => [{ type: "Book", id }] }),
    genres: b.query<Genre[], void>({ query: () => "/genres", providesTags: ["Dict"] }),
    authors: b.query<Author[], void>({ query: () => "/authors", providesTags: ["Dict"] }),
    publishers: b.query<Publisher[], void>({ query: () => "/publishers", providesTags: ["Dict"] }),
    currencies: b.query<Currency[], void>({ query: () => "/currencies", providesTags: ["Currencies"] }),

    reviews: b.query<Review[], number>({ query: (id) => `/books/${id}/reviews`, providesTags: ["Reviews"] }),
    saveReview: b.mutation<{ ok: boolean }, { bookId: number; rating: number; body: string }>({
      query: ({ bookId, ...body }) => ({ url: `/books/${bookId}/reviews`, method: "PUT", body }),
      invalidatesTags: ["Reviews", "Books", "Book"],
    }),
    deleteReview: b.mutation<{ ok: boolean }, number>({
      query: (bookId) => ({ url: `/books/${bookId}/reviews`, method: "DELETE" }),
      invalidatesTags: ["Reviews", "Books", "Book"],
    }),

    cart: b.query<CartItem[], void>({ query: () => "/cart", providesTags: ["Cart"] }),
    setCartItem: b.mutation<CartItem[], { bookId: number; quantity: number }>({
      query: ({ bookId, quantity }) => ({ url: `/cart/items/${bookId}`, method: "PUT", body: { quantity } }),
      invalidatesTags: ["Cart"],
    }),
    clearCart: b.mutation<CartItem[], void>({ query: () => ({ url: "/cart", method: "DELETE" }), invalidatesTags: ["Cart"] }),
    preview: b.query<Preview, string>({ query: (currency) => ({ url: "/orders/preview", params: { currency } }), providesTags: ["Cart"] }),
    placeOrder: b.mutation<OrderDetail, string>({
      query: (currency) => ({ url: "/orders", method: "POST", body: { currency } }),
      invalidatesTags: ["Cart", "Orders", "Books", "Book"],
    }),
    orders: b.query<OrderRow[], void>({ query: () => "/orders", providesTags: ["Orders"] }),
    order: b.query<OrderDetail, number>({ query: (id) => `/orders/${id}`, providesTags: ["Orders"] }),
    cancelOrder: b.mutation<OrderDetail, number>({
      query: (id) => ({ url: `/orders/${id}/cancel`, method: "POST" }),
      invalidatesTags: ["Orders", "Books", "Book"],
    }),

    // --- администратор ---
    saveBook: b.mutation<{ id: number }, { id?: number; body: Record<string, unknown> }>({
      query: ({ id, body }) => ({ url: id ? `/admin/books/${id}` : "/admin/books", method: id ? "PUT" : "POST", body }),
      invalidatesTags: ["Books", "Book", "Analytics"],
    }),
    deleteBook: b.mutation<{ ok: boolean }, number>({
      query: (id) => ({ url: `/admin/books/${id}`, method: "DELETE" }),
      invalidatesTags: ["Books"],
    }),
    saveDict: b.mutation<unknown, { name: "authors" | "genres" | "publishers"; id?: number; body: Record<string, unknown> }>({
      query: ({ name, id, body }) => ({ url: id ? `/admin/dict/${name}/${id}` : `/admin/dict/${name}`, method: id ? "PUT" : "POST", body }),
      invalidatesTags: ["Dict", "Books"],
    }),
    deleteDict: b.mutation<unknown, { name: "authors" | "genres" | "publishers"; id: number }>({
      query: ({ name, id }) => ({ url: `/admin/dict/${name}/${id}`, method: "DELETE" }),
      invalidatesTags: ["Dict"],
    }),
    adminOrders: b.query<OrderRow[], OrderStatus | "">({
      query: (status) => ({ url: "/admin/orders", params: status ? { status } : {} }),
      providesTags: ["Orders"],
    }),
    setOrderStatus: b.mutation<OrderDetail, { id: number; status: OrderStatus }>({
      query: ({ id, status }) => ({ url: `/admin/orders/${id}`, method: "PATCH", body: { status } }),
      invalidatesTags: ["Orders", "Analytics", "Books"],
    }),
    users: b.query<AdminUser[], string>({ query: (q) => ({ url: "/admin/users", params: q ? { q } : {} }), providesTags: ["Users"] }),
    setUserActive: b.mutation<unknown, { id: number; isActive: boolean }>({
      query: ({ id, isActive }) => ({ url: `/admin/users/${id}`, method: "PATCH", body: { isActive } }),
      invalidatesTags: ["Users"],
    }),
    discounts: b.query<Discount[], void>({ query: () => "/admin/discounts", providesTags: ["Discounts"] }),
    saveDiscount: b.mutation<Discount, { id?: number; body: Record<string, unknown> }>({
      query: ({ id, body }) => ({ url: id ? `/admin/discounts/${id}` : "/admin/discounts", method: id ? "PUT" : "POST", body }),
      invalidatesTags: ["Discounts"],
    }),
    deleteDiscount: b.mutation<unknown, number>({
      query: (id) => ({ url: `/admin/discounts/${id}`, method: "DELETE" }),
      invalidatesTags: ["Discounts"],
    }),
    setRate: b.mutation<Currency, { code: string; rate: number }>({
      query: ({ code, rate }) => ({ url: `/admin/currencies/${code}`, method: "PUT", body: { rate } }),
      invalidatesTags: ["Currencies"],
    }),
    refreshRates: b.mutation<Currency[], void>({
      query: () => ({ url: "/admin/currencies/refresh", method: "POST" }),
      invalidatesTags: ["Currencies"],
    }),
    analytics: b.query<Analytics, { from: string; to: string; threshold: number }>({
      query: (params) => ({ url: "/admin/analytics", params }),
      providesTags: ["Analytics"],
    }),
  }),
});

export const {
  useMeQuery, useLoginMutation, useLogoutMutation, useRegisterMutation, useConfirmMutation, useUpdateProfileMutation,
  useBooksQuery, useBookQuery, useGenresQuery, useAuthorsQuery, usePublishersQuery, useCurrenciesQuery,
  useReviewsQuery, useSaveReviewMutation, useDeleteReviewMutation,
  useCartQuery, useSetCartItemMutation, useClearCartMutation, usePreviewQuery, usePlaceOrderMutation,
  useOrdersQuery, useOrderQuery, useCancelOrderMutation,
  useSaveBookMutation, useDeleteBookMutation, useSaveDictMutation, useDeleteDictMutation,
  useAdminOrdersQuery, useSetOrderStatusMutation, useUsersQuery, useSetUserActiveMutation,
  useDiscountsQuery, useSaveDiscountMutation, useDeleteDiscountMutation,
  useSetRateMutation, useRefreshRatesMutation, useAnalyticsQuery,
} = api;

export const errorMessage = (e: unknown) =>
  (e as { data?: { message?: string } })?.data?.message ?? "Ошибка соединения с сервером";

export const errorCode = (e: unknown) => (e as { data?: { error?: string } })?.data?.error;
