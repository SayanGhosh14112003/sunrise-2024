// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import Task from "@/model/Task";
import { getActiveTasks, getAllTasks } from "@/modules/taskManager";
import type { NextApiRequest, NextApiResponse } from "next";

type Data = {
  todo: Task[];
  ongoing:Task[];
  completed:Task[];
};

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>,

) {
  const tasks=getAllTasks();
  const todo=[];
  const ongoing=getActiveTasks();
  const completed=[];
  for(let i=0;i<tasks.length;i++){
    if(tasks[i].completed===true)completed.push(tasks[i]);
    else if(ongoing.includes(tasks[i])!==true)todo.push(tasks[i]);
  }
  res.status(200).json({todo:todo,ongoing:ongoing,completed:completed});
}
