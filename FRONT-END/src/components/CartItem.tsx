import { ChevronLeft, Trash } from "lucide-react";
import { formatterPrice } from "../utils/formatterPrice";
import type { ProductType } from "../types/Product";

type CartItemProps = {
    id: string
    name: string
    price: number
    img: string
}

const CartItem = ({ name, price, img, id }: CartItemProps) => {
  return (
    <article className="flex flex-row gap-3">
      <div>
        <img
          src={img}
          alt="Imagem domproduto"
          className="h-[100p] w-[100px] rounded-md"
        />
      </div>
      <div className="flex h-full flex-1 flex-col justify-between items-start gap-1">
        <div className="flex flex-col gap-0">
          <h1 className="text-md font-bold text-[#161410] uppercase">{name}</h1>
          <h2 className="text-md font-semibold text-[#848484]">{formatterPrice(price)}</h2>
        </div>
        <div className="bg- flex flex-row gap-2">
          <button className="text-secondary cursor-pointer rounded-md bg-[#C92A0E] font-bold">
            <ChevronLeft />
          </button>
          <h1 className="font-bold text-sm">1</h1>
          <button className=" text-secondary cursor-pointer rounded-md bg-[#C92A0E]">
            <ChevronLeft className="rotate-180" />
          </button>
        </div>
      </div>
      <button className="flex items-center justify-center ">
        <Trash className="cursor-pointer"/>
      </button>
    </article>
  );
};

export default CartItem;
