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
import { outsideClick, validateNumberInput } from "@/utils/functions";
import { BiChevronDown, BiPlus, BiX } from "react-icons/bi";
import { toast } from "react-toastify";

const UserSellCard = () => {
  const token = useAppSelector((state) => state.user.token);
  const [pickedbrand, setPickedBrand] = useState<string>("");
  const [cardBrands, setCardBrands] = useState<TCardBrand[]>([]);
  const [showBrands, setShowBrands] = useState(false);
  const [showCategory, setShowCategory] = useState(false);
  const [cardCatergories, setCardCategories] = useState<TCardCategory[]>([]);
  const [pickedCategory, setPickedCategory] = useState("");
  const [images, setImages] = useState<File[]>([]);
  const { data, isLoading } = useGetBrandsQuery(token);
  const [amount, setAmount] = useState<number>(0);
  const [ecodes, setEcodes] = useState<string[]>([]);
  const [ecodeInput, setEcodeInput] = useState<string>("");

  const [getCategories, { data: categories, isLoading: categoriesLoading }] =
    useGetCategoriesMutation();

  const [createRequest, { isLoading: requestLoading }] =
    useCreateRequestMutation();

  useEffect(() => {
    if (data) {
      setCardBrands(data.data);
    }
  }, [data]);

  useEffect(() => {
    const handleOutsideClick = (event: MouseEvent) => {
      outsideClick(event, document.getElementById("categories-list"), () =>
        setShowCategory(false)
      );
    };
    document.addEventListener("mousedown", handleOutsideClick);
    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, [setShowCategory]);

  useEffect(() => {
    const handleOutsideClick = (event: MouseEvent) => {
      outsideClick(event, document.getElementById("brands-list"), () =>
        setShowBrands(false)
      );
    };
    document.addEventListener("mousedown", handleOutsideClick);
    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, [setShowBrands]);

  useEffect(() => {
    if (categories && categories.success) {
      setCardCategories(categories.data);
      console.log(categories.data);
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

    if (requestLoading) return;
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
            <div className="relative">
              <div className="relative border p-2 flex flex-col gap-4 rounded-lg">
                <span
                  className={`select-item ${
                    pickedbrand === "" ? "selected" : ""
                  }`}
                  onClick={() => {
                    setPickedCategory("");
                    setShowBrands(!showBrands);
                  }}
                >
                  {pickedbrand || "Select a brand"}
                </span>
                {showBrands && cardBrands.length > 0 && (
                  <ul
                    id="brands-list"
                    className="absolute top-14 bg-white w-full border left-0 bottom-10 rounded-lg duration-200 z-20 h-fit max-h-[180px] overflow-auto"
                  >
                    {cardBrands.map((brand, index) => (
                      <li
                        className={`flex cursor-pointer my-2 hover:bg-blueX/30 p-2 items-center gap-3  ${
                          pickedbrand === brand.brand ? "bg-blueX/30" : ""
                        }`}
                        key={index}
                        onClick={() => {
                          setPickedBrand(brand.brand);
                          setPickedCategory("");
                          setCardCategories([]);
                          setShowBrands(false);
                          getCategories({
                            token,
                            data: { brand: brand.brand },
                          });
                        }}
                      >
                        <span className="w-10 h-10">
                          <img
                            src={brand.image}
                            className="w-full h-full"
                            alt=""
                          />
                        </span>
                        {brand.brand}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
              <div className="absolute right-2 top-3 pointer-events-none">
                {isLoading ? (
                  <span>
                    <Loader />
                  </span>
                ) : (
                  <BiChevronDown size={20} />
                )}
              </div>
            </div>
          </div>
          <div className="flex flex-col"></div>
          <label className="font-medium">Select Categories:</label>
          <div className="relative">
            <div className="relative border p-2 flex flex-col gap-4 rounded-lg">
              <span
                className={`select-item cursor-pointer ${
                  pickedCategory === "" ? "selected" : ""
                }`}
                onClick={() => setShowCategory(!showCategory)}
              >
                {pickedCategory || "Select a category"}
              </span>
              {showCategory && cardCatergories.length > 0 && (
                <ul
                  id="categories-list"
                  className="absolute top-14 bg-white w-full border left-0 bottom-10 rounded-lg duration-200 z-20 h-fit max-h-[200px] overflow-auto"
                >
                  {cardCatergories.map((category, index) => (
                    <li
                      className={`flex cursor-pointer my-2 hover:bg-blueX/30 p-2 items-center gap-3  ${
                        pickedCategory === category.type ? "bg-blueX/30" : ""
                      }`}
                      key={index}
                      onClick={() => {
                        setPickedCategory(category.type);
                        setShowCategory(false);
                      }}
                    >
                      <span className="w-10 h-10 rounded-full">
                        <img
                          className="w-full object-cover h-full rounded-full"
                          src={category.image}
                          alt=""
                        />
                      </span>

                      {category.type}
                    </li>
                  ))}
                </ul>
              )}
            </div>
            <div className="absolute right-2 top-3 pointer-events-none">
              {categoriesLoading ? (
                <span>
                  <Loader />
                </span>
              ) : (
                <BiChevronDown size={20} />
              )}
            </div>
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
          <label>Enter Ecodes(seperate with space)</label>
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
            {requestLoading ? <Loader /> : "Request"}
          </button>
        </div>
      </form>
    </>
  );
};

export default UserSellCard;
