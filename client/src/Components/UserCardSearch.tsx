import { Link } from "react-router-dom";
import Iuser from "../types/Iuser";
import Avatar from "./Avatar";

export default function UserCardSearch({
  user,
  closeSearch,
}: {
  closeSearch: () => void;
  user: Iuser;
}) {
  return (
    <Link
      onClick={closeSearch}
      to={`/${user._id}`}
      className="flex items-center gap-2 p-2 border border-transparent rounded cursor-pointer border-b-slate-300 hover:border-chat-logo"
    >
      <div>
        <Avatar
          name={user?.name}
          image={user?.profilePic}
          userId={user?._id}
          height={20}
          width={20}
          showName={false}
        />
      </div>
      <div>
        <div className="font-bold text-ellipsis line-clamp-1">{user.name}</div>
        <p className="text-sm text-ellipsis line-clamp-1">{user.email}</p>
      </div>
    </Link>
  );
}
