import { getYear } from "./getYear";

test("getYear", () => {
  const spy = jest.spyOn(Date.prototype, "getFullYear");
  const year = getYear();
  expect(spy).toHaveBeenCalled();
  expect(year).toBe(2025);
});
