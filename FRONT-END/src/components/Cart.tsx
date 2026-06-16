import { X } from "lucide-react";
import Button from "./Button";
import CartItem from "./CartItem";
import { useContext, useEffect} from "react";
import { CartItemContext } from "../contexts/CarItensContext";

const Cart = ({
  setShowCart,
}: {
  setShowCart: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
 const {cartItems} = useContext(CartItemContext)

  return (
    <div className="bg-secondary absolute right-0 flex h-screen w-[375px] flex-col gap-6 p-5 z-1">
      <header className="flex flex-row justify-between">
        <X className="cursor-pointer" onClick={() => setShowCart(false)} />
        <h1 className="font-bold uppercase">Meu carrinho</h1>
      </header>
      <main className="flex flex-1 flex-col gap-2">
        {cartItems.map((cartItem) => {
          return(
            <CartItem name={cartItem.product.name} img={cartItem.product.img} price={cartItem.product.price} id={cartItem.product.id} quantity={cartItem.quantity}/>
          )
        })}
      </main>

      <Button title={"Finalizar Pedido"} />
    </div>
  );
};

export default Cart;
