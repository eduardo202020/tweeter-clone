import type { Post, User, Comment } from "@prisma/client";

export interface ITotalPost extends Post {
  user: User;
  comments: Comment[];
}
