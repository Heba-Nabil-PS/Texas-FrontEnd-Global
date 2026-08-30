import { notFound } from "next/navigation";
import { getTranslations } from "next-intl/server";
import { isModuleOn } from "@/lib";
import { STATIC_MODULES } from "@/constants/country-modules";
import { getCountryData } from "@/modules/country/services/country.service";
import { getSingleCareerData } from "@/modules/careers/services/singleCareer.services";
import { buildMetaData } from "@/modules/seo/seo.utils";
import { InnerCareersViewPage } from "@/views/careers/InnerCareersViewPage";
import type { InnerCareerResourcesProps } from "@/types/resources";
import type { Metadata } from "next";

interface InnerCareersPageProps {
  params: Promise<{
    InnerCareers: string;
    locale: string;
  }>;
}

export async function generateMetadata(props: InnerCareersPageProps): Promise<Metadata> {
  const params = await props.params;
  try {
    const { locale, InnerCareers } = params;

    const careerResponse = await getSingleCareerData(InnerCareers, locale);
    const career = careerResponse?.results;

    if (!career) throw new Error("No meta data found");

    return await buildMetaData({
      metaData: career,
    });
  } catch {
    return {};
  }
}

const InnerCareersPage = async (props: InnerCareersPageProps) => {
  const { InnerCareers, locale  } = await props.params;

  const countryResponse = await getCountryData();
  const countryResults = countryResponse?.results?.find(
    (item) =>
      item.isoCode?.trim()?.toLowerCase() === locale?.trim()?.toLowerCase(),
  );

  const useCareerEmail = Boolean(
    isModuleOn(
      countryResults?.countryData?.countryModules,
      STATIC_MODULES.CAREER,
    ),
  );

  const useCareerForm = Boolean(
    isModuleOn(
      countryResults?.countryData?.countryModules,
      STATIC_MODULES.CAREERADVANCED,
    ),
  );

  if (useCareerEmail || !useCareerForm) {
    return notFound();
  }

  const singleCareerResponse = await getSingleCareerData(InnerCareers, locale);
  const singleCareer = singleCareerResponse?.results;

  if (!singleCareer) {
    return notFound();
  }

  const t = await getTranslations();

  const resources: InnerCareerResourcesProps = {
    Home: t("Home"),
    careers: t("careers"),
    "back-to-careers": t("back-to-careers"),
    "name-is-required": t("name-is-required"),
    "name-must-be-at-most": t("name-must-be-at-most"),
    "characters-long": t("characters-long"),
    "name-can-only-contain-letters-or-abostrophe": t(
      "name-can-only-contain-letters-or-abostrophe",
    ),
    "email-is-required": t("email-is-required"),
    "invalid-email-address": t("invalid-email-address"),
    "phone-number-must-be-at-most": t("phone-number-must-be-at-most"),
    "phone-number-is-required": t("phone-number-is-required"),
    "citizenship-required": t("citizenship-required"),
    "max-length-character": t("max-length-character"),
    "date-must-be-past-date": t("date-must-be-past-date"),
    "captcha-is-required": t("captcha-is-required"),
    "successfully-submitted": t("successfully-submitted"),
    "apply-for-this-position": t("apply-for-this-position"),
    name: t("name"),
    Email: t("Email"),
    "phone-number": t("phone-number"),
    DateOfBirth: t("DateOfBirth"),
    "choose-citizenship": t("choose-citizenship"),
    ResidentialAddress: t("ResidentialAddress"),
    PreferredJobType: t("PreferredJobType"),
    "education-level": t("education-level"),
    AreaLable: t("AreaLable"),
    "work-location": t("work-location"),
    "drag-and-drop": t("drag-and-drop"),
    "file-size-exceeds-the-limit-of-5mb": t(
      "file-size-exceeds-the-limit-of-5mb",
    ),
    "invalid-file-type-only-are-allowed": t(
      "invalid-file-type-only-are-allowed",
    ),
    "you-can-only-upload-maximum": t("you-can-only-upload-maximum"),
    files: t("files"),
    "total-files-size-exceeds-the-limit": t(
      "total-files-size-exceeds-the-limit",
    ),
    "upload-files": t("upload-files"),
    "max-files-total": t("max-files-total"),
    Submit: t("Submit"),
    highschool: t("Highschool"),
    bachelordegree: t("bachelordegree"),
    masterdegree: t("masterdegree"),
    fulltime: t("Fulltime"),
    parttime: t("Parttime"),
    "about-the-job": t("about-the-job"),
    Iagreetothe: t("Iagreetothe"),
    Terms_Conditions: t("Terms_Conditions"),
    and: t("and"),
    Privacy_Policy: t("Privacy_Policy"),
    ofcompanynameLicenseeofTexasChicken: t.raw(
      "ofcompanynameLicenseeofTexasChicken",
    ),
    CarrerTermsLine1: t.raw("CarrerTermsLine1"),
    CarrerTermsLine2: t.raw("CarrerTermsLine2"),
  };

  return (
    <InnerCareersViewPage
      resources={resources}
      uniqueCode={InnerCareers}
      jobData={singleCareer}
      locale={locale}
    />
  );
};

export default InnerCareersPage;
