import Link from "next/link";
import { useContext, useState } from "react";
import { UserContext } from "../lib/context";
import SignOutButton from "./SignOutButton";

const Navbar = () => {
  const { user, username } = useContext(UserContext);
  const [showModal, setShowModal] = useState("hidden");

  const handleNav = () => {
    setShowModal((prevValue) => (prevValue === "flex" ? "hidden" : "flex"));
  };

  return (
    <nav className="flex justify-between p-5 text-xl border-b-2 md:max-w-7xl mx-auto">
      <div>
        <Link href="/">
          <button className="bg-black font-bold text-white p-3 rounded-lg">
            DEV SUPPORT
          </button>
        </Link>
      </div>

      {/* Render when screen-size is big */}
      <ul className="md:flex md:gap-4 hidden">
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

      {/* Render modal for mobile devices */}
      <ul className="md:hidden flex">
        <button onClick={handleNav}>
          <img
            className="border-2 border-blue-400 hover:border-blue-600 w-14 aspect-square object-cover rounded-full"
            src={user?.photoURL}
            alt=""
          />
        </button>
        <div
          className={`${showModal} absolute top-[5.5rem] right-8 p-6 rounded-2xl bg-gray-200`}
        >
          <div className="flex items-end flex-col gap-2">
            {!username && (
              <li>
                <Link href="/enter">
                  <button className="bg-blue-800 text-white p-3 rounded-lg">
                    Log In
                  </button>
                </Link>
              </li>
            )}
            {username && (
              <>
                <li>
                  <Link href={`/${username}`}>
                    <button className="bg-blue-800 text-white p-3 rounded-lg">
                      My Account
                    </button>
                  </Link>
                </li>
                <li>
                  <Link href="/admin">
                    <button className="bg-blue-800 text-white p-3 rounded-lg">
                      Write Posts
                    </button>
                  </Link>
                </li>
                <li>
                  <SignOutButton />
                </li>
              </>
            )}
          </div>
        </div>
      </ul>
    </nav>
  );
};

export default Navbar;
