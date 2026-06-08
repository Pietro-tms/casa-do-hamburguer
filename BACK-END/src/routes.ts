import { Router } from "express";
import { auth, login, logout, register } from "./controller/user-controller.js";
import { authMiddleware } from "./middleware/auth-middleware.js";

export const router = Router();

router.post("/login", login);

router.post("/register", register);

router.get("/me", authMiddleware, auth);

router.post("/logout", authMiddleware, logout)
