import { headers } from "next/headers";
import { getTenantConfig } from "@/tenant.config";
import { getDefaultLocaleFromCountryData, isModuleOn } from "@/lib";
import { getCountryData } from "@/modules/country/services/country.service";
import { STATIC_MODULES } from "@/constants/country-modules";
import { PAGE_PATHS } from "@/constants/page-paths";
import { getAllBlogs } from "@/modules/blogs/services/blogs.service";
import { getCareersData } from "@/modules/careers/services/careers.services";
import { getCategories } from "@/modules/menu/services/category.service";
import type { MetadataRoute } from "next";

interface PagePathMetaData {
  path: string;
  isOn: boolean;
  changeFrequency: MetadataRoute.Sitemap[number]["changeFrequency"];
  priority: number;
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  try {
    const host = (await headers()).get("host") ?? "";
    const tenant = getTenantConfig(host);
    const websiteUrl = tenant?.websiteUrl;
    const countryID = tenant?.countryId;

    const countryResponse = await getCountryData(countryID);

    const countryData = countryResponse?.results;
    const modules = countryData?.[0]?.countryData?.countryModules;

    const default_locale = getDefaultLocaleFromCountryData(countryData);

    // Start of Blogs
    const blogsResponse = isModuleOn(modules, STATIC_MODULES.BLOG)
      ? await getAllBlogs(default_locale, countryID)
      : undefined;
    const blogsResults = blogsResponse?.results;

    const blogsPages: PagePathMetaData[] = blogsResults
      ? blogsResults?.map((blog) => ({
          path: `${PAGE_PATHS.BLOGS}/${blog.uniqueCode}`,
          isOn: true,
          changeFrequency: "monthly",
          priority: 0.8,
        }))
      : [];
    // End of Blogs

    // Start of Carrers
    const isCarrersOn =
      isModuleOn(modules, STATIC_MODULES.CAREER) ||
      isModuleOn(modules, STATIC_MODULES.CAREERADVANCED);

    const careersResponse = isModuleOn(modules, STATIC_MODULES.CAREERADVANCED)
      ? await getCareersData(default_locale, countryID)
      : undefined;
    const careersResults = careersResponse?.results;

    const careersPages: PagePathMetaData[] = careersResults
      ? careersResults?.map((career) => ({
          path: `${PAGE_PATHS.CAREER}/${career.uniqueCode}`,
          isOn: true,
          changeFrequency: "monthly",
          priority: 0.5,
        }))
      : [];
    // End of Carrers

    // Start of Menu
    const isMenuOn = isModuleOn(modules, STATIC_MODULES.MENU);

    const categoriesResponse = isMenuOn
      ? await getCategories(default_locale, countryID)
      : undefined;
    const categoriesResults = categoriesResponse?.results;

    const categoriesPages: PagePathMetaData[] = categoriesResults
      ? categoriesResults?.map((category) => ({
          path: `${PAGE_PATHS.MENU}/${category.uniqueCode}`,
          isOn: true,
          changeFrequency: "weekly",
          priority: 1,
        }))
      : [];
    // End of Menu

    const pages: PagePathMetaData[] = [
      {
        path: PAGE_PATHS.HOME,
        isOn: true,
        changeFrequency: "monthly",
        priority: 1,
      },
      {
        path: PAGE_PATHS.APPDATA,
        isOn: isModuleOn(modules, STATIC_MODULES.APPPAGE),
        changeFrequency: "monthly",
        priority: 0.8,
      },
      {
        path: PAGE_PATHS.BIRTHDAY,
        isOn: isModuleOn(modules, STATIC_MODULES.BIRTHDAYFORM),
        changeFrequency: "monthly",
        priority: 0.8,
      },
      {
        path: PAGE_PATHS.BLOGS,
        isOn: isModuleOn(modules, STATIC_MODULES.BLOG),
        changeFrequency: "monthly",
        priority: 0.8,
      },
      ...blogsPages,
      {
        path: PAGE_PATHS.CAREER,
        isOn: isCarrersOn,
        changeFrequency: "monthly",
        priority: 0.8,
      },
      ...careersPages,
      {
        path: PAGE_PATHS.CATRING,
        isOn: false,
        changeFrequency: "yearly",
        priority: 0.5,
      },
      {
        path: PAGE_PATHS.CONTACT,
        isOn: isModuleOn(modules, STATIC_MODULES.CONTACT),
        changeFrequency: "monthly",
        priority: 0.5,
      },
      {
        path: PAGE_PATHS.COUPONS,
        isOn: isModuleOn(modules, STATIC_MODULES.COUPON),
        changeFrequency: "monthly",
        priority: 0.5,
      },
      {
        path: PAGE_PATHS.FAQ,
        isOn: isModuleOn(modules, STATIC_MODULES.FAQ),
        changeFrequency: "monthly",
        priority: 0.5,
      },
      {
        path: PAGE_PATHS.HALAL,
        isOn: isModuleOn(modules, STATIC_MODULES.HALAL),
        changeFrequency: "monthly",
        priority: 0.5,
      },
      {
        path: PAGE_PATHS.LOCATIONS,
        isOn: isModuleOn(modules, STATIC_MODULES.LOCATION),
        changeFrequency: "monthly",
        priority: 0.8,
      },
      {
        path: PAGE_PATHS.MENU,
        isOn: isModuleOn(modules, STATIC_MODULES.MENU),
        changeFrequency: "weekly",
        priority: 1,
      },
      ...categoriesPages,
      {
        path: PAGE_PATHS.ORDER_NOW,
        isOn: false,
        changeFrequency: "monthly",
        priority: 0.5,
      },
      {
        path: PAGE_PATHS.PARTY,
        isOn: isModuleOn(modules, STATIC_MODULES.BIRTHDAY),
        changeFrequency: "monthly",
        priority: 0.8,
      },
      {
        path: PAGE_PATHS.PRIVACY,
        isOn: isModuleOn(modules, STATIC_MODULES.FOOTER_PRIVACY),
        changeFrequency: "monthly",
        priority: 0.8,
      },
      {
        path: PAGE_PATHS.REWARDS,
        isOn: false,
        changeFrequency: "yearly",
        priority: 0.5,
      },
      {
        path: PAGE_PATHS.STORY,
        isOn: isModuleOn(modules, STATIC_MODULES.STORY),
        changeFrequency: "monthly",
        priority: 0.8,
      },
      {
        path: PAGE_PATHS.TERMS,
        isOn: isModuleOn(modules, STATIC_MODULES.FOOTER_TERMSANDCONDITION),
        changeFrequency: "monthly",
        priority: 0.8,
      },
    ];

    const validPages = pages.filter((page) => page.isOn);

    return validPages?.map((page) => ({
      url: `${websiteUrl}${page.path}`,
      lastModified: new Date(),
      changeFrequency: page.changeFrequency,
      priority: page.priority,
    }));
  } catch (error) {
    return [];
  }
}
