// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import Task from "@/model/Task";
import { getActiveTasks, getAllTasks } from "@/modules/taskManager";
import type { NextApiRequest, NextApiResponse } from "next";

type Data = {
  todo: Task[];
  ongoing: Task[];
  completed: Task[];
};

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const tasks = getAllTasks();
  const todo: Task[] = [];
  const ongoing = getActiveTasks();
  const completed: Task[] = [];

  for (const task of tasks) {
    if (task.completed) {
      completed.push(task);
    } else if (!ongoing.includes(task)) {
      todo.push(task);
    }
  }

  res.status(200).json({ todo, ongoing, completed });
}
