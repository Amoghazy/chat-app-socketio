import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";

export default function UnAuthorized() {
  return (
    <>
      <Helmet prioritizeSeoTags>
        <title>UnAuthorized</title>
        <meta
          name="description"
          content="A chat application page UnAuthorized."
        />
        <link rel="canonical" href={import.meta.env.VITE_BASE_URL} />
      </Helmet>
      <div className="flex flex-col items-center justify-center w-screen h-screen">
        <div>
          <img
            width={300}
            src="../../src/assets/401-Error-Unauthorized-1.png"
            alt=""
          />
        </div>
        <div className="text-center">
          <h1 className="text-4xl font-bold">Unauthorized</h1>
          <p className="mb-4 text-xl">
            You are not authorized to access this page
          </p>
          <Link
            className="px-4 py-2 text-white rounded-lg hover:bg-chat-logo-dark bg-chat-logo"
            to="/auth/email"
          >
            Go to Login
          </Link>
        </div>
      </div>
    </>
  );
}
