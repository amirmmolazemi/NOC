import Loader from "components/loader/Loader";
import useUserRole from "hooks/useUserRole";

function AddUser() {
  const { data, loading } = useUserRole(false, "Admin", "/pack");
  if (loading) return <Loader />;
  return <div>AddUser</div>;
}

export default AddUser;
