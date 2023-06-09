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
    // obtenemos el target id
    const { userId } = req.body;

    const { currentUser } = await serverAuth(req, res);

    if (!userId || typeof userId !== "string" || !currentUser) {
      throw new Error("Invalid ID");
    }

    // obtenemos el usuario del target id
    const user = await prisma.user.findUnique({
      where: {
        id: userId,
      },
    });

    if (!user) {
      throw new Error("Invalid ID from api follow");
    }

    // obtenemos los followings del target
    let updatedFollowingIds = [...currentUser.followingIds];

    if (req.method === "POST") {
      updatedFollowingIds.push(userId);

      // NOTIFICATION PART START
      try {
        await prisma.notification.create({
          data: {
            body: `${currentUser.name}-followed you!`,
            userId,
          },
        });

        await prisma.user.update({
          where: {
            id: userId,
          },
          data: {
            hasNotification: true,
          },
        });
      } catch (error) {
        console.log(error);
      }
      // NOTIFICATION PART END
    }

    if (req.method === "PATCH") {
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

    return res.status(200).json(updatedUser);
  } catch (error) {
    console.log(error);
    return res.status(400).end();
  }
}
