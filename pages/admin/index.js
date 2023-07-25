import AuthCheck from "../../components/AuthCheck";
import PostList from "../../components/PostList";
import CreateNewPost from "../../components/CreateNewPost";

const AdminPage = (props) => {
  return (
    <AuthCheck>
      <CreateNewPost />
      <PostList />
    </AuthCheck>
  );
};

export default AdminPage;
