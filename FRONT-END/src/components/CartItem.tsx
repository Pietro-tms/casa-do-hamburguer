import { ChevronLeft, Trash } from "lucide-react";
import { formatterPrice } from "../utils/formatterPrice";
import type { ProductType } from "../types/Product";
import { useContext, useEffect} from "react";
import { CartItemContext } from "../contexts/CarItensContext";


type CartItemTypeProps = {
    id: string
    name: string
    price: number
    img: string
    quantity: number
}

const CartItem = ({ name, price, img, id, quantity }: CartItemTypeProps) => {
  const {cartItems, setCartItems} = useContext(CartItemContext)

    const getCartItems = async () => {
    try {
      const response = await fetch("http://localhost:3000/get-cart-itens", {
        credentials: "include",
      });

      if(!response.ok){
        console.log("Problema na obtenção de itens do carrinho");
        return;
      }

      const data = await response.json();
      setCartItems(data);
      console.log(cartItems)
    } catch (error) {}
  };

   const addCartItem = async () => {
    try {
      const response = await fetch("http://localhost:3000/create-cart-item", {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ productId: id }),
      });

      getCartItems();
    } catch (error) {
      console.log(error);
    }
  };

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
          <h1 className="font-bold text-sm">{quantity}</h1>
          <button className=" text-secondary cursor-pointer rounded-md bg-[#C92A0E]" onClick={() => addCartItem()}>
            <ChevronLeft className="rotate-180"  />
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
