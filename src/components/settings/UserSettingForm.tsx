"use client";
import { Input } from "@/components/ui/input";
import { useRef, useState } from "react";
import { Button } from "../ui/button";
import { uploadAvatar } from "@/actions/user/actions";
import { revalidatePath } from "next/cache";
import { useFormStatus } from "react-dom";
import { useRouter } from "next/navigation";

function UserUpdateAvatar() {
  const [startUpload, setStartUpload] = useState(false);
  const { pending } = useFormStatus();
  const ref = useRef<HTMLFormElement>(null);
  const router = useRouter();

  return (
    <div className="">
      <Button
        onClick={() => setStartUpload((prev) => !prev)}
        className="rounded-full"
        variant={"outline"}
      >
        {startUpload ? "Hide" : "Upload"} new picture
      </Button>

      {startUpload && (
        <form
          ref={ref}
          action={async (formData: FormData) => {
            const isUploaded = await uploadAvatar(formData);
            if (isUploaded) {
              setStartUpload(false);
              revalidatePath("/:user/settings", "page");
              if (ref.current) ref.current.reset();
            }
          }}
          className="mt-4"
        >
          <Input
            disabled={pending}
            type="file"
            accept="image/*"
            className="bg-primary/10"
            name="avatar_img"
          />
          <Button
            className="rounded-full mt-2"
            variant={"secondary"}
            disabled={pending}
          >
            Upload now
          </Button>
        </form>
      )}
    </div>
  );
}

export default UserUpdateAvatar;
