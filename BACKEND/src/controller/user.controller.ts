import type { Request, Response } from "express";
import { loginService, registerService } from "../service/user.service.js";
import { loginSchema, userSchema } from "../schema/user.schema.js";
import {
  EmailAlreadyExistsError,
  InvalidCredentialsError,
  UserNotFoundError,
} from "../error/user.error.js";

export const login = async (req: Request, res: Response) => {
  try {
    const ressult = loginSchema.safeParse(req.body);

    if (!ressult.success) {
      const errors = ressult.error.issues.map((issue) => {
        return {
          message: issue.message,
          path: issue.path.join("."),
        };
      });
      res.status(400).json({ message: "Dados inválidos", errors: errors });
      return;
    }

    const token = await loginService(ressult.data.email, ressult.data.password);

    res.cookie("user", token, {
      maxAge: 18000000, // milissegundos,
      httpOnly: true,
      sameSite: "lax",
    });

    res.status(200).json({ message: "Login realizado com sucesso"});
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
    const result = userSchema.safeParse(req.body);

    if (!result.success) {
      const errors = result.error.issues.map((issue) => {
        return {
          message: issue.message,
          path: issue.path.join("."),
        };
      });
      res.status(400).json({ message: "Dados inválidos", errors: errors });
      return;
    }

    await registerService(result.data);

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
