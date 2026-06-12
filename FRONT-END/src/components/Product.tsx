import { ShoppingCart } from "lucide-react";
import type { ProductType } from "../types/Product";
import { formatterPrice } from "../utils/formatterPrice";
import { UserContext } from "../contexts/UserContext";
import { useContext } from "react";

const Product = ({
  id,
  name,
  description,
  price,
  img,
  category,
}: ProductType) => {
  const { user } = useContext(UserContext);

  return (
    <div className="bg-primary flex w-full flex-row gap-4 px-3 md:w-[737px] md:p-0">
      <img
        src={`./${img}`}
        alt="Imagem do Produto"
        className="h-21 w-25 md:h-42 md:w-50"
      />

      <div className="flex w-full flex-col gap-1 text-start">
        <div className="flex items-center justify-between">
          <h1 className="text-sm font-semibold uppercase md:text-lg">{name}</h1>
          {user?.adm && (
            <button
              className="flex cursor-pointer items-center justify-center rounded-md border border-red-500 px-1 text-xs text-red-500 uppercase"
              onClick={() => alert("Deletou")}
            >
              Deletar
            </button>
          )}
        </div>
        <p className="flex-1 text-xs font-thin text-[#848484] md:text-base">
          {description}
        </p>
        <div className="flex items-center justify-end gap-2">
          <h3 className="text-secondary text-sm font-semibold md:text-base">
            {formatterPrice(price)}
          </h3>
          <ShoppingCart className="cursor-pointer" size={18} />
        </div>
        <div></div>
      </div>
    </div>
  );
};

export default Product;
