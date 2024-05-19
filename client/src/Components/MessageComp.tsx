/* eslint-disable @typescript-eslint/no-explicit-any */
import { Link, useParams } from "react-router-dom";
import { Key, SetStateAction, useEffect, useRef, useState } from "react";
import { getSocketInstance } from "../socket/SocketService";
import Avatar from "./Avatar";
import { HiOutlineDotsVertical } from "react-icons/hi";
import { IoIosAddCircle, IoIosArrowRoundBack, IoMdSend } from "react-icons/io";
import { IoClose } from "react-icons/io5";
import { FaFile, FaImage, FaVideo } from "react-icons/fa";
import "../App.css";
import Spinner from "./Spinner";
import backgroundChat from "../assets/p.jpg";
import Istate from "../types/Istate";
import { useSelector } from "react-redux";
import moment from "moment";
import { checkUserExist } from "../api/authApi";
import NotFound from "../Pages/NotFound";

import { BiCheckDouble } from "react-icons/bi";
export default function MessageComp() {
  const lastMessageRef = useRef<HTMLDivElement>(null);
  const { userId } = useParams();
  const [datauser, setdatauser] = useState({
    name: "",
    email: "",
    profilePic: "",
    online: false,
    id: "",
  });
  const userInfo = useSelector((state: Istate) => state.userInfo.userInfo);
  const [messageText, setMessageText] = useState<string>("");
  const [showMenu, setShowMenu] = useState(false);
  const [image, setImage] = useState<File | null>(null);
  const [video, setVideo] = useState<File | null>(null);
  const [pdf, setPDF] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [UserNotFound, setUserNotFound] = useState(false);
  const socket = getSocketInstance();
  const [allMessages, setAllMessages] = useState<any>([]);
  const handleMenueChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setLoading(true);
      setShowMenu(false);
      if (file.type.startsWith("image/")) {
        setImage(file);
        setPDF(null);
        setVideo(null);
      }
      if (file.type.startsWith("video/")) {
        setVideo(file);
        setPDF(null);
        setImage(null);
      }
      if (file.type.includes("pdf")) {
        setPDF(file);
        setImage(null);
        setVideo(null);
      }
      const reader = new FileReader();

      reader.readAsDataURL(file);

      reader.onload = (e) => {
        setPreview(e.target?.result as string);

        setLoading(false);
      };
    }
  };
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (socket) {
      socket.emit("new-message", {
        sender: userInfo?._id,
        reciver: userId,
        messageText,
        image,
        video,
        pdf,
      });
      socket.emit("seen", userId);
      setMessageText("");
      setImage(null);
      setVideo(null);
      setPDF(null);
      setPreview(null);
    }
  };
  useEffect(() => {
    if (lastMessageRef.current) {
      setTimeout(() => {
        if (lastMessageRef.current)
          lastMessageRef.current.scrollIntoView({
            behavior: "auto",
            block: "end",
          });
      }, 200);
    }
  }, [allMessages]);

  useEffect(() => {
    if (socket) {
      socket.emit("seen", userId);

      socket.emit("message-page", userId);

      const handlePreviousMessages = (data: SetStateAction<never[]>) =>
        setAllMessages(data);
      const handleMessageUser = (
        data: SetStateAction<{
          name: string;
          email: string;
          profilePic: string;
          online: boolean;
          id: string;
        }>
      ) => {
        console.log(data, "data");
        setdatauser(data);
      };
      const handleGetMessages = (data: any) => {
        setAllMessages(data);
        socket.emit("seen", userId);
      };

      socket.on("previous-message", handlePreviousMessages);
      socket.on("message-user", handleMessageUser);
      socket.on("get-messages", handleGetMessages);
      const handleSeen = (messageId: string) => {
        setAllMessages((prevMessages: any[]) =>
          prevMessages.map((message: { _id: string }) =>
            message._id === messageId ? { ...message, seen: true } : message
          )
        );
      };

      socket.on("message-seen", handleSeen);
      return () => {
        socket.off("previous-message", handlePreviousMessages);
        socket.off("message-user", handleMessageUser);
        socket.off("get-messages", handleGetMessages);
        socket.off("message-seen", handleSeen);
      };
    }
  }, [userId, socket]);

  checkUserExist({ id: userId }).catch(() => {
    setUserNotFound(true);
  });
  if (UserNotFound || userId?.length != 24) {
    return <NotFound userNotfound={true} />;
  }
  return (
    <div
      style={{ backgroundImage: `url(${backgroundChat})` }}
      className="bg-repeat bg-contain "
    >
      <header className="sticky top-0 flex items-center justify-between h-16 px-4 bg-slate-300">
        <div className="flex items-center gap-4 w-fit">
          <Link to={"/"} className="lg:hidden">
            <IoIosArrowRoundBack size={25} />
          </Link>
          <Avatar
            name={datauser?.name}
            image={datauser?.profilePic}
            userId={datauser?.id}
            height={12}
            width={12}
            showName={false}
          />

          <div className="">
            <h1 className="my-0 font-semibold text-md ">
              {datauser?.name?.toUpperCase()}
            </h1>
            <p className="-my-1 text-sm">
              {datauser?.online ? (
                <span className="text-chat-logo">Online</span>
              ) : (
                <span className="text-slate-500">Offline</span>
              )}
            </p>
          </div>
        </div>
        <div>
          <button className=" hover:text-chat-logo-dark">
            <HiOutlineDotsVertical size={20} />
          </button>
        </div>
      </header>

      {/*messages show*/}

      <section className=" overflow-x-hidden overflow-y-auto h-[calc(100vh-128px)] relative scroll-bar bg-slate-200 bg-opacity-20">
        {/*image show*/}

        {/*ALLMESSAGES ARE SHOWN */}
        <div className="p-4" ref={lastMessageRef}>
          {allMessages.map((message: any, index: Key | null | undefined) => (
            <div
              key={index}
              className={`px-4 py-2 my-2 bg-white rounded w-fit ${
                message.msgBy === userInfo._id ? "ml-auto !bg-teal-200" : ""
              } lg:max-w-md md:max-w-sm max-w-[208px] break-words`}
            >
              {message.imageURL && (
                <img
                  onLoad={() => {
                    if (index === allMessages.length - 1) {
                      if (lastMessageRef.current)
                        lastMessageRef.current.scrollIntoView({
                          behavior: "smooth",
                          block: "end",
                          inline: "start",
                        });
                    }
                  }}
                  src={message.imageURL}
                  alt="image"
                  className="object-contain py-2 "
                />
              )}
              {message.videoURL && (
                <video
                  // onLoad={() => {
                  //   if (index === allMessages.length - 1) {
                  //     if (lastMessageRef.current)
                  //       lastMessageRef.current.scrollIntoView({
                  //         behavior: "smooth",
                  //         block: "end",
                  //         inline: "start",
                  //       });
                  //   }
                  // }}
                  src={message.videoURL}
                  className="object-contain py-2 "
                  controls
                />
              )}
              <p className="px-2">{message.text}</p>
              <p className="flex items-center ml-auto text-xs w-fit">
                {moment(message.createdAt).format(" h:mm")}
                <span
                  className={`ml-1 ${
                    message.seen ? "text-cyan-500    " : "text-slate-500"
                  } `}
                >
                  <BiCheckDouble size={17} />
                </span>
              </p>
            </div>
          ))}
        </div>

        {preview && (
          <div className="sticky bottom-0 flex items-center justify-center w-full h-full rounded bg-opacity-55 bg-slate-800 ">
            <div
              className="absolute top-0 right-0 p-2 cursor-pointer hover:text-red-400"
              onClick={() => setPreview(null)}
            >
              <IoClose size={35} />
            </div>

            <div className="flex items-center justify-center p-2 bg-white bg-opacity-50 rounded scroll-bar ">
              {image && (
                <img
                  src={preview}
                  className="object-contain max-w-sm aspect-video"
                  alt=""
                />
              )}
              {video && (
                <video
                  controls
                  src={preview}
                  className="object-scale-down max-w-sm aspect-video"
                />
              )}
              {pdf && <embed src={preview} className=" aspect-video h-52" />}
            </div>
          </div>
        )}

        {loading && (
          <div className="sticky bottom-0 flex items-center justify-center w-full h-full rounded bg-opacity-55 bg-slate-800 backdrop-blur-lg">
            <Spinner />
          </div>
        )}
      </section>
      {/*send messages*/}
      <section className="flex items-center h-16 px-4 bg-slate-300">
        <div className="relative">
          <button
            onClick={() => setShowMenu(!showMenu)}
            className="rounded-[50%] h-10 w-10 flex items-center justify-center hover:bg-chat-logo-dark text-white bg-chat-logo "
          >
            {/* <IoAddCircleOutline size={25} /> */}
            <IoIosAddCircle size={25} />
          </button>
          {showMenu && (
            <div className="absolute flex flex-col gap-2 p-2 bg-white rounded shadow -left-3 bottom-14 w-36 ">
              <label
                htmlFor="uploadImg"
                className="flex items-center gap-4 p-1 px-2 rounded cursor-pointer hover:bg-slate-200"
              >
                {" "}
                <div className="text-purple-500">
                  {" "}
                  <FaImage size={18} />
                </div>{" "}
                <p>Image</p>
              </label>
              <label
                htmlFor="uploadVideo"
                className="flex items-center gap-4 p-1 px-2 rounded cursor-pointer hover:bg-slate-200"
              >
                {" "}
                <div className="text-chat-logo">
                  {" "}
                  <FaVideo size={18} />
                </div>{" "}
                <p>Video</p>
              </label>
              <label
                htmlFor="uploadFile"
                className="flex items-center gap-4 p-1 px-2 rounded cursor-pointer hover:bg-slate-200"
              >
                {" "}
                <div className="mr-1 text-slate-500 ">
                  {" "}
                  <FaFile size={18} />
                </div>{" "}
                <p className="mr-2"> Files </p>
              </label>
              <input
                id="uploadImg"
                onChange={handleMenueChange}
                accept="image/*"
                type="file"
                className="hidden"
              />
              <input
                id="uploadVideo"
                onChange={handleMenueChange}
                accept="video/*"
                type="file"
                className="hidden"
              />
              <input
                onChange={handleMenueChange}
                id="uploadFile"
                accept=".pdf,application/pdf"
                type="file"
                className="hidden"
              />
            </div>
          )}
        </div>

        <form
          className="flex items-center w-full h-full gap-3 ml-2"
          onSubmit={handleSubmit}
        >
          <input
            type="text"
            className="w-full px-4 py-1 rounded outline-none h-2/3 bg-slate-200"
            placeholder="enter message"
            value={messageText}
            onChange={(e) => setMessageText(e.target.value)}
          />
          <button
            type="submit"
            className="text-chat-logo hover:text-chat-logo-dark"
          >
            <IoMdSend size={25} />
          </button>
        </form>
      </section>
    </div>
  );
}
