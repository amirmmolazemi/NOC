import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import partLogo from "assets/images/partLogo.png";
import LoginForm from "components/login/LoginForm";

function Login() {
  const navigate = useNavigate();
  useEffect(() => {
    const token = Cookies.get("token");
    token ? navigate("/dashboard") : navigate("/login");
  }, []);
  return (
    <div className="min-h-screen flex">
      <div className="flex flex-col justify-center items-center p-8 w-full md:w-5/12 bg-white">
        <div className="w-11/12 max-w-md text-center">
          <div className="flex justify-center mb-5">
            <img src={partLogo} alt="Part Logo" className="h-16 w-auto" />
          </div>
          <h1 className="text-3xl font-bold mb-9">Sign in</h1>
          <LoginForm />
        </div>
      </div>
      <div className="hidden md:flex bg-[url('assets/images/bgPicture.png')] w-7/12 bg-cover bg-center rounded-[10px] h-[95vh] mt-6 mr-4" />
    </div>
  );
}

export default Login;
