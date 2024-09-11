import { useState } from "react";
import { useNavigate } from "react-router-dom";
import TextInput from "./TextInput";
import Checkbox from "./Checkbox";
import Button from "./Button";
import { loginHandler } from "api";
import { LoginValidateInputs } from "utils/helpers";

function LoginForm() {
  const [inputs, setInputs] = useState({
    username: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const login = async (e) => {
    e.preventDefault();
    if (LoginValidateInputs(inputs, setErrors)) {
      await loginHandler(inputs.username, inputs.password, navigate);
    }
  };

  return (
    <form onSubmit={login}>
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
