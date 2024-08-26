import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import api from "configs/api";
const useCheckCookie = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkToken = async () => {
      const token = Cookies.get("token");
      if (!token) {
        navigate("/login");
        return;
      }

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
      } catch (error) {
        Cookies.remove("token");
        navigate("/login");
      } finally {
        setLoading(false);
      }
    };

    checkToken();
  }, [navigate]);

  return { loading };
};

export default useCheckCookie;
