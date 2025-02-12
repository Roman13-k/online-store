import axios from "axios";

export const customSubmit = async (e) => {
  e.preventDefault();

  const data = Object.fromEntries(new FormData(e.currentTarget));
  try {
    await axios.post("http://127.0.0.1:8000/registration/buyer", data);
  } catch (error) {
    console.log(error);
  }
};
