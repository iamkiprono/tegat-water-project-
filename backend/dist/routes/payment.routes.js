"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const payment_controller_1 = require("../controllers/payment.controller");
const router = express_1.default.Router();
router.post("/", payment_controller_1.addPayment);
router.post("/multiple", payment_controller_1.addMultiplePayments);
router.get("/", payment_controller_1.getPayments);
router.delete("/:id", payment_controller_1.deletePayment);
exports.default = router;
