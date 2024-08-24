import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import Cookies from "js-cookie";
import api from "configs/api";
const useCheckCookie = (fetchUrl) => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState({});

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

        const decoded = jwtDecode(token);
        // const res = await api.get(fetchUrl, {
        //   headers: {
        //     Authorization: token,
        //   },
        // });

        setData({ user: decoded, otherData: "res.data" });
      } catch (error) {
        Cookies.remove("token");
        navigate("/login");
      } finally {
        setLoading(false);
      }
    };

    checkToken();
  }, [fetchUrl, navigate]);

  return { data, loading };
};

export default useCheckCookie;
