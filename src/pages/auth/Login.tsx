import { Link } from "react-router-dom";
import AuthLayout from "./Layout";
import { Helmet } from "react-helmet-async";

const Login = () => {
  return (
    <AuthLayout>
      <Helmet>
        <meta name="description" content="Log in to you Swap2Naira Account" />
        <title>Login</title>
      </Helmet>
      <input type="text" name="Email" id="email" placeholder="Email or Phone" />
      <input
        type="password"
        placeholder="Password"
        name="password"
        id="password"
      />
      <button>Login</button>

      <span>
        Dont have account? <Link to="/register">Sign Up</Link>
      </span>
    </AuthLayout>
  );
};

export default Login;
