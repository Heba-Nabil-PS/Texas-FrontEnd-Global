import { SEOContentProps } from "@/modules/seo/types/seo.types";

export interface BlogSingleProps extends SEOContentProps {
  id: number;
  uniqueCode: string;
  title: string;
  description: string;
  descriptionShort: string;
  displayOrder: number | null | undefined;
  displayDate: string;
  alt: string;
  blogImages: BlogImageProps[];
}
export interface BlogImageProps {
  id: number;
  displayOrder: number | null | undefined;
  imageActual: string;
  imageMedium: string;
  imageThumbnail: string;
  prima: boolean;
}
