import { signInWithGoogle } from "../lib/firebase";

const SignInButton = () => {
  return (
    <div>
      <button
        className="bg-blue-800 text-white p-3 rounded-lg"
        onClick={() => signInWithGoogle()}
      >
        Sign In With Google
      </button>
    </div>
  );
};

export default SignInButton;
