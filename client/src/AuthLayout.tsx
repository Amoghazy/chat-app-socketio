import { Outlet } from "react-router-dom";
import logo from "./assets/chat_icon1.svg";
export default function AuthLayout() {
  return (
    <>
      <header className="">
        <div className="flex items-center justify-center p-2 shadow-md">
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
      </header>
      <Outlet />
    </>
  );
}
