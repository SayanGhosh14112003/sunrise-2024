
import Task from "@/model/Task";
import { initialTasks } from "@/utils/TaskList";



let tasks: Task[] = [...initialTasks];

export function initializeTasks() {
     tasks=[...initialTasks];
}

export function getActiveTasks(): Task[] {
    //Finding the currently active group
    let activeGroup=Infinity;
    for(let i=0;i<tasks.length;i++){
        if(tasks[i].completed===false)
            activeGroup=Math.min(tasks[i].group,activeGroup);
    }
    //Storing the currently active tasks
    const activeTasks=[];
    for(let i=0;i<tasks.length;i++){
        if(tasks[i].completed===false && tasks[i].group===activeGroup)
            activeTasks.push(tasks[i]);
    }
    return activeTasks;
}
export function getCompletedTasks(): Task[] {
    //Storing the completed tasks
    const completedTasks=[];
    for(let i=0;i<tasks.length;i++){
        if(tasks[i].completed===true)
            completedTasks.push(tasks[i]);
    }
    return completedTasks;
}

export function getAllTasks(): Task[] {
    return tasks;
}

export function completeTask(taskTitle: string): void {
    //Finding the index of the given task
    let taskIndex=-1;
    for(let i=0;i<tasks.length;i++){
        if(tasks[i].title===taskTitle){
            taskIndex=i;
            break;
        }
    }
    //If the task is present, marking it as completed if the condition satisfies
    if(taskIndex!==-1){
        let conditionForCompleteTask=true;
        const curTask=tasks[taskIndex];
        for(let i=0;i<tasks.length;i++){
            if(tasks[i].completed===false && tasks[i].group<curTask.group){
                conditionForCompleteTask=false;
                break;
            }
        }
        if(conditionForCompleteTask===true)curTask.completed=true;
    }
}

export function createTask(title: string, description: string, persona: string, group: number): void {
  //Finding the id for the new task
  let lastId=0;
  for(let i=0;i<tasks.length;i++){
    lastId=Math.max(lastId,tasks[i].id);
  }
  lastId+=1;
  //Adding the new task
  const newTask=new Task(lastId,title,description,persona,group);
  tasks.push(newTask);
}

export function updateTask(taskId: number, updatedTask: Partial<Omit<Task, 'id'>>): void {
    //Finding the index of the given task
    let taskIndex=-1
    for(let i=0;i<tasks.length;i++){
     if(tasks[i].id==taskId){
        taskIndex=i;
        break;
     }
   }
   //If task is present then updating it
   if(taskId!==-1)tasks[taskIndex]={...tasks[taskIndex],...updatedTask};
}

export function deleteTask(taskId: number): void {
    //Storing all the remaining tasks
    const remainingTask=[];
    for(let i=0;i<tasks.length;i++){
        if(tasks[i].id!==taskId)
            remainingTask.push(tasks[i]);
    }
    tasks=remainingTask;
}
