import { useRouter } from "next/router";
import { useState } from "react";
import { db, auth } from "../lib/firebase";
import { doc, serverTimestamp } from "firebase/firestore";
import { useDocumentDataOnce } from "react-firebase-hooks/firestore";
import PostForm from "./PostForm";
import Link from "next/link";

const PostManager = () => {
  const [preview, setPreview] = useState(false);

  const router = useRouter();
  const { slug } = router.query;

  const postRef = doc(db, "users", auth.currentUser.uid, "posts", `${slug}`);
  const [post] = useDocumentDataOnce(postRef);

  return (
    <div className="flex items-center gap-6 text-center max-w-xl mx-auto">
      {post && (
        <>
          <section>
            <h1 className="mt-4">{post.title}</h1>
            <p className="mb-4">ID: {post.slug}</p>

            <PostForm
              postRef={postRef}
              defaultValues={post}
              preview={preview}
            />
          </section>

          <aside className="flex flex-col gap-4">
            <h3 className="text-xl font-semibold">Tools</h3>
            <button
              className="py-2 px-3 bg-green-500 hover:bg-green-700 rounded-lg text-white"
              onClick={() => setPreview(!preview)}
            >
              {preview ? "Edit" : "Preview"}
            </button>
            <Link href={`/${post.username}/${post.slug}`}>
              <button className="py-2 px-3 bg-green-500 hover:bg-green-700 rounded-lg text-white">
                Live View
              </button>
            </Link>
          </aside>
        </>
      )}
    </div>
  );
};

export default PostManager;
