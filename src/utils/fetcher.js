import Cookies from "js-cookie";
import api from "src/configs/api";

const fetcher = async (url) => {
  try {
    const token = Cookies.get("token");
    const res = await api.get(url, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return res.data;
  } catch (error) {
    return {};
  }
};

export default fetcher;
