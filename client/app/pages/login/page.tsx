"use client";
import Button from "@/components/Button";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import axios from "axios";
const Page = () => {
  const router = useRouter();
  const UserData = localStorage.getItem("user");
  useEffect(() => {
    if (UserData != undefined) {
      router.push("/pages/profile");
    }
  }, []);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const handleSubmit = async (e: any) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:3001/user/login", {
        email: email,
        password: password,
      });
      console.log(response.data.user);
      localStorage.setItem("user", JSON.stringify(response.data.user));
      router.push("/pages/profile");
    } catch (error) {
      console.error("Error:", error);
    }
  };
  return (
    <div className="h-screen flex justify-center mt-[100px]">
      <form
        onSubmit={handleSubmit}
        className="w-[400px] h-[500px] rounded-lg flex flex-col justify-center max- animate-fromTop items-center border-2 border-[#dfdddd]"
      >
        <h1 className="text-green-500 font-bold text-[30px]">Login</h1>
        <div className="flex flex-col gap-[20px]">
          <div className="flex flex-col">
            <label className="text-[15px] font-bold text-green-500">
              Email
            </label>
            <input
              value={email}
              name="email"
              type="email"
              onChange={(e) => {
                setEmail(e.target.value);
              }}
              className="h-[35px] text-[#b9b8b8] w-[250px] rounded-md bg-[#faf7f7] outline-none pl-[10px]"
            />
          </div>
          <div className="flex flex-col">
            <label className="text-[15px] font-bold text-green-500">
              Password
            </label>
            <input
              value={password}
              type="password"
              name="password"
              onChange={(e) => {
                setPassword(e.target.value);
              }}
              className="h-[35px] text-[#b9b8b8] w-[250px] rounded-md bg-[#faf7f7] outline-none pl-[10px]"
            />
          </div>
        </div>
        <div className="mt-[20px]">
          <button
            type="submit"
            className="text-white w-[150px] h-[35px] rounded-lg border-b-2 border-green-800 bg-green-500"
          >
            Login
          </button>
        </div>
        <Link
          href="/pages/sign-up"
          className="mt-[40px] hover:shadow-lg shadow-slate-500 text-green-500 font-bold bg-white border-slate-500 border-b-[2px] w-[100px] h-[35px] rounded-md flex justify-center items-center"
        >
          Sign-up
        </Link>
      </form>
    </div>
  );
};

export default Page;
