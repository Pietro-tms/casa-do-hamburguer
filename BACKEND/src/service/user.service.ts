import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import {
  EmailAlreadyExistsError,
  InvalidCredentialsError,
  UserNotFoundError,
} from "../error/user.error.js";
import { createUser, getUserByEmail } from "../repository/user.repository.js";
import e from "express";

export const loginService = async (email: string, password: string) => {
  const user = await getUserByEmail(email);

  if (!user) {
    throw new UserNotFoundError("Usuário não encontrado");
  }

  const match = await bcrypt.compare(password, user?.password);

  if (!match) {
    throw new InvalidCredentialsError("Credenciais inválidas");
  }

  const payload = {
    id: user.id,
    name: user.name,
    email: user.email,
    cep: user.cep,
    adm: user.adm,
  };

  if (!process.env.JWT_SECRET) {
    throw new Error("JWT_SECRET não definido");
  }

  const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: "5h" });
  return token;
};

export const registerService = async ({
  name,
  email,
  password,
  cep,
}: {
  name: string;
  email: string;
  password: string;
  cep: string;
}) => {
  const user = await getUserByEmail(email);

  const hash = await bcrypt.hash(password, 10);

  if (user?.email) {
    throw new EmailAlreadyExistsError("Email já cadastrado");
  }

  const createdUser = await createUser(name, email, hash, cep);
  return createdUser;
};
