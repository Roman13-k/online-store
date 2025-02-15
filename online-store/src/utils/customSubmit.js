import axios from "axios";

export const customSubmit = async (e, ref, setIsSuccess, path) => {
  e.preventDefault();

  const data = Object.fromEntries(new FormData(e.currentTarget));
  try {
    await axios.post(`http://127.0.0.1:8000${path}`, data);
    setIsSuccess(path == "/login/seller" ? "seller" : "buyer");
  } catch (error) {
    console.log(error);
    setIsSuccess(false);
  }
  ref.current.reset();
  setTimeout(() => setIsSuccess(null), 3000);
};
