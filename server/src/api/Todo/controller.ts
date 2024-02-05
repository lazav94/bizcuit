import { User } from "../User/entity";
import { Todo } from "./entity";
import TodoService from "./service";

export default class TodoController {
  /**
   * Gets all todo
   *
   * @param   {User}   user  User
   * @returns {Todo[]}       List of  users todos
   */
  static findAll = (user: User): Promise<Todo[]> => {
    console.log("TodoController.findAll", user.id);
    return TodoService.findAll(user.id);
  };

  /**
   * Creates a new todo with a given data
   *
   * @param   {Todo} data Todo data
   * @returns {Todo}      Created todo
   */
  static create = async (data: Todo, user: User): Promise<Todo> => {
    console.log("TodoController.create", user.id);
    return TodoService.create(data, user);
  };

  /**
   * Creates a new todo with a given data
   *
   * @param   {number} id   Todo ID
   * @param   {Todo}   data Todo data
   */
  static update = async (id: number, data: Todo): Promise<void> => {
    console.log("TodoController.update", id);
    return TodoService.update(id, data);
  };

  /**
   * Delete todo with a given ID
   *
   * @param   {number} id Todo ID
   */
  static delete = async (id: number): Promise<void> => {
    console.log("TodoController.delete", id);
    return TodoService.delete(id);
  };
}
