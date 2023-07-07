import { db } from "@/lib/firebaseConfig";
import { ScheduleType } from "@/typings/app";
import { ReminderValidator } from "@/validators";
import { addDoc, collection } from "firebase/firestore";
import { NextApiRequest, NextApiResponse } from "next";
import { z } from "zod";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "POST") {
    const body: ScheduleType & { userId: string } = req.body;

    return res.status(201).json({});
  }
  //   if (req.method === "GET") {
  //     const userId = req.headers.authorization;
  //     const schedules: ScheduleType[] = collection(db, "schedules") ?? [];
  //     return res.status(200).json({});
  //   }

  return res.status(405).json({ message: "Method not allowed" });
};

export default handler;
