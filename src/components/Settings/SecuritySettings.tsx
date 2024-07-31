import { FormEvent, useEffect, useState } from "react";
import Flip from "gsap/Flip";
import gsap from "gsap";
import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";
import { useUserContext } from "@/lib/context/exports";
import {
  useChangeWithdrawalPinMutation,
  useProfileChangePasswordMutation,
  useSetWithdrawalPinMutation,
} from "@/lib/api/settingsApi";
import { useAppSelector } from "@/lib/hooks";
import Loader from "../loader";
import { toast } from "react-toastify";
import { getFirstField } from "@/utils/functions";

gsap.registerPlugin(Flip);

type SecurityTab = {
  name: string;
  path: string;
};
const SecuritySettings = () => {
  const [currentTab, setCurrentTab] = useState<string | null>(null);

  const location = useLocation().pathname;

  const securityTabs: SecurityTab[] = [
    { name: "Change Password", path: "change-password" },
    { name: "Change Withdraw Pin", path: "change-withdrawal-pin" },
    // { name: "Reset Pin", path: "reset-pin" },
  ];
  const state = Flip.getState(".tabs");
  Flip.from(state, {
    delay: 0.1,
    duration: 1,
    ease: "power1.out",
    fade: true,
    nested: true,
    scale: true,
    // absolute: true,
  });

  useEffect(() => {
    if (location.includes("change-password")) {
      setCurrentTab("Change Password");
    } else if (location.includes("change-withdrawal-pin")) {
      setCurrentTab("Change Withdraw Pin");
    } else if (location.includes("reset-pin")) {
      setCurrentTab("Reset Pin");
    } else {
      setCurrentTab("");
    }
  }, [location]);

  return (
    <>
      <div
        className={`${
          currentTab ? "h-1/5" : "h-4/5"
        } places flex tabs transition-all h-fit  flex-col relative gap-5 duration-500 md:px-10 text-black`}
      >
        {securityTabs.map(({ name, path }, index) => (
          <Link
            to={path}
            onClick={() => setCurrentTab(path)}
            className={` ${
              currentTab && currentTab !== name
                ? "animate-disapp hidden bg-red-800"
                : "flex "
            }  text-black tabs bg-blueX/10 rounded-full items-center duration-200 gap-6 cursor-pointer px-4 py-5`}
            key={index}
          >
            {/* {icon(35)} */}
            <span className="text-xl font-medium">{name} </span>
          </Link>
        ))}
      </div>
      <div className="text-black  w-full flex flex-col  gap-3 mt-6 font-medium justify-center items-center duration-500">
        <Outlet />
      </div>
    </>
  );
};

export const ChangePassword = () => {
  const [oldPass, setOldpass] = useState("");
  const [newPass, setNewpass] = useState("");
  const [confirmNewPass, setConfirmNewpass] = useState("");
  const token = useAppSelector((state) => state.user.token);

  const [profileChangePassword, { isLoading }] =
    useProfileChangePasswordMutation();

  const handleChangeinput =
    (setter: React.Dispatch<React.SetStateAction<string>>) =>
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setter(e.target.value);
    };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    try {
      if (newPass !== confirmNewPass) {
        toast.error("Passwords don't match");
        return;
      }
      const { data, error } = await profileChangePassword({
        token,
        old_password: oldPass,
        new_password: newPass,
      });

      if (data) {
        toast.success(data.messagex);
      }
      if (error && "data" in error) {
        console.log(error);
        toast.error((error.data as { message: string }).message);
      }
    } catch (error) {
      toast.error(`Error: ${error}`);
    }
  };
  return (
    <>
      <input
        className="px-4 py-3  w-full md:w-2/3 outline-none rounded-full placeholder:text-black/60  bg-blueX/20"
        placeholder="Old password"
        type="text"
        value={oldPass}
        onChange={(e) => handleChangeinput(setOldpass)(e)}
      />
      <input
        className="px-4 py-3 w-full md:w-2/3 outline-none rounded-full placeholder:text-black/60  bg-blueX/20"
        placeholder="New password"
        type="text"
        value={newPass}
        onChange={(e) => handleChangeinput(setNewpass)(e)}
      />
      <input
        className="px-4 py-3 w-full md:w-2/3 outline-none rounded-full placeholder:text-black/60  bg-blueX/20"
        placeholder="Confirm password"
        type="text"
        value={confirmNewPass}
        onChange={(e) => handleChangeinput(setConfirmNewpass)(e)}
      />
      <button
        onClick={handleSubmit}
        className="px-4 py-3 w-full flex justify-center rounded-full outline-none bg-blueX  md:w-2/3 cursor-pointer"
        type="submit"
      >
        {isLoading ? <Loader /> : "Change Password"}
      </button>
    </>
  );
};

