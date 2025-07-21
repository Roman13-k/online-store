"use client";
import { Dispatch, SetStateAction, useEffect, useState } from "react";

export default function useLocalStorage<T extends string>(
  key: string,
  initValue: T,
): [T, Dispatch<SetStateAction<T>>] {
  const [value, setValue] = useState<T>(initValue);

  useEffect(() => {
    const savedValue = localStorage.getItem(key);
    if (!savedValue) return;
    setValue(savedValue as T);
  }, []);

  useEffect(() => {
    if (value === initValue) return;
    localStorage.setItem(key, value);
  }, [value]);

  return [value, setValue];
}
