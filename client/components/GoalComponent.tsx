import React from "react";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";

const GoalComponent = ({
  targetDate,
  id,
  progress,
  description,
  bgColor,
  text,
  path,
  textColor,
  borderColor,
}: {
  targetDate: Date;
  id: string;
  text: string;
  path: string;
  bgColor: string;
  textColor: string;
  borderColor: string;
  progress: number;
  description: string;
}) => {
  const date = new Date(targetDate);
  const currentDate = new Date();

  return (
    <div key={id} className="flex w-full justify-between">
      <span
        className={` flex justify-center items-center w-[50px] h-[50px] ${borderColor}`}
      >
        <CircularProgressbar
          value={progress}
          text={`${progress}%`}
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
      <p
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
      </p>
    </div>
  );
};

export default GoalComponent;
