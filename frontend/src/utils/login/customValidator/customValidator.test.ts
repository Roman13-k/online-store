import { customValidator } from "./customValidator";

describe("custom Validator", () => {
  test("Correct password", () => {
    expect(customValidator("Buyer11_")).toBeUndefined();
  });
  test("No capital letter", () => {
    expect(customValidator("buyer11_")).toBe(
      "Пароль должен содержать как минимум 1 заглавную букву.",
    );
  });
  test("No symbol", () => {
    expect(customValidator("Buyer1111")).toBe("Пароль должен содержать как минимум 1 символ.");
  });
  test("less then 8 letters", () => {
    expect(customValidator("B111111")).toBe("Пароль должен содержать 8 или более символов.");
  });
});
