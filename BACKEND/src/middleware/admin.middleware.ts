import type { NextFunction, Request, Response } from "express";

export const adminMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const { user } = req;

  if (!user.adm) {
    res.status(403).json({ message: "Usuário não autorizado" });
    return;
  }
  next();
};
