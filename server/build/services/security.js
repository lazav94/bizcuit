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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.comparePasswords = exports.hashPassword = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
/**
 * Has password
 *
 * @param   {string} password Password
 * @returns {string}          Hashed password
 */
const hashPassword = (password) => __awaiter(void 0, void 0, void 0, function* () { return bcrypt_1.default.hash(password, parseInt(process.env.SALT_ROUNDS, 10)); });
exports.hashPassword = hashPassword;
/**
 * Compare two password and return `true` if they are the same
 *
 * @param   {string} password       Password (plain text) to check
 * @param   {string} hashedPassword Hashed password
 * @returns {string}                `true` if password are the same
 */
const comparePasswords = (password, hashedPassword) => __awaiter(void 0, void 0, void 0, function* () { return bcrypt_1.default.compare(password, hashedPassword); });
exports.comparePasswords = comparePasswords;
