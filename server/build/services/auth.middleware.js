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
exports.authorization = void 0;
const service_1 = __importDefault(require("../api/User/service"));
const error_routes_1 = require("../api/error.routes");
// The list should be more complex (regex, add method...)
const notRequireAccessToke = ["/user/login", "/user/signup"];
const authorization = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        console.log(`Path: ${req.path}`);
        // Login path doesn't require authorization
        const notRequireAuthorization = notRequireAccessToke.includes(req.path);
        if (notRequireAuthorization) {
            console.log("Path that doesn't require authorization");
            return next();
        }
        // Get token
        if (!req.headers.authorization) {
            throw new Error("Access token missing");
        }
        const token = req.headers.authorization.split(" ")[1];
        if (!token) {
            throw new Error("Access token missing");
        }
        // Get user from token
        const user = yield service_1.default.authenticate(token);
        // Put user inside of a context
        req.context = { user: user };
        next();
    }
    catch (error) {
        (0, error_routes_1.errorResponse)(res, error);
    }
});
exports.authorization = authorization;
