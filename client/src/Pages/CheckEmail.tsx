import { Link, useNavigate } from "react-router-dom";
import Input from "../Components/Input";
import { useFormik } from "formik";
import * as Yup from "yup";
import Alert from "../Components/Alert";
import toast from "react-hot-toast";
import { checkEmail } from "../api/authApi";
import { FaUser } from "react-icons/fa";
import { Helmet } from "react-helmet-async";

export default function CheckEmail() {
  const navigate = useNavigate();

  const {
    handleChange,
    handleSubmit,
    isValid,
    handleBlur,
    touched,
    values,

    errors,
    resetForm,
  } = useFormik({
    initialValues: {
      email: "",
    },
    validationSchema: Yup.object().shape({
      email: Yup.string().email("Invalid email").required("Email is required"),
    }),
    onSubmit: async (data) => {
      checkEmail(data)
        .then((res) => {
          toast.success(res.data.message);

          resetForm();
          navigate("/auth/password", { state: res.data.data });
        })
        .catch((err) => {
          resetForm();

          toast.error(err.response.data.message);
        });
    },
  });

  return (
    <>
      <Helmet prioritizeSeoTags>
        <title>CheckEmail</title>
        <meta
          name="description"
          content="A chat application page for check your email."
        />
        <link rel="canonical" href={import.meta.env.VITE_BASE_URL} />
        <meta property="og:title" content="Chat App" />
        <meta
          property="og:description"
          content="A chat application page for check your email."
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
      <div className="p-2 mt-3">
        <div className="max-w-sm p-4 mx-auto bg-white rounded">
          <div className="mx-auto my-2 w-fit">
            <FaUser size={60} />
          </div>
          <h1 className="text-xl font-semibold text-center">Welcome Back!</h1>

          <form action="" className="mt-5 " onSubmit={handleSubmit}>
            <Input
              value={values.email}
              onChange={handleChange}
              onBlur={handleBlur}
              label="Email"
              id="email"
              type="email"
              placeHolder="Enter Your Email"
              clsx="mt-3"
            />{" "}
            {errors.email && touched.email && <Alert message={errors.email} />}
            <button
              disabled={!isValid}
              className="w-full p-2 mt-5 font-bold tracking-wide text-white rounded bg-chat-logo hover:bg-chat-logo-dark"
            >
              Let's Go
            </button>
            <span className="block mt-3 text-center text-md">
              New User ?{" "}
              <Link
                className="text-chat-logo-dark hover:text-chat-logo hover:underline"
                to="/auth/register"
              >
                SignUP
              </Link>
            </span>
          </form>
        </div>
      </div>{" "}
    </>
  );
}
