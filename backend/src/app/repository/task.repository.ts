import { db } from "../../config/firebase";
import { Tasks } from "../dto/tasks.dto";

export class TaskRepository {
  static async getTaskById(id: string) {
    const task = await db.collection("tasks").doc(id).get();
    return task.data();
  }

  static async getTaskByUserId(user_id: string) {
    const task = await db
      .collection("tasks")
      .where("id_user", "==", user_id)
      .get();
    return task.docs.map((doc) => doc.data());
  }

  static async createTask(task: Tasks) {
    task.created_at = new Date();
    const newtask = await db.collection("tasks").add(task);
    return newtask;
  }

  static async updateTask(id: string, task: any) {
    const updatedtask = await db.collection("tasks").doc(id).update(task);
    return updatedtask;
  }

  static async deleteTask(id: string) {
    const deletedtask = await db.collection("tasks").doc(id).delete();
    return deletedtask;
  }
}
