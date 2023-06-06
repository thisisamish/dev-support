import Loader from "../components/Loader";
import PostFeed from "../components/PostFeed";
import {
  collectionGroup,
  getDocs,
  limit,
  orderBy,
  query,
  where,
  startAfter,
  Timestamp
} from "firebase/firestore";
import { db, postToJSON } from "../lib/firebase";
import { useState } from "react";

const LIMIT = 4;

export async function getServerSideProps() {
  const postsQuery = query(
    collectionGroup(db, "posts"),
    where("published", "==", true),
    orderBy("createdAt", "desc"),
    limit(LIMIT)
  );

  const posts = (await getDocs(postsQuery)).docs.map(postToJSON);

  return {
    props: { posts },
  };
}

export default function Home(props) {
  const [posts, setPosts] = useState(props.posts);
  const [loading, setLoading] = useState(false);
  const [postsEnd, setPostsEnd] = useState(false);

  const getMorePosts = async () => {
    setLoading(true);
    const last = posts[posts.length - 1];
    const cursor =
      typeof last.createdAt === "number"
        ? Timestamp.fromMillis(last.createdAt)
        : last.createdAt;
    const q = query(
      collectionGroup(db, "posts"),
      where("published", "==", true),
      orderBy("createdAt", "desc"),
      startAfter(cursor),
      limit(LIMIT)
    );
    const newPosts = (await getDocs(q)).docs.map((doc) => doc.data());
    setPosts(posts.concat(newPosts));
    setLoading(false);
    if (newPosts.length < LIMIT) {
      setPostsEnd(true);
    }
  };

  return (
    <div className="w-[80vh] md:w-[60vh] mx-auto mt-10">
      <PostFeed posts={posts} />
      {!loading && !postsEnd && (
        <button onClick={getMorePosts}>Load More...</button>
      )}
      <Loader show={loading} />
      {postsEnd && <p className="mt-4 font-medium text-xl">You've reached the end!</p>}
    </div>
  );
}
