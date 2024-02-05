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
const express_1 = require("express");
const validator_1 = require("../../services/validator");
const controller_1 = __importDefault(require("./controller"));
const validators_1 = require("./validators");
const error_routes_1 = require("../error.routes");
const router = (0, express_1.Router)();
router
    .get("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    res.json(req.context.user);
}))
    .post("/login", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // Data
        const data = req.body;
        // Validation
        yield (0, validator_1.validate)(validators_1.loginSchema, data);
        const accessToken = yield controller_1.default.login(data);
        res.send(accessToken);
    }
    catch (error) {
        (0, error_routes_1.errorResponse)(res, error);
    }
}))
    .post("/signup", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // Data
        const data = req.body;
        // Validation
        yield (0, validator_1.validate)(validators_1.createSchema, data);
        const result = yield controller_1.default.create(data);
        res.json(result);
    }
    catch (error) {
        (0, error_routes_1.errorResponse)(res, error);
    }
}));
exports.default = router;
/**
 * TODO Improvement
 *
 * Update user
 * Delete user
 * Logout
 * On create send email to verify user (+token)
 * Change password (email)
 * Forgot password (email)
 */
