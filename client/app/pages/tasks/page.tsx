"use client";
import React, { useEffect, useState } from "react";

import AddTask from "./components/AddTask";
import Button from "@/components/Button";
import { User } from "@/types";
import { useUserTask } from "@/func/taskFunc";
import DoneIcon from "@mui/icons-material/Done";
import { useCompletetask } from "@/func/taskFunc";
const page = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [triger, setTriger] = useState(false);
  const [user, setUser] = useState<User>();
  useEffect(() => {
    const userData = localStorage.getItem("user");
    if (userData) {
      setUser(JSON.parse(userData));
    }
  }, []);
  let tasks = useUserTask(user?._id || "", triger);

  return (
    <div className="h-auto p-[100px] flex flex-col gap-[50px]">
      <div>
        <div
          onClick={() => {
            setIsOpen(!isOpen);
          }}
        >
          <Button
            label={isOpen ? "Close" : "Create"}
            bgColor="bg-blue-500"
            height="h-[50px]"
          />
        </div>
        {isOpen && (
          <div className="absolute left-[35%] top-[170px]">
            <AddTask setTrigger={setTriger} />
          </div>
        )}
      </div>
      <div className="min-h-[50vh] ">
        <div className="flex flex-col gap-[30px]">
          {tasks.map((task) => {
            const date = new Date(task.deadline);
            const currentDate = new Date();
            return (
              <div
                key={task._id}
                className="flex w-full border h-[80px] rounded-md items-center p-[20px] border-blue-200 justify-between"
              >
                <span
                  onClick={() => {
                    useCompletetask(task?._id || "", setTriger);
                  }}
                  className="border-2 flex justify-center items-center min-w-[20px] w-[20px] h-[20px] border-blue-500"
                >
                  {task.completed && <DoneIcon className="text-blue-500" />}
                </span>
                <p className="text-[13px] md:text-[15px] text-blue-500 ">
                  {task.description}
                </p>
                <p
                  className={`${
                    date < currentDate ? "text-red-500" : "text-blue-500"
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
          })}
        </div>
      </div>
    </div>
  );
};

export default page;
