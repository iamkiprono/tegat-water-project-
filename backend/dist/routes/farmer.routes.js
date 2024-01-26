"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const farmer_controller_1 = require("../controllers/farmer.controller");
const router = express_1.default.Router();
router.put('/', farmer_controller_1.updateReading);
router.get('/', farmer_controller_1.getFarmers);
router.get('/bills', farmer_controller_1.getFarmersBills);
router.post('/', farmer_controller_1.createFarmer);
exports.default = router;
