import { prisma } from "../db.js";

export const getAllProducts = async () => {
  const products = await prisma.product.findMany();
  return products;
}