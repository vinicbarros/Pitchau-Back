import express, { json } from "express";
import cors from "cors";
import dotenv from "dotenv";

import userRouter from "./routers/userRouter.js";
import productsRouter from "./routers/productsRouter.js";
dotenv.config();

const app = express();

app.use(cors());
app.use(json());

app.use(userRouter);

app.use(productsRouter);

app.listen(process.env.PORT, () => {
  console.log(`Listening on port ${process.env.PORT}`);
});
