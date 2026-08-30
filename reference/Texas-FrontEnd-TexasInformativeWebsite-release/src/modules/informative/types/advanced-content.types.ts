export interface AdvancedContentCategoryProps {
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
  Link1: string;
  Link2: string | null;
  ImageUrl: string;
  ImageAlt: string | null;
  ImageName: string;
  MediumImage: string | null;
  ThumbnailImage: string | null;
  FeaturedImageUrl: string;
  FeaturedMediumImage: string | null;
  FeaturedThumbnailImage: string | null;
  BannerImageUrl: string | null;
  BannerMediumImage: string | null;
  BannerThumbnailImage: string | null;
  FeaturedBannerImageUrl: string | null;
  FeaturedImageAlt: string | null;
  FeaturedImageName: string | string;
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
  AdvancedCategoryMedia: string | null;
  AdvancedCategoryDocument: string | null;
}

export enum MediaTypeEnum {
  Banner = 1,
  Image,
  Link,
  Video,
  YoutubeLink,
}

export enum BannerTypeEnum {
  Image = 1,
  Video,
}

export interface AdvancedContentCategoryMediaProps {
  ID: number;
  CategoryName: string;
  CategoryUniqueName: string;
  Name: string;
  ShortDescription: string | null;
  Alt: string;
  Type: MediaTypeEnum;
  TypeName: string;
  ActualImage: string | null;
  MediumImage: string | null;
  ThumbnailImage: string | null;
  URL: string;
  YoutubeLink: string;
  Video: string;
  Prima: boolean;
  Featured: boolean;
  DisplayOrder: number;
}

export interface AdvancedContentCategoryDocsProps {
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
}

export interface CategorySingleContentProps {
  ID: number;
  UniqueName: string;
  InstanceID: number;
  CountryID: number;
  InstanceUniqueName: string;
  InstanceName: string;
  AdvancedContentCategoryID: number;
  ImageUrl: string;
  ImageAlt: string | null;
  ImageName: string;
  MediumImage: string;
  ThumbnailImage: string;
  FeatureImageUrl: string;
  FeaturedImageAlt: string | null;
  FeaturedImageName: string;
  FeatureMediumImage: string;
  FeatureThumbnailImage: string;
  CategoryName: string;
  CategoryUniqueName: string;
  CategoryStatus: boolean;
  Name: string;
  DescriptionShort: string;
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
  OGimage: string | null;
  Twittertitle: string | null;
  Twitterdescription: string | null;
  Twitterimage: string | null;
  AdvancedContentMedias: {
    LanguageID: number;
    AdvancedContentID: number;
    InstanceID: number;
    ID: number;
    ContentName: string;
    ContentUniqueName: string;
    Name: string;
    ShortDescription: string | null;
    Alt: string;
    Type: MediaTypeEnum;
    TypeName: string;
    ImageUrl: string;
    MediumImage: string;
    ThumbnailImage: string | null;
    URL: string;
    YoutubeLink: string;
    Video: string;
    Prima: boolean;
    Featured: boolean;
    Order: number;
  }[];
  AdvancedContentDocuments: [];
}
