import { Router } from "express";
import {
  deleteUserProductCart,
  getCart,
  postCart,
  postSignIn,
  postSignUp,
} from "../controllers/userController.js";
import auth from "../middleware/authorizationMIddleware.js";
import {
  signInMiddleware,
  signUpMiddleware,
} from "../middleware/loginMiddleware.js";

const userRouter = Router();

userRouter.post("/sign-in", signInMiddleware, postSignIn);

userRouter.post("/sign-up", signUpMiddleware, postSignUp);

userRouter.post("/cart", auth, postCart);

userRouter.get("/cart", auth, getCart);

userRouter.delete("/cart/:id", auth, deleteUserProductCart);

export default userRouter;
