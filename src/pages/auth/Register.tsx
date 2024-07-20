import { Link, useNavigate } from "react-router-dom";
import AuthLayout from "./Layout";
import { Helmet } from "react-helmet-async";
import { FormEvent, useState } from "react";
import { useRegisterMutation } from "../../lib/api/generalApi";
import { useModal } from "@/lib/context/exports";
import OtpModal from "@/components/OtpModal";

type ModalContext = {
  isModalOpen: boolean;
  closeModal: () => void;
  openModal: () => void;
};

const Register = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [userName, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [referralCode, setreferralCode] = useState("");

  const { openModal } = useModal() as ModalContext;

  const [register, { data, isLoading, isError, isSuccess, error }] =
    useRegisterMutation();
  const handleRegister = async (e: FormEvent) => {
    e.preventDefault();
    try {
      const reqData = {
        username: userName,
        email,
        phone,
        password,
        // referral_code: referralCode,
      };

      await register(reqData);
      if (isError) {
        console.log("the error", error);
      }
      if (isSuccess) {
        console.log(data);
        openModal();
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
      <OtpModal onVerify={() => navigate("/dashboard")} />
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

      <span>
        Already have an account? <Link to="/dashboard">Log In</Link>
      </span>
    </AuthLayout>
  );
};

export default Register;
