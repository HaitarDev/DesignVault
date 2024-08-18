import { ReactNode, RefAttributes } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { DialogTriggerProps } from "@radix-ui/react-dialog";

function Modal({
  children,
  trigger,
}: {
  children: ReactNode;
  trigger: ReactNode;
}) {
  return (
    <Dialog>
      <DialogTrigger className="rounded-full h-10 w-10 p-[7px] bg-background hover:bg-secondary duration-200 transition-colors">
        {trigger}
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Please login first</DialogTitle>
          <DialogDescription>
            you can login from this form or from the login page
          </DialogDescription>
        </DialogHeader>
        <div className="mx-auto">{children}</div>
      </DialogContent>
    </Dialog>
  );
}

export default Modal;
