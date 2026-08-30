import { SEOContentProps } from "@/modules/seo/types/seo.types";

export interface CategoryItemProps extends SEOContentProps {
  id: number;
  uniqueCode: string;
  name: string;
  description: string;
  calories: string;
  alt: string;
  imageActual: string;
  imageMedium: string;
  imageThumbnail: string;
  displayOrder: number;
  sizeList: SizeListProps[];
}

export interface SizeListProps {
  id: number;
  name: string;
  calories: number;
  price: number;
  isDefault: boolean;
  icon: string;
  displayOrder: number;
}
