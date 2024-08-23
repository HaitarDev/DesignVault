import { Avatar, AvatarFallback, AvatarImage } from "./avatar";

function CustomAvatar({
  src,
  alt,
  size = 40,
}: {
  src: string;
  alt?: string;
  size: number;
}) {
  return (
    <Avatar className={`cursor-pointer h-${12} w-${12}`}>
      <AvatarImage className={``} src={src} />
      <AvatarFallback>{alt}</AvatarFallback>
    </Avatar>
  );
}

export default CustomAvatar;
