import { Router } from "express";

import { validate } from "../../services/validator";

import UserController from "./controller";
import { createSchema, loginSchema } from "./validators";
import { errorResponse } from "../error.routes";
const router = Router();

router
  .get("/", async (req, res) => {
    res.json(req.context.user);
  })
  .post("/login", async (req, res) => {
    try {
      // Data
      const data = req.body;
      // Validation
      await validate(loginSchema, data);
      const accessToken = await UserController.login(data);
      res.send(accessToken);
    } catch (error) {
      errorResponse(res, error);
    }
  })
  .post("/signup", async (req, res) => {
    try {
      // Data
      const data = req.body;
      // Validation
      await validate(createSchema, data);
      const result = await UserController.create(data);
      res.json(result);
    } catch (error) {
      errorResponse(res, error);
    }
  });

export default router;

/**
 * TODO Improvement
 *
 * Update user
 * Delete user
 * Logout
 * On create send email to verify user (+token)
 * Change password (email)
 * Forgot password (email)
 */
