import { logOut } from "../lib/firebase";

const SignOutButton = () => {
  return (
    <div>
      <button
        className="bg-blue-800 text-white p-3 rounded-lg"
        onClick={() => logOut()}
      >
        Sign Out
      </button>
    </div>
  );
};

export default SignOutButton;
