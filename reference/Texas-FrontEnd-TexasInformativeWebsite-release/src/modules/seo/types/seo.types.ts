export interface SEOContentProps {
  pageTitle: string;
  pageDescription: string;
  pageKeywords: string;
  ogType: "website";
  ogTitle: string;
  ogDescription: string;
  ogImage: string;
  twitterTitle: string;
  twitterDescription: string;
  twitterImage: string;
}

export interface StaticPagesSeoResponseProps {
  controlName: string;
  viewName: string;
  seoData: StaticPagesSeoDataProps[];
}

export interface StaticPagesSeoDataProps extends SEOContentProps {
  isoCode: string;
  friendlyName: string;
  H1: string | null;
  H2: string | null;
  H3: string | null;
}
