import { SEOContentProps } from "@/modules/seo/types/seo.types";

export interface SingleCareerProps extends SEOContentProps {
  id: number;
  uniqueCode: string;
  title: string;
  description: string;
  showDate: string;
  disabledDate: null | boolean;
}
