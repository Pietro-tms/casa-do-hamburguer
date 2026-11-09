import { ShoppingCart } from "lucide-react";
import type { ProductTypeProps } from "../types/Product";
import { formatterPrice } from "../utils/formatterPrice";
import { UserContext } from "../contexts/UserContext";
import { useContext } from "react";
import Button from "./Button";

const Product = ({
  id,
  name,
  description,
  price,
  img,
  category,
  getProducts,
  getCartItems,
}: ProductTypeProps) => {
  const { user } = useContext(UserContext);

  const handleDeleteProduct = async (id: string) => {
    try {
      if (!id) {
        console.log("ID não enviado");
        return;
      }
      const response = await fetch(
        `http://localhost:3000/delete-product/${id}`,
        {
          method: "DELETE",
          credentials: "include",
        },
      );

      if (!response.ok) {
        console.log("Erro na exclusão do produto");
        return;
      }

      getProducts();
    } catch (error) {
      console.log(error);
    }
  };

  const addCartItem = async () => {
    try {
      await fetch("http://localhost:3000/create-cart-item", {
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
    <div className="bg-surface text-content-inverse flex w-full flex-row gap-4 px-3 md:w-[737px] md:p-2 rounded-md">
      <img
        src={`./${img}`}
        alt="Imagem do Produto"
        className="h-21 w-25 md:h-41 md:w-50 rounded-md"
      />

      <div className="flex w-full flex-col gap-1 text-start">
        <div className="flex items-center justify-between">
          <h1 className="text-md font-semibold uppercase md:text-lg">
            {name}
          </h1>
          {user?.adm && (
            <button
              className="flex cursor-pointer items-center justify-center rounded-md border border-danger bg-surface px-1 text-xs text-danger uppercase"
              onClick={() => handleDeleteProduct(id)}
            >
              Deletar
            </button>
          )}
        </div>
        <p className="flex-1 text-xs font-thin text-content-muted md:text-base">
          {description}
        </p>
        <div className="flex items-center justify-end gap-2">
          <h3 className="text-secondary text-sm font-semibold md:text-base">
            {formatterPrice(price)}
          </h3>

          <ShoppingCart
            className="cursor-pointer"
            size={18}
            onClick={() => addCartItem()}
          />
        </div>
        <div></div>
      </div>
    </div>
  );
};

export default Product;
