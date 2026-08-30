import { SEOContentProps } from "@/modules/seo/types/seo.types";

export interface CategoryProps extends SEOContentProps {
  id: number;
  uniqueCode: string;
  imageActual: string;
  imageMedium: string;
  imageThumbnail: string;
  homePageImage: string;
  backgroundImage: string;
  name: string;
  description: string;
  descriptionShort: string | null;
  alt: string;
  displayOrder: number;
}
