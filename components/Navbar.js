import Link from "next/link";

const Navbar = () => {
  const user = {
    photoURL:
      "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=870&q=80",
  };
  const username = "thisisamish";
  return (
    <nav className="flex justify-between p-5 text-xl border-b-2">
      <div>
        <Link href="/">
          <button className="bg-black text-white p-3 rounded-lg">
            DEV SUPPORT
          </button>
        </Link>
      </div>
      <ul className="flex gap-4">
        {username && (
          <>
            <li>
              <Link href="/admin">
                <button className="bg-blue-800 text-white p-3 rounded-lg">
                  Write Posts
                </button>
              </Link>
            </li>
            <li>
              <Link href={`/${username}`}>
                <img className="border-2 border-blue-400 hover:border-blue-600 w-14 aspect-square object-cover rounded-full" src={user?.photoURL} alt="" />
              </Link>
            </li>
          </>
        )}

        {!username && (
          <li>
            <Link href="/enter">
              <button className="bg-blue-800 text-white p-3 rounded-lg">Log In</button>
            </Link>
          </li>
        )}
      </ul>
    </nav>
  );
};

export default Navbar;
