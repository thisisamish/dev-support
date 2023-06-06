import { collectionGroup, doc, getDoc, getDocs } from "firebase/firestore";
import { db, getUserWithUsername, postToJSON } from "../../lib/firebase";
import { useDocumentData } from "react-firebase-hooks/firestore";
import PostContent from "../../components/PostContent";

export async function getStaticProps({ params }) {
  const { username, slug } = params;
  const userDoc = await getUserWithUsername(username);

  let post;
  let path;

  if (userDoc) {
    const postRef = doc(userDoc.ref, "posts", slug);
    post = postToJSON(await getDoc(postRef));
    path = postRef._path.segments;
  }

  return {
    props: { post, path },
    revalidate: 5000,
  };
}

export async function getStaticPaths() {
  const snapshot = await getDocs(collectionGroup(db, "posts"));

  const paths = snapshot.docs.map((doc) => {
    const { slug, username } = doc.data();
    return {
      params: { username, slug },
    };
  });

  return {
    paths,
    fallback: "blocking",
  };
}

const Post = (props) => {
  const [realtimePost] = useDocumentData(doc(db, ...props.path));

  const post = realtimePost || props.post;

  return (
    <div>
      <section>
        <PostContent post={post} />
      </section>
    </div>
  );
};

export default Post;
