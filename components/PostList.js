import { collection, orderBy, query } from "firebase/firestore";
import { db } from "../lib/firebase";
import { auth } from "../lib/firebase";
import { useCollection } from "react-firebase-hooks/firestore";
import PostFeed from "../components/PostFeed";

const PostList = () => {
  const postsRef = collection(db, "users", auth.currentUser.uid, "posts");
  const q = query(postsRef, orderBy("createdAt"));
  const [querySnapshot] = useCollection(q);

  const posts = querySnapshot?.docs.map((doc) => doc.data());

  return (
    <>
      <h1 className="text-3xl text-center m-4 font-bold">Manage Your Posts</h1>
      <PostFeed posts={posts} admin />
    </>
  );
};

export default PostList;
