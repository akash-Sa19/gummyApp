import React, { useState } from "react";
import OAuthComponent from "./OAuthComponent";
import registerQuery from "../../../articles/Auth/registerQuery";
import FormSuccessMessage from "./FormSuccessMessage";
import FormErrorMessage from "./FormErrorMessage";

const RegisterForm = ({ setFormType }) => {
  const [formData, setFormData] = useState({
    fullName: "",
    username: "",
    email: "",
    password: "",
  });
  const [isSuccess, setIsSuccess] = useState("");
  const [isError, setIsError] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Registration Data: ", formData);

    setIsSuccess("");
    setIsError("");

    // Handle registration logic here
    await registerQuery(formData)
      .then((res) => {
        console.log(res);
        console.log(res.message);

        if (res.status === "created") {
          setIsSuccess(res.message);
        } else if (res.status === "conflict") {
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
        <h2 className="mb-6 text-2xl font-bold text-gray-700">Register</h2>
        <form
          onSubmit={handleSubmit}
          className="space-y-6"
        >
          <div>
            <label
              htmlFor="name"
              className="block text-gray-700"
            >
              Full Name
            </label>
            <input
              type="text"
              name="fullName"
              value={formData.fullName}
              onChange={handleChange}
              required
              className="w-full p-3 border border-gray-300 rounded-lg"
              placeholder="Enter your full name"
            />
          </div>
          <div>
            <label
              htmlFor="confirmPassword"
              className="block text-gray-700"
            >
              Username
            </label>
            <input
              type="text"
              name="username"
              value={formData.username}
              onChange={handleChange}
              required
              className="w-full p-3 border border-gray-300 rounded-lg"
              placeholder="Enter your username"
            />
          </div>
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
              placeholder="Create a password"
            />
          </div>
          <div>
            {isSuccess && <FormSuccessMessage message={isSuccess} />}
            {isError && <FormErrorMessage message={isError} />}
          </div>
          <div>
            <button
              type="submit"
              className="w-full p-3 text-white transition-colors bg-green-600 rounded-lg hover:bg-green-700"
            >
              Register
            </button>
          </div>
        </form>
        <OAuthComponent />
        <div className="w-full bg-gray-100 h-0.5 mt-6"></div>
        <p className="mt-2 text-center">
          Already have an account?{" "}
          <a
            href="#"
            onClick={() => setFormType("login")}
            className="text-blue-600 hover:underline"
          >
            Log in
          </a>
        </p>
      </div>
    </div>
  );
};

export default RegisterForm;
