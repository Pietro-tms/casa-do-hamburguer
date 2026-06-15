import type { Request, Response } from "express";
import bcrypt from "bcrypt";
import { prisma } from "../db.js";
import jwt from "jsonwebtoken";

export const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      res.status(400).json({ message: "Email e senha são obrigatórios" });
      return;
    }

    const user = await prisma.user.findFirst({
      where: { email },
    });

    if (!user) {
      res.status(404).json({ message: "Usuário não encontrado" });
      return;
    }

    const match = await bcrypt.compare(password, user?.password);

    if (!match) {
      res.status(401).json({ message: "Senha incorreta" });
      return;
    }

    const userInfos = {
      id: user.id,
      name: user.name,
      email: user.email,
      cep: user.cep,
      adm: user.adm
    };

    if (!process.env.JWT_SECRET) {
      return;
    }

    const token = jwt.sign(userInfos, process.env.JWT_SECRET);

    res.cookie("user", token, {
      maxAge: 18000000, // milissegundos
    });

    res.status(200).json(userInfos);
  } catch (error) {
    res.status(500).json({ message: "Erro no servidor" });
    return;
  }
};

export const register = async (req: Request, res: Response) => {
  try {
    const { name, email, password, cep } = req.body;

    if (!name.trim() || !email.trim() || !password.trim() ||!cep.trim()) {
      res.status(400).json({ message: "Dado faltante" });
      return;
    }

    const hash = await bcrypt.hash(password, 10);

    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (user?.email) {
      res.status(409).json({ message: "Email já cadastrado" });
      return;
    }

    await prisma.user.create({
      data: {
        name,
        email,
        password: hash,
        cep,
      },
    });

    res.status(201).json({ message: "Usuário criado" });
  } catch (error) {
    res.status(500).json({ message: "Erro no servidor" });
    return;
  }
};

export const auth = async (req: Request, res: Response) => {
  try {
    const { user } = req;

    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: "Erro no servidor" });
    return;
  }
};

export const logout = async (req: Request, res: Response) => {
  try {  

       res.clearCookie("user").status(200).json({message: "Usuário deslogado"})
   
  } catch (error) {
    res.status(500).json({ message: "Erro no servidor" });
    return;
  }

}
