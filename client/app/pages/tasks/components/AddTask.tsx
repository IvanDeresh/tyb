"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import { User } from "@/types/index";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import dayjs from "dayjs";
import Button from "@/components/Button";

const AddTask = ({ setTrigger }: { setTrigger: Function }) => {
  const router = useRouter();
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
  const [description, setDescription] = useState("");
  const [deadline, setDeadline] = useState(dayjs()); // Використання dayjs() замість new Date()

  const handleSubmit = async (e: any) => {
    e.preventDefault();
  };
  const addTask = async () => {
    try {
      const response = await axios.post("http://localhost:3001/task", {
        userId: user?._id,
        description,
        deadline,
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
        <label className="font-bold text-blue-500">Description</label>
        <textarea
          value={description}
          onChange={(e: any) => {
            setDescription(e.target.value);
          }}
          className="h-[50px] w-[200px] font-bold text-blue-500 pl-5 outline-none rounded-md"
        />
      </div>
      <div className="w-[300px]">
        <label className="font-bold text-blue-500">Deadline</label>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DemoContainer components={["DateTimePicker"]}>
            <DateTimePicker
              sx={{ borderColor: "white" }}
              value={deadline}
              onChange={(newDate: any) => setDeadline(newDate)} // Оновлення значення deadline
            />
          </DemoContainer>
        </LocalizationProvider>
      </div>
      <div className="mt-[30px]" onClick={addTask}>
        <Button
          label="Add"
          bgColor="bg-blue-500"
          width="w-[75px]"
          height="h-[55px]"
        />
      </div>
    </form>
  );
};

export default AddTask;
