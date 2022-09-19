import { Router } from "express";

import {
  deleteProductsAndSaveBuy,
  getProducts,
  postProducts,
} from "../controllers/productsController.js";
import auth from "../middleware/authorizationMIddleware.js";
import postProductsMiddleware from "../middleware/postProductsMiddleware.js";

const productsRouter = Router();

productsRouter.post("/products", postProductsMiddleware, postProducts);

productsRouter.get("/products", auth, getProducts);

productsRouter.post("/checkout", auth, deleteProductsAndSaveBuy);

export default productsRouter;
