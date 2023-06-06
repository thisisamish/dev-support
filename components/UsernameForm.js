// TODO: Really understand how this component is working because right now, you don't.
// Also, for some reason, the message doesn't work when the username is taken.

import { useContext, useState, useCallback, useEffect } from "react";
import { UserContext } from "../lib/context";
import { doc, getDoc, writeBatch } from "firebase/firestore";
import { db } from "../lib/firebase";
import debounce from "lodash.debounce";

const UsernameForm = () => {
  const [formValue, setFormValue] = useState("");
  const [isValid, setIsValid] = useState(false);
  const [loading, setLoading] = useState(false);
  const { user, username } = useContext(UserContext);

  useEffect(() => {
    checkUsername(formValue);
  }, [formValue]);

  const handleChange = (e) => {
    const val = e.target.value.toLowerCase();
    const re = /^(?=[a-zA-Z0-9._]{3,15}$)(?!.*[_.]{2})[^_.].*[^_.]$/;

    if (val.length < 3) {
      setLoading(false);
    }
    if (re.test(val)) {
      setLoading(true);
    }
    setIsValid(false);
    setFormValue(val);
  };

  const checkUsername = useCallback(
    debounce(async (username) => {
      if (username.length >= 3) {
        const docRef = doc(db, "usernames", `${username}`);
        const docSnap = await getDoc(docRef);
        setIsValid(!docSnap.exists());
        setLoading(false);
      }
    }, 500),
    []
  );

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const userDoc = doc(db, "users", `${user.uid}`);
      const usernameDoc = doc(db, "usernames", `${formValue}`);

      const batch = writeBatch(db);
      batch.set(userDoc, {
        username: formValue,
        photoURL: user.photoURL,
        displayName: user.displayName,
      });
      batch.set(usernameDoc, { uid: user.uid });

      await batch.commit();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    !username && (
      <div className="mt-8 text-lg">
        <p className="mb-4 font-bold text-2xl">Enter your username:</p>
        <form onSubmit={handleSubmit}>
          <input
            className="border-2 border-black rounded-md p-2 mr-3"
            type="text"
            name="username"
            placeholder="Username goes here..."
            value={formValue}
            onChange={handleChange}
          />
          <button
            className="bg-green-500 p-2 rounded-lg text-white font-semibold"
            type="submit"
            disabled={!isValid}
          >
            Choose
          </button>
          <UsernameMessage
            username={formValue}
            isValid={isValid}
            loading={loading}
          />
        </form>

        <h3 className="mt-8 mb-2 font-bold text-xl">Debug State</h3>
        <div>
          Username: {formValue}
          <br />
          Loading: {loading.toString()}
          <br />
          Username Valid: {isValid.toString()}
        </div>
      </div>
    )
  );
};

const UsernameMessage = ({ username, isValid, loading }) => {
  if (loading) {
    return <p>Checking...</p>;
  } else if (isValid) {
    return <p>{username} is available!</p>;
  } else {
    <p>That username is taken!</p>;
  }
};

export default UsernameForm;
