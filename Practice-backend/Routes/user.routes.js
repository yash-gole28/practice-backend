
import { Router } from "express";
import { addCart, deleteCart, getCart } from "../Controllers/User.controllers.js";


const router = Router()

router.post("/cart",addCart)
router.post("/get-cart",getCart)
router.post('/delete-cart',deleteCart)


export default router