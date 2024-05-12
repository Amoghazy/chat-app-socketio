import { Link, useLocation, useNavigate } from "react-router-dom";
import Input from "../Components/Input";
import { useFormik } from "formik";
import * as Yup from "yup";
import Alert from "../Components/Alert";
import toast from "react-hot-toast";
import { checkPassword } from "../api/authApi";
import Avatar from "../Components/Avatar";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setToken } from "../RTK/slices/userInfo";

export default function CheckPassword() {
  const navigate = useNavigate();
  const { state } = useLocation();
  const dispatch = useDispatch();
  useEffect(() => {
    if (!state) navigate("/auth/email");
  });
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
      password: "",
      userId: state?._id,
    },
    validationSchema: Yup.object().shape({
      password: Yup.string()
        .min(8, "Password must be at least 8 characters")
        .required("Password is required"),
    }),
    onSubmit: async (data) => {
      data.userId = state?._id;
      checkPassword(data)
        .then((res) => {
          console.log(res);
          toast.success(res.data.message);
          dispatch(setToken(res.data.token));
          localStorage.setItem("token", res.data.token);
          setTimeout(() => {
            resetForm();
            navigate("/");
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
          <Avatar
            width={20}
            height={20}
            name={state?.name}
            image={state?.profilePic}
            userId={state?._id}
          />
        </div>
        <h1 className="text-xl font-semibold text-center">Welcome Back!</h1>

        <form action="" className="mt-5 " onSubmit={handleSubmit}>
          <Input
            value={values.password}
            onChange={handleChange}
            onBlur={handleBlur}
            label="Password"
            id="password"
            type="password"
            placeHolder="Enter Your Password"
            clsx="mt-3"
          />{" "}
          {errors.password && touched.password && (
            <Alert message={errors.password} />
          )}
          <button
            disabled={!isValid}
            className="w-full p-2 mt-5 font-bold tracking-wide text-white rounded bg-chat-logo hover:bg-chat-logo-dark"
          >
            Log In
          </button>
          <span className="block mt-3 text-center text-md">
            <Link
              className="font-semibold text-chat-logo-dark hover:text-chat-logo hover:underline"
              to="/auth/forget-password"
            >
              Forgot Password?
            </Link>
          </span>
        </form>
      </div>
    </div>
  );
}
