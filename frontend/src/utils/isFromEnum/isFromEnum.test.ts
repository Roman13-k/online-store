import { isFromEnum } from "./isFromEnum";

describe("isFromEnum", () => {
  test("Correct value", () => {
    expect(isFromEnum("afff", ["aaa", "aaf", "afff"])).toBe(true);
  });

  test("Not correct value", () => {
    expect(isFromEnum("afff", ["aaa", "aaf", "af"])).toBe(false);
  });

  test("Empty allowed array", () => {
    expect(isFromEnum("", [])).toBe(false);
  });

  test("Undefined value", () => {
    expect(isFromEnum(undefined, [])).toBe(false);
  });

  test("Non-string value", () => {
    expect(isFromEnum(123, ["123", "456"])).toBe(false);
    expect(isFromEnum(null, ["null"])).toBe(false);
    expect(isFromEnum({}, ["[object Object]"])).toBe(false);
  });

  test("Allowed with duplicates", () => {
    expect(isFromEnum("aaa", ["aaa", "aaa"])).toBe(true);
  });
});
