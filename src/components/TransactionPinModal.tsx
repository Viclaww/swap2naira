import { Box } from "@mui/system";
import OTP from "./OtpComp";
import { SetStateAction } from "react";
import Loader from "./loader";

const TransactionPinModal = ({
  pin,
  setPin,
  handleSubmit,
  onCancel,
  loading,
}: {
  pin: string;
  handleSubmit: () => void;
  setPin: React.Dispatch<SetStateAction<string>>;
  onCancel: () => void;
  loading: boolean;
}) => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 2,
      }}
    >
      <OTP
        separator={<span>-</span>}
        value={pin}
        onChange={setPin}
        length={4}
      />
      <div className="grid grid-cols-2 gap-2 w-full">
        <button
          className="flex w-full font-medium bg-slate-500 justify-center py-2 rounded-lg text-white"
          onClick={onCancel}
        >
          Cancel
        </button>
        <button
          className="flex w-full font-medium bg-blueX justify-center py-2 rounded-lg text-white"
          onClick={handleSubmit}
        >
          {loading ? <Loader /> : "Submit"}
        </button>
      </div>
    </Box>
  );
};

export default TransactionPinModal;
