"use client";

import { useForm } from "react-hook-form";
import { Button } from "../ui/button";
import { UserInfoSchema, userInfoSchema } from "@/schema/info-user-schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { updateUserInfo } from "@/actions/user/actions";
import { Input } from "../ui/input";

export default function UserUpdateInfo() {
  const {
    reset,
    handleSubmit,
    register,
    formState: { isSubmitting: isLoading },
  } = useForm<UserInfoSchema>({
    resolver: zodResolver(userInfoSchema),
  });

  const submitForm = async (data: UserInfoSchema) => {
    const userData = new FormData();
    userData.append("username", data.username);
    userData.append("description", data.description);

    await updateUserInfo(userData);

    reset();
  };
  return (
    <form onSubmit={handleSubmit(submitForm)}>
      <div className="space-y-4">
        <div className="border-b border-gray-900/10 pb-8">
          <h2 className="text-base font-semibold leading-7 text-gray-900">
            Profile
          </h2>
          <p className="mt-1 text-sm leading-6 text-gray-600">
            This information will be displayed publicly so be careful what you
            share.
          </p>

          <div className="mt-10">
            <div className="sm:col-span-4 w-full">
              <label
                htmlFor="username"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Username
              </label>
              <div className="mt-2">
                <Input
                  disabled={isLoading}
                  id="username"
                  type="text"
                  placeholder="janesmith"
                  autoComplete="username"
                  className=" py-1.5 pl-1 text-gray-900 ring-1 focus:ring-2 sm:text-sm sm:leading-6 disabled:bg-black/10 w-full"
                  {...register("username")}
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="col-span-full mt-4">
        <label
          htmlFor="description"
          className="block text-sm font-medium leading-6 text-gray-900"
        >
          Description
        </label>
        <div className="mt-2">
          <textarea
            disabled={isLoading}
            id="description"
            rows={3}
            className="block w-full rounded-md border-0 px-1 py-1.5 text-gray-900 shadow-sm ring-1 outline-none   focus:ring-2 sm:text-sm sm:leading-6 disabled:bg-black/10"
            {...register("description")}
          />
        </div>
        <p className="mt-3 text-sm leading-6 text-gray-600">
          Write a few sentences about yourself.
        </p>
      </div>

      <div className="mt-6 flex items-center justify-end gap-x-6">
        <Button disabled={isLoading} type="button" variant={"ghost"}>
          Cancel
        </Button>
        <Button disabled={isLoading} className="bg-indigo-600">
          Save
        </Button>
      </div>
    </form>
  );
}
