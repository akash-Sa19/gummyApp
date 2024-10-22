import React, { useState } from "react";
import OAuthComponent from "./OAuthComponent";
import loginQuery from "../../../articles/Auth/loginQuery";
import FormSuccessMessage from "./FormSuccessMessage";

const LoginForm = ({ setFormType }) => {
  const [formData, setFormData] = useState({ email: "", password: "" });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const [isSuccess, setIsSuccess] = useState("");
  const [isError, setIsError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Login Data: ", formData);

    setIsSuccess("");
    setIsError("");

    // Handle login logic here
    await loginQuery(formData)
      .then((res) => {
        console.log(res);
        console.log(res.message);

        if (res.status === "success") {
          setIsSuccess(res.message);
        } else if (res.status === "unauthorized") {
          setIsError(res.message);
        } else if (res.status === "conflict") {
          setIsError(res.message);
        } else if (res.status === "notFound") {
          setIsError(res.message);
        } else {
          setIsError("An unknow error occurred");
        }
      })
      .catch((err) => {
        setIsError(err.message);
      });
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-lg">
        <h2 className="mb-6 text-2xl font-bold text-gray-700">Login</h2>
        <form
          onSubmit={handleSubmit}
          className="space-y-6"
        >
          <div>
            <label
              htmlFor="email"
              className="block text-gray-700"
            >
              Email Address
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full p-3 border border-gray-300 rounded-lg"
              placeholder="Enter your email"
            />
          </div>
          <div>
            <label
              htmlFor="password"
              className="block text-gray-700"
            >
              Password
            </label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
              className="w-full p-3 border border-gray-300 rounded-lg"
              placeholder="Enter your password"
            />
          </div>
          <div>
            {isSuccess && <FormSuccessMessage message={isSuccess} />}
            {isError && <FormErrorMessage message={isError} />}
          </div>
          <div>
            <button
              type="submit"
              className="w-full p-3 text-white transition-colors bg-blue-600 rounded-lg hover:bg-blue-700"
            >
              Login
            </button>
          </div>
        </form>
        <OAuthComponent />
        <div className="w-full bg-gray-100 h-0.5 mt-6"></div>
        <p className="mt-2 text-center">
          Don't have an account?{" "}
          <a
            onClick={() => setFormType("register")}
            className="text-blue-600 hover:underline"
          >
            Sign Up
          </a>
        </p>
      </div>
    </div>
  );
};

export default LoginForm;
