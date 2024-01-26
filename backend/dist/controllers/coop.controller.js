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
exports.coopController = void 0;
const utils_1 = require("../lib/utils");
const coopController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const jwt = req.headers.authorization;
    console.log(req.body);
    try {
        const token = jwt === null || jwt === void 0 ? void 0 : jwt.split(" ")[1];
        if (!token) {
            throw Error("No token provided");
        }
        const decoded = (0, utils_1.decodeJwt)(token);
        // @ts-ignore
        if (decoded.name !== 'coop') {
            throw Error("Not authorized to access this route");
        }
        res.send(decoded);
        // const bankPayment = await prisma.payment.create(
        //   {
        //     data: {
        //     }
        //   }
        // )
    }
    catch (error) {
        if (error instanceof Error)
            res.status(400).json({ error: error.message });
    }
});
exports.coopController = coopController;
