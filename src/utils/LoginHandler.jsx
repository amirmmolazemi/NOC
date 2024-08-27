import Cookies from "js-cookie";
import api from "configs/api";
import { toast } from "react-toastify";

const loginHandler = async (username, password) => {
  try {
    const { data } = await api.post("/auth/login", {
      username,
      password,
    });
    if (data.token) {
      Cookies.set("token", data.token, {
        sameSite: "Strict",
        expires: 1,
      });
    }
    return true;
  } catch (error) {
    const errorMessage = error.response?.data?.error || "internal server error";
    toast.error(errorMessage);
  }
};

export default loginHandler;
