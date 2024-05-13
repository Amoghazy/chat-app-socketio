import { Link, useNavigate } from "react-router-dom";
import Input from "../Components/Input";
import { useFormik } from "formik";
import * as Yup from "yup";
import Alert from "../Components/Alert";
import toast from "react-hot-toast";
import { checkEmail } from "../api/authApi";
import { FaUser } from "react-icons/fa";

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
          setTimeout(() => {
            resetForm();
            navigate("/auth/password", { state: res.data.data });
          }, 2000);
        })
        .catch((err) => {
          resetForm();

          toast.error(err.response.data.message);
        });
    },
  });

  return (
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
    </div>
  );
}
