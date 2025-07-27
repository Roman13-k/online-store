import { CategoriesInterface } from "@/interface/catalogpage/categories";
import { findCategoryBySlug } from "./findCategoryBySlug";

const testCategories = [
  {
    category: "Technology",
    category_slug: "technology",
    localizations: [
      {
        locale: "ru",
        category: "Технологии",
        category_slug: "technology",
      },
      {
        locale: "zh",
        category: "技术",
        category_slug: "technology",
      },
    ],
  },
  {
    category: "Art",
    category_slug: "art",
    localizations: [
      {
        locale: "ru",
        category: "Искусство",
        category_slug: "art",
      },
      {
        locale: "zh",
        category: "艺术",
        category_slug: "art",
      },
    ],
  },
  {
    category: "Science",
    category_slug: "science",
    localizations: [
      {
        locale: "ru",
        category: "Наука",
        category_slug: "science",
      },
      {
        locale: "zh",
        category: "科学",
        category_slug: "science",
      },
    ],
  },
];

describe("findCategoryBySlug", () => {
  test("Correct values", () => {
    expect(findCategoryBySlug(testCategories as CategoriesInterface[], "technology", "en")).toBe(
      "Technology",
    );
    expect(findCategoryBySlug(testCategories as CategoriesInterface[], "technology", "ru")).toBe(
      "Технологии",
    );
    expect(findCategoryBySlug(testCategories as CategoriesInterface[], "art", "zh")).toBe("艺术");
  });

  test("Not correct values", () => {
    expect(
      findCategoryBySlug(testCategories as CategoriesInterface[], "scien", "en"),
    ).toBeUndefined();
    expect(findCategoryBySlug(testCategories as CategoriesInterface[], "technology", "de")).toBe(
      "Technology",
    );
  });

  test("Empty values", () => {
    expect(findCategoryBySlug(testCategories as CategoriesInterface[], "", "")).toBeUndefined();
  });
});
