import express, { type Request, type Response } from "express";
import { conection } from "./src/db.js";
import { router } from "./src/routes.js";
import cors from "cors";
import cookieParser from "cookie-parser";

export const app = express();

app.use(express.json());
app.use(cookieParser())
app.use(cors({
  origin: "http://localhost:5173",
  credentials: true
}));
app.use(router);

conection();

app.listen(3000, () => {
  console.log("Servidor rodando na porta 3000");
});
