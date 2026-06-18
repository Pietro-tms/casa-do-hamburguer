import { Router } from "express";
import { auth, login, logout, register } from "./controller/user-controller.js";
import { authMiddleware } from "./middleware/auth-middleware.js";
import { adminMiddleware } from "./middleware/admin-middleware.js";
import {
  deleteProducts,
  getProducts,
} from "./controller/product-controller.js";
import { deleteCartItem, createCartItem, getCartItems, updateCartItemQuantity } from "./controller/cartItem-controller.js";


export const router = Router();

// Rotas de usuários
router.post("/login", login);

router.post("/register", register);

router.get("/me", authMiddleware, auth);

router.post("/logout", authMiddleware, logout);

//Rotas de Produto
router.get("/get-products", getProducts);

router.delete("/delete-product/:id", authMiddleware, adminMiddleware, deleteProducts);

// Rotas do carrinho

router.get("/get-cart-itens", authMiddleware, getCartItems);

router.post("/create-cart-item", authMiddleware, createCartItem);

router.delete("/delete-cart-item/:id", authMiddleware, deleteCartItem);

router.put("/update-cart-item/:id", authMiddleware, updateCartItemQuantity);


