"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.decodeJwt = exports.signJwt = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
// Sample payload
const secretKey = "your_secret_key";
const signJwt = () => {
    const payload = {
        sub: "user123",
        name: "coopooo",
        admin: true,
    };
    // Replace 'your_secret_key' with your actual secret key
    // Create the JWT
    const token = jsonwebtoken_1.default.sign(payload, secretKey);
    console.log(token);
    return token;
};
exports.signJwt = signJwt;
const decodeJwt = (token) => {
    const decoded = jsonwebtoken_1.default.verify(token, secretKey);
    console.log(decoded);
    return decoded;
};
exports.decodeJwt = decodeJwt;
