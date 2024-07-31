import { Box } from "@mui/system";
import OTP from "./OtpComp";
import { useState } from "react";

const TransactionPinModal = () => {
  const [pin, setPin] = useState("");
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: 2,
      }}
    >
      <OTP
        separator={<span>-</span>}
        value={pin}
        onChange={setPin}
        length={4}
      />
      <button>Submit transaction</button>
    </Box>
  );
};

export default TransactionPinModal;
