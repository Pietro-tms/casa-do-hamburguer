import type { Request, Response } from "express";
import { prisma } from "../db.js";

export const getCartItems = async (req: Request, res: Response) => {
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

export const createCartItem = async (req: Request, res: Response) => {
  try {
    const { user } = req;
    const { productId } = req.body;

    if (!productId) {
      res.status(400).json({ message: "productId é obrigatório" });
      return;
    }

    const existingItem = await prisma.cartItem.findFirst({
      where: { productId, userId: user.id },
    });

    let cartItem;

    if (existingItem) {
      cartItem = await prisma.cartItem.update({
        where: { id: existingItem.id },
        data: { quantity: { increment: 1 } },
      });
    } else {
      cartItem = await prisma.cartItem.create({
        data: {
          product: { connect: { id: productId } },
          user: { connect: { id: user.id } },
        },
      });
    }

    const StatusCode = cartItem.quantity === 1 ? 201 : 200;

    res.status(StatusCode).json(cartItem);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Erro no servidor" });
  }
};

export const deleteCartItem = async (
  req: Request<{ id: string }>,
  res: Response,
) => {
  try {
    const { id } = req.params;

    if (!id) {
      res.status(400).json({ message: "ID não encontrado" });
      return;
    }

    await prisma.cartItem.delete({
      where: {
        id,
      },
    });

    res.status(200).json({ mesage: "CartItem excluído" });
  } catch (error: any) {
    if (error.code === "P2025") {
      res.status(404).json({ message: "CartItem não encontrado" });
      return;
    }
    res.status(500).json({ message: "Erro no servidor" });
    return;
  }
};

export const updateCartItemQuantity = async (
  req: Request<{ id: string }>,
  res: Response,
) => {
  try {
    const { id } = req.params;
    const { quantity } = req.body;

    if (quantity <= 0) {
      res.status(400).json({ message: "Quantidade inválida" });
      return;
    }

    const cartItem = await prisma.cartItem.update({
      where: { id },
      data: { quantity },
    });

    res.status(200).json({ message: "Quantity do cartItem alterada" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Erro no servidor" });
    return;
  }
};
