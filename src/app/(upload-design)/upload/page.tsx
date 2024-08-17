"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { DesignSchema, designSchema } from "@/schema/upload-design-schema";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { uploadDesignInfo } from "@/actions/designs/action";
import DesignInsertInfo from "@/components/design/design-upload-info";

function UploadPage() {
  const [designId, setDesignId] = useState("");

  const [isShowForm, setShowForm] = useState(false);
  const router = useRouter();

  const {
    register,
    handleSubmit,
    reset,
    formState: { isSubmitting, isSubmitted },
  } = useForm<DesignSchema>({
    resolver: zodResolver(designSchema),
  });

  async function submitUploadForm(data: DesignSchema) {
    const info = {
      designId,
      title: data.title,
      description: data.description,
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
          {/* TODO; LINK OF THE DESIGN */}
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

      <div className="mt-8 flex flex-col gap-8">
        <div>
          <label
            htmlFor="cover-photo"
            className="block text-sm font-medium leading-6 text-gray-900"
          >
            Design photo <span className="text-red-600">*</span>
          </label>
          <div className="mt-2 flex justify-center rounded-lg border border-dashed border-gray-900/25 px-6 py-10">
            <DesignInsertInfo
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
