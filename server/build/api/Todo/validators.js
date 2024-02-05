"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateSchema = exports.createSchema = void 0;
const joi_1 = __importDefault(require("joi"));
exports.createSchema = joi_1.default.object({
    description: joi_1.default.string(),
});
exports.updateSchema = joi_1.default.object({
    description: joi_1.default.string().optional(),
    isCompleted: joi_1.default.boolean().optional(),
});
