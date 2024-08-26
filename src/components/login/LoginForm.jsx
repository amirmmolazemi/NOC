import { useState } from "react";
import { useNavigate } from "react-router-dom";
import loginHandler from "utils/LoginHandler";
import TextInput from "./TextInput";
import Checkbox from "./Checkbox";

function LoginForm() {
  const [credentials, setCredentials] = useState({
    username: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCredentials((prev) => ({ ...prev, [name]: value }));
  };

  const validateInputs = () => {
    const newErrors = {};
    if (!credentials.username) newErrors.username = "Username is required";
    if (!credentials.password) newErrors.password = "Password is required";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateInputs()) return;

    const res = await loginHandler(credentials.username, credentials.password);
    if (res) navigate("/dashboard");
  };

  return (
    <form onSubmit={handleSubmit}>
      <TextInput
        id="username"
        name="username"
        placeholder="Username"
        value={credentials.username}
        onChange={handleChange}
        error={errors.username}
      />
      <TextInput
        id="password"
        name="password"
        type={showPassword ? "text" : "password"}
        placeholder="Password"
        value={credentials.password}
        onChange={handleChange}
        error={errors.password}
      />
      <Checkbox
        id="showPassword"
        label="Show Password"
        checked={showPassword}
        onChange={() => setShowPassword((prev) => !prev)}
      />
      <button
        type="submit"
        className="w-[50%] py-3 mt-4 bg-blue-600 text-white text-lg font-semibold rounded-md hover:bg-blue-700 transition duration-200"
      >
        Login
      </button>
    </form>
  );
}

export default LoginForm;
