"use client";
import { User } from "@/types";
import axios from "axios";
import dayjs from "dayjs";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import Button from "./Button";
const GoalCreate = ({ setTrigger }: { setTrigger: Function }) => {
  const router = useRouter();
  const [description, setDescription] = useState("");
  const [targetDate, setTargetDate] = useState(dayjs());
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
  const addGoal = async () => {
    try {
      const response = await axios.post("http://localhost:3001/goal", {
        userId: user?._id,
        description,
        targetDate,
      });

      setDescription("");
      setTrigger((prev: any) => !prev);
      console.log(response.data);
      return response.data;
    } catch (e) {
      console.error(e, "error");
    }
  };
  return (
    <form className="flex items-center gap-[20px]">
      <div className="flex flex-col justify-center">
        <label className="font-bold text-green-500">Description</label>
        <textarea
          value={description}
          onChange={(e: any) => {
            setDescription(e.target.value);
          }}
          className="h-[50px] w-[200px] font-bold text-green-500 pl-5 outline-none rounded-md"
        />
      </div>
      <div className="w-[300px]">
        <label className="font-bold text-green-500">Deadline</label>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DemoContainer components={["DateTimePicker"]}>
            <DateTimePicker
              sx={{ borderColor: "white" }}
              value={targetDate}
              onChange={(newDate: any) => setTargetDate(newDate)} // Оновлення значення deadline
            />
          </DemoContainer>
        </LocalizationProvider>
      </div>
      <div className="mt-[30px]" onClick={addGoal}>
        <Button label="Add" bgColor="" width="w-[75px]" height="h-[55px]" />
      </div>
    </form>
  );
};

export default GoalCreate;
