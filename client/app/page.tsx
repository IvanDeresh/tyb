"use client";
import Image from "next/image";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import React, { useState } from "react";
import { work, ssssss, idea } from "@/assets/icon";

export default function Home() {
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
              <div className="min-h-[100px]  h-auto animate-fromTop2 border border-green-500 max-lg:w-[70vw] w-[60vw] flex items-center px-[20px] rounded-md">
                1
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
