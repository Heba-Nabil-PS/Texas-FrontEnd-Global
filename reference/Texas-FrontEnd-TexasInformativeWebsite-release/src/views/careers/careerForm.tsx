"use client";

import { useState } from "react";
import { z } from "zod";
import { motion } from "motion/react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { AsYouType } from "libphonenumber-js";
import { EducationLevel, jobType, NAMES_REGEX } from "@/constants";
import { useData } from "@/components/providers/data-provider";
import { useConfig } from "@/components/providers/config-provider";
import {
  displayInOrder,
  getLocaleDirection,
  isModuleOn,
  sanitizeInputs,
} from "@/lib";
import { uploadFetcher } from "@/lib/data-fetcher/upload-fetcher";
import { useCaptcha } from "@/hooks/useCaptcha";
import { ApiResponseWrapper } from "@/lib/data-fetcher/response-wrapper";
import { STATIC_MODULES } from "@/constants/country-modules";
import { Input } from "@/components/ui/input";
import { DateTimeInput } from "@/components/ui/date-time-input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Dropzone } from "@/components/global/drop-zone";
import { NextLink } from "@/components/global/next-link";
import { PAGE_PATHS } from "@/constants/page-paths";
import { LoadingAnimate } from "@/components/loading-animate";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import type { InnerCareerResourcesProps } from "@/types/resources";
import { domSanitize } from "@/lib/domSanitize";

interface CareerFormProps {
  locale: string;
  uniqueCode: string;
  resources: InnerCareerResourcesProps;
}

