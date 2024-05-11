"use client";
import { User } from "@/types";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Button from "./Button";
const SkillCreate = ({ setTrigger }: { setTrigger: Function }) => {
  const router = useRouter();
  const [title, setTitles] = useState("");
  const [hourGoal, setHourGoal] = useState(0);
  const [user, setUser] = useState<User | null>(null);
  useEffect(() => {
    if (localStorage.getItem("user") == null) {
      router.push("/pages/login");
      alert("login first");
    }
  }, []);
  useEffect(() => {
    const userData = localStorage.getItem("user");
    if (userData) {
      setUser(JSON.parse(userData));
    }
  }, []);
  const addSkill = async () => {
    try {
      const response = await axios.post("http://localhost:3001/skill", {
        userId: user?._id,
        titles: title,
        hourGoal,
      });

      setTitles("");
      setTrigger((prev: any) => !prev);
      console.log(response.data);
      return response.data;
    } catch (e) {
      console.error(e, "error");
    }
  };
  return (
    <form className="flex items-center  gap-[20px]">
      <div className="flex flex-col justify-center">
        <label className="text-purple-500 font-bold">Description</label>
        <textarea
          value={title}
          onChange={(e: any) => {
            setTitles(e.target.value);
          }}
          className="h-[50px] w-[200px] font-bold text-purple-500 pl-5 outline-none rounded-md"
        />
      </div>
      <div className="flex flex-col w-[300px]">
        <label className="text-purple-500 font-bold">Hour Goal</label>
        <input
          value={hourGoal}
          onChange={(e: any) => {
            setHourGoal(e.target.value);
          }}
          className="h-[50px] w-[200px] font-bold text-purple-500 pl-5 outline-none rounded-md"
        />
      </div>
      <div className="mt-[22px]" onClick={addSkill}>
        <Button
          label="Add"
          bgColor="bg-purple-500"
          width="w-[75px]"
          height="h-[50px]"
        />
      </div>
    </form>
  );
};

export default SkillCreate;
