// Cache Tags
export const cacheTags = {
  DATA_CACHE_TAG: "project_data",
  BANNER_CACHE_TAG: "banner_data",
};
export const PHONE_REGEX = new RegExp("^(\\d{1}\\d{8})$");

export const websiteApiPages = {
  about: "AboutPage",
  brands: "BrandsPage",
  investors: "InvestorsPage",
  home: "HomePage",
  contactUs: "contactPage",
};
export const bannersNames = {
  aboutBanner: "aboutBanner",
  contactBanner: "contactBanner",
  feedBackBanner: "feedBackBanner",
  mediaBanner: "mediaBanner",
  productsBanner: "productsBanner",
  qualityBanner: "qualityBanner",
};

export const SeoPagesNames = {
  WebsiteGlobalSeo: "WebsiteGlobalSeo",
  HomePage: "HomePage",
  AboutPage: "AboutPage",
  BrandsPage: "BrandsPage",
  InvestorPage: "InvestorPage",
  MediaPage: "MediaPage",
  ContactPage: "ContactPage",
};

export const NAMES_REGEX = new RegExp(/^[\p{L}\p{M}\s’']+$/u);
export const TIME_REGEX = new RegExp(/^([01]\d|2[0-3]):([0-5]\d)$/);

// file validations
export const MAX_FILE_SIZE = 5 * 1024 * 1024;
export const AVAILABE_FILE_TYPES = [
  { "image/jpeg": "JPG" },
  { "image/png": "PNG" },
  { "image/webp": "WEBP" },
  { "application/pdf": "PDF" },
  { "application/msword": "DOC" },
  {
    "application/vnd.openxmlformats-officedocument.wordprocessingml.document":
      "DOCX",
  },
  { "text/plain": "TXT" },
  // { "application/rtf": "RTF" },
  // { "image/gif": "GIF" },
  // { "image/bmp": "BMP" },
  // { "image/tiff": "TIFF" },
  // { "application/vnd.ms-excel": "XLS" },
  // {
  //   "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet": "XLSX",
  // },
  // { "application/vnd.ms-powerpoint": "PPT" },
  // {
  //   "application/vnd.openxmlformats-officedocument.presentationml.presentation":
  //     "PPTX",
  // },
  // { "text/csv": "CSV" },
];

export const EducationLevel = {
  HighSchool: "HighSchool",
  // AssociateDegree: "AssociateDegree",
  BachelorDegree: "BachelorDegree",
  MasterDegree: "MasterDegree",
  // Doctorate: "Doctorate",
  // Certificate: "Certificate",
  // NoEducation: "NoEducation",
};

export const jobType = {
  FullTime: "FullTime",
  PartTime: "PartTime",
};

export const MeatPreference = {
  BothWhiteDark: "BothWhiteDark",
  WhiteMeat: "WhiteMeat",
  DarkMeat: "DarkMeat",
};

export const InquiryType = {
  WeddingParty: "WeddingParty",
  BirthdayParty: "BirthdayParty",
  OfficeParty: "OfficeParty",
  SummerBackyardParty: "SummerBackyardParty",
  ChristmasParty: "ChristmasParty",
  WatchingTVSportswithyourfriends: "WatchingTVSportswithyourfriends",
  Employeeappreciationlunch: "Employeeappreciationlunch",
  Other: "Other",
};

// Redirect status codes
export const REDIRECT_STATUS = {
  PERMANENT: 308,
  TEMPORARY: 307,
};

// Tenant Headers
export const TENANT_HEADERS = {
  COUNTRY_ID: "x-tenant-country-id",
  PROJECT_CODE: "x-tenant-project-code",
  COUNTRY_CODE: "x-tenant-country-code",
  WEBSITE_URL: "x-tenant-website-url",
};

// Fixed Env Variables
export const FIXED_ENV_VARIABLES = {
  BASE_URL: process.env.NEXT_PUBLIC_BASE_URL!,
  NODE_BASE_URL: process.env.NODE_BASE_URL!,
  FLAVOR: process.env.NEXT_PUBLIC_FLAVOR!,
  LANDING_LINK: process.env.NEXT_PUBLIC_LANDING_LINK || "#",
  FRANCHISE_LINK: process.env.NEXT_PUBLIC_FRANCHISE_LINK || "#",
};
