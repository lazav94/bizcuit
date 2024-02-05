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
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
const service_1 = __importDefault(require("./service"));
class UserController {
}
_a = UserController;
/**
 * Login user
 *
 * @param   {LoginData} data Login data
 */
UserController.login = (data) => __awaiter(void 0, void 0, void 0, function* () {
    console.log("UserController.login", data);
    return service_1.default.login(data);
});
// Logout invalidate access token
/**
 * Creates a new user with a given data
 *
 * @param   {User} data User data
 * @returns {User}      Created user
 */
UserController.create = (data) => __awaiter(void 0, void 0, void 0, function* () {
    console.log("UserController.create");
    // If user with a given email exist return error
    yield service_1.default.check(data.email);
    // This is simplified flow
    // We should send verification mail and force user to verify account...
    return service_1.default.create(data);
});
exports.default = UserController;
