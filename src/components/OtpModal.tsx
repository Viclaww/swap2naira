import { useState, useRef } from "react";
import Modal from "./ModalComp";
import { useVerifyOTPMutation } from "@/lib/api/generalApi";
import { useModal } from "@/lib/context/exports";

interface OtpFunctions {
  onVerify?: () => void;
  onError?: () => void;
}

type ModalContext = {
  isModalOpen: boolean;
  closeModal: () => void;
  openModal: () => void;
};
const OtpModal = ({ onVerify, onError }: OtpFunctions) => {
  const [otp, setOtp] = useState<string[]>(["", "", "", "", "", ""]);
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  const [verifyOTP, { isSuccess, isError }] = useVerifyOTPMutation();

  const { closeModal } = useModal() as ModalContext;

  const handleSubmit = async () => {
    try {
      await verifyOTP({ otp: otp });

      if (isSuccess) {
        onVerify && onVerify();
        closeModal();
      }
      if (isError) {
        onError && onError();
      }
    } catch (error) {
      console.error(error);
    }
  };

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
  };

  return (
    <Modal>
      <div className="flex flex-col gap-3 items-center">
        <h1 className="text-2xl font-bold">Enter OTP</h1>
        <div className="flex">
          {otp.map((digit, index) => (
            <input
              key={index}
              type="text"
              className="w-12 h-12 outline-none p-2 m-2 border-2 border-black"
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
        <p>Didn't get Code? Resend</p>
      </div>
    </Modal>
  );
};

export default OtpModal;
