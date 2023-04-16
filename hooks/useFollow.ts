import useUser from "./useUser";
import useLoginModal from "./useLoginModal";
import useCurrentUser from "./useCurrentUser";
import { useCallback, useMemo } from "react";
import { toast } from "react-hot-toast";
import axios from "axios";

const useFollow = (userId: string) => {
  const { data: currentUser, mutate: mutateCurrentUser } = useCurrentUser();
  const { mutate: mutateFechedUser } = useUser(userId);

  const loginModal = useLoginModal();

  const isFollowing = useMemo(() => {
    const list = currentUser?.followingIds || [];
    return list.includes(userId);
  }, [currentUser, userId]);

  const toggleFollow = useCallback(async () => {
    if (!currentUser) {
      return loginModal.onOpen();
    }

    try {
      let request;
      console.log("userId from useFollow", userId);

      if (isFollowing) {
        console.log("patch from use follow");

        request = () => axios.patch("/api/follow", { userId });
      } else {
        request = () => axios.post("/api/follow", { userId });
      }

      await request();
      mutateCurrentUser();
      mutateFechedUser();
      toast.success("Success");
    } catch (error) {
      toast.error("Something went wrong");
    }
  }, [
    currentUser,
    isFollowing,
    loginModal,
    mutateCurrentUser,
    mutateFechedUser,
    userId,
  ]);

  return {
    isFollowing,
    toggleFollow,
  };
};

export default useFollow;
