"use client";

import { Dispatch, SetStateAction, useRef, useState } from "react";
import { useFormStatus } from "react-dom";
import Image from "next/image";
import { uploadDesign } from "@/actions/designs/action";
import { Wallpaper } from "lucide-react";
import { Input } from "../ui/input";
import { Button } from "../ui/button";

function DesignInsertInfo({
  setShowForm,
  setDesignId,
  isLoading,
}: {
  setShowForm: Dispatch<SetStateAction<boolean>>;
  setDesignId: Dispatch<SetStateAction<string>>;
  isLoading: boolean;
}) {
  const { pending } = useFormStatus();
  const imgRef = useRef<HTMLFormElement>(null);
  const [designImage, setDesignImage] = useState("");

  return (
    <form
      ref={imgRef}
      action={async (formData: FormData) => {
        const file = formData.get("design") as File;
        if (!file?.name || !file.size) return;
        const design = await uploadDesign(formData);
        if (design) {
          setShowForm(true);
          if (imgRef.current) imgRef.current.reset();
          setDesignId(design.id);
          setDesignImage(design.img_url!);
        }
      }}
    >
      <div className="text-center">
        <Wallpaper
          aria-hidden="true"
          className="mx-auto h-12 w-12 text-gray-300"
        />
        <div className="mt-4 text-sm leading-6 text-gray-600 flex flex-col text-start">
          <label
            htmlFor="design"
            className="relative cursor-pointer rounded-md bg-white font-semibold text-indigo-600 focus-within:outline-none hover:text-indigo-500"
          >
            {designImage ? (
              <Image
                width={200}
                height={200}
                alt="design image"
                src={designImage}
              />
            ) : (
              <Input
                name="design"
                id="design"
                type="file"
                accept="image/*"
                disabled={isLoading}
              />
            )}
            <Button
              disabled={pending}
              className="rounded-full mt-2"
              variant={"secondary"}
            >
              Upload now
            </Button>
          </label>
          <p className="pl-1">or drag and drop</p>
        </div>
        <p className="text-xs leading-5 text-gray-600 text-start">
          PNG, JPG, GIF up to 10MB
        </p>
      </div>
    </form>
  );
}

export default DesignInsertInfo;
