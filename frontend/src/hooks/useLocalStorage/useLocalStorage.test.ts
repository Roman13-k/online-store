import { renderHook, waitFor } from "@testing-library/react";
import useLocalStorage from "./useLocalStorage";

describe("useLocal storage", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    jest.restoreAllMocks();
    localStorage.clear();
  });

  test("Start without saved value", () => {
    const localStorageSpy = jest.spyOn(Storage.prototype, "getItem").mockReturnValue(null);
    const { result } = renderHook(() => useLocalStorage("test", "12345"));

    expect(result.current[0]).toBe("12345");
    expect(localStorageSpy).toHaveBeenCalledWith("test");
    expect(result.current[2]).toBe(true);
  });
  test("Change value", async () => {
    localStorage.setItem("testChange", "111");
    const localStorageSpy = jest.spyOn(Storage.prototype, "getItem").mockReturnValue("111");

    const { result } = renderHook(() => useLocalStorage("testChange", "12345"));
    await waitFor(() => {
      expect(result.current[2]).toBe(true);
      expect(localStorageSpy).toHaveBeenCalledWith("testChange");
    });

    expect(result.current[0]).toBe("111");
  });

  test("null value", () => {
    const localStorageSpy = jest.spyOn(Storage.prototype, "getItem");

    const { result } = renderHook(() => useLocalStorage("", ""));

    expect(result.current[0]).toBe("");
    expect(localStorageSpy).toHaveBeenCalledWith("");
    expect(localStorage.getItem("")).toBe("");
  });
});
