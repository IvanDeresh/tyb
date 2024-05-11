"use client";
import { useCompletetask } from "@/func/taskFunc";
import React from "react";
import DoneIcon from "@mui/icons-material/Done";
const TaskComponent = ({
  id,
  completed,
  description,
  setTrigger,
  deadline,
}: {
  id: string;
  completed: boolean;
  description: string;
  setTrigger: Function;
  deadline: Date;
}) => {
  const date = new Date(deadline);
  const currentDate = new Date();
  return (
    <div key={id} className="flex w-full justify-between ">
      <span
        onClick={() => {
          useCompletetask(id || "", setTrigger);
        }}
        className="border-2 flex justify-center items-center min-w-[20px] w-[20px] h-[20px] border-green-500"
      >
        {completed && <DoneIcon className="text-green-500" />}
      </span>
      <p className="text-[13px] md:text-[15px] text-green-500 ">
        {description}
      </p>
      <p
        className={`${
          date < currentDate ? "text-red-500" : "text-green-500"
        } flex gap-[5px] text-[12px] md:text-[14px] font-bold`}
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
      </p>
    </div>
  );
};

export default TaskComponent;
