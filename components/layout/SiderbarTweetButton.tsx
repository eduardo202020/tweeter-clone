import useLoginModal from "@/hooks/useLoginModal";
import React, { useCallback } from "react";
import { FaFeather } from "react-icons/fa";
import { useRouter } from "next/router";
import { useSession } from "next-auth/react";

const SiderbarTweetButton = () => {
  const loginModal = useLoginModal();
  const router = useRouter();
  const { data: user } = useSession();

  const onOpen = useCallback(() => {
    if (!user?.user?.email) {
      return loginModal.onOpen();
    }
    router.push("/");
  }, [user?.user?.email, loginModal, router]);

  return (
    <div onClick={onOpen}>
      <div
        className="
      mt-6 
      lg:hidden 
      rounded-full 
      h-14 
      w-14
      p-4 
      flex 
      items-center 
      justify-center
    bg-sky-500 
      hover:opacity-80 
      transition 
      cursor-pointer"
      >
        <FaFeather size={24} color="white " />
      </div>
      <div className="mt-6 hidden lg:block px-4 py-2 rounded-full bg-sky-500 hover:opacity-90 cursor-pointer transition ">
        <p className="hidden lg:block text-center font-semibold text-white text-[20px]">
          Tweet
        </p>
      </div>
    </div>
  );
};

export default SiderbarTweetButton;
