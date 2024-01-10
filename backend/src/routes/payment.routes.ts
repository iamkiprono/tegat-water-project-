import express from 'express'
import { addPayment, deletePayment, getPayments } from '../controllers/payment.controller'


const router = express.Router()


router.post("/", addPayment)
router.get("/", getPayments)
router.delete("/:id", deletePayment)

export default router