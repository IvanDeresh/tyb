"use client";
import Image from "next/image";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import React, { useEffect, useState } from "react";
import { work, idea } from "@/assets/icon";
import axios from "axios";
import DoneIcon from "@mui/icons-material/Done";
import { useCompletetask, useUserTask } from "@/func/taskFunc";
import { User } from "@/types";
export default function Home() {
  const [user, setUser] = useState<User>();
  const [triger, setTriger] = useState(false);
  useEffect(() => {
    const userData = localStorage.getItem("user");
    if (userData) {
      setUser(JSON.parse(userData));
    }
  }, []);

  let task = useUserTask(user?._id || "", triger);
  const [showTasks, setShowTasks] = useState(false);
  const [showGoals, setShowGoals] = useState(false);
  const [showSkills, setShowSkills] = useState(false);
  return (
    <main className="flex min-h-screen flex-col items-start gap-[100px] p-24">
      <div className="flex min-h-[300px] max-md:flex-col max-md:gap-[50px] max-md:justify-center h-auto justify-around w-full">
        <div>
          <Image src={work} alt="" className="w-[200px]" />
          <h1 className="text-green-500 font-bold text-[20px]">
            Increase your productivity
          </h1>
          <p className="text-[#fff]">
            Increase performance for greater success
          </p>
        </div>
        <div>
          <Image src={idea} alt="" className="w-[200px] " />
          <h1 className="text-green-500  font-bold text-[20px]">
            Improve your skills
          </h1>
          <p className="text-[#fff]">
            Develop skills for greater professional growth
          </p>
        </div>
      </div>
      <div className="flex min-h-screen flex-col items-start gap-[50px]">
        <div className="relative">
          <h1 className="text-[30px] flex font-bold text-green-500">
            <p>Skills</p>
            <div
              className="text-[30px] "
              onClick={() => {
                setShowSkills(!showSkills);
              }}
            >
              {showSkills ? (
                <ExpandLessIcon className="text-[40px]" />
              ) : (
                <ExpandMoreIcon className="text-[40px]" />
              )}
            </div>
          </h1>
          <div>
            {showSkills && (
              <div className="min-h-[100px]  h-auto animate-fromTop1 border border-green-500 max-lg:w-[70vw] w-[60vw] flex items-center px-[20px] rounded-md">
                1
              </div>
            )}
          </div>
        </div>
        <div>
          <h1 className="text-[30px] flex font-bold text-green-500">
            <p>Tasks</p>
            <div
              className="text-[30px] "
              onClick={() => {
                setShowTasks(!showTasks);
              }}
            >
              {showTasks ? (
                <ExpandLessIcon className="text-[40px]" />
              ) : (
                <ExpandMoreIcon className="text-[40px]" />
              )}
            </div>
          </h1>
          <div>
            {showTasks && (
              <div className="min-h-[100px] p-[20px] gap-[40px] h-auto animate-fromTop2 border border-green-500 max-lg:w-[70vw] w-[60vw] flex flex-col  items-center px-[20px] rounded-md">
                {task.map((task) => {
                  const date = new Date(task.deadline);
                  const currentDate = new Date();

                  return (
                    <div key={task._id} className="flex w-full justify-around">
                      <span
                        onClick={() => {
                          useCompletetask(task?._id || "", setTriger);
                        }}
                        className="border-2 flex justify-center items-center w-[20px] h-[20px] border-green-500"
                      >
                        {task.completed && (
                          <DoneIcon className="text-green-500" />
                        )}
                      </span>
                      <p className="text-[13px] md:text-[15px] text-green-500 ">
                        {task.description}
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
                })}
              </div>
            )}
          </div>
        </div>
        <div>
          <h1 className="text-[30px] flex font-bold text-green-500">
            <p>Goals</p>
            <div
              className="text-[30px] "
              onClick={() => {
                setShowGoals(!showGoals);
              }}
            >
              {showGoals ? (
                <ExpandLessIcon className="text-[40px]" />
              ) : (
                <ExpandMoreIcon className="text-[40px]" />
              )}
            </div>
          </h1>
          <div>
            {showGoals && (
              <div className="min-h-[100px] h-auto animate-fromTop3 border border-green-500 max-lg:w-[70vw] w-[60vw] flex items-center px-[20px] rounded-md">
                1
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}
