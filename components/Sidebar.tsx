import React from "react";
import {
  HomeIcon,
  HashtagIcon,
  SearchCircleIcon,
  BellIcon,
  MailIcon,
  BookmarkIcon,
  ViewListIcon,
  UserIcon,
  DotsCircleHorizontalIcon,
  CollectionIcon,
} from "@heroicons/react/outline";
import SidebarRow from "./SidebarRow";
import { useSession, signOut, signIn } from "next-auth/react";

export const Sidebar = () => {
  const { data: session } = useSession();
  return (
    <div className="flex flex-col col-span-2 items-center px-4 md:items-start m-3">
      <img src="https://links.papareact.com/drg" className="h-10 w-10"></img>
      <SidebarRow Icon={HomeIcon} title="Home" />
      <SidebarRow Icon={HashtagIcon} title="Explore" />
      <SidebarRow Icon={BellIcon} title="Notifications" />
      <SidebarRow Icon={MailIcon} title="Messages" />
      <SidebarRow Icon={BookmarkIcon} title="Bookmark" />
      <SidebarRow Icon={CollectionIcon} title="List" />
      <SidebarRow
        onClick={session ? signOut : signIn}
        Icon={UserIcon}
        title={session ? "sign out" : "Sign In"}
      />
      <SidebarRow Icon={DotsCircleHorizontalIcon} title="More" />
    </div>
  );
};
