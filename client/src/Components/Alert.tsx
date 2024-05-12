export default function Alert({
  message,
  clsx,
}: {
  message: string;
  clsx?: string;
}) {
  return <div className={`text-white mt-3 text-center bg-red-500 bg-opacity-80 ${clsx}`}>{message}</div>;
}
