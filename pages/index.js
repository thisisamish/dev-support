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
  Timestamp,
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
    <div className="mt-8 md:max-w-2xl mx-auto">
      <div className="border-2 rounded-2xl p-6 mb-4 bg-blue-600 text-white">
        <p className="text-2xl font-semibold mb-4">
          Hey there, stranger! Welcome to Dev Support. ✨
        </p>
        <p className="text-lg mb-4">
          I am Amish Verma, the developer of this blog. I am so excited that
          you're here.
          <br />
          You can begin by exploring posts here on the home page. If you wish to
          post your own blogs (which I highly recommend), head over to the Sign
          In button at the top of the page. You'll get to create your own unique
          username. When you're done, you can begin posting your own awesome
          blogs.
        </p>
        <p className="text-lg">
          I can't wait to read what truly awesome blog you'll write. 😀
        </p>
      </div>
      <PostFeed posts={posts} />
      {!loading && !postsEnd && (
        <button className="border-2 p-2 rounded-md" onClick={getMorePosts}>
          Load More...
        </button>
      )}
      <Loader show={loading} />
      {postsEnd && (
        <p className="mt-4 font-medium text-xl">You've reached the end!</p>
      )}
    </div>
  );
}
