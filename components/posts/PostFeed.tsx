import usePosts from "@/hooks/usePosts";
import React from "react";
import type { Post } from "@prisma/client";
import PostItem from "./PostItem";

interface PostFeedProps {
  userId?: string;
}

const PostFeed: React.FC<PostFeedProps> = ({ userId }) => {
  const { data: posts = [] } = usePosts(userId);

  return (
    <>
      {posts.map((post) => (
        <PostItem userId={userId || ""} key={post.id} data={post} />
      ))}
    </>
  );
};

export default PostFeed;
