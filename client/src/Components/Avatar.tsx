import { useSelector, useDispatch } from "react-redux";
import { useState, useEffect } from "react";
import Istate from "../types/Istate";

export default function Avatar({
  name,
  image,
  height,
  width,
  userId,
  showName = true,
}: {
  userId: string;
  showName?: boolean;
  height: number;
  width: number;
  name: string;
  image: string;
}) {
  const dispatch = useDispatch();
  const [avatarColor, setAvatarColor] = useState<string>("");

  useEffect(() => {
    // Check if the avatar color is already stored in localStorage
    const storedColor = localStorage.getItem(`avatarColor-${userId}`);
    if (storedColor) {
      setAvatarColor(storedColor);
    } else {
      // If no color is stored, generate a random color
      const colors = [
        "bg-blue-200",
        "bg-cyan-200",
        "bg-cyan-300",
        "bg-teal-300",
        "bg-red-300",
        "bg-orange-200",
        "bg-slate-400",
        "bg-gray-400",
        "bg-stone-400",
        "bg-amber-200",
        "bg-lime-300",
      ];
      const randomColor = colors[Math.floor(Math.random() * colors.length)];
      setAvatarColor(randomColor);
      localStorage.setItem(`avatarColor-${userId}`, randomColor);
    }
  }, [userId, dispatch]);

  const onlinUsers = useSelector(
    (state: Istate) => state?.userInfo?.onlineUsers
  );

  if (!name) return null;

  const nameParts = name.split(" ");
  const shortName = nameParts[0][0] + (nameParts[1] ? nameParts[1][0] : "");

  const isOnline = onlinUsers?.includes(userId.toString());

  return (
    <div className="flex flex-col items-center justify-center">
      <div
        className={`w-${width} h-${height}  bg-opacity-95 rounded-[50%] shadow-2xl flex relative  border-2 `}
      >
        {image ? (
          <img
            src={image}
            className="object-contain w-full h-full  rounded-[50%] "
            alt={shortName}
          />
        ) : (
          <span
            className={`w-full h-full rounded-[50%] text-2xl flex justify-center items-center font-bold ${avatarColor} font-dancingScript`}
          >
            {shortName.toUpperCase()}
          </span>
        )}
        {isOnline && (
          <span
            className={`absolute w-2 h-2 bg-green-500 rounded-full  ${
              width > 15 ? "bottom-2 right-1" : "bottom-1 right-0"
            } `}
          ></span>
        )}
      </div>
      {image && showName ? <span className="font-semibold">{name}</span> : null}
    </div>
  );
}
