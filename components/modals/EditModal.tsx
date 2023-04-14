import React, { useCallback, useEffect, useState } from "react";
import Input from "../Input";
import Modal from "../Modal";
import { useSession } from "next-auth/react";
import { toast } from "react-hot-toast";
import useUser from "@/hooks/useUser";
import useEditModal from "@/hooks/useEditeModal";
import axios from "axios";
import ImageUpload from "../ImageUpload";

type Variable = string | undefined | null;

const LoginModal = () => {
  const { data: currentUser } = useSession();
  // const { data: currentUser } = useCurrentUser();
  const { mutate: mutateFetchedUser, data: miUser } = useUser(
    currentUser?.user.id || ""
  );
  const editModal = useEditModal();

  const [profileImage, setProfileImage] = useState<Variable>("");
  const [coverImage, setCoverImage] = useState<Variable>("");
  const [name, setName] = useState<Variable>("");
  const [username, setUsername] = useState<Variable>("");
  const [bio, setBio] = useState<Variable>("");

  // al renderizarce el componente, se llenara los datos de cada input
  useEffect(() => {
    setProfileImage(miUser?.profileImage);
    setCoverImage(miUser?.coverImage);
    setName(miUser?.name);
    setUsername(miUser?.username);
    setBio(miUser?.bio);
  }, [
    miUser?.bio,
    miUser?.coverImage,
    miUser?.profileImage,
    miUser?.name,
    miUser?.username,
  ]);

  const [isLoading, setIsLoading] = useState(false);

  const onSubmit = useCallback(async () => {
    try {
      setIsLoading(true);
      // todo add log in

      await axios.patch("/api/edit/", {
        name,
        username,
        bio,
        coverImage,
        profileImage,
      });

      mutateFetchedUser();
      toast.success("Updated");

      setIsLoading(false);

      editModal.onClose();
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  }, [
    editModal,
    bio,
    username,
    coverImage,
    profileImage,
    name,
    mutateFetchedUser,
  ]);

  const bodyContent = (
    <div className="flex flex-col gap-4">
      <ImageUpload
        value={profileImage || ""}
        disabled={isLoading}
        onChange={(image) => setProfileImage(image || "")}
        label="Upload profile image"
      />
      <ImageUpload
        value={coverImage || ""}
        disabled={isLoading}
        onChange={(image) => setCoverImage(image)}
        label="Upload cover image"
      />
      <Input
        placeholder="Name"
        onChange={(e) => setName(e.target.value)}
        value={name || ""}
        disabled={isLoading}
      />
      <Input
        placeholder="Username"
        onChange={(e) => setUsername(e.target.value)}
        value={username || ""}
        disabled={isLoading}
      />
      <Input
        placeholder="Bio"
        onChange={(e) => setBio(e.target.value)}
        value={bio || ""}
        disabled={isLoading}
      />
    </div>
  );

  const footerContent = (
    <div className="text-neutral-400 text-center mt-4">
      <p className="">
        First time using Twitter?
        <span
          onClick={() => {}}
          className="ml-2 text-white cursor-pointer hover:underline"
        >
          Create an account
        </span>
      </p>
    </div>
  );

  return (
    <Modal
      disabled={isLoading}
      isOpen={editModal.isOpen}
      title="Edit your profile"
      actionLabel="Save"
      onClose={editModal.onClose}
      onSubmit={onSubmit}
      body={bodyContent}
      footer={footerContent}
    />
  );
};

export default LoginModal;
