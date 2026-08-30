import { cn } from "@/lib/utils";
import { FacebookIcon } from "@/components/icons/social-medias/facebook-icon";
import { TwitterIcon } from "@/components/icons/social-medias/twitter-icon";
import { InstagramIcon } from "@/components/icons/social-medias/instagram-icon";
import { TelegramIcon } from "@/components/icons/social-medias/telegram-icon";
import { SnapchatIcon } from "@/components/icons/social-medias/snapchat-icon";
import { LinkedinIcon } from "@/components/icons/social-medias/linkedin-icon";
import { YoutubeIcon } from "@/components/icons/social-medias/youtube-icon";
import { TiktokIcon } from "@/components/icons/social-medias/tiktok-icon";
import { WebsiteIcon } from "@/components/icons/social-medias/website-icon";
import {
  CountrySocialMediaEnum,
  CountrySocialMediasProps,
} from "@/modules/country/types/country.types";

interface SocialMediaPlatformsProps {
  data: CountrySocialMediasProps[];
  className?: string;
  linkClassName?: string;
  iconclassname?: string;
}

export function SocialMediaPlatforms(props: SocialMediaPlatformsProps) {
  const { data, className, linkClassName, iconclassname } = props;

  return (
    <ul className={cn("flex flex-wrap gap-2 md:gap-4", className)}>
      {data?.map((item, index) => (
        <li key={index}>
          <a
            href={item.url}
            key={item.alt}
            target="_blank"
            rel="noopener noreferrer"
            className={linkClassName}
            aria-label={item.alt}
          >
            {item.platform === CountrySocialMediaEnum.Facebook && (
              <FacebookIcon className={iconclassname} />
            )}

            {item.platform === CountrySocialMediaEnum.Twitter && (
              <TwitterIcon className={iconclassname} />
            )}

            {item.platform === CountrySocialMediaEnum.Instagram && (
              <InstagramIcon className={iconclassname} />
            )}

            {item.platform === CountrySocialMediaEnum.Snapchat && (
              <SnapchatIcon className={iconclassname} />
            )}

            {item.platform === CountrySocialMediaEnum.YouTube && (
              <YoutubeIcon className={iconclassname} />
            )}

            {item.platform === CountrySocialMediaEnum.TikTok && (
              <TiktokIcon className={iconclassname} />
            )}
          </a>
        </li>
      ))}
    </ul>
  );
}
