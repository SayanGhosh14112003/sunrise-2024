import Task from "@/model/Task";
import { initialTasks } from "@/utils/TaskList";

let tasks: Task[] = [...initialTasks];

export function initializeTasks() {
    tasks = [...initialTasks];
}

export function getActiveTasks(): Task[] {
    const activeGroup = Math.min(...tasks.filter(task => !task.completed).map(task => task.group), Infinity);
    return tasks.filter(task => !task.completed && task.group === activeGroup);
}

export function getCompletedTasks(): Task[] {
    return tasks.filter(task => task.completed);
}

export function getAllTasks(): Task[] {
    return tasks;
}

export function completeTask(taskTitle: string): void {
    const task = tasks.find(t => t.title === taskTitle);
    if (task) {
        const canComplete = tasks.every(t => t.completed || t.group >= task.group);
        if (canComplete) {
            task.completed = true;
        }
    }
}

export function createTask(title: string, description: string, persona: string, group: number): void {
    const lastId = tasks.reduce((maxId, task) => Math.max(maxId, task.id), 0) + 1;
    const newTask = new Task(lastId, title, description, persona, group);
    tasks.push(newTask);
}

export function updateTask(taskId: number, updatedTask: Partial<Omit<Task, 'id'>>): void {
    const taskIndex = tasks.findIndex(task => task.id === taskId);
    if (taskIndex !== -1) {
        tasks[taskIndex] = { ...tasks[taskIndex], ...updatedTask };
    }
}

export function deleteTask(taskId: number): void {
    tasks = tasks.filter(task => task.id !== taskId);
}
