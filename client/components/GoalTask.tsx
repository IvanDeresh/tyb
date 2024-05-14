"use client";
import { useCompletetask } from "@/func/taskFunc";
import React, { useState } from "react";
import DoneIcon from "@mui/icons-material/Done";
import { useCompleteGoalTask } from "@/func/goalFunc";
import Button from "./Button";
import AddTaskGoal from "./AddTaskGoal";

interface Task {
  id: string;
  title: string;
  completed: boolean;
}

const GoalTask: React.FC<{
  tasks: Task[];
  setTriger: Function;
  goalId: string;
}> = ({ tasks, goalId, setTriger }) => {
  const [taskForm, setTaskForm] = useState(false);
  return (
    <div className="w-[90%] min-h-[100px] flex flex-col gap-[20px]">
      <div className="pl-[70px] flex w-[100%] items-center gap-[50px]">
        <div
          onClick={() => {
            setTaskForm(!taskForm);
          }}
        >
          <Button label="Create task" width="w-[100px]" height="h-[35px]" />
        </div>
        <div className="w-[100%]">
          {taskForm && (
            <AddTaskGoal
              goalId={goalId}
              setTrigger={setTriger}
              id={tasks.length + 1}
            />
          )}
        </div>
      </div>
      <div
        className={`w-[100%] flex flex-col gap-[10px] ${
          tasks.length > 4 && "overflow-y-scroll"
        } h-[100px] `}
      >
        {tasks &&
          tasks.map((task, index) => (
            <div className="flex pl-[70px] w-[60%] justify-between ">
              <span
                onClick={() => {
                  useCompleteGoalTask(goalId, task.id || "", setTriger);
                }}
                className="border-2 flex justify-center items-center min-w-[20px] w-[20px] h-[20px] border-green-500"
              >
                {task.completed && <DoneIcon className="text-green-500" />}
              </span>
              <div key={index} className="text-green-500">
                {task.title}
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default GoalTask;
