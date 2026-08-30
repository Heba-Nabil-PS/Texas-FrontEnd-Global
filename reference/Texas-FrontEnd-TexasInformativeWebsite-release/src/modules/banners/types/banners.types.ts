export interface BannerProps {
  id: number;
  uniqueCode: string;
  displayOrder: number;
  bannerType: BannerTypeEnum;
  button1Enabled: boolean;
  button1Name: string;
  button1URL: string;
  button2Enabled: boolean;
  button2Name: string;
  button2URL: string;
  iosButtonEnabled: boolean;
  androidButtonEnabled: boolean;
  imageActual: string;
  imageResponsive: string;
  video: string;
  alt: string;
}

export enum BannerTypeEnum {
  Image = 1,
  Video,
}
