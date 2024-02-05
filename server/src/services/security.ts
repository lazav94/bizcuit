import bcrypt from "bcrypt";

/**
 * Has password
 *
 * @param   {string} password Password
 * @returns {string}          Hashed password
 */
export const hashPassword = async (password: string): Promise<string> =>
  bcrypt.hash(password, parseInt(process.env.SALT_ROUNDS!, 10));

/**
 * Compare two password and return `true` if they are the same
 *
 * @param   {string} password       Password (plain text) to check
 * @param   {string} hashedPassword Hashed password
 * @returns {string}                `true` if password are the same
 */
export const comparePasswords = async (
  password: string,
  hashedPassword: string
): Promise<boolean> => bcrypt.compare(password, hashedPassword);
