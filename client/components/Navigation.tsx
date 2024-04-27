import React from "react";
import ListIcon from "@mui/icons-material/List";
import HistoryIcon from "@mui/icons-material/History";
import MovingIcon from "@mui/icons-material/Moving";
import SettingsIcon from "@mui/icons-material/Settings";
import Link from "next/link";

const Navigation = () => {
  return (
    <div className="border-l-2 border-[#dfdddd] h-[85vw] animate-fromRight gap-[50px] w-[200px] pt-[70px] flex  items-center flex-col">
      <h1 className="text-green-500 font-bold text-[25px]">Try your best</h1>
      <ul className="text-white text-[20px]">
        <Link href="/pages/skills" className="flex items-center gap-[10px]">
          <ListIcon />
          <p>Skills</p>
        </Link>
        <Link href="/pages/history" className="flex items-center gap-[10px]">
          <HistoryIcon />
          <p>History</p>
        </Link>
        <Link href="/pages/stats" className="flex items-center gap-[10px]">
          <MovingIcon />
          <p>Statistics</p>
        </Link>
        <Link href="/pages/settings" className="flex items-center gap-[10px]">
          <SettingsIcon />
          <p>Settings</p>
        </Link>
      </ul>
    </div>
  );
};

export default Navigation;
