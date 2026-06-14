import { ChevronLeft, Trash } from "lucide-react";

const CartItem = () => {
  return (
    <article className="flex flex-row gap-3">
      <div>
        <img
          src="./duplo-da-casa.png"
          alt="Imagem domproduto"
          className="h-[100p] w-[100px] rounded-md"
        />
      </div>
      <div className="flex h-full flex-1 flex-col items-start gap-1">
        <div className="flex flex-col gap-0">
          <h1 className="font-bold text-[#161410] uppercase">DUPLO DA CASA</h1>
          <h2 className="font-bold text-white">R$25,00</h2>
        </div>
        <div className="bg- flex flex-row gap-2">
          <button className="text-secondary cursor-pointer rounded-md bg-[#C92A0E] font-bold">
            <ChevronLeft />
          </button>
          <h1 className="font-bold">1</h1>
          <button className="text-secondary cursor-pointer rounded-md bg-[#C92A0E]">
            <ChevronLeft className="rotate-180" />
          </button>
        </div>
      </div>
      <div className="flex items-center justify-center">
        <Trash />
      </div>
    </article>
  );
};

export default CartItem;
