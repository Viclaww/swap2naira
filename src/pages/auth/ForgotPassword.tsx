import { Helmet } from "react-helmet-async";
import AuthLayout from "./Layout";
import { useForgotPasswordMutation } from "@/lib/api/generalApi";
import { FormEvent, useState } from "react";
import { useModal } from "@/lib/context/exports";
import { ModalContext } from "@/lib/types";
import { useNavigate } from "react-router-dom";
import Loader from "@/components/loader";

const ForgotPassword = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState<string>("");
  const [errmsg, setErrmsg] = useState<string | null>(null);
  const [ForgotPassword, { isLoading }] = useForgotPasswordMutation();

  const { openModal } = useModal() as ModalContext;
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    try {
      const { data } = await ForgotPassword({ email: email });
      if (data && data.success) {
        console.log("Success", data);
        openModal("We have sent an OTP. Fill OTP to reset Password", () => {
          navigate("/login");
        });
        if (data && !data.success) {
          setErrmsg("Email account does not exist");
        }
      }
    } catch (error) {
      setErrmsg("Error");
    }
  };
  return (
    <AuthLayout>
      <Helmet>
        <meta name="description" content="Reset your password" />
        <title>Forgot Password</title>
      </Helmet>
      <input
        type="text"
        name="Email"
        id="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required={true}
        placeholder="Email"
      />
      <button
        className="flex justify-center"
        onClick={handleSubmit}
        type="submit"
      >
        {isLoading ? <Loader /> : "Reset Password"}
      </button>
      {errmsg && <p className="text-red-800 text-center">{errmsg}</p>}
    </AuthLayout>
  );
};

export default ForgotPassword;