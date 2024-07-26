import { useState, useRef, FormEvent } from "react";
import Modal from "./ModalComp";
import { useVerifyEmailMutation } from "@/lib/api/generalApi";
import { useModal } from "@/lib/context/exports";
import { useEffect } from "react";
import { getFirstField } from "@/utils/functions";
import { ModalContext } from "@/lib/types";

const OtpModal = () => {
  const [otp, setOtp] = useState<string[]>(["", "", "", "", "", ""]);
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [verifyEmail] = useVerifyEmailMutation();

  const { closeModal, email, onVerify, description } =
    useModal() as ModalContext;

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    try {
      const responce = await verifyEmail({ otp: otp.join(""), email });

      if (responce.data.success) {
        onVerify();
        closeModal();
      }
      if (responce.error) {
        inputRefs.current[0]?.focus();
        setOtp(["", "", "", "", "", ""]);
        setError(
          getFirstField(
            (error as { data?: { data?: { [x: string]: unknown } } })?.data
              ?.data as { [x: string]: unknown }
          )
        );
      }
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    inputRefs.current[0]?.focus();
  }, []);
  const handleOtpChange = (index: number, value: string) => {
    if (value.length > 1) {
      value = value.slice(0, 1);
    }

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    if (value && index < inputRefs.current.length - 1) {
      inputRefs.current[index + 1]?.focus();
    }
    if (!value && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
    if (value === "" && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  return (
    <Modal>
      <div className="flex flex-col gap-3 items-center">
        <h1 className="text-2xl font-bold">Enter OTP</h1>
        <p className="text-center">{description}</p>
        <div className="flex gap-2">
          {otp.map((digit, index) => (
            <input
              key={index}
              type="text"
              className="w-12 h-12 text-3xl outline-none px-[auto]  border rounded border-black"
              placeholder="0"
              value={digit}
              onChange={(e) => handleOtpChange(index, e.target.value)}
              ref={(ref) => (inputRefs.current[index] = ref)}
            />
          ))}
        </div>
        <button
          onClick={handleSubmit}
          className="w-1/2 p-2 m-2 bg-black text-white"
        >
          Submit
        </button>
        {error && <p className="text-red-500 text-center">{error}</p>}
        <p>Didn't get Code? Resend</p>
      </div>
    </Modal>
  );
};

export default OtpModal;
