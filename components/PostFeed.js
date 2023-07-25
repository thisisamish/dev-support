import PostItem from "../components/PostItem";

const PostFeed = ({ posts, admin }) => {
  return (
    <div className="flex-col mx-6">
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
