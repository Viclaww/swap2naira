import { Link, useNavigate } from "react-router-dom";
import AuthLayout from "./Layout";
import { Helmet } from "react-helmet-async";
import { FormEvent, useState } from "react";
import { useRegisterMutation } from "../../lib/api/generalApi";
import { useModal } from "@/lib/context/exports";
import { setToken } from "@/lib/reducers/userSlice";
import { getFirstField } from "@/utils/functions";
import { useAppDispatch } from "@/lib/hooks";
import { ModalContext } from "@/lib/types";

const Register = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [userName, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [referralCode, setreferralCode] = useState("");
  const [error, setError] = useState<string | null>(null);

  const { openModal, setModalEmail } = useModal() as ModalContext;

  const [register, { isLoading }] = useRegisterMutation();
  const handleRegister = async (e: FormEvent) => {
    e.preventDefault();
    setError(null);
    try {
      const reqData = {
        username: userName,
        email,
        phone,
        password,
        // referral_code: referralCode,
      };
      const responce = await register(reqData);

      if (responce.error) {
        console.log("Error", responce.error);
        setError(
          getFirstField(
            (responce.error as { data?: { data?: { [x: string]: unknown } } })
              ?.data?.data as { [x: string]: unknown }
          )
        );
      }
      if (responce.data) {
        console.log("Data", responce.data);
        setModalEmail(email);
        console.log("Token", responce.data.data.token);
        sessionStorage.setItem("s2n-token", responce.data.data.token);
        dispatch(setToken(responce.data.data.token));
        openModal(
          "Verify your Email. We have sent an OTP to your Mail. fill the OTP to verify Mail",
          () => {
            console.log("Caught");
            navigate("/dashboard");
          }
        );
      }
    } catch (error) {
      console.log("Error Registering", error);
    }
  };
  return (
    <AuthLayout>
      <Helmet>
        <meta name="description" content="Create a Swap2Naira Account" />
        <title>Create an Account</title>
      </Helmet>
      <input
        type="text"
        name="Email"
        id="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Email"
      />
      <input
        type="text"
        name="usernane"
        value={userName}
        onChange={(e) => setUsername(e.target.value)}
        id="usernane"
        placeholder="usernane"
      />
      <input
        type="number"
        name="phone"
        value={phone}
        onChange={(e) => setPhone(e.target.value)}
        id="phone"
        placeholder="Phone"
      />
      <input
        type="text"
        name="code"
        id="referral_code"
        value={referralCode}
        onChange={(e) => setreferralCode(e.target.value)}
        placeholder="referral_code optional"
      />
      <input
        type="password"
        placeholder="Password"
        name="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        id="password"
      />
      <button onClick={handleRegister}>
        {isLoading ? "Loading..." : "Register"}
      </button>

      {error && <p className="text-red-500 text-center">{error}</p>}
      <span>
        Already have an account? <Link to="/login">Log In</Link>
      </span>
    </AuthLayout>
  );
};

export default Register;
