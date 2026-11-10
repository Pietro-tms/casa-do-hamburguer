import { deleteProductById, getAllProducts } from "../repository/product.repository.js";

export const getProductsService = async () => {
  const products = await getAllProducts();
  return products;
}

export const deleteProductService = async (id: string) => {
    await deleteProductById(id);
}