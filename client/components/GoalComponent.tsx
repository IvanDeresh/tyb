"use client";
import React, { useState } from "react";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import GoalTask from "./GoalTask";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
interface Task {
  id: string;
  title: string;
  completed: boolean;
}
const GoalComponent = ({
  targetDate,
  id,
  progress,
  description,
  bgColor,
  tasks,
  text,
  setTriger,
  path,
  textColor,
  borderColor,
}: {
  targetDate: Date;
  id: string;
  text: string;
  path: string;
  tasks: Task[];
  setTriger: Function;
  bgColor: string;
  textColor: string;
  borderColor: string;
  progress: number;
  description: string;
}) => {
  const date = new Date(targetDate);
  const currentDate = new Date();
  const [openTask, setOpenTask] = useState(false);
  const taskCompleted = tasks.filter((task) => task.completed == true);
  const value = (taskCompleted.length / tasks.length) * 100;
  return (
    <div
      key={id}
      className="flex flex-col w-full p-[20px] border border-green-500"
    >
      <div className="flex w-full justify-between">
        <span
          className={` flex justify-center items-center w-[50px] h-[50px] ${borderColor}`}
        >
          <CircularProgressbar
            value={value}
            text={`${isNaN(value) ? "0" : value}%`}
            backgroundPadding={6}
            styles={buildStyles({
              textColor: text,
              textSize: "25px",
              pathColor: path,
              trailColor: "transparent",
            })}
          />
        </span>
        <p className={`text-[13px] mt-[10px] md:text-[15px] ${textColor} `}>
          {description}
        </p>
        <div
          className={`${
            date < currentDate ? "text-red-500" : `${textColor}`
          } flex gap-[5px] mt-[10px]  text-[12px] md:text-[14px] font-bold`}
        >
          <span>Deadline:</span>
          <div></div>
          <div className="flex gap-[5px]">
            <div>
              {date.getUTCHours()}:{date.getMinutes()}{" "}
            </div>
            |
            <div>
              {date && date?.getDate() / 10 < 1
                ? "0" + date?.getDate()
                : date?.getDate()}
              .
              {date && date?.getUTCMonth() + 1 / 10 < 1
                ? "0" + date?.getUTCMonth()
                : date && date?.getUTCMonth() + 1}
              .{date?.getUTCFullYear()}
            </div>
          </div>
        </div>
        <div
          onClick={() => {
            setOpenTask(!openTask);
          }}
        >
          {openTask ? (
            <ExpandLessIcon className="text-green-500" />
          ) : (
            <ExpandMoreIcon className="text-green-500" />
          )}
        </div>
      </div>
      <div className={`${openTask ? "flex" : "hidden"}`}>
        <GoalTask tasks={tasks} goalId={id} setTriger={setTriger} />
      </div>
    </div>
  );
};

export default GoalComponent;
