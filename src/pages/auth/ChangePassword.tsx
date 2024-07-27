import { FormEvent, useState } from "react";
import AuthLayout from "./Layout";
import { useChangePasswordMutation } from "@/lib/api/generalApi";
import { useNavigate } from "react-router-dom";
import Loader from "@/components/loader";
import { useModal } from "@/lib/context/exports";
import { ModalContext } from "@/lib/types";

const ChangePasswordComp = () => {
  const navigate = useNavigate();

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [changePassword, { isLoading }] = useChangePasswordMutation();
  const [errmsg, setErrmsg] = useState<string | null>(null);

  const { email } = useModal() as ModalContext;

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setErrmsg("Password does not match");
      return;
    }
    try {
      const { data } = await changePassword({ password: password, email });
      if (data && data.success) {
        console.log("Success", data);
        navigate("/login");
      } else if (data && !data.success) {
        setErrmsg(data.message);
      }
    } catch (error) {
      setErrmsg("Error");
    }
  };
  return (
    <AuthLayout>
      <p className="text-center font-medium">
        You are ready to update your password
      </p>
      <input
        type="password"
        id="email"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required={true}
        placeholder="Password"
      />
      <input
        type="password"
        id="email"
        value={confirmPassword}
        onChange={(e) => setConfirmPassword(e.target.value)}
        required={true}
        placeholder="Confirm Password"
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

export default ChangePasswordComp;
