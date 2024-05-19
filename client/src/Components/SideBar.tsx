/* eslint-disable @typescript-eslint/no-explicit-any */
import { BsFillChatQuoteFill } from "react-icons/bs";
import { HiUsers } from "react-icons/hi";
import { RiLogoutCircleLine } from "react-icons/ri";
import Avatar from "./Avatar";
import { useDispatch, useSelector } from "react-redux";
import Istate from "../types/Istate";
import { useEffect, useState } from "react";

import EditUserDetails from "./EditUserDetails";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { FiArrowUpLeft } from "react-icons/fi";
import SearchUsers from "./SearchUsers";
import { logout } from "../api/authApi";
import { logout_user } from "../RTK/slices/userInfo";
import { getSocketInstance } from "../socket/SocketService";
import { IoImage, IoVideocam } from "react-icons/io5";

export default function SideBar() {
  const user = useSelector((state: Istate) => state.userInfo.userInfo);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const [allUsers, setAllUsers] = useState([]);
  const [openSearch, setOpenSearch] = useState(false);
  const socket = getSocketInstance();
  const openDialog = () => {
    setIsOpen(true);
  };

  const closeDialog = () => {
    setIsOpen(false);
  };

  useEffect(() => {
    const handleCloseOnOutsideClick = (event: Event) => {
      if (
        isOpen &&
        event.target === document.querySelector(".dialog-backdrop")
      ) {
        closeDialog();
      }
    };

    document.addEventListener("click", handleCloseOnOutsideClick);

    return () => {
      document.removeEventListener("click", handleCloseOnOutsideClick);
    };
  }, [isOpen]);

  useEffect(() => {
    if (socket) {
      socket.emit("sidebar", user._id);

      socket.on("converstions", (converstions) => {
        console.log(" converstions is fired in side bar");
        console.log(converstions);
        const userConverstions = converstions.map((userConv: any) => {
          if (userConv.sender._id == userConv.receiver._id) {
            return {
              ...userConv,
              userDetails: userConv.sender,
            };
            // u send message
          } else if (userConv.receiver._id !== user._id) {
            return {
              ...userConv,
              userDetails: userConv.receiver,
            };
            //u recive message
          } else {
            return {
              ...userConv,
              userDetails: userConv.sender,
            };
          }
        });
        setAllUsers(userConverstions);
      });
    }
  }, [socket, user._id]);
  return (
    <div className="grid grid-cols-[48px,1fr] h-full">
      <div className="flex flex-col justify-between w-12 h-full py-5 rounded-r-lg bg-slate-300 text-slate-700">
        <div>
          <NavLink
            to="/"
            title="chats"
            className={({ isActive }) =>
              `flex items-center justify-center w-12 h-12 rounded-lg cursor-pointer hover:bg-slate-400 ${
                isActive && "bg-slate-400 bg-opacity-80"
              } `
            }
          >
            <BsFillChatQuoteFill size={25} />
          </NavLink>
          <div
            onClick={() => setOpenSearch(true)}
            className={`flex items-center justify-center mt-1 w-12 h-12 rounded-lg cursor-pointer hover:bg-slate-400 
               
               `}
          >
            <HiUsers size={25} />
          </div>
        </div>
        <div>
          <button onClick={openDialog} className="scale-95" title={user.name}>
            <Avatar
              showName={false}
              width={12}
              height={12}
              name={user?.name}
              image={user?.profilePic}
              userId={user?._id}
            />
          </button>
          <button
            onClick={async () => {
              dispatch(logout_user());
              localStorage.removeItem("token");
              await logout();
              navigate("/auth/email");
            }}
            title="logout"
            className="flex items-center justify-center w-12 h-12 rounded-lg cursor-pointer hover:bg-slate-300"
          >
            <RiLogoutCircleLine size={25} />
          </button>
        </div>
      </div>
      <div className="w-full">
        <h2 className="h-12 p-4 text-xl font-bold text-center text-slate-800">
          Message
        </h2>
        <div className="bg-slate-200 mt-3 p-[0.5px] w-full"></div>
        <div className="h-[calc(100vh-62px)] overflow-x-hidden overflow-y-auto scroll-bar">
          {allUsers.length == 0 ? (
            <div className="mt-10">
              <div className="flex items-center justify-center text-slate-500">
                <FiArrowUpLeft size={50}></FiArrowUpLeft>
              </div>
              <p className="text-lg text-center text-slate-400">
                {" "}
                Explore new friends To start messaging
              </p>
            </div>
          ) : (
            <div></div>
          )}
          {allUsers.map((convUser: any) => {
            return (
              <Link
                to={`/${convUser?.userDetails?._id}`}
                key={convUser._id}
                className="flex items-center gap-2 p-3 border-b-2 rounded hover:bg-chat-logo"
              >
                <Avatar
                  name={convUser?.userDetails?.name}
                  image={convUser?.userDetails?.profilePic}
                  userId={convUser?.userDetails?._id}
                  height={14}
                  width={14}
                  showName={false}
                />
                <div className="w-[168px]">
                  <p className="text-base font-semibold text-ellipsis line-clamp-1">
                    {convUser?.userDetails?.name?.toUpperCase()}
                  </p>
                  <div className="flex items-end gap-1">
                    {convUser?.lastMsg?.imageURL && (
                      <div
                        className={`flex ${
                          convUser.lastMsg.text ? "items-end" : "items-center"
                        } gap-1 text-ellipsis line-clamp-1 text-slate-500`}
                      >
                        <IoImage />
                        {!convUser.lastMsg.text && <span>Image</span>}
                      </div>
                    )}
                    {convUser?.lastMsg?.videoURL && (
                      <div
                        className={`flex ${
                          convUser.lastMsg.text ? "items-end" : "items-center"
                        } gap-1 text-ellipsis line-clamp-1 text-slate-500`}
                      >
                        <IoVideocam />
                        {!convUser.lastMsg.text && <span>Video</span>}
                      </div>
                    )}
                    {convUser?.lastMsg?.text && (
                      <p className="text-sm text-slate-400 text-ellipsis line-clamp-1">
                        {convUser?.lastMsg?.text.startWith("https://") ? (
                          <a
                            className="text-ellipsis line-clamp-1 "
                            href={convUser?.lastMsg?.text}
                            target="_blank"
                            rel="noreferrer"
                          >
                            {convUser?.lastMsg?.text}
                          </a>
                        ) : (
                          convUser?.lastMsg?.text
                        )}
                      </p>
                    )}
                  </div>
                </div>
                {convUser?.countUnSeenMsg == 0 ? null : (
                  <div className="ml-auto">
                    <p className="flex items-center justify-center w-6 h-6 text-white rounded-full bg-chat-logo-dark">
                      {convUser?.countUnSeenMsg}
                    </p>
                  </div>
                )}
              </Link>
            );
          })}
        </div>
      </div>
      {openSearch && (
        <SearchUsers
          openSearch={openSearch}
          closeSearch={() => setOpenSearch(false)}
        />
      )}
      {isOpen && <EditUserDetails userInfo={user} closeDialog={closeDialog} />}
    </div>
  );
}
