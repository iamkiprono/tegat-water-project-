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
exports.updateReading = exports.getFarmersBills = exports.getFarmers = exports.createFarmer = void 0;
const Calculation_1 = require("../Calculation");
const PrismaClient_1 = require("../PrismaClient");
const createFarmer = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, plotNo } = req.body;
    try {
        const newFarmer = yield PrismaClient_1.prisma.farmer.create({
            data: {
                name,
                plotNo,
            },
        });
        const yearReading = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map((read, i) => {
            return {
                farmerId: newFarmer.id,
                month: i + 1,
                year: 2024,
                value: 0,
            };
        });
        const farmerReading = yield PrismaClient_1.prisma.reading.createMany({
            data: yearReading,
        });
        res.send({ newFarmer, farmerReading });
    }
    catch (error) {
        if (error instanceof Error) {
            res.status(400).json({ error: error.message });
        }
    }
});
exports.createFarmer = createFarmer;
const getFarmers = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const farmer = yield PrismaClient_1.prisma.farmer.findMany({
            include: {
                readings: {
                    orderBy: {
                        month: "asc",
                    },
                },
                payments: true,
            },
        });
        res.send(farmer);
    }
    catch (error) {
        if (error instanceof Error) {
            res.status(400).json({ error: error.message });
        }
    }
});
exports.getFarmers = getFarmers;
const getFarmersBills = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const farmer = yield PrismaClient_1.prisma.farmer.findMany({
            include: {
                readings: {
                    orderBy: {
                        month: "asc",
                    },
                },
                payments: true,
            },
        });
        // months and standing charges
        const currentMonth = 4;
        const monthToCheck = 1;
        const Feb = 2;
        const Mar = 3;
        const Apr = 4;
        const monthsWithCharges = [
            {
                month: "January",
                standingCharge: 500,
            },
            {
                month: "February",
                standingCharge: 500,
            },
            {
                month: "March",
                standingCharge: 500,
            },
            {
                month: "April",
                standingCharge: 500,
            },
        ];
        const billsJan = farmer.map((farmer) => {
            if (currentMonth < monthToCheck) {
                return (0, Calculation_1.calculateBlank)(farmer.name, farmer.plotNo, farmer.readings[Mar - 1].value, Mar - 2 < 0 ? 0 : farmer.readings[Mar - 2].value, monthsWithCharges[Mar - 1].standingCharge, farmer.payments, monthsWithCharges[Mar - 1].month);
            }
            return (0, Calculation_1.calculate)(farmer.name, farmer.id, farmer.plotNo, farmer.readings[monthToCheck - 1].value, farmer.readings[monthToCheck - 1].id, monthToCheck - 2 < 0 ? 0 : farmer.readings[monthToCheck - 2].value, monthsWithCharges[monthToCheck - 1].standingCharge, farmer.payments, monthsWithCharges[monthToCheck - 1].month);
        });
        const billsFeb = farmer.map((farmer) => {
            if (currentMonth < Feb) {
                return (0, Calculation_1.calculateBlank)(farmer.name, farmer.plotNo, farmer.readings[Mar - 1].value, Mar - 2 < 0 ? 0 : farmer.readings[Mar - 2].value, monthsWithCharges[Mar - 1].standingCharge, farmer.payments, monthsWithCharges[Mar - 1].month);
            }
            return (0, Calculation_1.calculate)(farmer.name, farmer.id, farmer.plotNo, farmer.readings[Feb - 1].value, farmer.readings[Feb - 1].id, Feb - 2 < 0 ? 0 : farmer.readings[Feb - 2].value, monthsWithCharges[Feb - 1].standingCharge, farmer.payments, monthsWithCharges[Feb - 1].month);
        });
        const billsMarch = farmer.map((farmer) => {
            if (currentMonth < Mar) {
                return (0, Calculation_1.calculateBlank)(farmer.name, farmer.plotNo, farmer.readings[Mar - 1].value, Mar - 2 < 0 ? 0 : farmer.readings[Mar - 2].value, monthsWithCharges[Mar - 1].standingCharge, farmer.payments, monthsWithCharges[Mar - 1].month);
            }
            return (0, Calculation_1.calculate)(farmer.name, farmer.id, farmer.plotNo, farmer.readings[Mar - 1].value, farmer.readings[Mar - 1].id, Mar - 2 < 0 ? 0 : farmer.readings[Mar - 2].value, monthsWithCharges[Mar - 1].standingCharge, farmer.payments, monthsWithCharges[Mar - 1].month);
        });
        const billsApril = farmer.map((farmer) => {
            if (currentMonth < Apr) {
                return (0, Calculation_1.calculateBlank)(farmer.name, farmer.plotNo, farmer.readings[Apr - 1].value, Apr - 2 < 0 ? 0 : farmer.readings[Apr - 2].value, monthsWithCharges[Apr - 1].standingCharge, farmer.payments, monthsWithCharges[Apr - 1].month);
            }
            return (0, Calculation_1.calculate)(farmer.name, farmer.id, farmer.plotNo, farmer.readings[Apr - 1].value, farmer.readings[Apr - 1].id, Apr - 2 < 0 ? 0 : farmer.readings[Apr - 2].value, monthsWithCharges[Apr - 1].standingCharge, farmer.payments, monthsWithCharges[Apr - 1].month);
        });
        res.send([...billsJan, ...billsFeb, ...billsMarch, ...billsApril]);
    }
    catch (error) {
        if (error instanceof Error) {
            res.status(400).json({ error: error.message });
        }
    }
});
exports.getFarmersBills = getFarmersBills;
const updateReading = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const updateRead = yield PrismaClient_1.prisma.reading.update({
            where: {
                id: 3,
            },
            data: {
                value: 2,
            },
        });
        res.send(updateRead);
    }
    catch (error) {
        if (error instanceof Error) {
            res.status(400).json({ error: error.message });
        }
    }
});
exports.updateReading = updateReading;
