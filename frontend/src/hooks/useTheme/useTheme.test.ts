import { renderHook, act } from "@testing-library/react";
import useTheme from "./useTheme";

describe("useTheme (with useLocalStorage)", () => {
  beforeEach(() => {
    localStorage.clear();

    Object.defineProperty(window, "matchMedia", {
      writable: true,
      value: jest.fn().mockImplementation((query) => ({
        matches: query === "(prefers-color-scheme: dark)",
        media: query,
        onchange: null,
        addEventListener: jest.fn(),
        removeEventListener: jest.fn(),
      })),
    });

    document.documentElement.classList.remove = jest.fn();
    document.documentElement.classList.add = jest.fn();
  });

  test("should set dark theme if no theme in localStorage and system prefers dark", async () => {
    const { result } = renderHook(() => useTheme("dark"));

    expect(result.current[0]).toBe("dark");
    expect(document.documentElement.classList.remove).toHaveBeenCalledWith("dark", "warm");
    expect(document.documentElement.classList.add).toHaveBeenCalledWith("dark");
  });

  test("respect theme from localStorage", async () => {
    localStorage.setItem("theme", "warm");

    const { result } = renderHook(() => useTheme("light"));

    expect(result.current[0]).toBe("warm");
    expect(document.documentElement.classList.remove).toHaveBeenCalledWith("dark", "warm");
    expect(document.documentElement.classList.add).toHaveBeenCalledWith("warm");
    expect(localStorage.getItem("theme")).toBe("warm");
  });

  test("manual theme change", async () => {
    localStorage.removeItem("theme");

    const { result } = renderHook(() => useTheme("light"));
    const [, setTheme] = result.current;
    act(() => {
      setTheme("dark");
    });

    expect(document.documentElement.classList.remove).toHaveBeenCalledWith("dark", "warm");
    expect(document.documentElement.classList.add).toHaveBeenCalledWith("dark");
    expect(localStorage.getItem("theme")).toBe("dark");
  });
});
