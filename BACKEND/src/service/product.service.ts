import { getAllProducts } from "../repository/product.repository.js";

export const getProductsService = async () => {
  const products = await getAllProducts();
  return products;
}