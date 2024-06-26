import { createBrowserRouter } from "react-router-dom";
import CheckEmail from "./../Pages/CheckEmail";
import CheckPassword from "./../Pages/CheckPassword";
import Registration from "./../Pages/Registration";
import Home from "./../Pages/Home";
import Layout from "../Layout";
import MessageComp from "./../Components/MessageComp";
import AuthLayout from "./../AuthLayout";
import ForgetPassword from "../Pages/ForgetPassword";
import NotFound from "../Pages/NotFound";
import Gard from "../Components/Gard";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "",
        element: (
          <Gard>
            <Home />
          </Gard>
        ),
        children: [
          {
            path: ":userId",
            element: (
              <Gard>
                <MessageComp />
              </Gard>
            ),
          },
        ],
      },

      {
        path: "auth",
        element: <AuthLayout />,
        children: [
          {
            path: "forget-password",
            element: <ForgetPassword />,
          },
          {
            path: "email",
            element: <CheckEmail />,
          },
          {
            path: "password",
            element: <CheckPassword />,
          },
          {
            path: "register",
            element: <Registration />,
          },
        ],
      },
      {
        path: "*",
        element: <NotFound />,
      },
    ],
  },
]);

export default router;
