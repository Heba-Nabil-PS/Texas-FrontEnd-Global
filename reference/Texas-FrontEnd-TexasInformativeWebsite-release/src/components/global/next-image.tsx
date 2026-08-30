import Image from "next/image";

export function NextImage(props: React.ComponentProps<typeof Image>) {
  const { src, alt, ...rest } = props;

  return <Image src={src} alt={alt} {...rest} />;
}
