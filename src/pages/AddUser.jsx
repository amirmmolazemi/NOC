import { useEffect } from "react";
import { useDispatch } from "react-redux";
import Loader from "components/loader/Loader";
import useCheckCookie from "hooks/useCheckCookie";
import { setRole } from "Redux/slices/userSlice";
import { useNavigate } from "react-router-dom";

function AddUser() {
  const { data, loading } = useCheckCookie();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  useEffect(() => {
    if (data && data.user && data.user.role && data.user.role.name) {
      dispatch(setRole(data.user.role.name));
      data.user.role.name != "Admin" && navigate("/dashboard");
    }
  }, [data, dispatch]);
  if (loading) return <Loader />;
  return <div>AddUser</div>;
}

export default AddUser;
