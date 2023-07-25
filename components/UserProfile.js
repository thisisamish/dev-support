import Image from "next/image";

const UserProfile = ({ user }) => {
  return (
    <div className="grid place-items-center my-8">
      <Image className="rounded-full border-2 border-black mb-2" src={user.photoURL} width={100} height={100} alt="" />
      <p>
        <i>@{user.username}</i>
      </p>
      <p className="text-2xl font-semibold">{user.displayName}</p>
    </div>
  );
};

export default UserProfile;
