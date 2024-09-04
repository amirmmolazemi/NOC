import { useState } from "react";
import { useNavigate } from "react-router-dom";
import loginHandler from "utils/loginHandler";
import TextInput from "./TextInput";
import Checkbox from "./Checkbox";
import Button from "./Button";

function LoginForm() {
  const [inputs, setInputs] = useState({
    username: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const validateInputs = () => {
    const newErrors = {};
    if (!inputs.username) newErrors.username = "Username is required";
    if (!inputs.password) newErrors.password = "Password is required";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateInputs()) return;
    const res = await loginHandler(inputs.username, inputs.password);
    if (res) navigate("/dashboard");
  };

  return (
    <form onSubmit={handleSubmit}>
      <TextInput
        name="username"
        value={inputs.username}
        setInputs={setInputs}
        error={errors.username}
      />
      <TextInput
        name="password"
        type={showPassword ? "text" : "password"}
        value={inputs.password}
        setInputs={setInputs}
        error={errors.password}
      />
      <Checkbox checked={showPassword} setShowPassword={setShowPassword} />
      <Button />
    </form>
  );
}

export default LoginForm;
