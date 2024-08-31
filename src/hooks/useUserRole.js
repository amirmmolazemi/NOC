import { useEffect } from "react";
import Cookies from "js-cookie";
import useSWR from "swr";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setRole } from "Redux/slices/userSlice";
import api from "configs/api";
import useCheckCookie from "./useCheckCookie";

const fetcher = (url, token) =>
  api
    .get(url, { headers: { Authorization: `Bearer ${token}` } })
    .then((res) => res.data);

function useUserRole(isOnlyAdmin, role, apiEndpoint) {
  const token = Cookies.get("token");
  const { data: initialData, loading: initialLoading } = useCheckCookie();
  const { data: fetchedData, error } = useSWR(
    initialData ? [apiEndpoint, token] : null,
    ([url, token]) => fetcher(url, token),
    {
      revalidateOnFocus: false,
    }
  );

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (!fetchedData) return;

    const mergedData = { ...initialData, otherData: fetchedData };
    if (mergedData.user?.role?.name) {
      dispatch(setRole(mergedData.user.role.name));
      if (isOnlyAdmin && mergedData.user.role.name === "Admin") {
        navigate("/dashboard");
      } else if (role && mergedData.user.role.name !== role) {
        navigate("/dashboard");
      }
    }
  }, [fetchedData, dispatch, navigate, isOnlyAdmin, role, initialData]);

  return {
    data: fetchedData
      ? { ...initialData, otherData: fetchedData }
      : initialData,
    isLoading: initialLoading || (!fetchedData && !error),
  };
}

export default useUserRole;
