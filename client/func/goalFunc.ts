import { useState, useEffect } from "react";
import { GoalState } from "@/types";
import axios from "axios";

export const useUserGoals = (id: string, triger: boolean) => {
  const [goal, setTask] = useState<GoalState[]>([]);
  useEffect(() => {
    const fetchGoal = async () => {
      try {
        if (id) {
          const response = await axios.get<GoalState[]>(
            `http://localhost:3001/goal/${id}`
          );
          setTask(response.data);
        }
      } catch (error) {
        console.error("Failed to fetch userTaskData", error);
      }
    };

    fetchGoal();
  }, [id, triger]);

  return goal;
};
