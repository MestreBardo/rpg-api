"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GenerateJwtService = void 0;
const jsonwebtoken_1 = require("jsonwebtoken");
class GenerateJwtService {
    static execute(user) {
        const token = (0, jsonwebtoken_1.sign)(user, process.env.TOKEN, {
            issuer: process.env.ISSUER,
            audience: "webapp",
            subject: String(user._id)
        });
        return token;
    }
}
exports.GenerateJwtService = GenerateJwtService;
