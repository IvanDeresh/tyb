import axios from "axios";
import { useEffect, useState } from "react";
import { Skill } from "@/types";
export const useUserSkill = (id: string, triger: boolean) => {
  const [skill, setSkill] = useState<Skill[]>([]);
  useEffect(() => {
    const fetchSkill = async () => {
      try {
        if (id) {
          const response = await axios.get(`http://localhost:3001/skill/${id}`);
          setSkill(response.data);
        }
      } catch (error) {
        console.error("Failed to fetch user skill data", error);
      }
    };

    fetchSkill();
  }, [id, triger]);

  return skill;
};
export const useUpdateSkill = async (id: string, body: Partial<Skill>) => {
  try {
    const response = await axios.patch(`http://localhost:3001/skill/${id}`, {
      body,
    });
    return response.data;
  } catch (error) {
    console.error("Failed to fetch user skill data", error);
  }
};
