import { Request, Response } from "express";
import { prisma } from "../PrismaClient";

export const addBalance = async (req: Request, res: Response) => {
  const { balance } = req.body;
  try {
    const prevBalnce = await prisma.prev_balance.createMany({
      data: balance,
    });
    res.status(201).json(prevBalnce);
  } catch (error) {
    if (error instanceof Error) res.status(400).json({ error: error.message });
  }
};