export const ChangeWithdrawalPin = () => {
  const [oldPin, setOldPin] = useState("");
  const [newPin, setNewPin] = useState("");
  const token = useAppSelector((state) => state.user.token);
  const navigate = useNavigate();
  const [setWithdrawalPin, { isLoading }] = useSetWithdrawalPinMutation();
  const [ChangeWithdrawalPin, { isLoading: changeLoading }] =
    useChangeWithdrawalPinMutation();
  const { user } = useUserContext();
  let wallet;
  let isPin: boolean | undefined;
  if (user) {
    wallet = user.wallet;
  }

  // Rest of the code...
  if (wallet) {
    isPin = wallet.is_pin;
  }

  const handlePinChange =
    (setter: React.Dispatch<React.SetStateAction<string>>) =>
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const value = e.target.value;
      const onlyNumbers = value.replace(/\D/g, ""); // Remove non-numeric characters
      if (onlyNumbers.length <= 4) {
        setter(onlyNumbers);
      }
    };
  const action = () => {
    if (isPin) {
      return ChangeWithdrawalPin({ token, old_pin: oldPin, new_pin: newPin });
    }
    return setWithdrawalPin({ token, pin: newPin });
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    try {
      if (!newPin || newPin.length < 4) {
        toast.error("You must input a four digit pin");
        return;
      }
      const { data, error } = await action();
      if (data) {
        console.log(data);

        if (data.success) {
          toast.success(data.message);
          navigate("/dashboard");
        }
      }
      if (error && "data" in error) {
        const errorMsg = getFirstField(
          (error as { data?: { data?: { [x: string]: unknown } } })?.data
            ?.data as { [x: string]: unknown }
        )[0];
        toast.error(errorMsg || (error.data as { message: string }).message);
      }
    } catch (error) {
      console.log("Bad, error");
    }
  };
  return (
    <>
      {isPin && (
        <input
          className="px-4 py-3 w-full  md:w-2/3 outline-none rounded-full placeholder:text-black/60  bg-blueX/20"
          placeholder="Old pin"
          value={oldPin}
          onChange={(e) => handlePinChange(setOldPin)(e)}
          type="text"
        />
      )}

      <input
        className="px-4 py-3  w-full md:w-2/3 outline-none rounded-full placeholder:text-black/60  bg-blueX/20"
        placeholder="New pin"
        type="text"
        value={newPin}
        onChange={(e) => handlePinChange(setNewPin)(e)}
      />
      <button
        onClick={handleSubmit}
        className="px-4 py-3 rounded-full flex justify-center outline-none bg-blueX  md:w-2/3 cursor-pointer"
      >
        {isLoading || changeLoading ? <Loader /> : "Change Pin"}
      </button>
    </>
  );
};

export const ResetPin = () => {
  return (
    <>
      <input
        className="px-4 py-3 w-full md:w-2/3 outline-none rounded-full placeholder:text-black/60  bg-blueX/20"
        placeholder="email"
        type="text"
      />
      <button className="px-4 py-3 rounded-full focus:outline-none bg-blueX  w-full md:w-2/3 cursor-pointer">
        Send OTP
      </button>
    </>
  );
};

export default SecuritySettings;
