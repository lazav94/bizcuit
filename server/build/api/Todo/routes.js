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
const controller_1 = __importDefault(require("./controller"));
const error_routes_1 = require("../error.routes");
const validators_1 = require("./validators");
const validator_1 = require("../../services/validator");
const router = (0, express_1.Router)();
router
    .get("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { context: { user }, } = req;
        const result = yield controller_1.default.findAll(user);
        res.json(result);
    }
    catch (error) {
        (0, error_routes_1.errorResponse)(res, error);
    }
}))
    .post("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // Data
        const { context: { user }, body, } = req;
        // Validation
        yield Promise.all([(0, validator_1.validate)(validators_1.createSchema, body)]);
        const result = yield controller_1.default.create(body, user);
        res.json(result);
    }
    catch (error) {
        (0, error_routes_1.errorResponse)(res, error);
    }
}))
    .put("/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // Data
        const { id } = req.params;
        const data = req.body;
        // Validation
        yield Promise.all([(0, validator_1.validate)(validator_1.idSchema, id), (0, validator_1.validate)(validators_1.updateSchema, data)]);
        const result = yield controller_1.default.update(parseInt(id), data);
        res.json(result);
    }
    catch (error) {
        (0, error_routes_1.errorResponse)(res, error);
    }
}))
    .delete("/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // Data
        const { id } = req.params;
        // Validation
        yield Promise.all([(0, validator_1.validate)(validator_1.idSchema, id)]);
        const result = yield controller_1.default.delete(parseInt(id));
        res.json(result);
    }
    catch (error) {
        (0, error_routes_1.errorResponse)(res, error);
    }
}));
exports.default = router;
