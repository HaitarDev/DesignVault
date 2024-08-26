import { ReactNode } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";

function Modal({
  children,
  trigger,
  title,
  description,
  classname = "h-10 w-10 p-[7px] bg-background hover:bg-secondary",
}: {
  children: ReactNode;
  trigger: ReactNode;
  title: string;
  description: string;
  classname?: string;
}) {
  return (
    <Dialog>
      <DialogTrigger
        className={`rounded-full ${classname}  duration-200 transition-colors items-center`}
      >
        {trigger}
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>{description}</DialogDescription>
        </DialogHeader>
        <div className="">{children}</div>
      </DialogContent>
    </Dialog>
  );
}

export default Modal;
