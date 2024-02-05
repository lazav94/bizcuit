import jwt from "jsonwebtoken";

import { LoginData } from "./types";
import { comparePasswords, hashPassword } from "../../services/security";
import { User } from "./entity";
import { token } from "morgan";

// TODO create authService and put all auth method there
// TODO instead Partial<User> create type without password
/**
 * @class UserService
 * @todo  Delete `delete user.password` on each return, maybe middleware
 */
export default class UserService {
  /**
   * Gets user by ID
   *
   * @param   {number} id User iD
   * @returns {User[]}    List of users
   * @throws
   */
  static findById = async (
    id: number,
    relations: string[] = []
  ): Promise<Partial<User>> => {
    console.log("UserService.findById", id);
    const user = await User.findOne({ where: { id }, relations });
    if (!user) {
      throw new Error("User not found");
    }
    const { password, ...sanitizedUser } = user;
    return sanitizedUser;
  };

  /**
   * Authenticate user
   *
   * @param   {string} accessToken User access token
   * @returns {User}
   * @throws
   */
  static authenticate = async (accessToken: string): Promise<Partial<User>> => {
    const user = await UserService.verify(accessToken);
    if (!user) {
      throw new Error("User is not authenticate");
    }
    return user;
  };

  /**
   * For a given email gets a user
   *
   * @param   {string} email User email
   * @returns {User}
   * @throws
   */
  private static getUserByEmail = async (email: string): Promise<User> => {
    const user = await User.findOne({
      where: { email: email },
    });
    if (!user) {
      throw new Error("User not found");
    }
    return user;
  };

  /**
   * Check if a user with a given email already exists
   *
   * @param   {string} email  User email
   * @returns {void}
   * @throws
   */
  static check = async (email: string): Promise<void> => {
    if (email) {
      const emailExist = await User.exists({ where: { email } });
      if (emailExist) {
        throw new Error("User already exist");
      }
    }
  };

  /**
   * Create a user.
   * - Checks if username and email already exist
   * - Generated access token
   * - Hash password
   *
   * @param   {User} data User input object
   * @returns {User}      New user object
   */
  static create = async (data: User): Promise<Partial<User>> => {
    console.log("UserService.create");

    const user = new User();
    user.email = data.email;
    user.name = data.name;
    user.password = await hashPassword(data.password);
    await user.save();

    const { password, ...sanitizedUser } = user;
    return sanitizedUser;
  };

  /**
   * Login user
   * - Generate new access token
   *
   * @param   {LoginData} data User object
   * @returns {string}         Access token
   * @throws
   */
  static login = async (data: LoginData): Promise<string> => {
    const { email, password } = data;
    console.log("UserService.login", data);
    const user = await UserService.getUserByEmail(email);

    const passwordMatch = await comparePasswords(password, user.password!);

    if (!passwordMatch) {
      throw new Error("Incorrect password");
    }

    return UserService.generateAccessToken(user);
  };

  /**
   * Generate a access token for a given user
   *
   * @param   {User}   user         User object
   * @param   {number} expirePeriod Expiration period in days
   * @returns {string}              Access token
   */
  static generateAccessToken = (user: User, expirePeriod = 365): string => {
    // Generate JWT
    const accessToken = jwt.sign(
      { sub: user.id, aud: "Bizcuit" },
      process.env.JWT_SECRET!,
      { expiresIn: `${expirePeriod}d` }
    );
    // Store and return access token
    return accessToken;
  };

  /**
   * Verify access token
   *
   * @param   {string} token JWT access or reset token
   * @returns {number}       User ID
   */
  static verifyToken = (token: string): number | null => {
    console.log("UserService.verifyToken", token);
    const res = jwt.verify(token, process.env.JWT_SECRET!);
    const userId = res.sub ? parseInt(res.sub as string) : null;
    return userId;
  };

  /**
   * Verify JWT
   *
   * @param   {string}    accessToken JWT
   * @returns {User|null}             User
   */
  static verify = async (accessToken: string): Promise<Partial<User>> => {
    // Verify and decode JWT
    const userId = UserService.verifyToken(accessToken);

    if (!userId) {
      throw new Error("User not authenticate");
    }
    // Get and return accessToken model
    const user = await UserService.findById(userId);
    return user;
  };
}
