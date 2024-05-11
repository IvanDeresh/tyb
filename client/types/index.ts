export interface User {
  name: string;
  email: string;
  password: string;
  tasksDone: number;
  _id: string;
  createdAt: string;
  __v: number;
}
export interface TaskState {
  _id: string;
  description: string;
  deadline: Date;
  completed: boolean;
  userId: string;
  createdAt: Date;
  __v: number;
}
export interface GoalState {
  _id: string;
  description: string;
  targetDate: Date;
  progress: number;
  userId: string;
  __v: number;
}
export interface Skill {
  _id: string;
  titles: string;
  createdAt: Date;
  initialHourSpend: number;
  hourGoal: number;
  userId: string;
  __v: number;
}
