import { useState, FormEvent } from "react";
import Modal from "./ModalComp";
import { useVerifyEmailMutation } from "@/lib/api/generalApi";
import { useModal } from "@/lib/context/exports";
import { getFirstField } from "@/utils/functions";
import { ModalContext } from "@/lib/types";
import { Box } from "@mui/system";
import OTP from "./OtpComp";
import Loader from "./loader";

const OtpModal = () => {
  const [otp, setOtp] = useState<string>("");
  const [error, setError] = useState<string | null>(null);
  const [verifyEmail, { isLoading }] = useVerifyEmailMutation();

  const { closeModal, email, onVerify, description } =
    useModal() as ModalContext;

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    try {
      const responce = await verifyEmail({ otp: otp, email });

      if (responce.data && responce.data.success) {
        onVerify();
        closeModal();
      }
      if (responce.error) {
        setOtp("");
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

  return (
    <Modal>
      <div className="flex flex-col gap-3 items-center">
        <h1 className="text-2xl font-bold">Enter OTP</h1>
        <p className="text-center">{description}</p>
        <div className="flex gap-2">
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: 2,
            }}
          >
            <OTP separator={""} value={otp} onChange={setOtp} length={6} />
          </Box>
        </div>
        <button
          onClick={handleSubmit}
          className="w-1/2 p-2 m-2 flex justify-center bg-blueX rounded-md text-white"
        >
          {isLoading ? <Loader /> : "Submit"}
        </button>
        {error && <p className="text-red-500 text-center">{error}</p>}
        <p>Didn't get Code? Resend</p>
      </div>
    </Modal>
  );
};

export default OtpModal;
