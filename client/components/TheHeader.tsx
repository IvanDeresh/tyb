"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import Navigation from "./Navigation";
import { status } from "@/constant";
import Link from "next/link";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import ProfileWindow from "./ProfileWindow";
import Button from "./Button";
import favicon from "../app/favicon.ico";
interface User {
  name: string;
  email: string;
  password: string;
  tasksDone: number;
  _id: string;
  createdAt: string;
  __v: number;
}

const TheHeader = () => {
  const [burderMenu, setBurgerMenu] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  useEffect(() => {
    const userData = localStorage.getItem("user");
    if (userData) {
      setUser(JSON.parse(userData));
    }
  }, []);
  const [profileWindow, setProfileWindow] = useState(false);
  return (
    <div className="border-b-2 border-[#dfdddd] max-lg:mx-[20px] h-[100px] relative flex items-center justify-between  ">
      <Link href="/">
        <Image src={favicon} alt="skill" width={45} className="h-[45px]" />
      </Link>
      <div className="flex justify-between w-[35%]">
        <div className="flex justify-center w-[100%]">
          {user != null ? (
            <div>
              <div className="flex text-green-500  items-center relative">
                <Link
                  href="/pages/profile"
                  className="text-[16px] flex items-center font-bold cursor-pointer"
                >
                  {user.name}
                </Link>
                <div
                  onClick={() => {
                    setProfileWindow(!profileWindow);
                    setBurgerMenu(false);
                  }}
                >
                  {profileWindow ? <ExpandLessIcon /> : <ExpandMoreIcon />}
                </div>
              </div>
              <div className="absolute top-[120px] left-[25%]">
                {profileWindow && <ProfileWindow />}
              </div>
            </div>
          ) : (
            <Link href="/pages/sign-up">
              <Button
                label="Sign up"
                textColor="text-white"
                width="w-[150px]"
                height="h-[35px]"
                bgColor="bg-green-500"
              />
            </Link>
          )}
        </div>

        <div className="hidden">
          {status.map((stat) => (
            <span
              key={stat.id}
              className={`font-bold text-[16px] flex ${
                stat.id == 1
                  ? "text-red-700"
                  : stat.id == 2
                  ? "text-orange-600"
                  : stat.id == 3
                  ? "text-green-400"
                  : "text-purple-800"
              }`}
            >
              <p>{stat.title}</p>
              <Image
                src={stat.icons}
                alt={stat.title}
                className="w-[35px] h-[35px]"
              />
            </span>
          ))}
        </div>
      </div>
      <div
        onClick={() => {
          setBurgerMenu(!burderMenu);
          setProfileWindow(false);
        }}
        className="text-green-500"
      >
        {burderMenu ? (
          <CloseIcon className="font-bold text-[35px]" />
        ) : (
          <MenuIcon className="font-bold text-[35px]" />
        )}
      </div>
      <div className="absolute right-0 top-[100px]">
        {burderMenu && <Navigation />}
      </div>
    </div>
  );
};

export default TheHeader;
