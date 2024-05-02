"use client";
import React from "react";
import ColorLensIcon from "@mui/icons-material/ColorLens";
import AddToDriveIcon from "@mui/icons-material/AddToDrive";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import HttpsIcon from "@mui/icons-material/Https";
import EmojiFlagsIcon from "@mui/icons-material/EmojiFlags";
import ThumbUpOffAltIcon from "@mui/icons-material/ThumbUpOffAlt";
import MessageIcon from "@mui/icons-material/Message";

const page = () => {
  return (
    <div className="h-auto mx-[20px] mt-[30px] ">
      <div className="">
        <h1 className="font-bold text-[25px] text-white">Settings</h1>
      </div>
      <div className="ml-[10px] mt-[20px] flex flex-col gap-[5px]">
        <h2 className="font-bold text-yellow-400">General</h2>
        <ul className="text-white leading-10">
          <li className="flex gap-[10px] items-center cursor-pointer">
            <ColorLensIcon />
            <span>Theme</span>
          </li>
          <li className="flex gap-[10px] items-center cursor-pointer">
            <AddToDriveIcon />
            <span>Backup</span>
          </li>
          <li className="flex gap-[10px] items-center cursor-pointer">
            <AccessTimeIcon />
            <span>Day start time</span>
          </li>
          <li className="flex gap-[10px] items-center cursor-pointer">
            <FavoriteBorderIcon />
            <span>support the Try your best application</span>
          </li>
        </ul>
      </div>
      <div className="ml-[10px] mt-[20px] flex flex-col gap-[5px]">
        <h2 className="font-bold text-yellow-400">About the app</h2>
        <ul className="text-white leading-10">
          <li className="flex gap-[10px] items-center cursor-pointer">
            <HttpsIcon />
            <span>Privacy Policy</span>
          </li>
          <li className="flex gap-[10px] items-center cursor-pointer">
            <EmojiFlagsIcon />
            <span>Open source software licenses</span>
          </li>
          <li className="flex gap-[10px] items-center cursor-pointer">
            <ThumbUpOffAltIcon />
            <span>Rate the app</span>
          </li>
          <li className="flex gap-[10px] items-center cursor-pointer">
            <MessageIcon />
            <span>Contact the developer</span>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default page;
