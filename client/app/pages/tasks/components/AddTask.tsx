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

const AddTask = () => {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const addTask = async () => {
    try {
      const response = await axios.post("http://localhost:3001/task", {
        userId: user?._id,
        description,
        deadline,
      });
      console.log(response.data);
      return response.data;
    } catch (e) {
      console.error(e, "error");
    }
  };
  useEffect(() => {
    if (localStorage.getItem("user") == null) {
      router.push("/");
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

  return (
    <main className="flex flex-col items-center">
      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-[20px] py-[50px] items-center mt-[100px] border-2 border-[#dfdddd] h-[400px] w-[350px] rounded-xl "
      >
        <div className="flex flex-col w-[300px]">
          <label className="text-blue-500 font-bold text-[20px]">User Id</label>
          <div className="w-[300px] flex justify-center items-center cursor-pointer bg-[#d4d4d8] h-[35px] rounded-lg pl-[10px] outline-none text-white">
            {user?._id}
          </div>
        </div>
        <div className="flex flex-col w-[300px]">
          <label className="text-blue-500 font-bold text-[20px]">
            Description
          </label>
          <input
            type="text"
            name="description"
            className="w-[300px] h-[35px] rounded-lg pl-[10px] outline-none text-[#dfdddd]"
            placeholder="Do . . ."
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>
        <div className="w-[300px]">
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DemoContainer components={["DateTimePicker"]}>
              <DateTimePicker
                label="Deadline"
                sx={{ borderColor: "white" }}
                value={deadline}
                onChange={(newDate: any) => setDeadline(newDate)} // Оновлення значення deadline
              />
            </DemoContainer>
          </LocalizationProvider>
        </div>
        <button
          className="text-white w-[150px] h-[35px] rounded-lg border-b-2 border-blue-800 bg-blue-500"
          type="submit"
          onClick={addTask}
        >
          Add
        </button>
      </form>
    </main>
  );
};

export default AddTask;
