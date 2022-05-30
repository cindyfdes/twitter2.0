import React, { useEffect, useState } from "react";
import { commentBody, Tweet } from "../typings";
// import TimeAgo from "react-timeago";
import {
  ChatAlt2Icon,
  HeartIcon,
  SwitchHorizontalIcon,
  UploadIcon,
} from "@heroicons/react/outline";
import { fetchComments } from "../utilities/fetchComments";
import { Comment } from "../typings";
import { useSession } from "next-auth/react";
import { toast } from "react-hot-toast";
interface Props {
  tweet: Tweet;
}
const Tweet = ({ tweet }: Props) => {
  const { data: session } = useSession();
  const [comments, setComments] = useState<Comment[]>([]);
  const [commentBoxVisible, setCommentBoxVisible] = useState(false);
  const [input, setInput] = useState("");

  const insertComment = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const commentBody: commentBody = {
      comment: input,
      profileImg: session?.user?.image || "",
      tweetId: tweet._id,
      username: session?.user?.name || "unknown user",
    };
    const result = await fetch(`/api/addComment`, {
      body: JSON.stringify(commentBody),
      method: "POST",
    });
    const json = await result.json().then(() =>
      setTimeout(() => {
        toast("comment posted");
      }, 2000)
    );
    const newTweets = await fetchComments(tweet._id);
    setComments(newTweets);
    setInput("");
    setCommentBoxVisible(false);
    return json;
  };
  const refreshComments = async () => {
    console.log("in refresh comments");

    const comm: Comment[] = await fetchComments(tweet._id);
    console.log("inside func", comm, comm.length);
    setComments(comm);
  };
  useEffect(() => {
    refreshComments();
  }, []);
  console.log("comm from tsx", comments, "length", comments.length);

  return (
    <div className="flex flex-col border-y p-5 space-x-3 border-gray-100 ">
      <div className="  flex space-x-3 ">
        <img
          src={tweet.profileImage}
          alt="profile pic"
          className="h-10 w-10 rounded-full object-cover"
        />
        <div className="px-1 ">
          <div className="flex items-center space-x-1">
            <p className="font-bold mr-1">{tweet.username}</p>
            <p className="hidden text-gray-500 text-sm sm:inline">
              @{tweet.username?.replace(/\s+/g, "").toLowerCase()}.
            </p>
            {/* <TimeAgo
              date={tweet._createdAt}
              className="text-gray-500  text-sm"
            /> */}
          </div>
          <p>{tweet.text}</p>
          {tweet.image && (
            <img
              src={tweet.image}
              className="rounded-lg m-5 ml-0 mb-1 max-h-60 object-cover shadow-sm "
            />
          )}
        </div>
      </div>
      <div className="flex justify-between mt-5">
        <div className="flex cursor-pointer items-center space-x-3 text-gray-400">
          <ChatAlt2Icon
            className="h-5 w-5"
            onClick={() => setCommentBoxVisible(!commentBoxVisible)}
          />
          <p>{comments.length}</p>
        </div>
        <div className="flex cursor-pointer items-center  space-x-3 text-gray-400">
          <SwitchHorizontalIcon className="h-5 w-5" />
        </div>
        <div className="flex cursor-pointer items-center space-x-3 text-gray-400 ">
          <HeartIcon className="h-5 w-5" />
        </div>
        <div className="flex cursor-pointer items-center space-x-3 text-gray-400 ">
          <UploadIcon className="h-5 w-5" />
        </div>
      </div>
      {/* comment box */}
      {commentBoxVisible && (
        <form className="mt-3 flex space-x-3" onSubmit={insertComment}>
          <input
            type="text"
            className="flex-1 rounded-lg bg-gray-100 p-2 outline-none"
            placeholder="write a comment"
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />
          <button
            disabled={!input}
            type="submit"
            className="text-twitter disabled:text-gray-200"
          >
            Post
          </button>
        </form>
      )}
      {comments?.length > 0 && (
        <div className="my-2 mt-5 max-h-44 space-y-5 overflow-y-scroll scrollbar-hide border-t border-gray-100 p-5">
          {comments.map((comment) => (
            <div key={comment._id} className="relative flex space-x-2">
              <hr className="border-twitter border-x absolute h-8 top-7 left-5 mt-2" />
              <img
                src={comment.profileImg}
                className="h-7 w-7 rounded-full object-cover"
              />
              <div>
                <div className="flex items-center space-x-1">
                  <p className="font-bold mr-1">{comment.username}</p>
                  <p className="hidden lg:inline text-sm text-gray-500">
                    @{comment.username.replace(/\s+/g, "").toLowerCase()}
                  </p>
                </div>
                <p>{comment.comment}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Tweet;
