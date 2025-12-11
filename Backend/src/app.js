//Packages
import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import 'dotenv/config.js';

const app = express();

app.use(cors({
    origin: "https://chart-up.vercel.app",
    credentials: true,
}));

app.set("trust proxy", 1);
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded( { extended: true } ));

import userRouter from "./routes/user.routes.js";

app.use("/api/users", userRouter);

export default app;