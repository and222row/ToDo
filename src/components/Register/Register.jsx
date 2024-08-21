import axios from "axios";
import { useFormik } from "formik";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import * as Yup from "yup";

export default function Register() {
  let navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [apiError, setApiError] = useState(null);
  async function handleRegister(values) {
    setIsLoading(true);
    await axios
      .post(`https://note-sigma-black.vercel.app/api/v1/users/signUp`, values)
      .then((response) => {
        setIsLoading(false);
        console.log(response);
        if (response.data.msg == "done") {
          navigate("/login");
        }
      })
      .catch((error) => {
        console.log(error);
        setIsLoading(false);
      });
  }
  let validationSchema = Yup.object().shape({
    name: Yup.string()
      .min(3, "min length is 3")
      .max(10, "max lenght is 10")
      .required("name is required"),
    email: Yup.string().email("invalid email").required("email is required"),
    password: Yup.string()
      .matches(
        /^[A-Za-z0-9]{6,10}$/,
        "password should be between 6 and 10 chars"
      )
      .required("password is required"),
    phone: Yup.string()
      .matches(/^01[0125]{0,9}$/, "invalid egyption number")
      .required("phone number is required"),
    age: Yup.string().required("age is required"),
  });
  let formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
      age: "",
      phone: "",
    },
    onSubmit: handleRegister,
    validationSchema,
  });
  return (
    <>
      <div className=" w-screen min-h-screen bg-green-400">
        <div className=" container py-14">
          <div className=" flex flex-wrap ">
            <div className=" p-10 bg-green-800  text-white rounded-lg w-full lg:w-1/2">
              <div className=" my-40 text-center">
                <h3 className=" text-4xl font-bold my-4">Welcome!</h3>
                <p className="text-xl my-3">
                  To keep connected with us please login with your personal
                  information
                </p>
                <button className=" my-3 py-3 px-5 bg-transparent border-solid border-white border-2 rounded-2xl  hover:bg-white hover:text-gray-600 duration-300">
                  <Link to="/login">Login</Link>
                </button>
              </div>
            </div>
            <div className=" p-10 bg-white  text-green-400 rounded-lg w-full lg:w-1/2">
              <div className=" my-14 ">
                <h2 className=" my-5 text-4xl font-extrabold text-green-600 text-center">
                  Register here!
                </h2>
                {apiError ? (
                  <div
                    className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400"
                    role="alert"
                  >
                    <span className="font-medium">{apiError}</span>
                  </div>
                ) : null}
                <form
                  className="max-w-md mx-auto"
                  onSubmit={formik.handleSubmit}
                >
                  <div className="relative z-0 w-full mb-5 group">
                    <input
                      type="text"
                      name="name"
                      id="name"
                      className="block py-2.5 px-0 w-full text-sm text-green-600 bg-transparent border-0 border-b-2 border-green-600 appearance-none dark:text-white dark:border-gray-600 dark:focus:text-green-600 focus:outline-none focus:ring-0 focus:text-green-600 peer focus:border-green-600"
                      placeholder=" "
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={formik.values.name}
                    />
                    <label
                      htmlFor="name"
                      className="peer-focus:font-medium absolute text-sm text-green-600 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-green-600 peer-focus:dark:text-green-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                    >
                      Enter your name:
                    </label>
                  </div>
                  {formik.errors.name && formik.touched.name ? (
                    <div
                      className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400"
                      role="alert"
                    >
                      <span className="font-medium">{formik.errors.name}</span>
                    </div>
                  ) : null}

                  <div className="relative z-0 w-full mb-5 group">
                    <input
                      type="text"
                      name="email"
                      id="email"
                      className="block py-2.5 px-0 w-full text-sm text-green-600 bg-transparent border-0 border-b-2 border-green-600 appearance-none dark:text-white dark:border-gray-600 dark:focus:text-green-600 focus:outline-none focus:ring-0 focus:text-green-600 peer focus:border-green-600"
                      placeholder=" "
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={formik.values.email}
                    />
                    <label
                      htmlFor="email"
                      className="peer-focus:font-medium absolute text-sm text-green-600 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-green-600 peer-focus:dark:text-green-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                    >
                      Enter your Email address:
                    </label>
                  </div>
                  {formik.errors.email && formik.touched.email ? (
                    <div
                      className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400"
                      role="alert"
                    >
                      <span className="font-medium">{formik.errors.email}</span>
                    </div>
                  ) : null}
                  <div className="relative z-0 w-full mb-5 group">
                    <input
                      type="password"
                      name="password"
                      id="password"
                      className="block py-2.5 px-0 w-full text-sm text-green-600 bg-transparent border-0 border-b-2 border-green-600 appearance-none dark:text-white dark:border-gray-600 dark:focus:text-green-600 focus:outline-none focus:ring-0 focus:text-green-600 peer focus:border-green-600"
                      placeholder=" "
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={formik.values.password}
                    />
                    <label
                      htmlFor="password"
                      className="peer-focus:font-medium absolute text-sm text-green-600 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-green-600 peer-focus:dark:text-green-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                    >
                      Enter your Password:
                    </label>
                  </div>
                  {formik.errors.password && formik.touched.password ? (
                    <div
                      className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400"
                      role="alert"
                    >
                      <span className="font-medium">
                        {formik.errors.password}
                      </span>
                    </div>
                  ) : null}
                  <div className="relative z-0 w-full mb-5 group">
                    <input
                      type="number"
                      name="age"
                      id="age"
                      className="block py-2.5 px-0 w-full text-sm text-green-600 bg-transparent border-0 border-b-2 border-green-600 appearance-none dark:text-white dark:border-gray-600 dark:focus:text-green-600 focus:outline-none focus:ring-0 focus:text-green-600 peer focus:border-green-600"
                      placeholder=" "
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={formik.values.age}
                    />
                    <label
                      htmlFor="age"
                      className="peer-focus:font-medium absolute text-sm text-green-600 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-green-600 peer-focus:dark:text-green-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                    >
                      Enter your Age:
                    </label>
                  </div>
                  {formik.errors.age && formik.touched.age ? (
                    <div
                      className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400"
                      role="alert"
                    >
                      <span className="font-medium">{formik.errors.age}</span>
                    </div>
                  ) : null}

                  <div className="relative z-0 w-full mb-5 group">
                    <input
                      type="tel"
                      name="phone"
                      id="phone"
                      className="block py-2.5 px-0 w-full text-sm text-green-600 bg-transparent border-0 border-b-2 border-green-600 appearance-none dark:text-white dark:border-gray-600 dark:focus:text-green-600 focus:outline-none focus:ring-0 focus:text-green-600 peer focus:border-green-600"
                      placeholder=" "
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={formik.values.phone}
                    />
                    <label
                      htmlFor="phone"
                      className="peer-focus:font-medium absolute text-sm text-green-600 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-green-600 peer-focus:dark:text-green-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                    >
                      Enter Phone number:
                    </label>
                  </div>
                  {formik.errors.phone && formik.touched.phone ? (
                    <div
                      className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400"
                      role="alert"
                    >
                      <span className="font-medium">{formik.errors.phone}</span>
                    </div>
                  ) : null}
                  <button
                    type="submit"
                    className="block mx-auto focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5  mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
                  >
                    {isLoading ? (
                      <i className=" fas fa-spinner fa-spin text-white"></i>
                    ) : (
                      "register"
                    )}
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
