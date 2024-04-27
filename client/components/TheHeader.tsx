"use client";
import React, { useState } from "react";
import { skill } from "@/assets/icon";
import Image from "next/image";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import Navigation from "./Navigation";
import { status } from "@/constant";
import Link from "next/link";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import ProfileWindow from "./ProfileWindow";

const TheHeader = () => {
  const [burderMenu, setBurgerMenu] = useState(false);
  const [profileWindow, setProfileWindow] = useState(false);
  return (
    <div className="border-b-2 border-[#dfdddd] max-lg:mx-[20px] h-[100px] relative flex items-center justify-between  ">
      <Link href="/">
        <Image src={skill} alt="skill" width={45} className="h-[45px]" />
      </Link>
      <div className="flex justify-between w-[35%]">
        <div className="flex items-center relative">
          <Link
            href="/pages/profile"
            passHref
            className="text-[16px] flex items-center font-bold cursor-pointer"
          >
            Ivan Deresh
          </Link>
          <div
            onClick={() => {
              setProfileWindow(!profileWindow);
            }}
          >
            {profileWindow ? <ExpandLessIcon /> : <ExpandMoreIcon />}
          </div>
        </div>
        <div className="absolute top-[120px] left-[20%]">
          {profileWindow && <ProfileWindow />}
        </div>

        <p className="hidden">
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
        </p>
      </div>
      <div
        onClick={() => setBurgerMenu(!burderMenu)}
        className="text-[#121212]"
      >
        {burderMenu ? <CloseIcon /> : <MenuIcon />}
      </div>
      <div className="absolute right-0 top-[100px]">
        {burderMenu && <Navigation />}
      </div>
    </div>
  );
};

export default TheHeader;