const CareerForm = (props: CareerFormProps) => {
  const { locale, uniqueCode, resources } = props;

  const {
    countryData: { citizenships, states, countryModules, areas },
  } = useData();

  const { captchaClientKey, countryId } = useConfig();
  const isCaptchaEnabled = !!captchaClientKey?.trim();

  const orderedCitizenships = displayInOrder(citizenships);
  const orderedStates = displayInOrder(states);
  const orderedAreas = displayInOrder(areas);

  const EducationLevelOptions = Object.entries(EducationLevel).map(
    ([key, value]) => ({
      id: key,
      title:
        resources[value?.toLowerCase() as keyof InnerCareerResourcesProps] ||
        value,
    }),
  );

  const jobTypeOptions = Object.entries(jobType).map(([key, value]) => ({
    id: key,
    title:
      resources[value?.toLowerCase() as keyof InnerCareerResourcesProps] ||
      value,
  }));

  const useArea = isModuleOn(countryModules, STATIC_MODULES.CAREERAREALIST);

  const formSchema = z.object({
    Name: z
      .string()
      .trim()
      .min(2, resources["name-is-required"])
      .max(
        80,
        `${resources["name-must-be-at-most"]} 80 ${resources["characters-long"]}`,
      )
      .regex(
        NAMES_REGEX,
        resources["name-can-only-contain-letters-or-abostrophe"],
      ),
    Email: z
      .string()
      .min(1, resources["email-is-required"])
      .email(resources["invalid-email-address"])
      .refine((email) => {
        const local = email.split("@")[0];

        // no leading/trailing dot
        if (local.startsWith(".") || local.endsWith(".")) return false;

        // no consecutive dots
        if (local.includes("..")) return false;

        // reject domain-like local parts (e.g. www.test.com)
        const dotCount = local.split(".").length - 1;
        if (dotCount >= 2) return false;

        return true;
      }, resources["invalid-email-address"]),
    PhoneNumber: z
      .string()
      .trim()
      .min(1, resources["phone-number-is-required"])
      .max(
        20,
        `${resources["phone-number-must-be-at-most"]} 20 ${resources["characters-long"]}`,
      ),
    CitizenshipId: z.string().trim().min(1, resources["citizenship-required"]),
    ResidentialAddress: z
      .string()
      .trim()
      .max(200, resources["max-length-character"]),
    JobType: z.string().trim().max(200, resources["max-length-character"]),
    EducationLevel: z.string().trim(),
    AreaID: z.string().trim(),
    WorkLocation: z.string().trim(),
    BirthDate: z
      .string()
      .trim()
      .refine(
        (date) => {
          if (!date) return true;

          const input = new Date(date);
          input.setHours(0, 0, 0, 0);

          const today = new Date();
          today.setHours(0, 0, 0, 0);

          return input < today;
        },
        { message: resources["date-must-be-past-date"] },
      ),
    Files: z.array(z.instanceof(File)).optional(),
    AgreeTerms: z.boolean().refine((val) => val === true, {
      message: "You must agree to the terms & conditions and privacy policy",
    }),
    Declaration: z.boolean().refine((val) => val === true, {
      message: "You must agree to the declaration",
    }),
  });

  const { handleReCaptchaVerify } = useCaptcha("career", false);

  const [isSubmitting, setIsSubmitting] = useState(false);

  const [acceptedFiles, setAcceptedFiles] = useState<File[]>([]);
  const [fileRejections, setFileRejections] = useState<string[]>([]);
  const [filesErrorMessage, setFilesErrorMessage] = useState<string>("");

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      Name: "",
      Email: "",
      PhoneNumber: "",
      BirthDate: "",
      CitizenshipId: "",
      ResidentialAddress: "",
      JobType: "",
      EducationLevel: "",
      AreaID: "",
      WorkLocation: "",
      Files: undefined,
      AgreeTerms: false,
      Declaration: false,
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    if (acceptedFiles.length === 0) {
      setFilesErrorMessage("Files are required");
      return;
    }

    const toast = (await import("sonner")).toast;

    let captcha: string | undefined = "test";

    if (isCaptchaEnabled) {
      captcha = await handleReCaptchaVerify();

      if (!captcha) return toast.error(resources["captcha-is-required"]);
    }

    const valuesWithoutHack = sanitizeInputs({
      ResidentialAddress: values.ResidentialAddress,
      WorkLocation: values.WorkLocation,
    });

    const formData = new FormData();

    formData.append("UniqueCode", uniqueCode);
    formData.append("CaptchaToken", captcha);
    formData.append("Name", values.Name);
    formData.append("Email", values.Email);
    formData.append("PhoneNumber", values.PhoneNumber);
    formData.append("BirthDate", values.BirthDate);
    formData.append("CitizenshipId", values.CitizenshipId);
    formData.append("ResidentialAddress", valuesWithoutHack.ResidentialAddress);
    formData.append("JobType", values.JobType);
    formData.append("EducationLevel", values.EducationLevel);
    formData.append("AreaID", values.AreaID);
    formData.append("WorkLocation", valuesWithoutHack.WorkLocation);
    if (acceptedFiles && acceptedFiles.length > 0) {
      acceptedFiles.forEach((file) => {
        formData.append("Files", file);
      });
    }

    let response: ApiResponseWrapper<string>;

    try {
      setIsSubmitting(true);

      response = await uploadFetcher("/Careers/SubmitApplicant", {
        body: formData,
        headers: {
          LanguageCode: locale,
          CountryId: countryId,
        },
      });

      toast.success(resources["successfully-submitted"]);

      form.reset();
      setAcceptedFiles([]);
    } catch (error: any) {
      response = error;

      toast.error(response?.message);
    } finally {
      setFileRejections([]);
      setFilesErrorMessage("");
      setIsSubmitting(false);
    }
  };

  return (
    <div className="sticky top-32 rounded-3xl bg-third p-6">
      <h2 className="mb-4 text-xl font-bold capitalize text-white">
        {resources["apply-for-this-position"]}
      </h2>

      <motion.div
        initial={{ opacity: 0, height: 0 }}
        animate={{ opacity: 1, height: "auto" }}
        exit={{ opacity: 0, height: 0 }}
        className="space-y-4"
      >
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="">
            <div className="grid grid-cols-2 gap-4 space-y-4">
              <FormField
                control={form.control}
                name="Name"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input
                        placeholder={resources["name"] + " *"}
                        className="h-full w-full border-b-2 border-secondary bg-transparent px-0 text-sm text-white placeholder:text-white"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="Email"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input
                        placeholder={resources["Email"] + " *"}
                        type="email"
                        className="h-full w-full border-b-2 border-secondary bg-transparent px-0 text-sm text-white placeholder:text-white"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="PhoneNumber"
                render={({ field: { value, onChange, ...rest } }) => (
                  <FormItem>
                    <FormControl>
                      <Input
                        placeholder={resources["phone-number"] + " *"}
                        type="tel"
                        className="h-full w-full border-b-2 border-secondary bg-transparent px-0 text-sm text-white placeholder:text-white"
                        value={value}
                        onChange={(e) => {
                          onChange(
                            new AsYouType()
                              .input(e.target.value)
                              .replace(/\s+/g, ""),
                          );
                        }}
                        {...rest}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="BirthDate"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <DateTimeInput
                        type="date"
                        placeholder={resources["DateOfBirth"]}
                        className="date-input-white block h-full w-full border-b-2 border-secondary bg-transparent px-0 text-sm text-white"
                        placeholderClassName="px-0 text-sm text-white"
                        {...field}
                      />
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="CitizenshipId"
                render={({ field }) => (
                  <FormItem>
                    <Select
                      onValueChange={field.onChange}
                      value={field.value}
                      dir={getLocaleDirection(locale)}
                    >
                      <FormControl>
                        <SelectTrigger className="!h-10 w-full border-b-2 border-secondary bg-transparent px-0 text-sm text-white placeholder:text-white">
                          <SelectValue
                            placeholder={resources["choose-citizenship"] + " *"}
                            className="first-letter:capitalize"
                          />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {orderedCitizenships.map((citizenship) => (
                          <SelectItem
                            key={citizenship.id}
                            value={`${citizenship.id}`}
                            className="first-letter:capitalize"
                          >
                            {citizenship.name?.toLowerCase()}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="ResidentialAddress"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input
                        placeholder={resources["ResidentialAddress"]}
                        className="h-full w-full border-b-2 border-secondary bg-transparent px-0 text-sm text-white placeholder:text-white"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="JobType"
                render={({ field }) => (
                  <FormItem>
                    <Select onValueChange={field.onChange} value={field.value}>
                      <FormControl>
                        <SelectTrigger className="!h-10 w-full border-b-2 border-secondary bg-transparent px-0 text-sm text-white placeholder:text-white">
                          <SelectValue
                            placeholder={resources["PreferredJobType"]}
                            className="first-letter:capitalize"
                          />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {jobTypeOptions.map((item) => (
                          <SelectItem
                            key={item.id}
                            value={item.id}
                            className="first-letter:capitalize"
                          >
                            {item.title}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="EducationLevel"
                render={({ field }) => (
                  <FormItem>
                    <Select onValueChange={field.onChange} value={field.value}>
                      <FormControl>
                        <SelectTrigger className="!h-10 w-full border-b-2 border-secondary bg-transparent px-0 text-sm text-white placeholder:text-white">
                          <SelectValue
                            placeholder={resources["education-level"]}
                            className="first-letter:capitalize"
                          />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {EducationLevelOptions.map((item) => (
                          <SelectItem
                            key={item.id}
                            value={item.id}
                            className="first-letter:capitalize"
                          >
                            {item.title}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {useArea && orderedAreas && orderedAreas?.length > 0 && (
                <FormField
                  control={form.control}
                  name="AreaID"
                  render={({ field }) => (
                    <FormItem>
                      <Select
                        onValueChange={field.onChange}
                        value={field.value}
                        dir={getLocaleDirection(locale)}
                      >
                        <FormControl>
                          <SelectTrigger className="!h-10 w-full border-b-2 border-secondary bg-transparent px-0 text-sm text-white placeholder:text-white">
                            <SelectValue placeholder={resources["AreaLable"]} />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {orderedAreas.map((item) => (
                            <SelectItem key={item.id} value={`${item.id}`}>
                              {item.name?.toLowerCase()}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              )}

              <FormField
                control={form.control}
                name="WorkLocation"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input
                        placeholder={resources["work-location"]}
                        className="h-full w-full border-b-2 border-secondary bg-transparent px-0 text-sm text-white placeholder:text-white"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="col-span-2 space-y-3">
                <FormField
                  control={form.control}
                  name="AgreeTerms"
                  render={({ field }) => (
                    <FormItem>
                      <label className="flex cursor-pointer items-start gap-2 text-start text-sm leading-relaxed text-white">
                        <FormControl>
                          <Input
                            type="checkbox"
                            checked={field.value}
                            onChange={(e) => field.onChange(e.target.checked)}
                            className="mt-0.5 h-4 w-4 shrink-0 accent-secondary"
                          />
                        </FormControl>
                        <span>
                          {resources["Iagreetothe"]}{" "}
                          <NextLink
                            href={PAGE_PATHS.TERMS}
                            target="_blank"
                            className="text-secondary underline underline-offset-2"
                          >
                            {resources["Terms_Conditions"]}
                          </NextLink>{" "}
                          {resources["and"]}{" "}
                          <NextLink
                            href={PAGE_PATHS.PRIVACY}
                            target="_blank"
                            className="text-secondary underline underline-offset-2"
                          >
                            {resources["Privacy_Policy"]}
                          </NextLink>{" "}
                          <span
                            dangerouslySetInnerHTML={{
                              __html: domSanitize(
                                resources[
                                  "ofcompanynameLicenseeofTexasChicken"
                                ],
                              ),
                            }}
                          />
                        </span>
                      </label>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="Declaration"
                  render={({ field }) => (
                    <FormItem>
                      <label className="flex cursor-pointer items-start gap-2 text-start text-sm leading-relaxed text-white">
                        <FormControl>
                          <Input
                            type="checkbox"
                            checked={field.value}
                            onChange={(e) => field.onChange(e.target.checked)}
                            className="mt-0.5 h-4 w-4 shrink-0 accent-secondary"
                          />
                        </FormControl>
                        <span
                          dangerouslySetInnerHTML={{
                            __html: domSanitize(resources["CarrerTermsLine1"]),
                          }}
                        />
                      </label>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              {resources["CarrerTermsLine2"] && (
                <div
                  className="col-span-2 text-sm text-white"
                  dangerouslySetInnerHTML={{
                    __html: domSanitize(resources["CarrerTermsLine2"]),
                  }}
                />
              )}

              <div className="col-span-2">
                <Dropzone
                  fileRejections={fileRejections}
                  setFileRejections={setFileRejections}
                  setAcceptedFiles={setAcceptedFiles}
                  acceptedFiles={acceptedFiles}
                  resources={{
                    "drag-and-drop": resources["drag-and-drop"],
                    "file-size-exceeds-the-limit-of-5mb":
                      resources["file-size-exceeds-the-limit-of-5mb"],
                    "invalid-file-type-only-are-allowed":
                      resources["invalid-file-type-only-are-allowed"],
                    "you-can-only-upload-maximum":
                      resources["you-can-only-upload-maximum"],
                    files: resources["files"],
                    "total-files-size-exceeds-the-limit":
                      resources["total-files-size-exceeds-the-limit"],
                    "upload-files": resources["upload-files"],
                    "max-files-total": resources["max-files-total"],
                  }}
                />

                {filesErrorMessage && acceptedFiles.length === 0 && (
                  <p className="text-sm font-medium text-red-500">
                    {filesErrorMessage}
                  </p>
                )}
              </div>
            </div>

            {isSubmitting && <LoadingAnimate />}

            <Button
              type="submit"
              className="mt-6 uppercase hover:text-primary"
              disabled={isSubmitting}
            >
              {resources["Submit"]}
            </Button>
          </form>
        </Form>
      </motion.div>
    </div>
  );
};

export default CareerForm;
