import { Request, Response } from "express";
import { TaskService } from "../service/task.service";
import { Tasks } from "../dto/tasks.dto";

export class TaskController {
  static async create(req: Request, res: Response): Promise<any> {
    try {
      const data: Tasks = req.body;
      data.id_user = req.user.uid;

      const save = await TaskService.create(data);

      return res.status(201).json(save);
    } catch (error) {
      res.status(500).send(error);
    }
  }

  static async list(req: Request, res: Response): Promise<any> {
    try {
      const link = await TaskService.getAll(req.user.uid);

      return res.status(200).json(link);
    } catch (error) {
      res.status(500).send(error);
    }
  }

  static async findOne(req: Request, res: Response): Promise<any> {
    try {
      const { id } = req.params;

      const link = await TaskService.getOne(id);

      return res.status(200).json(link);
    } catch (error) {
      res.status(500).send(error);
    }
  }

  static async update(req: Request, res: Response): Promise<any> {
    try {
      const { id } = req.params;
      const data: Tasks = req.body;

      const link = await TaskService.update(id, data);

      return res.status(200).json(link);
    } catch (error) {
      res.status(500).send(error);
    }
  }

  static async delete(req: Request, res: Response): Promise<any> {
    try {
      const { id } = req.params;

      const link = await TaskService.delete(id);

      return res.status(200).json(link);
    } catch (error) {
      res.status(500).send(error);
    }
  }
}
