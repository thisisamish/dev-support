import PostItem from "../components/PostItem";

const PostFeed = ({ posts, admin }) => {
  return (
    <div className="md:max-w-4xl flex-col mx-4 md:mx-auto">
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
