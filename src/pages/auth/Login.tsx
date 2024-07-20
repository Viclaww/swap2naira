import { Link, useNavigate } from "react-router-dom";
import AuthLayout from "./Layout";
import { Helmet } from "react-helmet-async";
import { FormEvent, useState } from "react";
import { useLoginMutation } from "../../lib/api/generalApi";

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [login, { isLoading, isSuccess }] = useLoginMutation();

  const handleLogin = async (e: FormEvent) => {
    e.preventDefault();

    try {
      const data = {
        username: email,
        password,
      };
      await login(data);
      if (isSuccess) {
        navigate("/dashboard");
      }
    } catch (error) {
      console.log("Error Loging in", error);
    }
  };
  return (
    <AuthLayout>
      <Helmet>
        <meta name="description" content="Log in to you Swap2Naira Account" />
        <title>Login</title>
      </Helmet>
      <input
        type="text"
        name="Email"
        id="email"
        required={true}
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Email or Phone"
      />
      <input
        type="password"
        required={true}
        value={password}
        placeholder="Password"
        onChange={(e) => setPassword(e.target.value)}
        name="password"
        id="password"
      />
      <button onClick={handleLogin}>{isLoading ? "Loading" : "Login"}</button>
      <span>
        Dont have account? <Link to="/register">Sign Up</Link>
      </span>
    </AuthLayout>
  );
};

export default Login;
