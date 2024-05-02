"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import Button from "@/components/Button";
interface User {
  name: string;
  email: string;
  password: string;
  tasksDone: number;
  _id: string;
  createdAt: string;
  __v: number;
}

enum Month {}
const Page = () => {
  const router = useRouter();

  const [user, setUser] = useState<User | null>(null);
  useEffect(() => {
    if (localStorage.getItem("user") == undefined) {
      router.push("/pages/login");
    }
  }, []);

  useEffect(() => {
    const userData = localStorage.getItem("user");
    if (userData) {
      setUser(JSON.parse(userData));
    }
  }, []);
  var date = null;
  if (user && user.createdAt) {
    date = new Date(user.createdAt);
  }
  return (
    <div className="h-screen flex justify-center mt-[100px]">
      <div className="border-2 w-[400px] h-[500px] flex flex-col justify-center gap-[50px] items-center rounded-xl border-[#dfdddd]">
        <h1 className="text-green-500 font-bold text-[30px]">Profile</h1>
        <div className="flex justify-center items-start gap-3 flex-col">
          <h1 className="">
            <span className="text-[18px] font-bold text-green-500">Name:</span>{" "}
            <span className="text-[18px] font-bold text-[#bebdbd]">
              {user ? user.name : "No user found"}
            </span>
          </h1>
          <h2>
            <span className="text-[18px] font-bold text-green-500">Email:</span>{" "}
            <span className="text-[18px] font-bold text-[#bebdbd]">
              {user ? user.email : "No user found"}
            </span>
          </h2>
          <h3>
            <span className="text-[18px] font-bold text-green-500">
              Task done:
            </span>{" "}
            <span className="text-[18px] font-bold text-[#bebdbd]">
              {user ? user.tasksDone : "No user found"}
            </span>
          </h3>
          <h4>
            <span className="text-[18px] font-bold text-green-500">
              Created date:
            </span>{" "}
            <span className="text-[18px] font-bold text-[#bebdbd]">
              {date && date?.getDate()}.{date && date?.getUTCMonth() + 1}.
              {date?.getUTCFullYear()}
            </span>
          </h4>
          <div>
            <span className="text-[18px] font-bold text-green-500">
              Status:
            </span>
            <span className="text-[18px] font-bold text-[#bebdbd]"></span>
          </div>
        </div>
        <div
          className="hover:shadow-xl"
          onClick={() => {
            localStorage.removeItem("user");
            router.push("/");
          }}
        >
          <Button bgColor="bg-red-800" label="Logout" />
        </div>
      </div>
    </div>
  );
};

export default Page;
