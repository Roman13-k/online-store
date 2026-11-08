"use client";
import { createContext, PropsWithChildren, useContext, useMemo } from "react";
import useLocalStorage from "@/hooks/useLocalStorage/useLocalStorage";
import { useCurrenciesQuery } from "@/store/api";

interface CurrencyState {
  code: string;
  setCode: (code: string) => void;
  codes: string[];
  rate: number;
  format: (priceByn: number) => string;
}

const CurrencyContext = createContext<CurrencyState | null>(null);

// Цены хранятся в BYN; на странице показывается пересчёт по курсу выбранной валюты
export function CurrencyProvider({ children }: PropsWithChildren) {
  const [code, setCode] = useLocalStorage<string>("currency", "BYN");
  const { data = [] } = useCurrenciesQuery();
  const value = useMemo<CurrencyState>(() => {
    const found = data.find((c) => c.currency_code === code);
    const rate = found?.rate_to_byn ?? 1;
    const shown = found ? code : "BYN";
    return {
      code: shown,
      setCode,
      codes: data.length ? data.map((c) => c.currency_code) : ["BYN"],
      rate,
      format: (priceByn: number) => `${(priceByn / rate).toFixed(2)} ${shown}`,
    };
  }, [code, data, setCode]);
  return <CurrencyContext.Provider value={value}>{children}</CurrencyContext.Provider>;
}

export function useCurrency() {
  const ctx = useContext(CurrencyContext);
  if (!ctx) throw new Error("useCurrency вне CurrencyProvider");
  return ctx;
}

export const formatDate = (iso: string, locale: string) =>
  new Date(iso).toLocaleString(locale === "en" ? "en-GB" : locale === "be" ? "be-BY" : "ru-RU", {
    day: "2-digit", month: "2-digit", year: "numeric", hour: "2-digit", minute: "2-digit",
  });
