import type { Request, Response } from "express";
import { prisma } from "../db.js";

export const getProducts = async (req: Request, res: Response) => {
  try {
    const products = await prisma.product.findMany();

    if (products.length === 0) {
      res.status(404).json({ message: "Não foram encontrados produtos" });
      return;
    }

    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ message: "Erro no servidor" });
    return;
  }
};

export const deleteProducts = async (
  req: Request<{ id: string }>,
  res: Response,
) => {
  try {
    const { id } = req.params;

    if (!id) {
      res.status(400).json({ message: "id não encontrado" });
      return;
    }

    await prisma.product.delete({
      where: {
        id: id,
      },
    });

    res.status(200).json({ message: "Produto excluido" });
  } catch (error: any) {
    if (error.code === "P2025") {
      res.status(400).json({ message: "Produto não encontrado" });
      return;
    }
    res.status(500).json({ message: "Erro no servidor" });
    return;
  }
};
