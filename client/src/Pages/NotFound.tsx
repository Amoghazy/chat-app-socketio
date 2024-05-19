import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";

export default function NotFound({ userNotfound }: { userNotfound?: boolean }) {
  return (
    <>
      <Helmet prioritizeSeoTags>
        <title>Not Found</title>
        <meta name="description" content="A chat application page NotFound." />
        <link rel="canonical" href={import.meta.env.VITE_BASE_URL} />
      </Helmet>
      <div className="flex items-center w-screen h-screen bg-gray-50">
        <div className="container flex flex-col items-center justify-between px-5 text-gray-700 md:flex-row">
          <div className="w-full py-3 mx-8 lg:w-1/2 sm:w-4/12 ">
            <div className="mt-5 mb-8 font-extrabold text-chat-logo text-7xl font-dark">
              {" "}
              404
            </div>
            <p className="mb-8 text-2xl font-light leading-normal md:text-3xl">
              Sorry we couldn't find the page you're looking for
            </p>
            {userNotfound && (
              <p className="mb-8 text-2xl font-light leading-normal md:text-3xl">
                User not found
              </p>
            )}

            <Link
              to="/"
              className="inline px-5 py-3 text-sm font-medium leading-5 text-white transition-all border border-transparent rounded-lg shadow-2xl bg-chat-logo-dark duration-400 focus:outline-none hover:bg-chat-logo"
            >
              Back to Home
            </Link>
          </div>
          {!userNotfound && (
            <div className="w-full mx-5 my-12 lg:flex lg:justify-end lg:w-1/2 sm:w-4/12">
              <img
                src="https://user-images.githubusercontent.com/43953425/166269493-acd08ccb-4df3-4474-95c7-ad1034d3c070.svg"
                className=""
                alt="Page not found"
              />
            </div>
          )}
        </div>
      </div>
    </>
  );
}
