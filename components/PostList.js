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
    <div>
      <p className="text-3xl font-bold md:max-w-4xl mx-4 md:mx-auto mt-12 mb-4 border-t pt-4">Manage Your Posts</p>
      <PostFeed posts={posts} admin />
    </div>
  );
};

export default PostList;
