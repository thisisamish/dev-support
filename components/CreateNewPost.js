import { useRouter } from "next/router";
import { useContext, useState } from "react";
import { UserContext } from "../lib/context";
import kebabCase from "lodash.kebabcase";
import { auth, db } from "../lib/firebase";
import { doc, serverTimestamp, setDoc } from "firebase/firestore";
import { toast } from "react-hot-toast";

const CreateNewPost = () => {
  const router = useRouter();
  const { username } = useContext(UserContext);
  const [title, setTitle] = useState("");

  const slug = encodeURI(kebabCase(title));

  const isValid = title.length > 3 && title.length < 100;

  const createPost = async (e) => {
    e.preventDefault();
    const uid = auth.currentUser.uid;
    const ref = doc(db, "users", uid, "posts", `${slug}`);

    const data = {
      title,
      slug,
      uid,
      username,
      published: false,
      content: "# hello world!",
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
    };

    await setDoc(ref, data);

    toast.success("Post created!");
    router.push(`/admin/${slug}`);
  };

  return (
    <form onSubmit={createPost} className="grid place-items-center">
      <input
        className="py-2 px-3 border-2 border-black rounded-lg mb-4 mt-4"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="My Awesome Article!"
      />
      <p>Slug: {slug}</p>
      <button
        className="py-2 px-3 bg-green-600 hover:bg-green-700 disabled:bg-green-400 text-white rounded-lg mt-2"
        type="submit"
        disabled={!isValid}
      >
        Create New Post
      </button>
    </form>
  );
};

export default CreateNewPost;
