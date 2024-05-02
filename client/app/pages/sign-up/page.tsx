"use client";
import Button from "@/components/Button";
import Link from "next/link";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";

const page = () => {
  const router = useRouter();
  useEffect(() => {
    if (localStorage.getItem("user") != undefined) {
      router.push("/pages/profile");
    }
  }, []);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const handleSubmit = async (event: any) => {
    event.preventDefault();
    try {
      const response = await axios.post("http://localhost:3001/user/create", {
        name: name,
        email: email,
        password: password,
      });
      console.log(response.data.user);
      localStorage.setItem("user", JSON.stringify(response.data.user));
      router.push("/pages/profile");
    } catch (e) {
      console.log("Error", e);
    }
  };
  return (
    <div className="h-screen flex justify-center mt-[100px]">
      <form
        onSubmit={handleSubmit}
        className="w-[400px] h-[500px] rounded-lg flex flex-col justify-center max- animate-fromTop items-center border-2 border-[#dfdddd]"
      >
        <h1 className="text-green-500 font-bold text-[30px]">Sign-up</h1>
        <div className="flex flex-col gap-[20px]">
          <div className="flex flex-col">
            <label className="text-[15px] font-bold text-green-500">Name</label>
            <input
              type="text"
              value={name}
              name="name"
              onChange={(e) => {
                setName(e.target.value);
              }}
              className="h-[35px] text-[#b9b8b8] w-[250px] rounded-md bg-[#faf7f7] outline-none pl-[10px]"
            />
          </div>
          <div className="flex flex-col">
            <label className="text-[15px] font-bold text-green-500">
              Email
            </label>
            <input
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
              }}
              type="email"
              name="email"
              className="h-[35px] text-[#b9b8b8] w-[250px] rounded-md bg-[#faf7f7] outline-none pl-[10px]"
            />
          </div>
          <div className="flex flex-col">
            <label className="text-[15px] font-bold text-green-500">
              Password
            </label>
            <input
              onChange={(e) => {
                setPassword(e.target.value);
              }}
              value={password}
              type="password"
              name="password"
              className="h-[35px] text-[#b9b8b8] w-[250px] rounded-md bg-[#faf7f7] outline-none pl-[10px]"
            />
          </div>
        </div>
        <div className="mt-[20px]">
          <button
            type="submit"
            className="text-white w-[150px] h-[35px] rounded-lg border-b-2 border-green-800 bg-green-500"
          >
            Sign up
          </button>
        </div>
        <Link
          href="/pages/login"
          className="mt-[40px] hover:shadow-lg shadow-slate-500 text-green-500 font-bold bg-white border-slate-500 border-b-[2px] w-[100px] h-[35px] rounded-md flex justify-center items-center"
        >
          Login
        </Link>
      </form>
    </div>
  );
};

export default page;
