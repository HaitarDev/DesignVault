"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";

import DesignUploadImage from "@/components/design/design-upload-image";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import { zodResolver } from "@hookform/resolvers/zod";
import { uploadDesignInfo } from "@/actions/designs/action";
import { DesignSchema, designSchema } from "@/schema/upload-design-schema";
import { X } from "lucide-react";

function UploadPage() {
  const [designId, setDesignId] = useState("");
  const [tagName, setTagName] = useState("");
  const [newTags, setNewTags] = useState<string[]>([]);
  const [errorTags, setErrorTags] = useState<string>("");
  const [isShowForm, setShowForm] = useState(false);

  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { isSubmitting, isSubmitted },
  } = useForm<DesignSchema>({
    resolver: zodResolver(designSchema),
  });

  async function submitUploadForm(data: DesignSchema) {
    const info = {
      designId,
      title: data.title,
      description: data.description,
      tags: newTags,
    };
    const newDesignId = await uploadDesignInfo(info);
    if (designId) router.push(`/discover/${newDesignId}`);
  }

  return (
    <div className="px-4 container max-w-screen-md">
      <form
        onSubmit={handleSubmit(submitUploadForm)}
        className="flex  flex-col gap-6"
      >
        <div className="flex justify-between">
          <Button
            onClick={() => router.back()}
            disabled={isSubmitting}
            className="rounded-full"
            variant={"outline"}
          >
            Cancel
          </Button>
          <Button
            type="submit"
            disabled={isSubmitting || isSubmitted}
            className="rounded-full"
          >
            Continue
          </Button>
        </div>
        <div>
          <h1 className="text-4xl text-center font-bold">
            What have you been working on?
          </h1>
        </div>
        {isShowForm && (
          <div className="flex flex-col gap-6">
            <div className="flex flex-col gap-2">
              <Label htmlFor="title">
                Your design title <span className="text-red-600">*</span>
              </Label>

              <Input
                {...register("title")}
                disabled={isSubmitting || isSubmitted}
                id="title"
                type="text"
                placeholder="Website design for an entreprise"
                autoComplete="title"
                className=" py-1.5 pl-1 ring-1 focus:ring-2 sm:text-sm sm:leading-6 disabled:bg-black/10"
              />
            </div>
            <div className="flex flex-col gap-2">
              <Label htmlFor="description">
                Your design description <span className="text-red-600">*</span>
              </Label>

              <textarea
                {...register("description")}
                disabled={isSubmitting || isSubmitted}
                id="description"
                rows={4}
                placeholder="Long description for the website"
                autoComplete="description"
                className=" py-1.5 pl-1 ring-1 focus:ring-2 focus:outline-none sm:text-sm sm:leading-6 disabled:bg-black/10 rounded-md bg-background"
              />
            </div>
          </div>
        )}
      </form>

      {isShowForm && (
        <form
          onSubmit={(e) => {
            e.preventDefault();
            console.log(newTags.length + 1);
            if (newTags.length + 1 > 5) {
              return setErrorTags("You have maximum of 5 tags");
            }
            setNewTags((prev) => [...prev, tagName]);
            setTagName("");
            setErrorTags("");
          }}
          className="flex flex-col my-6 gap-2"
        >
          <Label htmlFor="tags">Your design tags</Label>
          <Input
            value={tagName}
            onChange={(e) => {
              if (newTags.length > 5) {
                return setErrorTags("You have maximum of 5 tags");
              }
              setTagName(e.target.value);
            }}
            disabled={isSubmitting || isSubmitted}
            id="tags"
            type="text"
            placeholder="cars - computer science - art "
            className="py-1.5 pl-1 ring-1 focus:ring-2 sm:text-sm sm:leading-6 disabled:bg-black/10"
          />
          <div className="flex flex-wrap gap-2 items-center">
            {newTags.map((tag) => (
              <Button
                type="button"
                className="w-fit"
                variant={"secondary"}
                key={tag + Math.random()}
                onClick={() =>
                  setNewTags((prev) =>
                    prev.filter((prevTag) => tag !== prevTag)
                  )
                }
              >
                {tag.toUpperCase()}
                <X />
              </Button>
            ))}
          </div>
          {errorTags !== "" && (
            <p className="text-xs font-medium text-red-500">{errorTags}</p>
          )}
        </form>
      )}

      <div className="mt-8 flex flex-col gap-8">
        <div>
          <label
            htmlFor="cover-photo"
            className="block text-sm font-medium leading-6 text-gray-900"
          >
            Design photo <span className="text-red-600">*</span>
          </label>
          <div className="mt-2 flex justify-center rounded-lg border border-dashed border-gray-900/25 px-6 py-10">
            <DesignUploadImage
              setShowForm={setShowForm}
              setDesignId={setDesignId}
              isLoading={isSubmitted || isSubmitting}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default UploadPage;
