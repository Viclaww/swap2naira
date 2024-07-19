import { useEffect, useState } from "react";
import Flip from "gsap/Flip";
import gsap from "gsap";

gsap.registerPlugin(Flip);

const SecuritySettings = () => {
  const [currentTab, setCurrentTab] = useState<string | null>(null);
  console.log(currentTab);

  const securityTabs = [
    { name: "Change Password" },
    { name: "Change Withdraw Pin" },
    { name: "Reset Pin" },
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
    setCurrentTab("");
  }, []);

  return (
    <>
      <div
        className={`${
          currentTab ? "h-1/5" : "h-4/5"
        } places flex tabs transition-all h-fit  flex-col relative gap-5 duration-500 md:px-10 text-black`}
      >
        {securityTabs.map(({ name }, index) => (
          <div
            onClick={() => setCurrentTab(name)}
            className={` ${
              currentTab && currentTab !== name
                ? "animate-disapp hidden bg-red-800"
                : "flex "
            }  text-black tabs bg-blueX/10 rounded-full items-center duration-200 gap-6 cursor-pointer px-4 py-5`}
            key={index}
          >
            {/* {icon(35)} */}
            <span className="text-xl font-medium">{name} </span>
          </div>
        ))}
      </div>
      <div className="text-black  w-full flex flex-col  gap-3 mt-6 font-medium justify-center items-center duration-500">
        {currentTab == "Change Password" ? (
          <>
            <input
              className="px-4 py-3  w-full md:w-2/3 outline-none rounded-full placeholder:text-black/60  bg-blueX/20"
              placeholder="Old password"
              type="text"
            />
            <input
              className="px-4 py-3 w-full md:w-2/3 outline-none rounded-full placeholder:text-black/60  bg-blueX/20"
              placeholder="New password"
              type="text"
            />
            <input
              className="px-4 py-3 w-full md:w-2/3 outline-none rounded-full placeholder:text-black/60  bg-blueX/20"
              placeholder="Confirm password"
              type="text"
            />
            <button
              className="px-4 py-3 w-full rounded-full outline-none bg-blueX  md:w-2/3 cursor-pointer"
              type="submit"
            >
              Submit
            </button>
          </>
        ) : currentTab == "Change Withdraw Pin" ? (
          <>
            <input
              className="px-4 py-3 w-full  md:w-2/3 outline-none rounded-full placeholder:text-black/60  bg-blueX/20"
              placeholder="Old pin"
              type="number"
            />
            <input
              className="px-4 py-3  w-full md:w-2/3 outline-none rounded-full placeholder:text-black/60  bg-blueX/20"
              placeholder="New pin"
              type="number"
            />
            <button className="px-4 py-3 rounded-full outline-none bg-blueX  md:w-2/3 cursor-pointer">
              Change Pin
            </button>
          </>
        ) : currentTab == "Reset Pin" ? (
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
        ) : (
          <></>
        )}
      </div>
    </>
  );
};

export default SecuritySettings;
