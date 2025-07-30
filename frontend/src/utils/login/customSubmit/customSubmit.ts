import axios from "axios";
import { Dispatch, SetStateAction } from "react";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export const customSubmit = async (
  e: React.FormEvent<HTMLFormElement>,
  ref: React.RefObject<HTMLFormElement | null>,
  setIsSuccess: Dispatch<SetStateAction<null | boolean>>,
  path: string,
  setIsLoarding: Dispatch<SetStateAction<boolean>>,
) => {
  e.preventDefault();

  const data = Object.fromEntries(new FormData(e.currentTarget));
  setIsLoarding(true);
  try {
    const res = await axios.post(`${API_URL}/${path}`, data, { withCredentials: true });
    if (res.status === 200) {
      if (ref.current) ref.current.reset();
      setIsSuccess(true);
      const token = res.data.token;
      if (token) localStorage.setItem(String(path.split("/")[1]), token);
    }
  } catch (error) {
    console.log(error);
    setIsSuccess(false);
  } finally {
    setIsLoarding(false);
  }

  setTimeout(() => setIsSuccess(null), 4000);
};
