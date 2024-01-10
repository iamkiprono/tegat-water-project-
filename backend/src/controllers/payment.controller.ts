import { prisma } from "../PrismaClient";
import { Request, Response } from "express";

export const getPayments = async (req:Request, res: Response)=>{
  try {
    const payments = await prisma.payment.findMany({
      include:{
        farmer:true,
      }
    })

    res.send(payments)
  } catch (error) {
    if (error instanceof Error) res.status(400).json({ error: error.message });
  }
}

export const addPayment = async (req: Request, res: Response) => {
  const { amount, paymentType, transactionId, farmerId } = req.body;

  console.log({ amount, paymentType, transactionId, farmerId });
  try {
    // check if there is an existing payment with the same transaction id
    const existingPayment = await prisma.payment.findFirst({
      where: {
        transactionId,
      },
    });
    if (existingPayment) {
      throw Error("Payment already exists");
    }

    const payment = await prisma.payment.create({
      data: {
        amount,
        paymentType,
        transactionId,
        farmerId,
      },
    });

    res.send(payment);
  } catch (error) {
    if (error instanceof Error) res.status(400).json({ error: error.message });
  }
};

export const deletePayment = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const deletedPayment = await prisma.payment.delete({
      where: {
        id: parseInt(id),
      },
    });
    res.send(deletedPayment);
  } catch (error) {
    if (error instanceof Error) res.json({ error: error.message });
  }
};
