import { Token } from "@/interface/homePage/login";
import { useRefreshTokenMutation } from "@/store/api/userApi";
import { BuyerOrSeller } from "@/types";
import { useEffect, useRef } from "react";

export default function useAuthRefresh(buyerOrSeller: BuyerOrSeller) {
  const [refresh, { isSuccess, isError, data }] = useRefreshTokenMutation();
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const accessToken = localStorage.getItem(`access_token_${buyerOrSeller}`);
    if (!accessToken) return;

    timerRef.current = setInterval(() => {
      refresh(undefined);
    }, 14 * 60 * 1000);

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [buyerOrSeller, refresh]);

  useEffect(() => {
    if (isError) {
      localStorage.removeItem(`access_token_${buyerOrSeller}`);
      console.warn("Ошибка при обновлении токена. Пользователь будет разлогинен.");
    }

    if (isSuccess && data) {
      const tokens = data as Token;
      localStorage.setItem(`access_token_${buyerOrSeller}`, tokens.access_token);
      console.log("Токен успешно обновлён");
    }
  }, [isSuccess, isError, data, buyerOrSeller]);
}
