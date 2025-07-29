import React from "react";
import * as CategoriesApiModule from "@/store/api/categoriesApi";
import { setupApiStore } from "@/tests/helpers/setupApiStore";
import CatalogMenu from "./CatalogMenu";
import { render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import { NextIntlClientProvider } from "next-intl";

//? я сдаюсь я прочто не понимаю как мне сделать чтобы оно работало с next-intl

/*
Details:

    D:\UNI\GitHub_SelfReps\online-store\frontend\node_modules\next-intl\dist\esm\production\index.react-client.js:1
    export { useFormatter, useTranslations } from "./react-client/index.js";
    ^^^^^^

    SyntaxError: Unexpected token 'export'

       6 | import { Dispatch, SetStateAction } from "react";
       7 | import LoadingSmall from "../../../shared/loading/LoadingSmall";
    >  8 | import { useLocale } from "next-intl";
         | ^
       9 |
*/

describe("CatalogMenu", () => {
  const categoryApiRef = setupApiStore(CategoriesApiModule.categoriesApi);

  afterEach(() => {
    categoryApiRef.api.util.resetApiState();
    jest.restoreAllMocks();
  });

  test("Loading state", () => {
    jest.spyOn(CategoriesApiModule, "useGetCategoriesQuery").mockReturnValue({
      data: undefined,
      isLoading: true,
      isError: false,
      refetch: jest.fn(),
      isFetching: false,
    });
    render(
      <Provider store={categoryApiRef.store}>
        <NextIntlClientProvider locale='en'>
          <CatalogMenu isOpenCatalog={true} setIsCatalogMenu={jest.fn()} />
        </NextIntlClientProvider>
      </Provider>,
    );
    expect(screen.getByTestId("loading")).toBeInTheDocument();
  });
  test("Error state", () => {
    jest.spyOn(CategoriesApiModule, "useGetCategoriesQuery").mockReturnValue({
      data: undefined,
      isLoading: false,
      isError: true,
      error: "Тестовая ошибка",
      refetch: jest.fn(),
      isFetching: false,
    });
    render(
      <Provider store={categoryApiRef.store}>
        <NextIntlClientProvider locale='en'>
          <CatalogMenu isOpenCatalog={true} setIsCatalogMenu={jest.fn()} />
        </NextIntlClientProvider>
      </Provider>,
    );
    expect(screen.getByText(/Ошибка при загрузке категорий/i)).toBeInTheDocument();
  });
  test("Data render", () => {});
});
