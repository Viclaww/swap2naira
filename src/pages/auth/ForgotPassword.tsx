import { Helmet } from "react-helmet-async";
import AuthLayout from "./Layout";
import { useForgotPasswordMutation } from "@/lib/api/generalApi";
import { FormEvent, useState } from "react";
import { useModal } from "@/lib/context/exports";
import { ModalContext } from "@/lib/types";
import Loader from "@/components/loader";
import OtpModal from "@/components/OtpModal";
import { getFirstField } from "@/utils/functions";

const ForgotPassword = () => {
  const [email, setEmail] = useState<string>("");
  const [errmsg, setErrmsg] = useState<string | null>(null);
  const [ForgotPassword, { isLoading }] = useForgotPasswordMutation();

  const { openModal, setModalEmail } = useModal() as ModalContext;
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    try {
      const { data, error } = await ForgotPassword({ email: email });
      if (data && data.success) {
        console.log("Success", data);
        setModalEmail(email);
        openModal(
          "We have sent an OTP. Fill OTP to reset Password",
          "/change-password",
          "Forgot-Password"
        );
      }
      if (error) {
        setErrmsg(
          getFirstField(
            (error as { data?: { data?: { [x: string]: unknown } } })?.data
              ?.data as { [x: string]: unknown }
          )[0]
        );
      }
    } catch (error) {
      setErrmsg("Error");
    }
  };
  return (
    <AuthLayout desc="Fill email to retrive account access">
      <Helmet>
        <meta name="description" content="Reset your password" />
        <title>Forgot Password</title>
      </Helmet>
      <OtpModal />

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
        disabled={isLoading || !email}
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
