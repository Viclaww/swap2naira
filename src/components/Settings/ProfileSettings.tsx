import { useProfileUpdateMutation } from "@/lib/api/settingsApi";
import { useUserContext } from "@/lib/context/exports";
import { useAppSelector } from "@/lib/hooks";
import { getFirstField } from "@/utils/functions";
import { useEffect, useState } from "react";
import { RiImageEditLine } from "react-icons/ri";
import { toast } from "react-toastify";
import Loader from "../loader";

const ProfileSettings = () => {
  const [name, setName] = useState<string | null>("");
  const [phone, setPhone] = useState("");
  const [image, setImage] = useState<string | File | null>("");
  const [username, setUsername] = useState("");
  const [birthmonth, setBirthMonth] = useState<string | null>("");
  const [birthdate, setBirthDate] = useState<string | null>("");

  const [profileUpdate, { isLoading }] = useProfileUpdateMutation();
  const token = useAppSelector((state) => state.user.token);

  const user = useUserContext().user;

  useEffect(() => {
    if (user) {
      setPhone(user.phone);
      setUsername(user.username);
      setName(user.name);
      setImage(user.picture);
      setBirthDate(user.birthdate);
      setBirthMonth(user.birthmonth);
    }
  }, [user]);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImage(file);
      // URL.createObjectURL(
    }
  };

  const openImagePicker = () => {
    const input = document.getElementById("image-picker");
    if (input) {
      input.click();
    }
  };

  const handleSubmit = async (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault();
    const formData = new FormData();
    if (name && name !== user?.name) {
      formData.append("name", name);
    }
    if (image && typeof image !== "string") {
      formData.append("image", image);
    }
    if (phone && phone !== user?.phone) {
      formData.append("phone", phone);
    }
    if (birthdate && birthdate !== user?.birthdate) {
      formData.append("birthdate", birthdate);
    }
    if (birthmonth && birthmonth !== user?.birthmonth) {
      formData.append("birthmonth", birthmonth);
    }
    try {
      const { data, error } = await profileUpdate({ data: formData, token });
      if (data) {
        toast.success(data.data);
      }
      if (error) {
        toast.error(
          `Failed: ${getFirstField(
            (error as { data?: { data?: { [x: string]: unknown } } })?.data
              ?.data as { [x: string]: unknown }
          )}`
        );
      }
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <>
      <form className="grid grid-cols-2 text-xl gap-6 h-full justify-center w-full flex-col">
        <div
          className={`w-[100px] col-span-2 group cursor-pointer relative h-[100px] rounded-full`}
        >
          <img
            src={
              image && image instanceof File
                ? URL.createObjectURL(image)
                : !image
                ? "/images/avatar.png"
                : image
            }
            className="w-full cursor-pointer  h-full object-cover rounded-full"
            alt=""
          />

          <input
            type="file"
            accept="image/*"
            id="image-picker"
            className="hidden"
            onChange={(e) => handleImageChange(e)}
          />
          <span
            onClick={openImagePicker}
            className="w-full cursor-pointer absolute top-0 group-hover:flex hidden h-full bg-black/25  rounded-full justify-center items-center"
          >
            <RiImageEditLine size={30} />
          </span>
        </div>
        <input
          className="px-3 py-2 col-span-2 rounded-xl border text-black placeholder:text-black outline-none"
          placeholder="Name"
          type="text"
          onChange={(e) => setName(e.target.value)}
          value={name ?? ""}
        />
        <input
          className="px-3 py-2 rounded-xl  border text-black placeholder:text-black outline-none"
          placeholder="Username"
          type="text"
          value={username}
          readOnly
        />
        <input
          className="px-3 py-2 rounded-xl border text-black placeholder:text-black outline-none"
          placeholder="Phone Number"
          type="text"
          value={phone}
          readOnly
        />

        <select
          className="px-3 py-2 rounded-xl border  text-black placeholder:text-black outline-none"
          value={birthdate ?? ""}
          onChange={(e) => setBirthDate(e.target.value)}
        >
          <option value="">Select Date</option>
          <option value="01">1</option>
          <option value="02">2</option>
          <option value="03">3</option>
          <option value="04">4</option>
          <option value="05">5</option>
          <option value="06">6</option>
          <option value="07">7</option>
          <option value="08">8</option>
          <option value="09">9</option>
          <option value="10">10</option>
          <option value="11">11</option>
          <option value="12">12</option>
          <option value="13">13</option>
          <option value="14">14</option>
          <option value="15">15</option>
          <option value="16">16</option>
          <option value="17">17</option>
          <option value="18">18</option>
          <option value="19">19</option>
          <option value="20">20</option>
          <option value="21">21</option>
          <option value="22">22</option>
          <option value="23">23</option>
          <option value="24">24</option>
          <option value="25">25</option>
          <option value="26">26</option>
          <option value="27">27</option>
          <option value="28">28</option>
          <option value="29">29</option>
          <option value="30">30</option>
          <option value="31">31</option>
        </select>
        <select
          className="px-3 py-2 rounded-xl border text-black placeholder:text-black outline-none"
          value={birthmonth ?? ""}
          onChange={(e) => setBirthMonth(e.target.value)}
        >
          <option value="">Select Month</option>
          <option value="1">January</option>
          <option value="2">February</option>
          <option value="3">March</option>
          <option value="4">April</option>
          <option value="5">May</option>
          <option value="6">June</option>
          <option value="7">July</option>
          <option value="8">August</option>
          <option value="9">September</option>
          <option value="10">October</option>
          <option value="11">November</option>
          <option value="12">December</option>
        </select>

        <button
          onClick={(e) => {
            if (isLoading) {
              return null;
            }
            handleSubmit(e);
          }}
          className="bg-blueX flex justify-center text-white rounded-xl col-span-2 py-2"
        >
          {isLoading ? <Loader /> : "Save"}
        </button>
      </form>
    </>
  );
};

export default ProfileSettings;
