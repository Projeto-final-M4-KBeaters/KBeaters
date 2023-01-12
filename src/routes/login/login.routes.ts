import { Router } from "express";
import { createloginController } from "../../controllers/login/login.controller";


const loginRoutes = Router()


loginRoutes.post("", createloginController)


export default loginRoutes;