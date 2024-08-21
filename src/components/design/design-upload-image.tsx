"use client";

import { Dispatch, SetStateAction, useRef, useState } from "react";
import { useFormStatus } from "react-dom";
import Image from "next/image";
import { uploadDesign } from "@/actions/designs/action";
import { Loader2, Wallpaper } from "lucide-react";
import { Input } from "../ui/input";
import { Button } from "../ui/button";

function DesignUploadImage({
  setShowForm,
  setDesignId,
}: {
  setShowForm: Dispatch<SetStateAction<boolean>>;
  setDesignId: Dispatch<SetStateAction<string>>;
  isLoading: boolean;
}) {
  const { pending } = useFormStatus();
  const imgRef = useRef<HTMLFormElement>(null);
  const [designImage, setDesignImage] = useState("");
  const [loadingImg, setLoadingImg] = useState(false);

  const handleAction = async (formData: FormData) => {
    try {
      setLoadingImg(true);
      const file = formData.get("design") as File;
      if (!file?.name || !file.size) return;
      const design = await uploadDesign(formData);
      if (design) {
        setShowForm(true);
        if (imgRef.current) imgRef.current.reset();
        setDesignId(design.id);
        setDesignImage(design.img_url!);
      }
    } catch (err: any) {
      console.log(err.message);
    } finally {
      setLoadingImg(false);
    }
  };
  return (
    <form ref={imgRef} action={handleAction}>
      {designImage ? (
        <Image
          width={200}
          height={200}
          alt="design image"
          className="text-center rounded-lg"
          src={designImage}
        />
      ) : (
        <div className="text-center">
          {loadingImg ? (
            <Loader2 className="animate-spin" size={40} />
          ) : (
            <Wallpaper
              aria-hidden="true"
              className="mx-auto h-12 w-12 text-gray-300"
            />
          )}
          <div className="mt-4 text-sm leading-6 text-gray-600 flex flex-col text-start">
            <label
              htmlFor="design"
              className="relative cursor-pointer rounded-md bg-white font-semibold text-indigo-600 focus-within:outline-none hover:text-indigo-500"
            >
              <Input
                name="design"
                id="design"
                type="file"
                accept="image/*"
                disabled={loadingImg}
              />

              <Button
                disabled={loadingImg}
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
      )}
    </form>
  );
}

export default DesignUploadImage;
