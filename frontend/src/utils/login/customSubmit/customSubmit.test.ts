import axios from "axios";
import { customSubmit } from "./customSubmit";
import { createRef } from "react";

jest.mock("axios");
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe("Custom Submit", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    jest.useFakeTimers();
  });

  test("Correct login buyer", async () => {
    const { fakeEvent, ref, setIsSuccess, setIsLoarding } = setupSubmitTest({
      email: "test@example.com",
      password: "123456",
    });
    const path = "auth/buyer";

    mockedAxios.post.mockResolvedValue({
      status: 200,
      data: {
        token: "buyer-token-123",
      },
    });
    const spyOnStorage = jest.spyOn(Storage.prototype, "setItem");

    await customSubmit(fakeEvent, ref, setIsSuccess, path, setIsLoarding);

    expect(fakeEvent.preventDefault).toHaveBeenCalled();
    expect(mockedAxios.post).toHaveBeenCalledWith(
      `${process.env.NEXT_PUBLIC_API_URL}/auth/buyer`,
      { email: "test@example.com", password: "123456" },
      { withCredentials: true },
    );
    expect(setIsLoarding).toHaveBeenCalledWith(true);
    expect(setIsSuccess).toHaveBeenCalledWith(true);
    expect(spyOnStorage).toHaveBeenCalledWith("buyer", "buyer-token-123");
    expect(setIsLoarding).toHaveBeenCalledWith(false);

    jest.advanceTimersByTime(4000);
    expect(setIsSuccess).toHaveBeenCalledWith(null);
  });

  test("Not correct login seller", async () => {
    const { fakeEvent, ref, setIsSuccess, setIsLoarding } = setupSubmitTest({
      email: "test@example.com",
      password: "123456",
    });
    const path = "auth/seller";

    mockedAxios.post.mockRejectedValue({
      response: {
        status: 404,
      },
    });
    const spyOnStorage = jest.spyOn(Storage.prototype, "setItem");

    await customSubmit(fakeEvent, ref, setIsSuccess, path, setIsLoarding);

    expect(fakeEvent.preventDefault).toHaveBeenCalled();
    expect(mockedAxios.post).toHaveBeenCalledWith(
      `${process.env.NEXT_PUBLIC_API_URL}/auth/seller`,
      { email: "test@example.com", password: "123456" },
      { withCredentials: true },
    );
    expect(setIsLoarding).toHaveBeenCalledWith(true);
    expect(setIsSuccess).toHaveBeenCalledWith(false);
    expect(spyOnStorage).not.toHaveBeenCalled();
    expect(setIsLoarding).toHaveBeenCalledWith(false);

    jest.advanceTimersByTime(4000);
    expect(setIsSuccess).toHaveBeenCalledWith(null);
  });
});

function createMockForm(fields: Record<string, string>) {
  const form = document.createElement("form");

  Object.entries(fields).forEach(([name, value]) => {
    const input = document.createElement("input");
    input.name = name;
    input.value = value;
    form.appendChild(input);
  });

  return form;
}

function setupSubmitTest(fields: Record<string, string>) {
  const form = createMockForm(fields);

  const fakeEvent = {
    preventDefault: jest.fn(),
    currentTarget: form,
  } as unknown as React.FormEvent<HTMLFormElement>;

  const ref = createRef<HTMLFormElement>();
  ref.current = form;

  const setIsSuccess = jest.fn();
  const setIsLoarding = jest.fn();

  return { fakeEvent, ref, setIsSuccess, setIsLoarding };
}
