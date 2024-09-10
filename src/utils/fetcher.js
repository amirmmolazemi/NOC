import Cookies from "js-cookie";
import api from "services/api";

const fetcher = async (url) => {
  try {
    const token = Cookies.get("token");
    const { data } = await api.get(url, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return data;
  } catch (error) {
    return {};
  }
};

export default fetcher;
