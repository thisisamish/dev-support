import Link from "next/link";
import { Timestamp } from "firebase/firestore";

const PostItem = ({ post }) => {
  return (
    <div className="border-2 rounded-lg p-4 mb-4 hover:bg-gray-100">
      <Link
        className="text-3xl font-bold"
        href={`/${post.username}/${post.slug}`}
      >
        <h2>{post.title}</h2>
      </Link>
      <div>
        By
        <Link className="font-medium" href={`/${post.username}`}>
          {" "}
          @{post.username}
        </Link>
        <p>
          Published on{" "}
          {Timestamp.fromMillis(post.createdAt).toDate().toDateString()}
        </p>
      </div>
    </div>
  );
};

export default PostItem;
