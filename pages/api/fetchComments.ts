// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { Comment, Tweet } from "../../typings";
import { groq } from "next-sanity";
import { sanityClient } from "../../sanity";

type Data = {
  comments: Comment[];
};

const commentQuery = groq`*[_type=="comment" && references(*[_type=='tweet' && _id==$tweetId]._id)]
{
  _id,
  ...
}| order(_createdAt desc)`;

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const { tweetId } = req.query;
  const comments: Comment[] = await sanityClient.fetch(commentQuery, {
    tweetId,
  });
  console.log("comments in api", comments);

  res.status(200).json({ comments });
}
