"use client";
import React from "react";
import axios from "axios";
import AddTask from "./components/AddTask";
const page = () => {
  return (
    <div className="h-screen">
      <div>
        <div>
          <AddTask />
        </div>
      </div>
    </div>
  );
};

export default page;
