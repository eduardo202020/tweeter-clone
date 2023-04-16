import { NextApiResponse, NextApiRequest } from "next";

import prisma from "@/libs/prismadb";
import serverAuth from "@/libs/serverAuth";
import type { User } from "@prisma/client";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<User>
) {
  if (req.method !== "POST" && req.method !== "PATCH") {
    return res.status(405).end();
  }

  try {
    const { userId } = req.body;

    const { currentUser } = await serverAuth(req, res);
    console.log("mi id from api", userId);

    if (!userId || typeof userId !== "string") {
      throw new Error("Invalid ID");
    }

    const user = await prisma.user.findUnique({
      where: {
        id: userId,
      },
    });

    if (!user) {
      throw new Error("Invalid ID from api follow");
    }

    let updatedFollowingIds = [...(user.followingIds || [])];

    // console.log("updatedFollowingIds", updatedFollowingIds);
    console.log("updatedFollowingIds  before: ", updatedFollowingIds);

    if (req.method === "POST") {
      console.log("post");

      updatedFollowingIds.push(userId);
      console.log("updatedFollowingIds  after: ", updatedFollowingIds);
    }

    if (req.method === "PATCH") {
      console.log("patch");

      updatedFollowingIds = updatedFollowingIds.filter(
        (followingId) => followingId !== userId
      );
    }

    const updatedUser = await prisma.user.update({
      where: {
        id: currentUser.id,
      },
      data: {
        followingIds: updatedFollowingIds,
      },
    });
    console.log("updatedFollowingIds last", updatedFollowingIds);

    return res.status(200).json(updatedUser);
  } catch (error) {
    console.log(error);
    return res.status(400).end();
  }
}
