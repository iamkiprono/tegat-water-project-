import { Request, Response } from "express";
import { prisma } from "../PrismaClient";
import { decodeJwt } from "../lib/utils";

export const coopController = async (req: Request, res: Response) => {
  const jwt = req.headers.authorization;
  console.log(req.body)
  try {
    const token = jwt?.split(" ")[1];
    if (!token) {
      throw Error("No token provided");
    }
    const decoded = decodeJwt(token);
    // @ts-ignore
    if(decoded.name !== 'coop'){
        throw Error("Not authorized to access this route")
    }
    res.send(decoded);
    // const bankPayment = await prisma.payment.create(
    //   {
    //     data: {

    //     }
    //   }
    // )
  } catch (error) {
    if (error instanceof Error) res.status(400).json({ error: error.message });
  }
};
