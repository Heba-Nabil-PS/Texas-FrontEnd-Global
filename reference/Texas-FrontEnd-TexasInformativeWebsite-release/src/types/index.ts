import { StaticImageData } from "next/image";

export type BoardMember = {
  position: string;
  name: string;
};
export type Blog = {
  imagePath: StaticImageData;
  estimation: string;
  date: string;
  title: string;
  content: string;
  category: string;
  blogWritter: string;
};

export type NavItemType = {
  id: number;
  name: string;
  url: string;
  isOn: boolean;
  isExternal: boolean;
};

export type MetricsItem = {
  id: number;
  name: string;
  to: number;
};

export type NewsItem = {
  id: number;
  name: string;
  desc: string;
  date: string;
  img: string;
};

export type SocialMediaItem = {
  id: number;
  type: number;
  name: string;
  href: string;
};

export type FooterItems = {
  id: number;
  name: string;
  href: string;
};
export type Brands = {
  src: string;
  alt: string;
  content?: string;
  title?: string;
};

export type BannerType = {
  Image: string;
  ImageResponsive: string;
  Alt: string;
  Video: string;
  Button1Name: string;
  Button1URL: string;
  Button2Name: string;
  Button2URL: string;
  Title: string;
  Body: string;
  ID: number;
  InstanceName: string;
  UniqName: string | null;
  DisplayOrder: number;
  BannerType: number;
  Button1Enabled: boolean;
  Button2Enabled: boolean;
  IOSButtonEnabled: boolean;
  AndroidButtonEnabled: boolean;
};

export type PageMetadata = {
  ID: number;
  ControlName: string | null;
  FriendlyName: string;
  MenuName: string;
  PageTitle: string;
  PageDescription: string;
  PageKeywords: string;
  OGtype: string;
  OGtitle: string;
  OGdescription: string;
  OGimage: string;
  Twittertitle: string;
  Twitterdescription: string;
  Twitterimage: string;
  H1: string;
  H2: string;
  H3: string;
  Status: boolean;
};

export type CategoryType = {
  ID: number;
  UniqueName: string;
  InstanceID: number;
  InstanceUniqueName: string;
  CountryID: number;
  ParentCategoryID: number;
  ParentCategoryName: string | null;
  ParentCategoryUniqueName: string | null;
  Order: number;
  Status: boolean;
  Name: string;
  DescriptionShort: string;
  DescriptionLong: string;
  Featured: boolean;
  Source1: string | null;
  Source2: string | null;
  Link1: string | null;
  Link2: string | null;
  ImageUrl: string | null;
  MediumImage: string | null;
  ThumbnailImage: string | null;
  FeaturedImageUrl: string | null;
  FeaturedMediumImage: string | null;
  FeaturedThumbnailImage: string | null;
  BannerImageUrl: string | null;
  BannerMediumImage: string | null;
  BannerThumbnailImage: string | null;
  FeaturedBannerImageUrl: string | null;
  FeaturedBannerMediumImage: string | null;
  FeaturedBannerThumbnailImage: string | null;
  SEOID: number;
  PageTitle: string;
  PageDescription: string | null;
  PageKeywords: string | null;
  OGtype: string | null;
  OGtitle: string | null;
  OGdescription: string | null;
  OGimage: string;
  Twittertitle: string | null;
  Twitterdescription: string | null;
  Twitterimage: string;
  AdvancedCategoryMedia: CategoryMediaType[] | null;
  AdvancedCategoryDocument: string | null;
};

export type CategoryContentType = {
  ID: number;
  UniqueName: string;
  InstanceID: number;
  CountryID: number;
  InstanceUniqueName: string;
  InstanceName: string;
  AdvancedContentCategoryID: number;
  ImageUrl: string;
  MediumImage: string | null;
  ThumbnailImage: string | null;
  FeatureImageUrl: string | null;
  FeatureMediumImage: string | null;
  FeatureThumbnailImage: string | null;
  CategoryName: string;
  CategoryUniqueName: string;
  CategoryStatus: boolean;
  Name: string;
  DescriptionShort: string | null;
  DescriptionLong: string;
  Date: string | null;
  StartDate: string | null;
  EndDate: string | null;
  Order: number;
  Status: boolean;
  Featured: boolean;
  Link1: string | null;
  Link2: string | null;
  Link3: string | null;
  Source1: string | null;
  Source2: string | null;
  Source3: string | null;
  Auther1: string | null;
  Auther2: string | null;
  Auther3: string | null;
  Footer: string | null;
  Header: string | null;
  SEOID: number;
  PageTitle: string;
  PageDescription: string | null;
  PageKeywords: string | null;
  OGtype: string | null;
  OGtitle: string | null;
  OGdescription: string | null;
  OGimage: string;
  Twittertitle: string | null;
  Twitterdescription: string | null;
  Twitterimage: string;
  AdvancedContentMedias: CategoryContentMediaType[] | null;
  AdvancedContentDocuments: string | null;
};
export type CategoryDocumentType = {
  ID: number;
  CategoryID: number;
  URL: string;
  Status: boolean;
  Prima: boolean;
  Featured: boolean;
  DisplayOrder: number;
  CountryID: number;
  LanguageID: number;
  Name: string;
  ImageAlt: string | null;
  ShortDescription: string;
};
export type CategoryContentMediaType = {
  LanguageID: number;
  AdvancedContentID: number;
  InstanceID: number;
  ID: number;
  ContentName: string;
  ContentUniqueName: string;
  Name: string;
  ShortDescription: string;
  Alt: string;
  Type: number;
  TypeName: string;
  ImageUrl: string | null;
  ActualImage: string | null;
  MediumImage: string | null;
  ThumbnailImage: string | null;
  URL: string;
  YoutubeLink: string;
  Video: string;
  Prima: boolean;
  Featured: boolean;
  Order: number;
};

export type CategoryMediaType = {
  ID: number;
  CategoryName: string;
  CategoryUniqueName: string;
  Name: string;
  ShortDescription: string;
  Alt: string;
  Type: number;
  TypeName: string;
  ActualImage: string;
  MediumImage: string | null;
  ThumbnailImage: string | null;
  URL: string;
  YoutubeLink: string;
  Video: string;
  Prima: boolean;
  Featured: boolean;
  DisplayOrder: number;
};
// types/menu.ts
export interface MenuItem {
  id: string;
  name: string;
  description?: string;
  image?: string;
  category: string;
  price?: number;
  currency?: string;
}

export interface MenuCategory {
  id: string;
  name: string;
  bgImage: string;
  image: string;
  elementImage: string;
  items: MenuItem[];
}
export type MapPositionProps = {
  lat: number;
  lng: number;
};
