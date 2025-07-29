import * as introApiModule from "@/store/api/introApi";
import { setupApiStore } from "@/tests/helpers/setupApiStore";
import { screen } from "@testing-library/react";
import Intro from "./Intro";
import { renderWithProvider } from "@/tests/helpers/RenderWithProvider";

describe("Intro", () => {
  const storeRef = setupApiStore(introApiModule.introApi);

  afterEach(() => {
    storeRef.api.util.resetApiState();
    jest.restoreAllMocks();
  });

  test("Loading state", async () => {
    jest.spyOn(introApiModule, "useGetBannersQuery").mockReturnValue({
      data: undefined,
      isLoading: true,
      isError: false,
      refetch: jest.fn(),
      isFetching: false,
    });

    renderWithProvider(<Intro />, storeRef.store);
    expect(screen.getByTestId("loading")).toBeVisible();
  });

  test("Error state", async () => {
    jest.spyOn(introApiModule, "useGetBannersQuery").mockReturnValue({
      data: undefined,
      isLoading: false,
      isError: true,
      refetch: jest.fn(),
      isFetching: false,
    });

    renderWithProvider(<Intro />, storeRef.store);
    expect(screen.getByText(/ошибка при загрузке баннеров/i)).toBeVisible();
  });

  test("Render Intro", async () => {
    const mockData = {
      data: {
        data: {
          slider: [
            {
              files: [
                { id: "1", url: "/image1.png" },
                { id: "2", url: "/image2.png" },
              ],
            },
          ],
        },
      },
      isLoading: false,
      isError: false,
      refetch: jest.fn(),
      isFetching: false,
    };

    jest.spyOn(introApiModule, "useGetBannersQuery").mockReturnValue(mockData);

    renderWithProvider(<Intro />, storeRef.store);
    mockData.data.data.slider[0].files.forEach((banner) => {
      expect(screen.getByAltText("http://localhost:1337" + banner.url)).toBeInTheDocument();
    });
  });
});
