import express from 'express'
import { addMultiplePayments, addPayment, deletePayment, getPayments } from '../controllers/payment.controller'


const router = express.Router()


router.post("/", addPayment)
router.post("/multiple", addMultiplePayments)
router.get("/", getPayments)

router.delete("/:id", deletePayment)

export default router