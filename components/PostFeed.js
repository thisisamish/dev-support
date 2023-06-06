import PostItem from "../components/PostItem";

const PostFeed = ({ posts, admin }) => {
  return (
    <div className="flex-col">
      {posts ? (
        posts.map((post) => (
          <PostItem post={post} key={post.slug} admin={admin} />
        ))
      ) : (
        <p>No posts to show :(</p>
      )}
    </div>
  );
};

export default PostFeed;
