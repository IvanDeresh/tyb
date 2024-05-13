"use client";
import React, { useState } from "react";
import Button from "./Button";
import axios from "axios";

const AddTaskGoal = ({
  id,
  setTrigger,
  goalId,
}: {
  id: number;
  goalId: string;
  setTrigger: Function;
}) => {
  const [title, setTitle] = useState("");
  const addTask = async () => {
    try {
      const response = await axios.post(
        `http://localhost:3001/goal/${goalId}/task`,
        {
          id: id.toString(),
          title: title,
          completed: false,
        }
      );

      setTitle("");
      setTrigger((prev: any) => !prev);
      console.log(response.data);
      return response.data;
    } catch (e) {
      console.error(e, "error");
    }
  };
  return (
    <div className="flex items-center gap-[30px]">
      <div className="flex flex-col w-[60%] max-w-[300px]">
        <label className="text-green-500 font-bold">title</label>
        <input
          value={title}
          onChange={(e: any) => {
            setTitle(e.target.value);
          }}
          placeholder="task ..."
          className="h-[40px] rounded-md pl-[20px] outline-none text-green-500"
        />
      </div>
      <div onClick={addTask}>
        <Button label="Add" width="w-[60px]" />
      </div>
    </div>
  );
};

export default AddTaskGoal;
