import { ChevronLeft, Trash } from "lucide-react";
import { formatterPrice } from "../utils/formatterPrice";
import type { ProductType } from "../types/Product";
import { useContext, useEffect } from "react";
import { CartItemContext } from "../contexts/CarItensContext";

type CartItemTypeProps = {
  id: string;
  productId: string;
  name: string;
  price: number;
  img: string;
  quantity: number;
};

const CartItem = ({
  name,
  price,
  img,
  id,
  quantity,
  productId,
}: CartItemTypeProps) => {
  const { cartItems, setCartItems } = useContext(CartItemContext);

  const getCartItems = async () => {
    try {
      const response = await fetch("http://localhost:3000/get-cart-itens", {
        credentials: "include",
      });

      if (!response.ok) {
        console.log("Problema na obtenção de itens do carrinho");
        return;
      }

      const data = await response.json();
      setCartItems(data);
      console.log(cartItems);
    } catch (error) {}
  };

  const addCartItem = async () => {
    try {
      const response = await fetch("http://localhost:3000/create-cart-item", {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ productId }),
      });

      getCartItems();
    } catch (error) {
      console.log(error);
    }
  };

  const deleteCartItem = async (id: string) => {
    try {
      const response = await fetch(
        `http://localhost:3000/delete-cart-item/${id}`,
        {
          method: "DELETE",
          credentials: "include",
        },
      );

      if (!response) {
        console.log("erro ao deletar");
        return;
      }
      getCartItems();
    } catch (error) {
      console.log(error);
    }
  };

  const updateCartItem = async (id: string, quantity: number) => {
    try {
      if (quantity <= 0) {
        return;
      }
      const response = await fetch(
        `http://localhost:3000/update-cart-item/${id}`,
        {
          method: "PUT",
          credentials: "include",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ quantity }),
        },
      );

      if (!response) {
        console.log("erro ao deletar");
        return;
      }
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
      <div className="flex h-full flex-1 flex-col items-start justify-between gap-1">
        <div className="flex flex-col gap-0">
          <h1 className="text-md font-bold text-[#161410] uppercase">{name}</h1>
          <h2 className="text-md font-semibold text-[#848484]">
            {formatterPrice(price)}
          </h2>
        </div>
        <div className="bg- flex flex-row gap-2">
          <button
            className="text-secondary cursor-pointer rounded-md bg-[#C92A0E] font-bold"
            onClick={() => updateCartItem(id, quantity - 1)}
          >
            <ChevronLeft />
          </button>
          <h1 className="text-sm font-bold">{quantity}</h1>
          <button
            className="text-secondary cursor-pointer rounded-md bg-[#C92A0E]"
            onClick={() => addCartItem()}
          >
            <ChevronLeft className="rotate-180" />
          </button>
        </div>
      </div>
      <button
        className="flex items-center justify-center"
        onClick={() => deleteCartItem(id)}
      >
        <Trash className="cursor-pointer" />
      </button>
    </article>
  );
};

export default CartItem;
