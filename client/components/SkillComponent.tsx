"use client";
import { useUpdateSkill } from "@/func/skillsFunc";
import React, { useEffect, useState } from "react";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";

const SkillComponent = ({
  id,
  initialHourSpend,
  titles,
  hourGoal,
  bgColor,
  textColor,
  borderColor,
  text,
  pathColor,
}: {
  id: string;
  initialHourSpend: number;
  pathColor: string;
  text: string;
  titles: string;
  bgColor: string;
  textColor: string;
  hourGoal: number;
  borderColor: string;
}) => {
  const [seconds, setSeconds] = useState(0);
  const [timerRunning, setTimerRunning] = useState(false);
  const [finalHour, setFinalHour] = useState(10);
  const stopTimer = async (_id: string, initTime: number) => {
    setTimerRunning(false);
    console.log(finalHour);
    const updatedInitialHourSpend = initTime + finalHour; // Додати час з таймера до initialHourSpend
    await useUpdateSkill(_id, updatedInitialHourSpend); // Викликати useUpdateSkill з оновленим значенням initialHourSpend
    setSeconds(0);
    setFinalHour(0);
  };

  const startTimer = () => {
    setTimerRunning(true);
  };

  const updateFinalHour = () => {
    const totalHours = Math.floor(seconds / 3600);
    setFinalHour(totalHours);
  };

  useEffect(() => {
    let interval: NodeJS.Timeout;

    if (timerRunning) {
      interval = setInterval(() => {
        setSeconds((prevSeconds) => prevSeconds + 1);
      }, 1000);
    }

    return () => clearInterval(interval);
  }, [timerRunning]);

  useEffect(() => {
    updateFinalHour();
  }, [seconds]);

  const formatTime = () => {
    const hour = Math.floor((seconds % (3600 * 24)) / 3600);
    const minute = Math.floor((seconds % 3600) / 60);
    const second = seconds % 60;

    return `${10 > hour ? "0" + hour : hour}:${
      10 > minute ? "0" + minute : minute
    }:${10 > second ? "0" + second : second}`;
  };
  return (
    <div key={id} className="flex h-[80px] justify-between items-center w-full">
      <button
        className={`border-b-[4px] w-[150px] h-[40px] hover:translate-y-[-1px] ${borderColor} rounded-md text-[20px] font-bold text-white ${bgColor}`}
        onClick={() => {
          timerRunning ? stopTimer(id, initialHourSpend) : startTimer();
        }}
      >
        {seconds != 0 ? `${formatTime()}` : "Start"}
      </button>

      <div className={`font-bold ${textColor} text-[20px]`}>{titles}</div>
      <div
        className={` flex justify-center items-center w-[50px] h-[50px] ${borderColor}`}
      >
        <CircularProgressbar
          value={initialHourSpend}
          maxValue={hourGoal}
          text={`${initialHourSpend}/${hourGoal}`}
          backgroundPadding={6}
          styles={buildStyles({
            textColor: text,
            textSize: "25px",
            pathColor: pathColor,
            trailColor: "transparent",
          })}
        />
      </div>
    </div>
  );
};

export default SkillComponent;
