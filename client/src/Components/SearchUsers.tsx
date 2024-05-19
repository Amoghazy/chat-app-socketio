/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import { IoSearchOutline } from "react-icons/io5";
import Spinner from "./Spinner";
import { searchUser } from "../api/authApi";
import toast from "react-hot-toast";
import Iuser from "../types/Iuser";
import UserCardSearch from "./UserCardSearch";

export default function SearchUsers({
  closeSearch,
  openSearch,
}: {
  closeSearch: () => void;
  openSearch: boolean;
}) {
  const [loading, setLoading] = useState(false);
  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    const handleSearch = async () => {
      try {
        setLoading(true);
        searchUser(search).then((res) => {
          setLoading(false);
          setUsers(res.data.data);
        });
      } catch (error : any) {
        toast.error(error?.response?.data?.message || "Something went wrong");
      }
    };
    handleSearch();
    const handleCloseOnOutsideClick = (event: Event) => {
      if (
        openSearch &&
        event.target === document.querySelector(".dialog-backdrop")
      ) {
        closeSearch();
      }
    };

    document.addEventListener("click", handleCloseOnOutsideClick);

    return () => {
      document.removeEventListener("click", handleCloseOnOutsideClick);
    };
  }, [openSearch, closeSearch,search ]);

  return (
    <div className="fixed inset-0 z-10 p-2 bg-black bg-opacity-50 dialog-backdrop backdrop-blur-sm">
      <div className="w-full max-w-lg mx-auto mt-10 ">
        <div className="flex bg-white rounded h-14">
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search users here"
            className="w-full h-full p-1 px-4 rounded outline-none "
          />
          <div className="flex items-center justify-center h-full text-lg w-14">
            <IoSearchOutline size={25} />
          </div>
        </div>
        {/* search user found  */}
        <div className="flex flex-col  p-3  mt-3 scroll-bar overflow-auto bg-white rounded h-fit max-h-[300px]">
          {users.length == 0 && !loading && (
            <p className="p-1 text-lg text-slate-500">Not found users</p>
          )}
          {loading && <Spinner />}{" "}
          {users.length > 0 &&
            !loading &&
            users.map((user: Iuser) => (
              <UserCardSearch
                key={user._id}
                closeSearch={closeSearch}
                user={user}
              />
            ))}
        </div>
      </div>
    </div>
  );
}
