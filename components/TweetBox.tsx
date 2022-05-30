import React, { useState, useRef } from "react";
import {
  SearchCircleIcon,
  CalendarIcon,
  EmojiHappyIcon,
  LocationMarkerIcon,
  PhotographIcon,
} from "@heroicons/react/outline";
import { Tweet, TweetBody } from "../typings";
import { useSession } from "next-auth/react";
import { fetchTweets } from "../utilities/fetchTweets";
import toast from "react-hot-toast";
interface Props {
  setTweets: React.Dispatch<React.SetStateAction<Tweet[]>>;
}
const TweetBox = ({ setTweets }: Props) => {
  const { data: session } = useSession();
  const [input, setInput] = useState<string>("");
  const [imageUrlBoxOpen, setImageUrlBoxOpen] = useState(false);
  const [image, setImage] = useState("");
  const imageInputRef = useRef<HTMLInputElement>(null);
  const addImageToTweet = (
    e: React.MouseEvent<HTMLButtonElement, globalThis.MouseEvent>
  ) => {
    e.preventDefault();
    // prevent pafe from refreshing
    if (!imageInputRef.current?.value) return;
    setImage(imageInputRef.current.value);
    imageInputRef.current.value = "";
    setImageUrlBoxOpen(false);
  };
  const postTweet = async () => {
    const tweetBody: TweetBody = {
      text: input,
      username: session?.user?.name || "unknown user",
      profileImage: session?.user?.image || "",
      image,
    };
    const result = await fetch(`/api/addTweet`, {
      body: JSON.stringify(tweetBody),
      method: "POST",
    });
    const json = await result.json();
    const newTweets = await fetchTweets();
    setTweets(newTweets);
    toast("tweet posted");
    return json;
  };
  const handleSubmit = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    postTweet();
    setImage("");
    setInput("");
    setImageUrlBoxOpen(false);
  };
  return (
    <div className="flex space-x-2">
      <img
        src="https://links.papareact.com/gll"
        alt="feed image"
        className="h-14 w-14 rounded-full object-cover mt-4 "
      />
      <div className="flex flex-1 items-center pl-2">
        <form className="flex flex-1 flex-col">
          <input
            type="text"
            placeholder="What's Happening?"
            className="h-24 w-full text-xl outline-none"
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />

          <div className="flex items-center">
            <div className="flex space-x-2 text-twitter flex-1">
              <PhotographIcon
                onClick={() => {
                  setImageUrlBoxOpen(!imageUrlBoxOpen);
                }}
                className="h-5 w-5 cursor-pointer ease-out transition-transform duration-150 hover:scale-150"
              />
              <SearchCircleIcon className="h-5 w-5" />
              <EmojiHappyIcon className="h-5 w-5" />

              <CalendarIcon className="h-5 w-5" />
              <LocationMarkerIcon className="h-5 w-5" />
            </div>
            <button
              disabled={!input}
              className="bg-twitter font-bold px-4 py-2 rounded-full text-white disabled:opacity-40"
              onClick={handleSubmit}
            >
              Tweet
            </button>
          </div>
          {imageUrlBoxOpen && (
            <form className="flex rounded-lf mt-5 bg-twitter/80 py-2 px-4">
              <input
                ref={imageInputRef}
                type="text"
                placeholder="Enter image url"
                className="flex-1 bg-transparent p-2 text-white outline-none placeholder:text-white"
              />
              <button
                type="submit"
                onClick={(e) => addImageToTweet}
                className="font-bold text-white"
              >
                Add Image
              </button>
            </form>
          )}
          {image && <img src={image} className="" />}
        </form>
      </div>
    </div>
  );
};

export default TweetBox;
