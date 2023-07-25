import { signInWithGoogle } from "../lib/firebase";
import { useRouter } from "next/router";

const SignInButton = () => {
  const router = useRouter();

  return (
    <div className="mt-24">
      <button
        className="bg-blue-800 text-xl text-white px-5 py-4 rounded-lg"
        onClick={() => {
          signInWithGoogle();
          router.push("/");
        }}
      >
        Sign In With Google
      </button>
    </div>
  );
};

export default SignInButton;
