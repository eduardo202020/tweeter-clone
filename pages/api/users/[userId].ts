import { NextApiRequest, NextApiResponse } from "next";
import prisma from "@/libs/prismadb";
import type { User } from "@prisma/client";

export interface UserAndCount extends User {
  followersCount: number;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<UserAndCount>
) {
  if (req.method !== "GET") {
    return res.status(405).end();
  }

  try {
    const { userId } = req.query;

    // validamos la existencia y tipado de userId

    if (!userId || typeof userId !== "string") {
      throw new Error("Invalid Id");
    }

    // buscamos al usuario

    const existingUser = await prisma.user.findUnique({
      where: {
        id: userId,
      },
    });
    if (!existingUser) {
      throw new Error("Invalid Id");
    }

    const followersCount = await prisma.user.count({
      where: {
        followingIds: {
          has: userId,
        },
      },
    });

    return res.status(200).json({ ...existingUser, followersCount });
  } catch (error) {
    console.log(error);
    return res.status(400).end();
  }
}
