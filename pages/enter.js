import { useContext } from "react";
import SignInButton from "../components/SignInButton";
import SignOutButton from "../components/SignOutButton";
import UsernameForm from "../components/UsernameForm";
import { UserContext } from "../lib/context";

const EnterPage = () => {
  const { user, username } = useContext(UserContext);
  return (
    <main className="flex justify-center">
      {user ? (
        !username ? (
          <UsernameForm />
        ) : (
          <SignOutButton />
        )
      ) : (
        <SignInButton />
      )}
    </main>
  );
};

export default EnterPage;
