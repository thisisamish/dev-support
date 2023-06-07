import AuthCheck from "../../components/AuthCheck";
import PostManager from "../../components/PostManager";

const AdminEditPost = () => {
  return (
    <div>
      <AuthCheck>
        <PostManager />
      </AuthCheck>
    </div>
  );
};

export default AdminEditPost;
