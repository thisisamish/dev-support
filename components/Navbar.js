import Link from "next/link";
import { useContext } from "react";
import { UserContext } from "../lib/context";
import SignOutButton from "./SignOutButton";

const Navbar = () => {
  const { user, username } = useContext(UserContext);
  
  return (
    <nav className="flex justify-between p-5 text-xl border-b-2">
      <div>
        <Link href="/">
          <button className="bg-black font-bold text-white p-3 rounded-lg">
            DEV SUPPORT
          </button>
        </Link>
      </div>
      <ul className="flex gap-4">
        {username && (
          <>
            <li>
              <SignOutButton />
            </li>
            <li>
              <Link href="/admin">
                <button className="bg-blue-800 text-white p-3 rounded-lg">
                  Write Posts
                </button>
              </Link>
            </li>
            <li>
              <Link href={`/${username}`}>
                <img
                  className="border-2 border-blue-400 hover:border-blue-600 w-14 aspect-square object-cover rounded-full"
                  src={user?.photoURL}
                  alt=""
                />
              </Link>
            </li>
          </>
        )}

        {!username && (
          <li>
            <Link href="/enter">
              <button className="bg-blue-800 text-white p-3 rounded-lg">
                Log In
              </button>
            </Link>
          </li>
        )}
      </ul>
    </nav>
  );
};

export default Navbar;
