import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import Cookies from "js-cookie";
import api from "configs/api";
const useCheckCookie = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState({});

  useEffect(() => {
    const checkToken = async () => {
      const token = Cookies.get("token");
      try {
        await api.post(
          "/auth/verify-token",
          {},
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        const decoded = jwtDecode(token);
        setData({ user: decoded });
        setLoading(false);
      } catch (error) {
        Cookies.remove("token");
        navigate("/login");
      }
    };

    checkToken();
  }, [navigate]);

  return { data, loading };
};

export default useCheckCookie;
