import useLoginModal from "@/hooks/useLoginModal";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { FC, useCallback } from "react";
import { IconType } from "react-icons";

interface SidebarProps {
  icon: IconType;
  href: string;
  label: string;
  onClick?: () => void;
  auth?: boolean;
}

const SidebarItem: FC<SidebarProps> = ({
  icon: Icon,
  href,
  label,
  onClick,
  auth,
}) => {
  const router = useRouter();
  const loginModal = useLoginModal();
  const { data } = useSession();

  const handleClick = useCallback(() => {
    if (onClick) {
      return onClick();
    }

    if (auth && !data?.user?.email) {
      loginModal.onOpen();
    } else {
      router.push(href);
    }
  }, [href, onClick, router, auth, loginModal, data?.user?.email]);

  return (
    <div className="flex flex-row items-center" onClick={handleClick}>
      <div className="relative rounded-full h-14 w-14 flex items-center justify-center p-4 hover:bg-opacity-10 hover:bg-slate-300 cursor-pointer lg:hidden">
        <Icon size={28} color="white" />
      </div>
      <div className="relative hidden lg:flex items-center gap-4 p-4 rounded-full hover:bg-slate-300/10 cursor-pointer">
        <Icon size={28} color="white" />
        <p className="text-white hidden lg:block text-xl"> {label}</p>
      </div>
    </div>
  );
};

export default SidebarItem;
