import Link from "next/link";
import Image from "next/image";
import { ReactMarkdown } from "react-markdown/lib/react-markdown";

const PostContent = ({ post }) => {
  const createdAt =
    typeof post?.createdAt === "number"
      ? new Date(post.createdAt).toDateString()
      : post.createdAt.toDate().toDateString();

  return (
    <div className="sm:max-w-5xl mx-4 mt-8 sm:mx-auto border-2 border-gray-200 p-6 rounded-2xl">
      <div className="flex gap-2 items-center mb-5 pb-3 border-b">
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
          <p className="text-gray-500">{createdAt}</p>
        </div>
      </div>
      <h1 className="text-5xl font-semibold mb-5">{post?.title}</h1>
      <ReactMarkdown className="text-xl">{post?.content}</ReactMarkdown>
    </div>
  );
};

export default PostContent;
