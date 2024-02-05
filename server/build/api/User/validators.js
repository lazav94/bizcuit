"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.loginSchema = exports.createSchema = void 0;
const joi_1 = __importDefault(require("joi"));
const validator_1 = require("../../services/validator");
exports.createSchema = joi_1.default.object({
    name: joi_1.default.string().required(),
    email: validator_1.emailSchema.required(),
    password: validator_1.passwordSchema.required(),
});
exports.loginSchema = joi_1.default.object({
    email: validator_1.emailSchema.required(),
    password: validator_1.passwordSchema.required(),
});
