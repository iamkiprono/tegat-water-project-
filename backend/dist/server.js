"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const farmer_routes_1 = __importDefault(require("./routes/farmer.routes"));
const payment_routes_1 = __importDefault(require("./routes/payment.routes"));
const reading_routes_1 = __importDefault(require("./routes/reading.routes"));
const coop_routes_1 = __importDefault(require("./routes/coop.routes"));
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use((0, cors_1.default)());
app.use('/farmers', farmer_routes_1.default);
app.use('/payments', payment_routes_1.default);
app.use('/readings', reading_routes_1.default);
app.use('/coop', coop_routes_1.default);
app.listen(5000, () => {
    console.log(`Listening on 5000`);
});
