"use client";
import { Dispatch, SetStateAction, useEffect, useState } from "react";

export default function useLocalStorage<T extends string>(
  key: string,
  initValue: T,
): [T, Dispatch<SetStateAction<T>>, boolean] {
  const [value, setValue] = useState<T>(initValue);
  const [isInitialized, setIsInitialized] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem(key);
    if (saved !== null) {
      setValue(saved as T);
    }
    setIsInitialized(true);
  }, [key]);

  useEffect(() => {
    if (isInitialized) {
      localStorage.setItem(key, value);
    }
  }, [value, isInitialized, key]);

  return [value, setValue, isInitialized];
}
