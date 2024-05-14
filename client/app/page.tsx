"use client";
import Image from "next/image";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import React, { useEffect, useState } from "react";
import { work, idea } from "@/assets/icon";
import { useUserGoals } from "@/func/goalFunc";
import "react-circular-progressbar/dist/styles.css";
import { useUserTask } from "@/func/taskFunc";
import { User } from "@/types";
import { useUserSkill } from "@/func/skillsFunc";
import Link from "next/link";
import SkillComponent from "@/components/SkillComponent";
import TaskComponent from "@/components/TaskComponent";
import GoalComponent from "@/components/GoalComponent";
export default function Home() {
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
              <div className="min-h-[100px] p-[20px] gap-[40px] h-auto animate-fromTop2 border-2 rounded-md border-green-500 max-lg:w-[70vw] w-[60vw] flex flex-col  items-center px-[20px]">
                {skills.map((sk) => {
                  return (
                    <SkillComponent
                      pathColor="#22c55e"
                      text="#22c55e"
                      titles={sk.titles}
                      bgColor="bg-green-500"
                      textColor="text-green-500"
                      hourGoal={sk.hourGoal}
                      initialHourSpend={sk.initialHourSpend}
                      id={sk._id}
                      borderColor="border-green-600"
                    />
                  );
                })}
                <Link
                  href="/pages/skills"
                  className="w-full justify-start ml-[20px] hover:text-green-500 text-green-900 font-bold"
                >
                  create skill ...
                </Link>
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
              <div className="min-h-[100px] p-[20px] gap-[40px] h-auto animate-fromTop2 border-2 rounded-md border-green-500 max-lg:w-[70vw] w-[60vw] flex flex-col  items-center px-[20px]">
                {task.map((task) => {
                  return (
                    <TaskComponent
                      description={task.description}
                      deadline={task.deadline}
                      setTrigger={setTriger}
                      id={task._id}
                      completed={task.completed}
                    />
                  );
                })}
                <Link
                  href="/pages/tasks"
                  className="w-full justify-start ml-[20px] hover:text-green-500 text-green-900 font-bold"
                >
                  create task ...
                </Link>
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
              <div className="min-h-[100px] h-auto animate-fromTop3 border-2 rounded-md border-green-500 max-lg:w-[70vw] w-[60vw] flex flex-col gap-[30px] p-[20px] items-center px-[20px]">
                {goal.map((goal) => {
                  return (
                    <GoalComponent
                      setTriger={setTriger}
                      tasks={goal.tasks}
                      path="#22c55e"
                      text="#22c55e"
                      textColor="text-green-500"
                      borderColor="border-green-800"
                      bgColor="bg-green-500"
                      description={goal.description}
                      progress={goal.progress}
                      targetDate={goal.targetDate}
                      id={goal._id}
                    />
                  );
                })}
                <Link
                  href="/pages/goals"
                  className="w-full justify-start ml-[20px] hover:text-green-500 text-green-900 font-bold"
                >
                  create goal ...
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}
