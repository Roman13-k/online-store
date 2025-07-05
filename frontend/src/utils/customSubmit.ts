import axios from "axios";
import { Dispatch, SetStateAction } from "react";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export const customSubmit = async (
  e: React.FormEvent<HTMLFormElement>,
  ref: React.RefObject<HTMLFormElement | null>,
  setIsSuccess: Dispatch<SetStateAction<any>>,
  path: string,
  setIsLoarding: Dispatch<SetStateAction<boolean>>,
) => {
  e.preventDefault();

  const data = Object.fromEntries(new FormData(e.currentTarget));
  setIsLoarding(true);
  try {
    const res = await axios.post(`${API_URL}/${path}`, data);
    setIsSuccess(path == "/login/seller" ? "seller" : "buyer");
    setIsLoarding(false);
    return res.data.token;
  } catch (error) {
    console.log(error);
    setIsSuccess(false);
  }
  setIsLoarding(false);
  if (ref.current) ref.current.reset();

  setTimeout(() => setIsSuccess(null), 3000);
};
