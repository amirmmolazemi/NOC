import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import { useDispatch } from "react-redux";
import Cookies from "js-cookie";
import { setRole } from "feature/userRole/userSlice";
import api from "api/index";
const useCheckCookie = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
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
        if (decoded?.role?.name) dispatch(setRole(decoded.role.name));
        setLoading(false);
      } catch (error) {
        Cookies.remove("token");
        navigate("/login");
      }
    };

    checkToken();
  }, [navigate, dispatch]);

  return { data, loading };
};

export default useCheckCookie;
