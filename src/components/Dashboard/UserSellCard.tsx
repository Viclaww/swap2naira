import { useGetBrandsQuery, useGetCategoriesMutation } from "@/lib/api/cardApi";
import Balance from "./Balance";
import DashboardHead from "./DashboardHead";
import { useAppSelector } from "@/lib/hooks";
import { useEffect, useState } from "react";
import { TCardBrand, TCardCategory } from "@/lib/types";
import Loader from "../loader";
import { validateNumberInput } from "@/utils/functions";

const UserSellCard = () => {
  const token = useAppSelector((state) => state.user.token);
  const [pickedbrand, setPickedBrand] = useState<string>("");
  const [cardBrands, setCardBrands] = useState<TCardBrand[]>([]);
  const [cardCatergories, setCardCategories] = useState<TCardCategory[]>([]);
  const [pickedCategory, setPickedCategory] = useState("");
  const { data, isLoading } = useGetBrandsQuery(token);
  const [amount, setAmount] = useState<number>(0);
  const [getCategories, { data: categories, isLoading: categoriesLoading }] =
    useGetCategoriesMutation();

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
  return (
    <>
      <DashboardHead pageName="Sell Gift Cards" />
      <Balance />
      <form className="text-black flex flex-col gap-5 w-full text-lg  md:w-1/2">
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
        <button className="bg-blueX text-white py-2 rounded-md">Proceed</button>
      </form>
    </>
  );
};

export default UserSellCard;
