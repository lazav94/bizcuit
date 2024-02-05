import { User } from "./entity";
import UserService from "./service";
import { LoginData } from "./types";

export default class UserController {
  /**
   * Login user
   *
   * @param   {LoginData} data Login data
   */
  static login = async (data: LoginData): Promise<string> => {
    console.log("UserController.login", data);
    return UserService.login(data);
  };

  // Logout invalidate access token

  /**
   * Creates a new user with a given data
   *
   * @param   {User} data User data
   * @returns {User}      Created user
   */
  static create = async (data: User): Promise<Partial<User>> => {
    console.log("UserController.create");
    // If user with a given email exist return error
    await UserService.check(data.email);
    // This is simplified flow
    // We should send verification mail and force user to verify account...
    return UserService.create(data);
  };
}
