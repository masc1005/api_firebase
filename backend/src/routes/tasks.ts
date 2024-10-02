import { Router } from "express";
import { TaskController } from "../app/controllers/task.controller";

const tasksRouter = Router();

tasksRouter.post("/", TaskController.create);
tasksRouter.get("/", TaskController.list);
tasksRouter.get("/:id", TaskController.findOne);
tasksRouter.put("/:id", TaskController.update);
tasksRouter.delete("/:id", TaskController.delete);

export { tasksRouter };
