import { Request, Response } from "express";
import { UserService } from "../service/user.service";
import { User } from "../dto/users.dto";

export class UserController {
  static async create(req: Request, res: Response): Promise<any> {
    try {
      const data: User = req.body;

      const save = await UserService.create(data);

      return res.status(201).json(save);
    } catch (error) {
      res.status(500).send(error);
    }
  }

  static async login(req: Request, res: Response): Promise<any> {
    try {
      const data: User = req.body;

      const user = await UserService.login(data.email, data.password);

      return res.status(200).json(user);
    } catch (error) {
      res.status(500).send(error);
    }
  }

  static async resetPassword(req: Request, res: Response): Promise<any> {
    try {
      const data: User = req.body;

      const link = await UserService.forgetPassword(data.email);

      return res.status(200).json(link);
    } catch (error) {
      res.status(500).send(error);
    }
  }
}
