import { useState } from "react";
import AuthLayout from "./Layout";

const ChangePasswordComp = () => {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const handleSubmit = () => {};
  return (
    <AuthLayout>
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
        placeholder="Password"
      />
      <button
        className="flex justify-center"
        onClick={handleSubmit}
        type="submit"
      >
        {/* {isLoading ? <Loader /> : "Reset Password"} */}
      </button>
    </AuthLayout>
  );
};

export default ChangePasswordComp;
