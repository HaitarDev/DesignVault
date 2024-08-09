"use client";

import React from "react";
import { Button } from "../ui/button";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { LoginSchema, loginSchema } from "@/schema/auth-schema";
import { login } from "@/actions/auth/actions";
import { useSearchParams } from "next/navigation";

function LoginForm() {
  const params = useSearchParams();
  const error = params.get("error") === "true";
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting: isLoading },
  } = useForm<LoginSchema>({ resolver: zodResolver(loginSchema) });

  const submitForm = async (data: LoginSchema) => {
    const userData = new FormData();
    userData.append("email", data.email);
    userData.append("password", data.password);

    const loginData = await login(userData);
    console.log(loginData);
  };

  return (
    <div className="w-full max-w-sm ">
      <form
        onSubmit={handleSubmit(submitForm)}
        className=" shadow-md rounded px-8 pt-6 pb-8 mb-4 bg-neutral-50"
      >
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="email"
          >
            Email
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="email"
            type="text"
            placeholder="Email"
            {...register("email")}
            disabled={isLoading}
          />
          {errors.email && (
            <p className="text-red-500 text-xs italic">
              {errors.email.message}
            </p>
          )}
        </div>
        <div className="mb-6">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="password"
          >
            Password
          </label>
          <input
            className="shadow appearance-none border border-red-500 rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
            id="password"
            type="password"
            placeholder="******************"
            {...register("password")}
            disabled={isLoading}
          />
          {errors.password && (
            <p className="text-red-500 text-xs italic">
              {errors.password.message}
            </p>
          )}
          {error && (
            <p className="text-red-500 text-xs italic">
              invalid credentials , please try again !
            </p>
          )}
        </div>
        <div className="flex items-center justify-between">
          <Button size={"lg"} disabled={isLoading}>
            Sign in
          </Button>
          <Link
            className="inline-block align-baseline font-bold text-sm text-amber-500 hover:text-amber-700"
            href="#"
          >
            Forgot Password?
          </Link>
        </div>
      </form>
      <p className="text-center text-gray-500 text-xs">
        &copy;2024 HaitarDev. All rights reserved.
      </p>
    </div>
  );
}

export default LoginForm;