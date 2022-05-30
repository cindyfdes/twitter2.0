import { SearchIcon } from "@heroicons/react/outline";
import React from "react";
import { TwitterTimelineEmbed } from "react-twitter-embed";

const Widgests = () => {
  return (
    <div className=" mt-2 px-2 hidden  lg:inline col-span-2">
      {/* Search */}
      <div className="flex items-center space-x-2  rounded-full p-3 mt-2">
        <SearchIcon className="h-5 w-5 text-gray-400" />
        <input
          type="text"
          placeholder="Search Twitter"
          className="bg-transparent flex-1 outline-none "
        />
      </div>
      <TwitterTimelineEmbed
        sourceType="profile"
        screenName="sonnysangha"
        options={{ height: 1000 }}
      />
    </div>
  );
};

export default Widgests;
