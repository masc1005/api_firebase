import { Router } from "express";
import { UserController } from "../app/controllers/user.controller";

const usersRouter = Router();

usersRouter.post("/", UserController.create);
usersRouter.post("/auth", UserController.login);
usersRouter.post("/reset/password", UserController.resetPassword);

export { usersRouter };
