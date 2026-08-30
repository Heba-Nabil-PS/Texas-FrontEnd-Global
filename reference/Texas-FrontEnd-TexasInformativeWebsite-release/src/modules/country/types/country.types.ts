import { SEOContentProps } from "@/modules/seo/types/seo.types";

export interface CountryConfigurationsProps {
  phone: string;
  email: string;
  deliveryPhone: string;
  birthdayPhone: string;
  facilitiesEnabled: boolean | null;
  mobileAppEnabled: boolean | null;
  mobileAppIOSLink: string;
  mobileAppAndroidLink: string;
  careerEmail: string;
  header: string | null;
  footer: string | null;
  captchaClientKey: string | null;
  cmP_Code: string | null;
  googleAnalyticsID: string | null;
  voucherExternalLink: string | null;
  orderExternalLink: string | null;
  googleMapIframURL: string | null;
}

export interface CountryWithLanguageProps {
  direction: string;
  languageName: string;
  isoCode: string;
  prima: boolean;
  countryData: CountryDataProps;
}

export interface CountryDataProps {
  isoCode: string;
  name: string;
  currency: string;
  address: string;
  locations: CountryLocationProps[];
  citizenships: CitizenshipProps[];
  states: CountryStatesProps[] | null;
  countryAggregators: {
    isoCode: string;
    name: string;
    aggregators: CountryAggregatorsProps[];
  }[];
  inquiries: CountryInquiriesProps[];
  countryModules: CountryModulesProps[];
  countryCoupons: CountryCouponsProps[];
  countrySocialMedias: CountrySocialMediasProps[];
  areas: CountryAreaProps[];
}

export interface CountryLocationProps extends SEOContentProps {
  id: number;
  uniqueCode: string;
  name: string;
  googleMapIframeLink: string;
  description: string;
  openingDaily: string;
  displayOrder: number;
  phone: string;
  email: string | null;
  isPartyPickup: boolean;
  latitude: string;
  longitude: string;
  directionLink: string | null;
  stateId: number | null;
  stateName: string | null;
  stateShortDescription: string | null;
  facilityList: CountryBranchFacilityProps[];
  aggregatorList: CountryAggregatorsProps[];
  couponList: CountryCouponsProps[];
}

export interface CountryBranchFacilityProps {
  id: number;
  name: string | null;
  imageActual: string;
  imageMedium: string;
  imageThumbnail: string;
  isoCode: string | null;
  displayOrder: number;
}

export interface CountryAggregatorsProps {
  id: number;
  url: string | null;
  mobileURL: string | null;
  featured: boolean;
  imageActual: string | null;
  imageMedium: string | null;
  imageThumbnail: string | null;
  alt: string | null;
  imageUrl: string | null;
  displayOrder: number;
}

export interface CountryInquiriesProps {
  id: number;
  name: string | null;
}

export interface CountryModulesProps {
  id: number;
  name: string;
  status: boolean;
}

export interface CountryCouponsProps {
  id: number;
  displayOrder: number;
  imageURL: string;
  title: string | null;
  description: string | null;
  alt: string | null;
}

export interface CountryCouponsProps {
  id: number;
  displayOrder: number;
  imageURL: string;
  title: string | null;
  description: string | null;
  alt: string | null;
}

export interface CountryStatesProps {
  id: number;
  name: string;
  displayOrder: number;
}

export interface CitizenshipProps {
  id: number;
  name: string;
  displayOrder: number;
}

export enum CountrySocialMediaEnum {
  Facebook = 1,
  Instagram,
  Twitter,
  YouTube,
  TikTok,
  Snapchat,
}

export interface CountrySocialMediasProps {
  url: string;
  alt: string;
  platform: CountrySocialMediaEnum;
}

export interface CountryAreaProps {
  id: number;
  name: string;
  displayOrder: number;
}
