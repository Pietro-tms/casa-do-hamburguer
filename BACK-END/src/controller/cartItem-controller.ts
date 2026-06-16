import type { Request, Response } from "express";
import { prisma } from "../db.js";
import { connect } from "node:http2";

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

export const createCartItens = async (req: Request, res: Response) => {
  try {
    const { user } = req;
    const { productId } = req.body;
  
    if (!productId){
      res.status(400).json({message: "productId é obrigatório"})
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
    res.status(500).json({ message: "Erro no servidor" });
  }
};
