import Link from "next/link";
import { ReactMarkdown } from "react-markdown/lib/react-markdown";

const PostContent = ({ post }) => {
  const createdAt =
    typeof post?.createdAt === "number"
      ? new Date(post.createdAt)
      : post.createdAt.toDate();
  return (
    <div className="grid place-items-center mt-10">
      <div>
        <h1 className="text-5xl font-semibold mb-5">{post?.title}</h1>
        <span>
          Written By <Link className="font-medium" href={`/${post.username}`}>@{post.username}</Link>
          <br /> on {createdAt.toISOString()}
        </span>

        <ReactMarkdown className="mt-5 text-xl">{post?.content}</ReactMarkdown>
      </div>
    </div>
  );
};

export default PostContent;
