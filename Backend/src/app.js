//Packages
import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import "dotenv/config";

const app = express();

app.use(cors({
    origin: ["http://localhost:5173"],
    credentials: true,
}));

app.set("trust proxy", 1);
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded( { extended: true } ));

import userRouter from "./routes/user.routes.js";

app.use("/api/users", userRouter);

export default app;