"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorResponse = void 0;
const express_1 = require("express");
const router = (0, express_1.Router)();
/**
 * Function for sending a error
 */
const errorResponse = (res, error, statusCode = 400) => {
    res.status(statusCode).json({
        success: false,
        message: error === null || error === void 0 ? void 0 : error.message,
        error: Object.assign({ statusCode, message: error === null || error === void 0 ? void 0 : error.message }, error),
    });
};
exports.errorResponse = errorResponse;
// TODO improve error handling - message was not send correctly
router.use("*", (_req, res) => {
    (0, exports.errorResponse)(res, new Error("Not found"), 404);
});
exports.default = router;
