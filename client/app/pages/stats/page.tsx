"use client";
import { useUserGoals } from "@/func/goalFunc";
import { useUserSkill } from "@/func/skillsFunc";
import { useUserTask } from "@/func/taskFunc";
import { User } from "@/types";
import React, { useEffect, useState } from "react";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
const page = () => {
  const [user, setUser] = useState<User>();
  useEffect(() => {
    const userData = localStorage.getItem("user");
    if (userData) {
      setUser(JSON.parse(userData));
    }
  }, []);
  const [triger, setTriger] = useState(false);
  let skills = useUserSkill(user?._id || "", triger);
  let task = useUserTask(user?._id || "", triger);
  let goal = useUserGoals(user?._id || "", triger) || [];
  const skillCompleted = skills.filter(
    (skill) => skill.initialHourSpend >= skill.hourGoal
  );

  const taskCompleted = task.filter((task) => task.completed == true);

  let totalTasks = 0;
  let completedTasks = 0;

  // Перебір усіх цілей
  goal.forEach((goal) => {
    // Додавання кількості завдань у загальну кількість
    totalTasks += goal.tasks.length;

    // Підрахунок кількості завершених завдань
    goal.tasks.forEach((task) => {
      if (task.completed) {
        completedTasks++;
      }
    });
  });

  // Обчислення відсотка завершення
  const skillsValue =
    skills.length > 0 ? (skillCompleted.length / skills.length) * 100 : 0;
  const tasksValue =
    task.length > 0 ? (taskCompleted.length / task.length) * 100 : 0;
  const completionPercentage =
    totalTasks > 0 ? (completedTasks / totalTasks) * 100 : 0;

  return (
    <div className="flex max-md:flex-col gap-[75px] md:justify-center max-md:items-center mt-[100px] px-[10px] h-screen">
      <span
        className={` flex flex-col gap-[10px] justify-center items-center max-sm:w-[200px] max-sm:h-[200px] sm:w-[150px] sm:h-[150px] md:w-[250px] md:h-[250px] border-pirple-700`}
      >
        <label className="text-[20px] font-bold text-[#a855f7]">Skills %</label>
        <CircularProgressbar
          value={skillsValue}
          text={`${isNaN(skillsValue) ? "0" : skillsValue}%`}
          backgroundPadding={6}
          styles={buildStyles({
            textColor: "#a855f7",
            textSize: "25px",
            pathColor: "#a855f7",
            trailColor: "transparent",
          })}
        />
      </span>
      <span
        className={` flex flex-col gap-[10px] justify-center items-center sm:w-[150px] max-sm:w-[200px] max-sm:h-[200px] sm:h-[150px] md:w-[250px] md:h-[250px] border-pirple-700`}
      >
        <label className="text-[20px] font-bold text-[#3b82f6]">Tasks %</label>
        <CircularProgressbar
          value={tasksValue}
          text={`${isNaN(tasksValue) ? "0" : tasksValue}%`}
          backgroundPadding={6}
          styles={buildStyles({
            textColor: "#3b82f6",
            textSize: "25px",
            pathColor: "#3b82f6",
            trailColor: "transparent",
          })}
        />
      </span>
      <span
        className={` flex flex-col gap-[10px] justify-center items-center sm:w-[150px] max-sm:w-[200px] max-sm:h-[200px] sm:h-[150px] md:w-[250px] md:h-[250px] border-pirple-700`}
      >
        <label className="text-[20px] font-bold text-[#22c55e]">Goals %</label>
        <CircularProgressbar
          value={completionPercentage}
          text={`${isNaN(completionPercentage) ? "0" : completionPercentage}%`}
          backgroundPadding={6}
          styles={buildStyles({
            textColor: "#22c55e",
            textSize: "25px",
            pathColor: "#22c55e",
            trailColor: "transparent",
          })}
        />
      </span>
    </div>
  );
};

export default page;
