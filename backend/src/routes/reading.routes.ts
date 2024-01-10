import express from "express";
import { updateReading } from "../controllers/reading.controller";

const router = express.Router();

router.put("/", updateReading);

export default router;
