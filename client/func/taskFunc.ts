import { useState, useEffect } from "react";
import { TaskState } from "@/types";
import axios from "axios";

interface Props {
  id: string;
}
interface TaskBody {
  description?: string;
  deadline?: Date;
}
export const useUserTask = (id: string, triger: boolean) => {
  const [task, setTask] = useState<TaskState[]>([]);
  useEffect(() => {
    const fetchTask = async () => {
      try {
        if (id) {
          const response = await axios.get(`http://localhost:3001/task/${id}`);
          setTask(response.data);
        }
      } catch (error) {
        console.error("Failed to fetch userTaskData", error);
      }
    };

    fetchTask();
  }, [id, triger]);

  return task;
};
export const useUpdateTask = (id: string, body: TaskBody) => {
  const [task, setTask] = useState<TaskState[] | null>(null);

  useEffect(() => {
    const fetchTask = async () => {
      try {
        const response = await axios.patch(
          `http://localhost:3001/task/${id}`,
          {}
        );
        setTask(response.data);
      } catch (error) {
        console.error("Failed to fetch userTaskData", error);
      }
    };

    fetchTask();
  }, [id]);

  return task;
};

export const useCompletetask = async (id: string, triggerSetter: Function) => {
  try {
    const response = await axios.patch(
      `http://localhost:3001/task/complete/${id}`,
      {}
    );
    triggerSetter((prev: any) => !prev);
  } catch (error) {
    console.error("Failed to complete useCompletetask", error);
  }
};
