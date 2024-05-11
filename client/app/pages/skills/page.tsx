"use client";
import Button from "@/components/Button";
import SkillComponent from "@/components/SkillComponent";
import SkillCreate from "@/components/SkillCreate";
import { useUserSkill } from "@/func/skillsFunc";
import { User } from "@/types";
import React, { useEffect, useState } from "react";

const page = () => {
  const [trigger, setTrigger] = useState(false);
  const [user, setUser] = useState<User>();
  const [isOpen, setIsOpen] = useState(false);
  useEffect(() => {
    const userData = localStorage.getItem("user");
    if (userData) {
      setUser(JSON.parse(userData));
    }
  }, []);
  let skills = useUserSkill(user?._id || "", trigger);
  return (
    <div className="h-auto  w-full flex flex-col gap-[50px] p-20 relative">
      <div
        onClick={() => {
          setIsOpen(!isOpen);
        }}
      >
        <Button
          bgColor="bg-purple-500"
          label={isOpen ? "CLOSE" : "CREATE"}
          height="h-[45px]"
        />
      </div>
      <div className="absolute top-[50px] left-[30%]">
        {isOpen && <SkillCreate setTrigger={setTrigger} />}
      </div>
      <div className="border-2 min-h-[300px] border-purple-200 flex flex-col px-[20px]">
        {skills.map((sk) => {
          return (
            <SkillComponent
              titles={sk.titles}
              text="#a855f7"
              borderColor="border-purple-800"
              pathColor="#a855f7"
              bgColor="bg-purple-500"
              textColor="text-purple-500"
              hourGoal={sk.hourGoal}
              initialHourSpend={sk.initialHourSpend}
              id={sk._id}
            />
          );
        })}
      </div>
    </div>
  );
};

export default page;
