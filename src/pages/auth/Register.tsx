import { Link } from "react-router-dom";
import AuthLayout from "./Layout";
import { Helmet } from "react-helmet-async";

const Register = () => {
  return (
    <AuthLayout>
      <Helmet>
        <meta name="description" content="Create a Swap2Naira Account" />
        <title>Create an Account</title>
      </Helmet>
      <input type="text" name="Email" id="email" placeholder="Email or Phone" />
      <input type="text" name="usernane" id="usernane" placeholder="usernane" />
      <input type="number" name="phone" id="phone" placeholder="Phone" />
      <input
        type="text"
        name="code"
        id="referral_code"
        placeholder="referral_code optional"
      />
      <input
        type="password"
        placeholder="Password"
        name="password"
        id="password"
      />
      <button>Register</button>

      <span>
        Already have an account? <Link to="/dashboard">Log In</Link>
      </span>
    </AuthLayout>
  );
};

export default Register;
