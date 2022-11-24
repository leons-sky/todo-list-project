import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import { User } from "../db/models";
import jsonwebtoken from "jsonwebtoken";
import { COOKIE } from "./constants.js";
import { itemsRouter, listsRouter, usersRouter } from "./routes";

const app = express();

app.use(
	cors({
		origin: true,
		credentials: true,
	})
);
app.use(cookieParser());
app.use(express.json());

app.use("/items", itemsRouter);
app.use("/lists", listsRouter);
app.use("/users", usersRouter);

export default app;
