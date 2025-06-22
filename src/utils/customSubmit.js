import axios from "axios";

export const customSubmit = async (
  e,
  ref,
  setIsSuccess,
  path,
  setIsLoarding,
) => {
  e.preventDefault();

  const data = Object.fromEntries(new FormData(e.currentTarget));
  setIsLoarding(true);
  try {
    const res = await axios.post(`http://127.0.0.1:8000${path}`, data);
    setIsSuccess(path == "/login/seller" ? "seller" : "buyer");
    setIsLoarding(false);
    return res.data.token;
  } catch (error) {
    console.log(error);
    setIsSuccess(false);
  }
  setIsLoarding(false);
  ref.current.reset();

  setTimeout(() => setIsSuccess(null), 3000);
};
