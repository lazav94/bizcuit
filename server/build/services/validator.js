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
exports.validate = exports.stringSchema = exports.emailSchema = exports.passwordSchema = exports.idSchema = void 0;
const joi_1 = __importDefault(require("joi"));
exports.idSchema = joi_1.default.number().integer().required();
const consts_1 = require("./consts");
// TODO we can make password more secure, require number, special character...
exports.passwordSchema = joi_1.default.string()
    .trim()
    .min(consts_1.MIN_PASSWORD_SIZE)
    .max(consts_1.MAX_PASSWORD_SIZE);
exports.emailSchema = joi_1.default.string()
    .trim()
    .regex(/^\S+@\S+\.\S+$/)
    .min(consts_1.MIN_EMAIL_SIZE)
    .max(consts_1.MAX_EMAIL_SIZE);
exports.stringSchema = joi_1.default.string().allow("").required();
/**
 * Validate (input) value according to the validation schema.
 * Throw the validation error if the schema definition is not satisfied.
 * @param   {AnySchema}         schema  Schema
 * @param   {T}                 value   Value to check
 * @param   {ValidationOptions} options Validation options
 * @returns {any}
 */
const validate = (schema, value, options) => __awaiter(void 0, void 0, void 0, function* () { return schema.validateAsync(value, Object.assign({ abortEarly: false }, options)); });
exports.validate = validate;
