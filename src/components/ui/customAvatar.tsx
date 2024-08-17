import { Avatar, AvatarFallback, AvatarImage } from "./avatar";

function CustomAvatar({ src, alt }: { src: string; alt?: string }) {
  return (
    <Avatar className="cursor-pointer h-14 w-14">
      <AvatarImage className="" src={src} />
      <AvatarFallback>{alt}</AvatarFallback>
    </Avatar>
  );
}

export default CustomAvatar;
