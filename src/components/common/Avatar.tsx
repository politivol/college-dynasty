import Image from "next/image";

type Props = { src?: string; alt?: string };
export function Avatar({ src = "/placeholder.png", alt = "" }: Props) {
  return <Image src={src} alt={alt} width={32} height={32} className="rounded-full" />;
}
export default Avatar;
