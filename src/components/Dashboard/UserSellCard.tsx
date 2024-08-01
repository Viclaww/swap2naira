import {
  useCreateRequestMutation,
  useGetBrandsQuery,
  useGetCategoriesMutation,
} from "@/lib/api/cardApi";
import Balance from "./Balance";
import DashboardHead from "./DashboardHead";
import { useAppSelector } from "@/lib/hooks";
import { useEffect, useState } from "react";
import { TCardBrand, TCardCategory } from "@/lib/types";
import Loader from "../loader";
import { validateNumberInput } from "@/utils/functions";
import { BiPlus, BiX } from "react-icons/bi";
import { toast } from "react-toastify";

const UserSellCard = () => {
  const token = useAppSelector((state) => state.user.token);
  const [pickedbrand, setPickedBrand] = useState<string>("");
  const [cardBrands, setCardBrands] = useState<TCardBrand[]>([]);
  const [cardCatergories, setCardCategories] = useState<TCardCategory[]>([]);
  const [pickedCategory, setPickedCategory] = useState("");
  const [images, setImages] = useState<File[]>([]);
  const { data, isLoading } = useGetBrandsQuery(token);
  const [amount, setAmount] = useState<number>(0);
  const [ecodes, setEcodes] = useState<string[]>([]);
  const [ecodeInput, setEcodeInput] = useState<string>("");
  const [getCategories, { data: categories, isLoading: categoriesLoading }] =
    useGetCategoriesMutation();

  const [createRequest] = useCreateRequestMutation();

  useEffect(() => {
    if (data) {
      setCardBrands(data.data);
    }
  }, [data]);
  useEffect(() => {
    if (categories && categories.success) {
      setCardCategories(categories.data);
    }
  }, [categories]);

  const cardValue = () => {
    const card = cardCatergories.find((brand) => brand.type === pickedCategory);
    if (card) {
      return amount * card.rate;
    }
    return 0;
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) {
      const fileList = Array.from(files);
      const imageFiles = fileList.filter((file) =>
        file.type.startsWith("image/")
      );
      setImages([...images, ...imageFiles]);
    }
  };
  const openImagePicker = () => {
    const input = document.getElementById("image-picker");
    if (input) {
      input.click();
    }
  };

  const handleEcodeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (value.includes(" ")) {
      const values = value.trim().split(" ");
      setEcodes([...ecodes, ...values]);
      setEcodeInput("");
    } else {
      setEcodeInput(value);
    }
  };

  const handleEcodeDelete = (index: number) => {
    const newEcodes = ecodes.filter((_, i) => i !== index);
    setEcodes(newEcodes);
  };
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!pickedbrand) {
      toast.warning("Please select a brand");
      return;
    }
    if (!pickedCategory) {
      toast.warning("Please select a category");
      return;
    }
    if (amount <= 0) {
      toast.warning("Please input valid amount");
      return;
    }
    const pickedCategoryObj = cardCatergories.find(
      (x) => x.type === pickedCategory
    );

    if (pickedCategoryObj?.category == "physical" && images.length < 1) {
      toast.warning("Images are required");
      return;
    }

    if (pickedCategoryObj?.category == "ecode" && ecodes.length < 1) {
      toast.warning("ecodes are required");
      return;
    }
    if (
      pickedCategoryObj?.category == "both" &&
      ecodes.length < 1 &&
      images.length < 1
    ) {
      toast.warning("ecodes and images are required");
      return;
    }
    const formdata = new FormData();
    if (pickedCategoryObj) {
      formdata.append("card_id", pickedCategoryObj.id.toString());
      formdata.append("category", pickedCategoryObj.category);
      formdata.append("number", amount.toString());
    }

    if (
      pickedCategoryObj?.category == "both" ||
      pickedCategoryObj?.category == "ecode"
    ) {
      ecodes.forEach((ecode) => {
        formdata.append("ecodes[]", ecode);
      });
    }
    if (
      pickedCategoryObj?.category == "both" ||
      pickedCategoryObj?.category == "physical"
    ) {
      images.forEach((image) => {
        formdata.append("images[]", image);
      });
    }
    try {
      const responce = await createRequest({ token, data: formdata });
      if (responce && responce.data) {
        console.log(responce.data);
        toast.success(responce.data.data);
      }
      if (responce && responce.error) {
        console.log(responce.error);
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <DashboardHead pageName="Sell Gift Cards" />
      <Balance />
      <form className="text-black flex flex-col md:flex-row gap-5 w-full text-lg">
        <div className="flex  w-full lg:w-1/2 flex-col gap-5">
          <div className="flex flex-col outline-none">
            <label className="font-medium">Select Gift Card:</label>
            <select
              className="outline-none py-2 px-2 rounded-md border"
              value={pickedbrand}
              onChange={(e) => {
                setPickedBrand(e.target.value);

                getCategories({ token, data: { brand: e.target.value } });
              }}
            >
              <option value="">Select a brand</option>
              {isLoading ? (
                <Loader />
              ) : (
                cardBrands &&
                cardBrands.map((brand, index) => (
                  <option className="py-2" key={index} value={brand.brand}>
                    <img src={brand.image} className="w-10 h-10" alt="" />
                    {brand.brand}
                  </option>
                ))
              )}
            </select>
          </div>
          <div className="flex flex-col">
            <label className="font-medium">Select Categories:</label>
            <select
              className="border outline-none py-2 px-2 rounded-md"
              value={pickedCategory}
              onChange={(e) => setPickedCategory(e.target.value)}
            >
              <option value="">Select a categories</option>
              {categoriesLoading ? (
                <Loader />
              ) : (
                cardCatergories &&
                cardCatergories.map((category, index) => (
                  <option key={index} value={category.type}>
                    {category.type}
                  </option>
                ))
              )}
            </select>
          </div>
          <div className="flex flex-col">
            <label className="font-medium">Enter Gift Card amount:</label>
            <input
              value={amount}
              onChange={(e) =>
                setAmount(validateNumberInput(amount, e.target.value))
              }
              type="text"
              className="w-full outline-none border py-2 px-2 rounded-md"
            />
          </div>
          <div className="w-full py-3 font-medium px-2 rounded-md bg-blueX/25">
            ₦{cardValue()}
          </div>
        </div>
        <div className="flex  w-full lg:w-1/2 flex-col gap-5">
          <div className="images flex flex-wrap gap-3">
            {images &&
              images.map((image, index) => (
                <span className="w-22 h-20">
                  <img
                    key={index}
                    className="w-full object-cover h-full"
                    src={URL.createObjectURL(image)}
                  />
                </span>
              ))}
            <span className="relative group w-20 h-20 ">
              <input
                type="file"
                accept="image/*"
                id="image-picker"
                className="hidden"
                multiple
                onChange={(e) => handleImageChange(e)}
              />
              <img
                className="w-20 h-full  object-fill cursor-pointer"
                src="/images/img-placeholder.png"
                alt=""
              />
              <span
                onClick={openImagePicker}
                className="w-20 cursor-pointer absolute top-0 group-hover:flex hidden h-full  justify-center items-center"
              >
                <BiPlus size={30} />
              </span>
            </span>
          </div>
          <label>Enter Ecode(seperate with space)</label>
          <div className="w-full gap-1 flex min-h-10 border items-center rounded-md px-2 py-1 flex-wrap">
            {ecodes &&
              ecodes.map((ecode, index) => (
                <span
                  onClick={() => handleEcodeDelete(index)}
                  className="bg-blueX/25 p-1 flex items-center gap-2"
                  key={index}
                >
                  {ecode}
                  <BiX onClick={() => handleEcodeDelete(index)} size={20} />
                </span>
              ))}
            <input
              type="text"
              className="min-w-20 rounded-md px-2 outline-none text-sm py-2"
              value={ecodeInput}
              onChange={(e) => handleEcodeInput(e)}
            />
          </div>
          <button
            onClick={handleSubmit}
            className="bg-blueX text-white py-2 rounded-md"
          >
            Proceed
          </button>
        </div>
      </form>
    </>
  );
};

export default UserSellCard;
