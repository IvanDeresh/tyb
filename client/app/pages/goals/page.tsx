"use client";
import GoalComponent from "@/components/GoalComponent";
import React, { useEffect, useState } from "react";
import { useUserGoals } from "@/func/goalFunc";
import { User } from "@/types";
import Button from "@/components/Button";
import GoalCreate from "@/components/GoalCreate";
const page = () => {
  const [user, setUser] = useState<User>();
  useEffect(() => {
    const userData = localStorage.getItem("user");
    if (userData) {
      setUser(JSON.parse(userData));
    }
  }, []);
  const [triger, setTriger] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  let goals = useUserGoals(user?._id || "", triger);
  return (
    <div className="h-auto relative flex flex-col p-20 gap-[50px]">
      <div
        className=""
        onClick={() => {
          setIsOpen(!isOpen);
        }}
      >
        <Button label={isOpen ? "CLOSE" : "CREATE"} height="h-[50px]" />
      </div>
      <div className="absolute left-[30%] top-[50px]">
        {isOpen && <GoalCreate setTrigger={setTriger} />}
      </div>
      <div className="min-h-[100px] h-auto border-[3px] rounded-md border-green-200 max-lg:w-[70vw] w-[60vw] flex flex-col gap-[30px] p-[20px] items-center px-[20px]">
        {goals.map((goal) => {
          return (
            <GoalComponent
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
      </div>
    </div>
  );
};

export default page;
