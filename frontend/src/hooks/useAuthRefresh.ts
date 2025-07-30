import { Tokens } from "@/interface/homePage/login";
import { useRefreshTokenMutation } from "@/store/api/userApi";
import { BuyerOrSeller } from "@/types";
import { useEffect, useRef } from "react";

export default function useAuthRefresh(buyerOrSeller: BuyerOrSeller) {
  const [refresh, { isSuccess, isError, data }] = useRefreshTokenMutation();
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const accessToken = localStorage.getItem(`access_token_${buyerOrSeller}`);
    const refreshToken = localStorage.getItem(`refresh_token_${buyerOrSeller}`);
    if (!accessToken || !refreshToken) return;

    timerRef.current = setInterval(() => {
      refresh(refreshToken);
    }, 14 * 60 * 1000);

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [buyerOrSeller, refresh]);

  useEffect(() => {
    if (isError) {
      localStorage.removeItem(`access_token_${buyerOrSeller}`);
      localStorage.removeItem(`refresh_token_${buyerOrSeller}`);
      console.warn("Ошибка при обновлении токена. Пользователь будет разлогинен.");
    }

    if (isSuccess && data) {
      const tokens = data as Tokens;
      localStorage.setItem(`access_token_${buyerOrSeller}`, tokens.access_token);
      localStorage.setItem(`refresh_token_${buyerOrSeller}`, tokens.refresh_token);
      console.log("Токен успешно обновлён");
    }
  }, [isSuccess, isError, data, buyerOrSeller]);
}
