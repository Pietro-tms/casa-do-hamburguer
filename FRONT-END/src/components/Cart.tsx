import { X } from "lucide-react";
import Button from "./Button";
import CartItem from "./CartItem";

const Cart = ({
  setShowCart,
}: {
  setShowCart: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  return (
    <div className="bg-secondary absolute right-0 flex h-screen w-[375px] flex-col gap-6 p-5">
      <header className="flex flex-row justify-between">
        <X className="cursor-pointer" onClick={() => setShowCart(false)} />
        <h1 className="font-bold uppercase">Meu carrinho</h1>
      </header>
      <main className="flex-1 gap-2 flex flex-col">
       <CartItem/>
       <CartItem/>
      </main>

      <Button title={"Finalizar Pedido"} />
    </div>
  );
};

export default Cart;
