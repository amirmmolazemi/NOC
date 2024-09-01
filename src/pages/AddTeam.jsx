import Loader from "components/loader/Loader";
import useUserRole from "hooks/useUserRole";

function AddTeam() {
  const { data, loading } = useUserRole(false, "Admin", "/pack");
  if (loading) return <Loader />;
  return <div>AddTeam</div>;
}

export default AddTeam;
