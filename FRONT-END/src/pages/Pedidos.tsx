import { useState } from "react";
import CardPedido from "../components/CardPedido";
import NavBar from "../components/NavBar";

const Pedidos = () => {
  const [category, setCategory] = useState("Pendentes");
  return (
    <div className="bg-primary mt-2 flex h-full flex-col items-center text-center text-white">
      <NavBar category={category} setCategory={setCategory} categories={["Pendentes", "Retirados", "Cancelados"]} />
      <main className="bg-primary my-3 grid h-full w-full grid-cols-1 gap-3 px-3 md:w-[737px] md:grid-cols-3 md:p-0">
        <CardPedido id={1} name="Pietro" date="21/02/2026" orderTime="22:00" total={200.95}/>
        <CardPedido id={2} name="Pietro" date="21/02/2026" orderTime="22:00" total={200.95}/>
      </main>
    </div>
  );
};

export default Pedidos;
