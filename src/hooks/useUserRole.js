import { useEffect, useMemo } from "react";
import useSWR from "swr";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setRole } from "feature/userRole/userSlice";
import useCheckCookie from "./useCheckCookie";
import fetcher from "utils/fetcher";
import { toast } from "react-toastify";

function useUserRole(isOnlyAdmin, role, apiEndpoint) {
  const { data: initialData, loading: initialLoading } = useCheckCookie();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { data: fetchedData, error } = useSWR(
    initialData && apiEndpoint ? apiEndpoint : null,
    fetcher,
    {
      refreshInterval: 10 * 1000,
      revalidateWhenHidden: true,
      revalidateOnReconnect: true,
    }
  );

  const handleRoleData = (mergedData) => {
    if (!mergedData.user?.role?.name) return;

    const userRole = mergedData.user.role.name;
    dispatch(setRole(userRole));

    if (isOnlyAdmin && userRole === "Admin") {
      navigate("/dashboard");
    } else if (role && userRole !== role) {
      navigate("/dashboard");
    }
  };

  useEffect(() => {
    if (error) {
      toast.error("Failed to fetch role data. Please try again later.");
      return;
    }

    if (fetchedData) {
      const mergedData = { ...initialData, otherData: fetchedData };
      handleRoleData(mergedData);
    }
  }, [fetchedData, error, isOnlyAdmin, role, initialData]);

  const resultData = useMemo(() => {
    return fetchedData
      ? { ...initialData, otherData: fetchedData }
      : initialData;
  }, [initialData, fetchedData]);

  return {
    data: resultData,
    isLoading: initialLoading || (!fetchedData && !error),
    error,
  };
}

export default useUserRole;
