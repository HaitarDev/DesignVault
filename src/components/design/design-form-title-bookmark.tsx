import { createCollection } from "@/actions/designs/action";
import { useForm } from "react-hook-form";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { useMutation, useQueryClient } from "@tanstack/react-query";

function DesignBookmarkTitle() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { isSubmitting },
  } = useForm({
    defaultValues: { title: "" },
  });

  const query = useQueryClient();
  const { mutate } = useMutation({
    mutationFn: async (title: string) => await createCollection(title),
    onSuccess: () => {
      query.invalidateQueries({ queryKey: ["collections"] });
    },
  });

  const submitCreateCollection = (data: { title: string }) => {
    if (!data.title) return;
    mutate(data.title);
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
