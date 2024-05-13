import { useEffect } from "react";
import { Outlet, useLocation } from "react-router-dom";
import { fetchUser } from "../api/authApi";
import logo from "../assets/chat_icon1.svg";

import { useDispatch, useSelector } from "react-redux";
import { setOnlineUsers, setUserInfo } from "../RTK/slices/userInfo";
import SideBar from "../Components/SideBar";
import Istate from "../types/Istate";
import {
  createSocketConnection,
  getSocketInstance,
} from "../socket/SocketService";

export default function Home() {
  const dispatch = useDispatch();
  const location = useLocation();
  const { isAuthenticated } = useSelector((state: Istate) => state.userInfo);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { user } = await fetchUser();
        dispatch(setUserInfo(user));
      } catch (err) {
        console.error("Error fetching user:", err);
      }
    };
    fetchData();
  }, [dispatch]);

  useEffect(() => {
    const handleOnlineUsers = (onlineUsers: string[]) => {
      dispatch(setOnlineUsers(onlineUsers));
      console.log(onlineUsers, "onlineUsers");
    };

    if (isAuthenticated) {
      const token = localStorage.getItem("token");
      createSocketConnection(token);
      const socket = getSocketInstance();
      if (socket) {
        socket.on("onlineUsers", handleOnlineUsers);
        return () => {
          console.log("disconnected");
          socket.disconnect();

          socket.off("onlineUsers", handleOnlineUsers);
        };
      }
    }
  }, [dispatch, isAuthenticated]);

  const isHome = location.pathname === "/";

  return (
    <>
      <div className="grid lg:grid-cols-[300px,1fr] h-screen max-h-screen">
        <section className={` bg-slate-100 ${!isHome && "hidden"} lg:block`}>
          <SideBar />
        </section>

        <section className={`${isHome && "hidden"}`}>
          <Outlet />
        </section>
        <div
          className={`${
            isHome && "lg:flex"
          } flex-col items-center justify-center hidden gap-2 `}
        >
          <>
            <div>
              <img
                className="inline-block"
                src={logo}
                alt=""
                width={50}
                height={50}
              />
              <span className="inline-block ml-1 text-3xl font-bold font-dancingScript ">
                Chat App
              </span>
            </div>
            <p className="text-lg text-slate-400">
              {" "}
              send message to your friends{" "}
            </p>
          </>
        </div>
      </div>
    </>
  );
}
