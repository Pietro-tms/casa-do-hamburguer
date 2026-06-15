import { X } from "lucide-react";
import Button from "./Button";
import type { CartItemType } from "../types/CartItem";
import { useEffect, useState } from "react";
import CartItem from "./CartItem";

const Cart = ({
  setShowCart,
}: {
  setShowCart: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const [cartItems, setCartItems] = useState<CartItemType[]>([]);

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

  useEffect(() => {
    getCartItems();
  }, [])

  return (
    <div className="bg-secondary absolute right-0 flex h-screen w-[375px] flex-col gap-6 p-5 z-1">
      <header className="flex flex-row justify-between">
        <X className="cursor-pointer" onClick={() => setShowCart(false)} />
        <h1 className="font-bold uppercase">Meu carrinho</h1>
      </header>
      <main className="flex flex-1 flex-col gap-2">
        {cartItems.map((cartItem) => {
          return(
            <CartItem name={cartItem.product.name} img={cartItem.product.img} price={cartItem.product.price} id={cartItem.id}/>
          )
        })}
      </main>

      <Button title={"Finalizar Pedido"} />
    </div>
  );
};

export default Cart;
