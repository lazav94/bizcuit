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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const security_1 = require("../../services/security");
const entity_1 = require("./entity");
// TODO create authService and put all auth method there
// TODO instead Partial<User> create type without password
/**
 * @class UserService
 * @todo  Delete `delete user.password` on each return, maybe middleware
 */
class UserService {
}
_a = UserService;
/**
 * Gets user by ID
 *
 * @param   {number} id User iD
 * @returns {User[]}    List of users
 * @throws
 */
UserService.findById = (id, relations = []) => __awaiter(void 0, void 0, void 0, function* () {
    console.log("UserService.findById", id);
    const user = yield entity_1.User.findOne({ where: { id }, relations });
    if (!user) {
        throw new Error("User not found");
    }
    const { password } = user, sanitizedUser = __rest(user, ["password"]);
    return sanitizedUser;
});
/**
 * Authenticate user
 *
 * @param   {string} accessToken User access token
 * @returns {User}
 * @throws
 */
UserService.authenticate = (accessToken) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield _a.verify(accessToken);
    if (!user) {
        throw new Error("User is not authenticate");
    }
    return user;
});
/**
 * For a given email gets a user
 *
 * @param   {string} email User email
 * @returns {User}
 * @throws
 */
UserService.getUserByEmail = (email) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield entity_1.User.findOne({
        where: { email: email },
    });
    if (!user) {
        throw new Error("User not found");
    }
    return user;
});
/**
 * Check if a user with a given email already exists
 *
 * @param   {string} email  User email
 * @returns {void}
 * @throws
 */
UserService.check = (email) => __awaiter(void 0, void 0, void 0, function* () {
    if (email) {
        const emailExist = yield entity_1.User.exists({ where: { email } });
        if (emailExist) {
            throw new Error("User already exist");
        }
    }
});
/**
 * Create a user.
 * - Checks if username and email already exist
 * - Generated access token
 * - Hash password
 *
 * @param   {User} data User input object
 * @returns {User}      New user object
 */
UserService.create = (data) => __awaiter(void 0, void 0, void 0, function* () {
    console.log("UserService.create");
    const user = new entity_1.User();
    user.email = data.email;
    user.name = data.name;
    user.password = yield (0, security_1.hashPassword)(data.password);
    yield user.save();
    const { password } = user, sanitizedUser = __rest(user, ["password"]);
    return sanitizedUser;
});
/**
 * Login user
 * - Generate new access token
 *
 * @param   {LoginData} data User object
 * @returns {string}         Access token
 * @throws
 */
UserService.login = (data) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = data;
    console.log("UserService.login", data);
    const user = yield _a.getUserByEmail(email);
    const passwordMatch = yield (0, security_1.comparePasswords)(password, user.password);
    if (!passwordMatch) {
        throw new Error("Incorrect password");
    }
    return _a.generateAccessToken(user);
});
/**
 * Generate a access token for a given user
 *
 * @param   {User}   user         User object
 * @param   {number} expirePeriod Expiration period in days
 * @returns {string}              Access token
 */
UserService.generateAccessToken = (user, expirePeriod = 365) => {
    // Generate JWT
    const accessToken = jsonwebtoken_1.default.sign({ sub: user.id, aud: "Bizcuit" }, process.env.JWT_SECRET, { expiresIn: `${expirePeriod}d` });
    // Store and return access token
    return accessToken;
};
/**
 * Verify access token
 *
 * @param   {string} token JWT access or reset token
 * @returns {number}       User ID
 */
UserService.verifyToken = (token) => {
    console.log("UserService.verifyToken", token);
    const res = jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET);
    const userId = res.sub ? parseInt(res.sub) : null;
    return userId;
};
/**
 * Verify JWT
 *
 * @param   {string}    accessToken JWT
 * @returns {User|null}             User
 */
UserService.verify = (accessToken) => __awaiter(void 0, void 0, void 0, function* () {
    // Verify and decode JWT
    const userId = _a.verifyToken(accessToken);
    if (!userId) {
        throw new Error("User not authenticate");
    }
    // Get and return accessToken model
    const user = yield _a.findById(userId);
    return user;
});
exports.default = UserService;
