import { useState, FormEvent, useEffect } from "react";
import Modal from "./ModalComp";
import {
  useLazyResendVerifyEmailQuery,
  useResendForgotPasswordOTPMutation,
  useVerifyEmailMutation,
  useVerifyForgotPassMutation,
} from "@/lib/api/generalApi";
import { useModal } from "@/lib/context/exports";
import { getFirstField } from "@/utils/functions";
import { ModalContext } from "@/lib/types";
import { Box } from "@mui/system";
import OTP from "./OtpComp";
import Loader from "./loader";
import { useNavigate } from "react-router-dom";

const OtpModal = () => {
  const [otp, setOtp] = useState<string>("");
  const [error, setError] = useState<string | null>(null);
  const [verifyEmail, { isLoading }] = useVerifyEmailMutation();
  const [verifyForgotPass, { isLoading: forgotLoading }] =
    useVerifyForgotPassMutation();
  const [resendForgotPasswordOTP] = useResendForgotPasswordOTPMutation();
  const [resendVerifyEmail] = useLazyResendVerifyEmailQuery();

  const navigate = useNavigate();

  const { closeModal, email, reason, onVerify, description } =
    useModal() as ModalContext;

  const handleResendOtp = async () => {
    let responce;
    setIsTimerActive(true);
    setTimer(60);
    try {
      if (reason === "Forgot-Password") {
        responce = await resendForgotPasswordOTP(email);
      } else {
        responce = await resendVerifyEmail(email);
      }

      const { data, error } = responce;
      if (data && data.success) {
        setError("Sent Check Mail!");
      } else if (error) {
        console.error(error);
      }
    } catch (error) {
      console.log("Please check Internet");
    }
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    let responce;
    try {
      if (reason === "Forgot-Password") {
        responce = await verifyForgotPass({ otp: otp, email });
      } else {
        responce = await verifyEmail({ otp: otp, email });
      }

      if (responce && responce.data && responce.data.success) {
        navigate(onVerify);
        closeModal();
      }
      if (responce && responce.error) {
        setOtp("");
        setError(
          getFirstField(
            (error as { data?: { data?: { [x: string]: unknown } } })?.data
              ?.data as { [x: string]: unknown }
          ) || "Wrong Code. Retry"
        );
      }
    } catch (error) {
      console.error(error);
    }
  };

  const [timer, setTimer] = useState<number>(60);
  const [isTimerActive, setIsTimerActive] = useState<boolean>(false);

  useEffect(() => {
    let interval: NodeJS.Timeout;

    if (isTimerActive) {
      interval = setInterval(() => {
        setTimer((prevTimer) => prevTimer - 1);
      }, 1000);
    }

    return () => {
      clearInterval(interval);
    };
  }, [isTimerActive]);

  useEffect(() => {
    if (timer === 0) {
      setIsTimerActive(false);
    }
  }, [timer]);

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
          {isLoading || forgotLoading ? <Loader /> : "Submit"}
        </button>
        {error && <p className="text-red-500 text-center">{error}</p>}
        {isTimerActive ? (
          <p className="font-medium">Resend OTP in {timer} seconds</p>
        ) : (
          <p onClick={handleResendOtp} className="cursor-pointer font-medium">
            Resend Code
          </p>
        )}
      </div>
    </Modal>
  );
};

export default OtpModal;
