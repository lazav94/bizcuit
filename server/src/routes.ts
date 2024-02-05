import { Router } from "express";
import userRoutes from "./api/User/routes";
import todoRoutes from "./api/Todo/routes";

const router = Router();

router.use("/user", userRoutes).use("/todo", todoRoutes);

export default router;
