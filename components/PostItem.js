import Link from "next/link";

const PostItem = ({ post }) => {
  return (
    <div>
      <Link href={`/${post.username}`}>
        <strong>By @{post.username}</strong>
      </Link>

      <Link href={`/${post.username}/${post.slug}`}>
        <h2>{post.title}</h2>
      </Link>
    </div>
  );
};

export default PostItem;
