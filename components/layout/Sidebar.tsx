import React from "react";
import { BsHouseFill, BsBellFill } from "react-icons/bs";
import { FaUser } from "react-icons/fa";
import SidebarLogo from "./SidebarLogo";
import SidebarItem from "./SidebarItem";
import { BiLogOut } from "react-icons/bi";
import SiderbarTweetButton from "./SiderbarTweetButton";
import { signOut, useSession } from "next-auth/react";

const Sidebar = () => {
  const { data: currentUser } = useSession();

  const items = [
    {
      label: "Home",
      href: "/",
      icon: BsHouseFill,
    },
    {
      label: "Notifications",
      href: "/notifications",
      icon: BsBellFill,
      auth: true,
    },
    {
      label: "Profile",
      href: `/users/${currentUser?.user.id}`,
      icon: FaUser,
      auth: true,
    },
  ];

  return (
    <div className="col-span-1 h-full pr-4 md:pr-6 ">
      <div className=" flex flex-col items-end">
        <div className=" space-y-2 lg:w-[230px]">
          <SidebarLogo />
          {items.map((item) => (
            <SidebarItem
              key={item.href}
              href={item.href}
              icon={item.icon}
              label={item.label}
              auth={item.auth}
            />
          ))}
          {!!currentUser?.user && (
            <SidebarItem
              href="/"
              icon={BiLogOut}
              label="Logout"
              onClick={signOut}
            />
          )}
          <SiderbarTweetButton />
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
