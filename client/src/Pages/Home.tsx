/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
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
import UnAuthorized from "./UnAuthorized";
import { Helmet } from "react-helmet-async";
import toast from "react-hot-toast";

export default function Home() {
  const [unAuthorized, setUnAuthorized] = useState(false);
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();
  const { isAuthenticated } = useSelector((state: Istate) => state.userInfo);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { user } = await fetchUser();
        dispatch(setUserInfo(user));
      } catch (err) {
        if ((err as any)?.response?.status === 401) {
          toast.error((err as any).response.data.message);
          setUnAuthorized(true);
        } else {
          toast.error("An unexpected error occurred");
        }
      }
    };
    fetchData();
  }, [dispatch]);

  useEffect(() => {
    const handleOnlineUsers = (onlineUsers: string[]) => {
      dispatch(setOnlineUsers(onlineUsers));
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
  if (unAuthorized) {
    navigate("/auth/email");
  }

  return (
    <>
      <Helmet prioritizeSeoTags>
        <title>Chat App</title>
        <meta
          name="description"
          content="A chat application for connecting with friends."
        />
        <link rel="canonical" href={import.meta.env.VITE_BASE_URL} />
        <meta property="og:title" content="Chat App" />
        <meta
          property="og:description"
          content="A chat application for connecting with friends."
        />
        <meta property="og:url" content={import.meta.env.VITE_BASE_URL} />
        <meta property="og:type" content="website" />
        <meta
          property="og:image"
          content="/client/src/assets/Screenshot 2024-05-19 162456.png"
        />

        <meta name="twitter:title" content="Chat App" />
        <meta
          name="twitter:description"
          content="A chat application for connecting with friends."
        />
        <meta
          name="twitter:image"
          content="/client/src/assets/Screenshot 2024-05-19 162456.png"
        />
      </Helmet>

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
