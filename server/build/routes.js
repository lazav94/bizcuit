"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const routes_1 = __importDefault(require("./api/User/routes"));
const routes_2 = __importDefault(require("./api/Todo/routes"));
const router = (0, express_1.Router)();
router.use("/user", routes_1.default).use("/todo", routes_2.default);
exports.default = router;
