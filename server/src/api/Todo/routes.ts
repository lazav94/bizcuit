import { Router } from "express";
import TodoController from "./controller";
import { errorResponse } from "../error.routes";
import { createSchema, updateSchema } from "./validators";
import { idSchema, validate } from "../../services/validator";

const router = Router();

router
  .get("/", async (req, res) => {
    try {
      const {
        context: { user },
      } = req;
      const result = await TodoController.findAll(user);
      res.json(result);
    } catch (error) {
      errorResponse(res, error);
    }
  })
  .post("/", async (req, res) => {
    try {
      // Data
      const {
        context: { user },
        body,
      } = req;
      // Validation
      await Promise.all([validate(createSchema, body)]);
      const result = await TodoController.create(body, user);
      res.json(result);
    } catch (error) {
      errorResponse(res, error);
    }
  })
  .put("/:id", async (req, res) => {
    try {
      // Data
      const { id } = req.params;
      const data = req.body;
      // Validation
      await Promise.all([validate(idSchema, id), validate(updateSchema, data)]);
      const result = await TodoController.update(parseInt(id), data);
      res.json(result);
    } catch (error) {
      errorResponse(res, error);
    }
  })
  .delete("/:id", async (req, res) => {
    try {
      // Data
      const { id } = req.params;
      // Validation
      await Promise.all([validate(idSchema, id)]);
      const result = await TodoController.delete(parseInt(id));
      res.json(result);
    } catch (error) {
      errorResponse(res, error);
    }
  });

export default router;
