"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const reading_controller_1 = require("../controllers/reading.controller");
const router = express_1.default.Router();
router.put("/", reading_controller_1.updateReading);
exports.default = router;
