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
class TodoController {
}
_a = TodoController;
/**
 * Gets all todo
 *
 * @param   {User}   user  User
 * @returns {Todo[]}       List of  users todos
 */
TodoController.findAll = (user) => {
    console.log("TodoController.findAll", user.id);
    return service_1.default.findAll(user.id);
};
/**
 * Creates a new todo with a given data
 *
 * @param   {Todo} data Todo data
 * @returns {Todo}      Created todo
 */
TodoController.create = (data, user) => __awaiter(void 0, void 0, void 0, function* () {
    console.log("TodoController.create", user.id);
    return service_1.default.create(data, user);
});
/**
 * Creates a new todo with a given data
 *
 * @param   {number} id   Todo ID
 * @param   {Todo}   data Todo data
 */
TodoController.update = (id, data) => __awaiter(void 0, void 0, void 0, function* () {
    console.log("TodoController.update", id);
    return service_1.default.update(id, data);
});
/**
 * Delete todo with a given ID
 *
 * @param   {number} id Todo ID
 */
TodoController.delete = (id) => __awaiter(void 0, void 0, void 0, function* () {
    console.log("TodoController.delete", id);
    return service_1.default.delete(id);
});
exports.default = TodoController;
