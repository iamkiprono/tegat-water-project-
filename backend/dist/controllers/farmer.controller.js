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
exports.updateReading = exports.getFarmersBills = exports.getFarmers = exports.createManyFarmers = exports.insertReadings = exports.createFarmer = void 0;
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
        const yearReading2023 = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map((read, i) => {
            return {
                farmerId: newFarmer.id,
                month: i + 1,
                year: 2023,
                value: 0,
            };
        });
        const yearReading2024 = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map((read, i) => {
            return {
                farmerId: newFarmer.id,
                year: 2024,
                month: i + 1,
                value: 0,
            };
        });
        const farmerReading = yield PrismaClient_1.prisma.reading.createMany({
            data: [...yearReading2023, ...yearReading2024],
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
// insert readings
const insertReadings = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { readings } = req.body;
    try {
        const newReadings = yield PrismaClient_1.prisma.reading.createMany({
            data: readings,
        });
        res.send(newReadings);
    }
    catch (error) {
        if (error instanceof Error) {
            res.status(400).json({ error: error.message });
        }
    }
});
exports.insertReadings = insertReadings;
const createManyFarmers = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { farmers } = req.body;
    const listFarmers = farmers.map((farmer) => {
        return {
            name: farmer.names_,
        };
    });
    try {
        const newFarmers = yield PrismaClient_1.prisma.farmer.createMany({ data: listFarmers });
        res.send(newFarmers);
    }
    catch (error) {
        if (error instanceof Error) {
            res.status(400).json({ error: error.message });
        }
    }
});
exports.createManyFarmers = createManyFarmers;
const getFarmers = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const farmer = yield PrismaClient_1.prisma.farmer.findMany({
            include: {
                reading: {
                    orderBy: {
                        month: "asc",
                    },
                },
                payment: true,
                prev_balance: true,
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
    const { page, type } = req.query;
    try {
        // @ts-ignore
        const pageNumber = parseInt(page);
        const itemsPerPage = 10;
        const totalItems = yield PrismaClient_1.prisma.farmer.count();
        const totalPages = Math.ceil(totalItems / itemsPerPage);
        // skip
        const skip = (pageNumber - 1) * itemsPerPage;
        const take = itemsPerPage;
        // get all farmers
        const allFarmers = yield PrismaClient_1.prisma.farmer.findMany();
        const farmer = yield PrismaClient_1.prisma.farmer.findMany(type !== "INVOICE" ? {
            // @ts-ignore
            skip,
            take,
            include: {
                reading: {
                    orderBy: [
                        {
                            year: "asc",
                        },
                        { month: "asc" },
                    ],
                },
                payment: true,
                prev_balance: true,
            },
        } : {
            include: {
                reading: {
                    orderBy: [
                        {
                            year: "asc",
                        },
                        { month: "asc" },
                    ],
                },
                payment: true,
                prev_balance: true,
            },
        });
        const hasNext = pageNumber < totalPages;
        // return res.json({
        //   items: farmer,
        //   pageInfo: {
        //     currentPage: pageNumber,
        //     totalPages,
        //     hasNext,
        //   },
        // });
        // months and standing charges
        const nov2023 = 6;
        const dec2023 = 7;
        const currentMonth = 4;
        const Jan = 1;
        const Feb = 2;
        const Mar = 3;
        const Apr = 4;
        const monthsWithCharges2023 = [
            {
                month: "May",
                standingCharge: 500,
                year: 2023,
            },
            {
                month: "June",
                standingCharge: 400,
                year: 2023,
            },
            {
                month: "July",
                standingCharge: 400,
                year: 2023,
            },
            {
                month: "August",
                standingCharge: 500,
                year: 2023,
            },
            {
                month: "September",
                standingCharge: 500,
                year: 2023,
            },
            {
                month: "October",
                standingCharge: 500,
                year: 2023,
            },
            {
                month: "November",
                standingCharge: 500,
                year: 2023,
            },
            {
                month: "December",
                standingCharge: 500,
                year: 2023,
            },
        ];
        const monthsWithCharges = [
            {
                month: "January",
                standingCharge: 500,
                year: 2024,
            },
            {
                month: "February",
                standingCharge: 500,
                year: 2024,
            },
            {
                month: "March",
                standingCharge: 500,
                year: 2024,
            },
            {
                month: "April",
                standingCharge: 500,
                year: 2024,
            },
            {
                month: "May",
                standingCharge: 500,
                year: 2024,
            },
            {
                month: "June",
                standingCharge: 500,
                year: 2024,
            },
            {
                month: "July",
                standingCharge: 500,
                year: 2024,
            },
            {
                month: "August",
                standingCharge: 500,
                year: 2024,
            },
            {
                month: "September",
                standingCharge: 500,
                year: 2024,
            },
            {
                month: "October",
                standingCharge: 500,
                year: 2024,
            },
            {
                month: "November",
                standingCharge: 500,
                year: 2024,
            },
            {
                month: "December",
                standingCharge: 500,
                year: 2024,
            },
        ];
        function calculate2023() {
            let bills = [];
            for (let i = 1; i < 9; i++) {
                bills.push(...farmer
                    // .filter((fa) => fa.readings.filter((rea) => rea.year === 2023))
                    .map((farmer) => {
                    var _a;
                    if (i < 2) {
                        return (0, Calculation_1.calculateBlank)(farmer.name, farmer.id, farmer.plotNo ? farmer.plotNo : "", farmer.reading[i + -1].value, farmer.reading[i + -1].id, i - 2 < 0 ? 0 : farmer.reading[i + -2].value, 2023, monthsWithCharges2023[i - 1].standingCharge, farmer.payment, monthsWithCharges2023[i - 1].month, ((_a = farmer === null || farmer === void 0 ? void 0 : farmer.prev_balance[0]) === null || _a === void 0 ? void 0 : _a.amount)
                            ? farmer.prev_balance[0].amount
                            : 0);
                    }
                    return (0, Calculation_1.calculate)(farmer.name, farmer.id, farmer.plotNo ? farmer.plotNo : "", farmer.reading[i + -1].value, farmer.reading[i + -1].id, i - 2 < 0 ? 0 : farmer.reading[i + -2].value, 2023, monthsWithCharges2023[i - 1].standingCharge, farmer.payment, monthsWithCharges2023[i - 1].month);
                }));
            }
            return bills;
        }
        function calculate2024() {
            let bills = [];
            for (let i = 1; i < 13; i++) {
                bills.push(...farmer.map((farmer) => {
                    // if (currentMonth < Jan) {
                    //   return calculateBlank(
                    //     farmer.name,
                    //     farmer.plotNo ? farmer.plotNo : "",
                    //     farmer.readings[i - 1].value,
                    //     i - 2 < 0 ? 0 : farmer.readings[i - 2].value,
                    //     monthsWithCharges[i - 1].standingCharge,
                    //     farmer.payments,
                    //     monthsWithCharges[i - 1].month
                    //   );
                    // }
                    return (0, Calculation_1.calculate)(farmer.name, farmer.id, farmer.plotNo ? farmer.plotNo : "", farmer.reading[i + 7].value, farmer.reading[i + 7].id, 
                    // i - 2 < 0 ? 0 : farmer.readings[i +2].value,
                    farmer.reading[i + 6].value, 2024, monthsWithCharges[i - 1].standingCharge, farmer.payment, monthsWithCharges[i - 1].month);
                }));
            }
            return bills;
        }
        const totalBills = [...calculate2023(), ...calculate2024()];
        res.send(totalBills);
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
