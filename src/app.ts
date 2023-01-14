import "express-async-errors";

import "reflect-metadata";
import express from "express";
import { handleError } from "./errors";
import { userRoutes, loginRoutes, genresRoutes, adminRoutes } from "./routes";



const app = express()

app.use(express.json())

app.use("/admim", adminRoutes)
app.use("/users", userRoutes)
app.use("/login", loginRoutes)
app.use("/genres", genresRoutes)

app.use(handleError)

export default app;