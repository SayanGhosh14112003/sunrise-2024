import {
    completeTask,
    getActiveTasks,
    getAllTasks,
  } from "@/modules/taskManager";
  import type { NextApiRequest, NextApiResponse } from "next";
  import Task from "@/model/Task";
  
  type Data = {
    todo: Task[];
    ongoing: Task[];
    completed: Task[];
  };
  
  export default function handler(
    req: NextApiRequest,
    res: NextApiResponse<Data>
  ) {
    const { title } = req.body;
    
    
    completeTask(title);
    
    
    const tasks = getAllTasks();
    
    
    const ongoingTasks = getActiveTasks();
    
    
    const todoTasks: Task[] = [];
    const completedTasks: Task[] = [];
  
    tasks.forEach(task => {
      if (task.completed) {
        completedTasks.push(task);
      } else if (!ongoingTasks.includes(task)) {
        todoTasks.push(task);
      }
    });
  
    res.status(200).json({
      todo: todoTasks,
      ongoing: ongoingTasks,
      completed: completedTasks,
    });
  }
  