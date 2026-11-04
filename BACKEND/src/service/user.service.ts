import { prisma } from "../db.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { InvalidCredentialsError, UserNotFoundError } from "../error/error.js";

export const loginService = async (email: string, password: string) => {
    const user = await prisma.user.findFirst({
      where: { email },
    });

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
      adm: user.adm
    };

    if (!process.env.JWT_SECRET) {
      throw new Error("JWT_SECRET não definido");
    }

    const token = jwt.sign(payload, process.env.JWT_SECRET);
    return token;
}
