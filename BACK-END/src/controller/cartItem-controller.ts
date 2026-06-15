import type { Request, Response } from "express";
import { prisma } from "../db.js";

export const getCartItens = async (req: Request, res: Response) => {
  try {
    const { id } = req.user;

    const carItens = await prisma.cartItem.findMany({
      where: { userId: id },
      include: { product: true },
    });

    res.status(200).json(carItens);
  } catch (error) {
    res.status(500).json({ message: "Erro no servidor" });
  }
};
