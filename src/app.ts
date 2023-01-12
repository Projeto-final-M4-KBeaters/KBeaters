import "reflect-metadata"
import express from "express"
import 'express-async-errors'
import userRoutes from "./routes/users/users.routes"
import { handleError } from "./errors"
import { loginRoutes } from "./routes"



const app = express()

app.use(express.json())

app.use('/users', userRoutes)
app.use('/login', loginRoutes)

app.use(handleError)
export default app