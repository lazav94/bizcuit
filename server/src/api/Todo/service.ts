import { User } from "../User/entity";
import { Todo } from "./entity";

/**
 * @class TodoService
 */
export default class TodoService {
  /**
   * Gets todo by ID
   *
   * @param   {number} id Todo ID
   * @returns {Todo[]}    List of todos
   * @throws
   */
  static findById = async (id: number): Promise<Todo> => {
    console.log("TodoService.findById", id);
    const todo = await Todo.findOne({ where: { id } });
    if (!todo) {
      throw new Error("Todo not found");
    }
    return todo;
  };

  /**
   * Gets all todo
   * @param {number}   id User ID
   * @returns {Todo[]}    List of todos
   */
  static findAll = async (userId: number): Promise<Todo[]> => {
    console.log("TodoService.findAll", userId);
    return Todo.find({ where: { user: { id: userId } } });
  };

  /**
   * Create a todo.
   *
   * @param   {Todo} data Todo input object
   * @param   {Todo} user User from context
   * @returns {Todo}      New todo object
   */
  static create = async (data: Todo, user: User): Promise<Todo> => {
    console.log("TodoService.create");
    const todo = new Todo();
    todo.description = data.description;
    todo.user = user;

    await todo.save();
    return todo;
  };

  /**
   * Update todo data
   *
   * @param   {number}         id   Todo ID
   * @param   {UpdateTodoData} data Todo input object
   */
  static update = async (id: number, data: UpdateTodoData): Promise<void> => {
    const todo = await TodoService.findById(id);

    const updatedTodo = { ...todo, ...data };

    const { affected } = await Todo.update(id, updatedTodo);
    if (!affected) {
      throw new Error("Failed to update");
    }
  };

  /**
   * Delete todo by a given ID
   *
   * @param   {number} id Todo ID
   * @throws
   */
  static delete = async (id: number): Promise<void> => {
    const { affected } = await Todo.delete(id);
    if (!affected) {
      throw new Error("Failed to delete");
    }
  };
}
