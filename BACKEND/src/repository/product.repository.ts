import { prisma } from "../db.js";

export const getAllProducts = async () => {
  const products = await prisma.product.findMany();
  return products;
}

export const deleteProductById = async (id: string) => {
  await prisma.product.delete({
    where: {
      id: id,
    },
  });
}