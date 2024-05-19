import { Link, useNavigate } from "react-router-dom";
import Input from "../Components/Input";
import uplaodIcon from "../assets/uplaodicon.svg";
import { useFormik } from "formik";
import * as Yup from "yup";
import Alert from "../Components/Alert";
import { useState } from "react";
import { RiCloseCircleLine } from "react-icons/ri";
import toast from "react-hot-toast";
import { register } from "../api/authApi";
import { Helmet } from "react-helmet-async";

export default function Registration() {
  const navigate = useNavigate();
  const [profilePhoto, setProfilePhoto] = useState<File | "">("");

  const {
    handleChange,
    handleSubmit,
    isValid,
    handleBlur,
    touched,
    values,
    setFieldValue,
    errors,
    resetForm,
  } = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",

      profilePic: profilePhoto,
    },
    validationSchema: Yup.object().shape({
      name: Yup.string()
        .min(5, "Name must be at least 5 characters")
        .required("Name is required"),
      email: Yup.string().email("Invalid email").required("Email is required"),
      password: Yup.string()
        .min(8, "Password must be at least 8 characters")
        .required("Password is required"),
      profilePic: Yup.mixed().test(
        "is-correct-file-type",
        "Profile picture must be a JPG, JPEG, or PNG",
        (profilePic) => {
          if (!profilePic) return true;

          if (profilePic === "") return true;
          if (profilePic instanceof File && profilePic.type) {
            return ["image/jpg", "image/jpeg", "image/png"].includes(
              profilePic.type
            );
          }

          return false;
        }
      ),
    }),
    onSubmit: async (data) => {
      const formData = new FormData();
      formData.append("name", data.name);
      formData.append("email", data.email);
      formData.append("password", data.password);
      formData.append("profilePic", profilePhoto as File);
      register(formData)
        .then((res) => {
          resetForm();
          toast.success(res.data.message);
          setTimeout(() => {
            navigate("/auth/email");
          }, 2000);
        })
        .catch((err) => {
          resetForm();
          console.log(err);
          toast.error(err.response.data.message);
        });
    },
  });

  return (
    <>
      <Helmet prioritizeSeoTags>
        <title>Registartion-Chat App</title>
        <meta name="description" content="A chat application Registartion." />
        <link rel="canonical" href={import.meta.env.VITE_BASE_URL} />
        <meta property="og:title" content="Registartion-Chat App" />
        <meta
          property="og:description"
          content="A chat application for connecting with friends."
        />
        <meta property="og:url" content={import.meta.env.VITE_BASE_URL} />
        <meta property="og:type" content="website" />
        <meta
          property="og:image"
          content="/client/src/assets/Screenshot 2024-05-19 162456.png"
        />

        <meta name="twitter:title" content="Registartion-Chat App" />
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
          <h1 className="text-2xl font-semibold">Welcome to registration!</h1>
          <form action="" className="mt-5" onSubmit={handleSubmit}>
            <Input
              value={values.name}
              onChange={handleChange}
              onBlur={handleBlur}
              label="Name"
              id="name"
              type="text"
              placeHolder="Enter Your Name"
              clsx="mt-3"
            />
            {errors.name && touched.name && <Alert message={errors.name} />}
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
            <Input
              value={values.password}
              onChange={handleChange}
              onBlur={handleBlur}
              label="Paswword"
              id="password"
              type="password"
              placeHolder="Enter Your Paswword"
              clsx="mt-3"
            />{" "}
            {errors.password && touched.password && (
              <Alert message={errors.password} />
            )}
            <div className="flex items-center justify-center w-full mt-5">
              <label
                htmlFor="dropzone-file"
                className="flex flex-col items-center justify-center w-full h-24 bg-gray-100 rounded-md cursor-pointer hover:bg-gray-300 hover:border-chat-logo"
              >
                {profilePhoto ? (
                  <div className="flex items-center justify-center w-full h-24 bg-gray-100 rounded-md cursor-pointer hover:bg-gray-300 hover:border-chat-logo">
                    {" "}
                    {profilePhoto.name}
                    <span
                      className="ml-2 text-red-700 hover:text-red-500 "
                      onClick={(e) => {
                        e.preventDefault();
                        setProfilePhoto("");
                        setFieldValue("profilePic", "");
                      }}
                    >
                      <RiCloseCircleLine />
                    </span>
                  </div>
                ) : (
                  <div className="flex flex-col items-center justify-center pt-1 pb-1">
                    <img
                      className="w-8 h-8 mb-1 text-gray-500 "
                      src={uplaodIcon}
                      alt=""
                    />
                    <p className="mb-1 text-sm text-gray-500 dark:text-gray-400">
                      <span className="font-semibold">
                        Click to{" "}
                        <span className="font-bold text-chat-logo-dark ">
                          upload Profile Photo
                        </span>
                      </span>{" "}
                      or drag and drop
                    </p>
                  </div>
                )}

                <input
                  onClick={(e) => {
                    const target = e.target as HTMLInputElement;
                    target.value = "";
                  }}
                  id="dropzone-file"
                  type="file"
                  className="hidden"
                  name="profilePic"
                  onBlur={handleBlur}
                  onChange={(e) => {
                    if (e.target.files && e.target.files[0]) {
                      setProfilePhoto(e.target.files[0]);
                      setFieldValue("profilePic", e.target.files[0]);
                    }
                  }}
                />
              </label>
            </div>
            {errors.profilePic && <Alert message={errors.profilePic} />}
            <button
              disabled={!isValid}
              className="w-full p-2 mt-5 font-bold tracking-wide text-white rounded bg-chat-logo hover:bg-chat-logo-dark"
            >
              Register
            </button>
            <span className="block mt-3 text-center text-md">
              Already have an account?{" "}
              <Link
                className="text-chat-logo-dark hover:text-chat-logo hover:underline"
                to="/auth/email"
              >
                Login
              </Link>
            </span>
          </form>
        </div>
      </div>
    </>
  );
}
