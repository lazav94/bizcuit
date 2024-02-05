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
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
const entity_1 = require("./entity");
/**
 * @class TodoService
 */
class TodoService {
}
_a = TodoService;
/**
 * Gets todo by ID
 *
 * @param   {number} id Todo ID
 * @returns {Todo[]}    List of todos
 * @throws
 */
TodoService.findById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    console.log("TodoService.findById", id);
    const todo = yield entity_1.Todo.findOne({ where: { id } });
    if (!todo) {
        throw new Error("Todo not found");
    }
    return todo;
});
/**
 * Gets all todo
 * @param {number}   id User ID
 * @returns {Todo[]}    List of todos
 */
TodoService.findAll = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    console.log("TodoService.findAll", userId);
    return entity_1.Todo.find({ where: { user: { id: userId } } });
});
/**
 * Create a todo.
 *
 * @param   {Todo} data Todo input object
 * @param   {Todo} user User from context
 * @returns {Todo}      New todo object
 */
TodoService.create = (data, user) => __awaiter(void 0, void 0, void 0, function* () {
    console.log("TodoService.create");
    const todo = new entity_1.Todo();
    todo.description = data.description;
    todo.user = user;
    yield todo.save();
    return todo;
});
/**
 * Update todo data
 *
 * @param   {number}         id   Todo ID
 * @param   {UpdateTodoData} data Todo input object
 */
TodoService.update = (id, data) => __awaiter(void 0, void 0, void 0, function* () {
    const todo = yield _a.findById(id);
    const updatedTodo = Object.assign(Object.assign({}, todo), data);
    const { affected } = yield entity_1.Todo.update(id, updatedTodo);
    if (!affected) {
        throw new Error("Failed to update");
    }
});
/**
 * Delete todo by a given ID
 *
 * @param   {number} id Todo ID
 * @throws
 */
TodoService.delete = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const { affected } = yield entity_1.Todo.delete(id);
    if (!affected) {
        throw new Error("Failed to delete");
    }
});
exports.default = TodoService;
