export interface CategoriesInterface {
  id: number;
  category: string;
  category_slug: string;
  description: string;
  share_img: {
    url: string;
  };
  localizations?: Localization[];
}

export interface Localization {
  id: number;
  documentId: string;
  description: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  locale: string;
  category: string;
  category_slug: string;
}
