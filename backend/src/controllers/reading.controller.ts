import { prisma } from "../PrismaClient";
import { Request, Response } from "express";

export const updateReading = async (req: Request, res: Response) => {
  const { id, value } = req.body;
  try {
    const newReading = await prisma.reading.update({
      where: {
        id,
      },
      data: {
        value,
      },
    });

    res.send(newReading)
  } catch (error) {
    if (error instanceof Error) {
      res.status(400).json({ error: error.message });
    }
  }
};
