import { prisma } from "../db.js";

export const getUserByEmail = async (email: string) => {
  const user = await prisma.user.findUnique({
    where: { email },
  });
  return user;
};

export const createUser = async (
  name: string,
  email: string,
  password: string,
  cep: string,
) => {
  const user = await prisma.user.create({
    data: {
      name,
      email,
      password,
      cep,
    },
  });
  return user;
};
