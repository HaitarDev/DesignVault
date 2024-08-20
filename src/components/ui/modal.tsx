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
}: {
  children: ReactNode;
  trigger: ReactNode;
  title: string;
  description: string;
}) {
  return (
    <Dialog>
      <DialogTrigger className="rounded-full h-10 w-10 p-[7px] bg-background hover:bg-secondary duration-200 transition-colors">
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
