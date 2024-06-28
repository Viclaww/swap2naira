import { Link } from "react-router-dom";
import AuthLayout from "./Layout";

const Login = () => {
  return (
    <AuthLayout>
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
