import Link from "next/link";
import Image from "next/image";
import { Timestamp } from "firebase/firestore";

const PostItem = ({ post }) => {
  return (
    <div className="border-2 rounded-2xl p-5 mb-4 hover:bg-gray-100">
      <div className="flex gap-2 items-center mb-3">
        <Image
          src={post.photoURL}
          width={50}
          height={50}
          className="rounded-full border-2 border-black"
        />
        <div>
          <Link className="font-medium" href={`/${post.username}`}>
            {" "}
            @{post.username}
          </Link>
          <p className="text-gray-500">{Timestamp.fromMillis(post.createdAt).toDate().toDateString()}</p>
        </div>
      </div>
      <Link
        className="text-3xl font-bold"
        href={`/${post.username}/${post.slug}`}
      >
        <h2>{post.title}</h2>
      </Link>
    </div>
  );
};

export default PostItem;
