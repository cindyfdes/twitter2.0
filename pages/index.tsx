import type { GetServerSideProps, NextPage } from "next";
import Head from "next/head";
import { Toaster } from "react-hot-toast";
import Feed from "../components/Feed";
import { Sidebar } from "../components/Sidebar";
import Widgests from "../components/Widgests";
import styles from "../styles/Home.module.css";
import { Tweet } from "../typings";
import { fetchTweets } from "../utilities/fetchTweets";

interface Props {
  tweets: Tweet[];
}

const Home = ({ tweets }: Props) => {
  return (
    <div className="lg:max-w-6xl mx-auto max-h-screen overflow-hidden">
      {/* max-h-screen set content ot max height of screen so that you can scroll inside the container not the entire screen */}
      <Head>
        <title>Twitter 2.0</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Toaster />
      <main className="grid grid-cols-9">
        {/* left side */}
        <Sidebar />
        {/* Middle */}
        <Feed tweets={tweets} />
        <Widgests />
      </main>
    </div>
  );
};

export default Home;
export const getServerSideProps: GetServerSideProps = async (context) => {
  const tweets = await fetchTweets();
  return {
    props: {
      tweets,
    },
  };
};
