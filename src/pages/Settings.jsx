import Loader from "src/components/loader/Loader";
import useCheckCookie from "src/hooks/useCheckCookie";

function Settings() {
  const { loading } = useCheckCookie();
  if (loading) return <Loader />;
  return <div>Settings</div>;
}

export default Settings;
