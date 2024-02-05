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
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
const express_1 = __importDefault(require("express"));
const helmet_1 = __importDefault(require("helmet"));
const morgan_1 = __importDefault(require("morgan"));
const routes_1 = __importDefault(require("./routes"));
const db_1 = __importDefault(require("./services/db"));
const error_routes_1 = __importDefault(require("./api/error.routes"));
const auth_middleware_1 = require("./services/auth.middleware");
dotenv_1.default.config();
const app = (0, express_1.default)();
// Logging the uncaught exception error message
process.on("uncaughtException", (error) => {
    console.error("There was an uncaught error", error);
    process.exit(1); // mandatory (as per the Node.js docs)
});
app.use((0, helmet_1.default)());
app.use((0, cors_1.default)());
app.use(express_1.default.json());
// HTTP request logger
app.use((0, morgan_1.default)("short"));
// Basic auth
app.use(auth_middleware_1.authorization);
// Routes
app.use(routes_1.default);
app.use(error_routes_1.default);
const host = process.env.HOST || "http://localhost";
const port = process.env.PORT || "8080";
// Start server
app.listen(port, () => __awaiter(void 0, void 0, void 0, function* () {
    console.log(`TODO Server is running on port: ${port}`);
    console.log(`Homepage: ${host}:${port}`);
    // Connect to the database
    yield (0, db_1.default)();
    // TODO connect to redis
}));
