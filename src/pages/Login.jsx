import bgPicture from "assets/bgPicture.png";
import partLogo from "assets/partLogo.png";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import loginHandler from "src/utils/LoginHandler";

function Login() {
  const [type, setType] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const clickHandler = async (e) => {
    e.preventDefault();
    const res = await loginHandler(username, password);
    res ? navigate("/dashboard", { replace: true }) : null;
  };

  return (
    <div className="min-h-screen flex">
      <div className="flex flex-col justify-center items-center p-8 w-full md:w-5/12 bg-white">
        <div className="w-11/12 max-w-md text-center">
          <div className="flex justify-center mb-8">
            <img src={partLogo} alt="Part Logo" className="h-16 w-auto" />
          </div>
          <h1 className="text-3xl font-bold">Sign in</h1>
          <form className="mt-8">
            <div>
              <input
                id="username"
                type="text"
                placeholder="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className={`w-full px-4 py-3 border rounded-md text-base focus:outline-none focus:ring-2 focus:ring-blue-500`}
              />
              {!username && (
                <p className="text-red-500 text-sm mt-1 text-left">
                  Username is required
                </p>
              )}
              <input
                id="password"
                type={type ? "text" : "password"}
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className={`w-full px-4 py-3 border mt-4 rounded-md text-base focus:outline-none focus:ring-2 focus:ring-blue-500`}
              />
              {!password && (
                <p className="text-red-500 text-sm mt-1 text-left">
                  Password is required
                </p>
              )}
            </div>
            <div className="flex items-center mb-4 mt-6">
              <input
                id="remember"
                type="checkbox"
                className="mr-2 h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                onChange={() => setType((type) => !type)}
              />
              <label htmlFor="remember" className="text-sm">
                Show Password
              </label>
            </div>
            <button
              onClick={clickHandler}
              className="w-[50%] py-3 mt-4 bg-blue-600 text-white text-lg font-semibold rounded-md hover:bg-blue-700 transition duration-200"
            >
              Login
            </button>
          </form>
        </div>
      </div>
      <div
        className="hidden md:flex w-7/12 bg-cover bg-center rounded-[10px] h-[95vh] mt-6 mr-4"
        style={{
          backgroundImage: `url(${bgPicture})`,
        }}
      ></div>
    </div>
  );
}

export default Login;
