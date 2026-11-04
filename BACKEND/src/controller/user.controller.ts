import type { Request, Response } from "express";
import bcrypt from "bcrypt";
import { prisma } from "../db.js";
import jwt from "jsonwebtoken";
import { loginService, registerService } from "../service/user.service.js";
import {
  EmailAlreadyExistsError,
  InvalidCredentialsError,
  UserNotFoundError,
} from "../error/user.error.js";

export const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      res.status(400).json({ message: "Email e senha são obrigatórios" });
      return;
    }

    const token = await loginService(email, password);

    res.cookie("user", token, {
      maxAge: 18000000, // milissegundos
    });

    res.status(200).json({ message: "Login realizado com sucesso", token });
  } catch (error) {
    if (error instanceof UserNotFoundError) {
      res.status(404).json({ message: error.message });
      return;
    }
    if (error instanceof InvalidCredentialsError) {
      res.status(401).json({ message: error.message });
      return;
    }
    res.status(500).json({ message: "Erro no servidor" });
    console.log(error);
    return;
  }
};

export const register = async (req: Request, res: Response) => {
  try {
    const { name, email, password, cep } = req.body;

    if (!name.trim() || !email.trim() || !password.trim() || !cep.trim()) {
      res.status(400).json({ message: "Dado faltante" });
      return;
    }

    await registerService(name, email, password, cep);

    res.status(201).json({ message: "Usuário criado" });
  } catch (error) {
    if (error instanceof EmailAlreadyExistsError) {
      res.status(409).json({ message: error.message });
      return;
    }
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
    res.clearCookie("user").status(200).json({ message: "Usuário deslogado" });
  } catch (error) {
    res.status(500).json({ message: "Erro no servidor" });
    return;
  }
};
