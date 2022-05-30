import { Comment } from "../typings";

export const fetchComments = async (tweetId: string) => {
  const res = await fetch(`/api/fetchComments?tweetId=${tweetId}`);
  const data = await res.json();
  const comments: Comment[] = data.comments;
  console.log(comments, "length", comments.length, res);
  return comments;
};
