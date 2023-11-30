
import { Router } from "express";
import { addCart } from "../Controllers/User.controllers.js";


const router = Router()

router.post("/cart",addCart)


export default router