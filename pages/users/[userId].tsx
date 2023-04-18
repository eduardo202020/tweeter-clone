import React from "react";
import Header from "@/components/Header";
import useUser from "@/hooks/useUser";
import { useRouter } from "next/router";
import { ClipLoader } from "react-spinners";
import UserHero from "@/components/users/UserHero";
import UserBio from "@/components/users/UserBio";
import PostFeed from "@/components/posts/PostFeed";
import { useSession } from "next-auth/react";

const UserView = ({ id }: { id: string }) => {
  const router = useRouter();
  const { userId } = router.query;

  const { data, status } = useSession();

  if (status === "loading") {
    return (
      <div className="flex justify-center items-center h-full">
        <ClipLoader color="lightblue" size={80} />
      </div>
    );
  }

  return (
    <>
      <Header showBackArrow label={data?.user.name || "Not log in"} />
      <UserHero userId={userId as string} />
      <UserBio userId={userId as string} />
      <PostFeed userId={userId as string} />
    </>
  );
};

export default UserView;
