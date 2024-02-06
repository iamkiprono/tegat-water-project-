import express from "express";
import { addBalance } from "../controllers/balance.controller";

const router = express.Router();

router.post("/", addBalance);

export default router;
