import { useEffect, useState } from "react";
import NavBar from "../components/NavBar";
import Product from "../components/Product";
import type { ProductType } from "../types/Product";

const Home = () => {
  const [category, setCategory] = useState("Hamburguers");
  const [products, setProducts] = useState<ProductType[]>([]);

  const getProducts = async () => {
    const response = await fetch("http://localhost:3000/get-products");

    const data = await response.json();
    setProducts(data);
  };

  const filteredProducts = products.filter((product) => {
    return product.category === category;
  });

  console.log(filteredProducts)

  useEffect(() => {
    getProducts();
  }, []);

  return (
    <div className="bg-primary mt-2 flex h-full flex-col items-center text-center text-white">
      <NavBar
        category={category}
        setCategory={setCategory}
        categories={["Hamburguers", "Bebidas", "Porções"]}
      />
      <div className="text mt-2 mb-1 flex w-full px-3 md:w-[737px] md:px-0">
        <h1 className="text-secondary text-lg font-semibold uppercase">
          {category}
        </h1>
      </div>
      <main className="flex flex-col gap-4">
        {filteredProducts.map((product) => {
          return (
            <Product
              id={product.id}
              name={product.name}
              description={product.description}
              price={product.price}
              img={product.img}
              category={product.category}
              key={product.id}
            />
          );
        })}
        {filteredProducts.length === 0 && <p>Não há produtos dessa categoria</p>}
      </main>
    </div>
  );
};

export default Home;
