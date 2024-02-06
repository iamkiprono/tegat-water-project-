import express from "express";
import { updateReading } from "../controllers/reading.controller";
import { insertReadings } from "../controllers/farmer.controller";

const router = express.Router();

router.put("/", updateReading);
router.post("/", insertReadings);

export default router;
