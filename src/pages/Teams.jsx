import Loader from "components/loader/Loader";
import useUserRole from "hooks/useUserRole";

function Teams() {
  const { data, loading } = useUserRole(false, "Admin", "/pack");
  if (loading) return <Loader />;
  return <div>Teams</div>;
}

export default Teams;
