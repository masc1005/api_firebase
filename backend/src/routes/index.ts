import { Router } from "express";
import { tasksRouter } from "./tasks";
import { usersRouter } from "./users";

import { authMiddleware } from "../middleware/auth.middleware";

const router = Router();

router.use("/tasks", authMiddleware, tasksRouter);
router.use("/users", usersRouter);

export { router };
