import Cookies from "js-cookie";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setRole } from "Redux/slices/userSlice";
import api from "configs/api";
import useCheckCookie from "./useCheckCookie";

function useUserRole(isOnlyAdmin, role, apiEndpoint) {
  const { data: initialData, loading: initialLoading } = useCheckCookie();
  const [data, setData] = useState(initialData);
  const [loading, setLoading] = useState(initialLoading);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      if (!initialData) {
        setLoading(true);
        return;
      }

      try {
        const token = Cookies.get("token");
        const response = await api.get(apiEndpoint, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const mergedData = { ...initialData, otherData: response.data };
        setData(mergedData);
        if (
          mergedData &&
          mergedData.user &&
          mergedData.user.role &&
          mergedData.user.role.name
        ) {
          dispatch(setRole(mergedData.user.role.name));
          if (isOnlyAdmin) {
            if (mergedData.user.role.name === "Admin") {
              navigate("/dashboard");
            }
          } else {
            if (mergedData.user.role.name !== role) {
              navigate("/dashboard");
            }
          }
        }
      } catch (error) {
        console.error("Error fetching user role:", error.response.data.error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [initialData, dispatch, navigate, isOnlyAdmin, role, apiEndpoint]);
  return { data, loading };
}

export default useUserRole;
