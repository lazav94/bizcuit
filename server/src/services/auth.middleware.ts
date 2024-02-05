import { NextFunction, Request, Response } from "express";
import UserService from "../api/User/service";
import { errorResponse } from "../api/error.routes";
import { User } from "../api/User/entity";

// The list should be more complex (regex, add method...)
const notRequireAccessToke = ["/user/login", "/user/signup"];

export const authorization = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    console.log(`Path: ${req.path}`);
    // Login path doesn't require authorization
    const notRequireAuthorization = notRequireAccessToke.includes(req.path);

    if (notRequireAuthorization) {
      console.log("Path that doesn't require authorization");
      return next();
    }
    // Get token
    if (!req.headers.authorization) {
      throw new Error("Access token missing");
    }
    const token = req.headers.authorization!.split(" ")[1];
    if (!token) {
      throw new Error("Access token missing");
    }
    // Get user from token
    const user = await UserService.authenticate(token);

    // Put user inside of a context
    req.context = { user: user as User };
    next();
  } catch (error) {
    errorResponse(res, error);
  }
};
