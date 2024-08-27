import { useEffect } from "react";
import { useDispatch } from "react-redux";
import Loader from "components/loader/Loader";
import useCheckCookie from "hooks/useCheckCookie";
import { setRole } from "Redux/slices/userSlice";

function Settings() {
  const { data, loading } = useCheckCookie();
  const dispatch = useDispatch();

  useEffect(() => {
    if (data && data.user && data.user.role && data.user.role.name) {
      dispatch(setRole(data.user.role.name));
    }
  }, [data, dispatch]);

  if (loading) return <Loader />;
  return <div>Settings</div>;
}

export default Settings;
