import React from "react";
import { BASEURL } from "../utils/URL";
import { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
function LoginComp() {
  const navigate = useNavigate();
  const login = async () => {
    const result = await axios.post(`${BASEURL}/user/login`, {
      email: email,
      password: password,
    });
    if (result.status == 200) {
      localStorage.setItem("role", result.data.user.role);
      localStorage.setItem("id", result.data.user.id);
      toast.success("success");
      navigate("/main");
    }
  };
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  return (
    <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <img
          className="mx-auto h-10 w-auto"
          src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
          alt="Your Company"
        />
        <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
          Sign in to your account
        </h2>
      </div>

      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        {/* <form className="space-y-6"> */}
        <div className="flex items-center justify-between">
          <label
            for="email"
            className="block text-sm font-medium leading-6 text-gray-900"
          >
            Email address
          </label>
        </div>
        <div>
          <div className="mt-2">
            <input
              id="email"
              name="email"
              type="email"
              autocomplete="email"
              required
              className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              onChange={(e) => {
                setEmail(e.target.value);
              }}
            />
          </div>
        </div>

        <div>
          <div className="flex items-center justify-between">
            <label
              for="password"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              Password
            </label>
          </div>
          <div className="mt-2">
            <input
              id="password"
              name="password"
              type="password"
              autocomplete="current-password"
              required
              className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              onChange={(e) => {
                setPassword(e.target.value);
              }}
            />
          </div>
        </div>


        <div>
          <button
            className="flex w-full mt-4 justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            onClick={login}
          >
            Sign in
          </button>
        </div>
        {/* </form> */}
      </div>
    </div>
  );
}

export default LoginComp;
