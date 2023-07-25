import { logOut } from "../lib/firebase";
import { useRouter } from "next/router";

const SignOutButton = () => {
  const router = useRouter();

  return (
    <div>
      <button
        className="bg-blue-800 text-white p-3 rounded-lg"
        onClick={() => {
          logOut();
          router.push("/");
        }}
      >
        Sign Out
      </button>
    </div>
  );
};

export default SignOutButton;
