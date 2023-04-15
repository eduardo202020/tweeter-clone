import Form from "@/components/Form";
import Header from "@/components/Header";
import PostFeed from "@/components/posts/PostFeed";
import React from "react";

const index = (props: any) => {
  return (
    <>
      <Header label="Home" />
      <Form placeholder="What's happening" />
      <PostFeed />
    </>
  );
};

export default index;
