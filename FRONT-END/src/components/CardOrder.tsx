import { Calendar, Clock, User } from "lucide-react";
type TypeCardOrderProps = {
  id: number;
  name: string;
  date: string;
  orderTime: string;
  deliveredTime?: string;
  total: number;
};

const CardOrder = ({
  id,
  name,
  date,
  orderTime,
  deliveredTime,
  total,
}: TypeCardOrderProps) => {
  return (
    <article className="bg-secondary rounded-md p-2 text-[#32343E]">
      <header className="flex justify-between">
        <h1>#{id}</h1>
        <select name="" id="" className="cursor-pointer font-bold">
          <option value="" defaultChecked disabled>
            Pendente
          </option>
          <option value="">Retirado</option>
          <option value="">Cancelado</option>
        </select>
      </header>

      <div className="mt-2 flex flex-col gap-1.5">
        <div className="flex flex-row items-center gap-2">
          <User size={16} />
          <p className="text-sm">{name}</p>
        </div>

        <div className="flex flex-row items-center gap-2">
          <Calendar size={16} />
          <p className="text-sm">{date}</p>
        </div>

        <div className="flex flex-row gap-4">
          <div className="flex items-center gap-2">
            <Clock size={16} />
            <p>{orderTime}</p>
          </div>

          <div className="flex items-center gap-2">
            <Clock size={16} />
            <p>{deliveredTime ? deliveredTime : "-"}</p>
          </div>
        </div>

        <div className="mt-2 h-[1.5px] w-full bg-[#32343E]"></div>

        <footer className="flex justify-end font-bold">
          <p>R${total}</p>
        </footer>
      </div>
    </article>
  );
};

export default CardOrder;
