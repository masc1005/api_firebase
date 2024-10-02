import { Tasks } from "../dto/tasks.dto";
import { TaskRepository } from "../repository/task.repository";

export class TaskService {
  static async create(taskData: Tasks) {
    return await TaskRepository.createTask(taskData);
  }

  static async getAll(user_id: string) {
    return await TaskRepository.getTaskByUserId(user_id);
  }

  static async getOne(task_id: string) {
    return await TaskRepository.getTaskById(task_id);
  }

  static async update(task_id: string, taskData: Tasks) {
    return await TaskRepository.updateTask(task_id, taskData);
  }

  static async delete(task_id: string) {
    return await TaskRepository.deleteTask(task_id);
  }
}
