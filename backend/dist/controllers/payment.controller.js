"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deletePayment = exports.addMultiplePayments = exports.addPayment = exports.getPayments = void 0;
const PrismaClient_1 = require("../PrismaClient");
const getPayments = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const payments = yield PrismaClient_1.prisma.payment.findMany({
            include: {
                farmer: true,
            },
        });
        res.send(payments);
    }
    catch (error) {
        if (error instanceof Error)
            res.status(400).json({ error: error.message });
    }
});
exports.getPayments = getPayments;
const addPayment = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { amount, paymentType, transactionId, farmerId } = req.body;
    console.log({ amount, paymentType, transactionId, farmerId });
    try {
        // check if there is an existing payment with the same transaction id
        const existingPayment = yield PrismaClient_1.prisma.payment.findFirst({
            where: {
                transactionId,
            },
        });
        if (existingPayment) {
            throw Error("Payment already exists");
        }
        const payment = yield PrismaClient_1.prisma.payment.create({
            data: {
                amount,
                paymentType,
                transactionId,
                farmerId,
            },
        });
        res.send(payment);
    }
    catch (error) {
        if (error instanceof Error)
            res.status(400).json({ error: error.message });
    }
});
exports.addPayment = addPayment;
//multiple payments addition
//post request
const addMultiplePayments = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { payments } = req.body;
    try {
        const newPayments = yield PrismaClient_1.prisma.payment.createMany({
            data: payments,
        });
        res.status(201).json(newPayments);
    }
    catch (error) {
        if (error instanceof Error)
            res.status(400).json({ error: error.message });
    }
});
exports.addMultiplePayments = addMultiplePayments;
const deletePayment = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const deletedPayment = yield PrismaClient_1.prisma.payment.delete({
            where: {
                id: parseInt(id),
            },
        });
        res.send(deletedPayment);
    }
    catch (error) {
        if (error instanceof Error)
            res.json({ error: error.message });
    }
});
exports.deletePayment = deletePayment;
