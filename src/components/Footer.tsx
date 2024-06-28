import { BsTwitter } from "react-icons/bs";
import { CgInstagram } from "react-icons/cg";
import { FaFacebookF } from "react-icons/fa";

const Footer = () => {
  return (
    <div className="bg-blueX flex flex-col items-center py-5 gap-3 text-white justify-center">
      <div className="bg-white cursor-pointer w-fit p-2">
        <img src="/images/S2N.png" className="w-32" alt="logo" />
      </div>

      <span className="text-lg font-medium">Follow us on our socials:</span>
      <div className="flex items-center justify-center gap-4 w-full">
        <span className="bg-white text-black rounded-full p-2 cursor-pointer">
          <FaFacebookF />
        </span>
        <span className="bg-white text-black rounded-full p-2 cursor-pointer">
          <CgInstagram />
        </span>
        <span className="bg-white text-black rounded-full p-2 cursor-pointer">
          <BsTwitter />
        </span>
      </div>
    </div>
  );
};

export default Footer;
