import { Link, useNavigate } from "react-router-dom";
import AuthLayout from "./Layout";
import { Helmet } from "react-helmet-async";
import { FormEvent, useState } from "react";
import { useLoginMutation } from "../../lib/api/generalApi";
import { setToken } from "@/lib/reducers/userSlice";
import { getFirstField } from "@/utils/functions";
import { useAppDispatch } from "@/lib/hooks";
import Loader from "@/components/loader";

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [login, { isLoading }] = useLoginMutation();
  const [errmsg, setErrmsg] = useState<string | null>(null);

  const handleLogin = async (e: FormEvent) => {
    e.preventDefault();

    try {
      const reqdata = {
        email: email,
        password,
      };
      const { data, error } = await login(reqdata);

      if (data && data.success) {
        navigate("/dashboard");
        dispatch(setToken(data.data.token));
        sessionStorage.setItem("s2n-token", data.data.token);
      }
      if (error) {
        if ("status" in error && error.status == 401) {
          setErrmsg("Incorrect Username or Password");
          return;
        }

        setErrmsg(
          getFirstField(
            (error as { data?: { data?: { [x: string]: unknown } } })?.data
              ?.data as { [x: string]: unknown }
          )[0]
        );
      }
      if (data && !data.success) {
        setErrmsg(data.message);
      }
    } catch (error) {
      console.log("Error Loging in", "Please Check your Internet connection");
    }
  };

  return (
    <AuthLayout desc="Log in to your Swap2Naira account.">
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
        placeholder="Email"
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
      <button className="flex justify-center" onClick={handleLogin}>
        {isLoading ? <Loader /> : "Login"}
      </button>
      {errmsg && <span className="text-red-800">{errmsg}</span>}
      <span>
        Dont have account? <Link to="/register">Sign Up</Link>
      </span>
      <Link className="text-center" to="/forgot-password">
        Forgot Password
      </Link>
    </AuthLayout>
  );
};

export default Login;
