import Link from "next/link";

const PostItem = ({ post }) => {
  return (
    <div className="border-2 rounded-lg px-4 py-2 hover:bg-gray-100">
      <Link
        className="text-3xl font-bold"
        href={`/${post.username}/${post.slug}`}
      >
        <h2>{post.title}</h2>
      </Link>
      By
      <Link className="font-medium" href={`/${post.username}`}>
        {" "}
        @{post.username}
      </Link>
    </div>
  );
};

export default PostItem;
