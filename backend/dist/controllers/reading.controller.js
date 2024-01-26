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
exports.updateReading = void 0;
const PrismaClient_1 = require("../PrismaClient");
const updateReading = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id, value } = req.body;
    try {
        const newReading = yield PrismaClient_1.prisma.reading.update({
            where: {
                id,
            },
            data: {
                value,
            },
        });
        res.send(newReading);
    }
    catch (error) {
        if (error instanceof Error) {
            res.status(400).json({ error: error.message });
        }
    }
});
exports.updateReading = updateReading;
