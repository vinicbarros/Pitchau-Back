import express, { json } from "express";
import cors from "cors";

import userRouter from "./routers/userRouter.js";
import productsRouter from "./routers/productsRouter.js";

const app = express();

app.use(cors());
app.use(json());

app.use(userRouter);

app.use(productsRouter);

app.listen(5000);
