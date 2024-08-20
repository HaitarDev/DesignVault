import { createCollection } from "@/actions/designs/action";
import React, { Dispatch, SetStateAction } from "react";
import { useForm } from "react-hook-form";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Button } from "../ui/button";

function DesignBookmarkTitle({
  setRerenderUseEffect,
}: {
  setRerenderUseEffect: Dispatch<SetStateAction<number>>;
}) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { isSubmitting },
  } = useForm({
    defaultValues: { title: "" },
  });

  const submitCreateCollection = async (data: { title: string }) => {
    if (!data.title) return;
    await createCollection(data.title);
    setRerenderUseEffect((prev) => prev + 1);
    reset();
  };

  return (
    <form
      className="flex gap-2 items-center"
      onSubmit={handleSubmit(submitCreateCollection)}
    >
      <Label htmlFor="title">Create Collection</Label>
      <div>
        <Input
          id="title"
          placeholder="collection name"
          className="ring-1 focus:ring-2 transition-all"
          {...register("title")}
          disabled={isSubmitting}
        />
      </div>
      <Button disabled={isSubmitting} size={"sm"}>
        Add
      </Button>
    </form>
  );
}

export default DesignBookmarkTitle;
