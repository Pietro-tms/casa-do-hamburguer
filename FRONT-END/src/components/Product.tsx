import {  ShoppingCart } from "lucide-react";
import type { ProductType } from "../types/Product";
import { formatterPrice } from "../utils/formatterPrice";

const Product = ({id, name, description, price, img, category}: ProductType) => {


  return (
    <div className="flex w-full flex-row bg-primary px-3 md:w-[737px] md:p-0 gap-4">
      <img
        src={`./${img}`}
        alt="Imagem do Produto"
        className="h-21 w-25 md:h-42 md:w-50"
      />

      <div className="flex flex-col text-start gap-1 w-full">
        <h1 className="font-semibold text-sm uppercase md:text-lg">{name}</h1>
        <p className="text-xs md:text-base flex-1 font-thin text-[#848484]">
         {description}
        </p>
        <div className="flex gap-2 justify-end items-center">
            <h3 className="text-secondary font-semibold text-sm md:text-base">{formatterPrice(price)}</h3>
            <ShoppingCart className="cursor-pointer"size={18}/>
        </div>
        <div>
          
        </div>
      </div>
    </div>
  );
};

export default Product;
