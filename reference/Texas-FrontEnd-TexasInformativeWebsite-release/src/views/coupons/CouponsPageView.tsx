"use client";

import { useCallback, useState } from "react";
import { notFound } from "next/navigation";
import { motion } from "motion/react";
import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";
import { PAGE_PATHS } from "@/constants/page-paths";
import { useData } from "@/components/providers/data-provider";
import { CustomBreadCrumb } from "@/components/global/custom-breadcrumb";
import { NextImage } from "@/components/global/next-image";
import { LoadingAnimate } from "@/components/loading-animate";
import { displayInOrder, isModuleOn } from "@/lib";
import { STATIC_MODULES } from "@/constants/country-modules";
import type { CouponsPageResourcesProps } from "@/types/resources";
import type { AdvancedContentCategoryProps } from "@/modules/informative/types/advanced-content.types";
import { domSanitize } from "@/lib/domSanitize";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { NAMES_REGEX } from "@/constants";
import { useConfig } from "@/components/providers/config-provider";
import { useCaptcha } from "@/hooks/useCaptcha";
import { ApiResponseWrapper } from "@/lib/data-fetcher/response-wrapper";
import { fetcher } from "@/lib/data-fetcher/fetcher";

interface CouponsViewProps {
  resources: CouponsPageResourcesProps;
  headercoupons: AdvancedContentCategoryProps | undefined;
  locale: string;
}

export function CouponsView(props: CouponsViewProps) {
  const { resources, headercoupons, locale } = props;

  const {
    countryData: { countryCoupons, countryModules },
  } = useData();

  const [isSubmitting, setIsSubmitting] = useState(false);

  const { captchaClientKey, countryId } = useConfig();
  const isCaptchaEnabled = !!captchaClientKey?.trim();

  const [selectedCoupon, setSelectedCoupon] = useState<{
    id: number;
    imageUrl: string;
    fileName: string;
  } | null>(null);

  const formSchema = z.object({
    name: z
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
    email: z
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
    phone: z
      .string()
      .trim()
      .min(1, resources["phone-number-is-required"])
      .max(
        20,
        `${resources["phone-number-must-be-at-most"]} 20 ${resources["characters-long"]}`,
      ),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
    },
  });

  // Hooks must run on every render — keep them above any early return.
  const handleDownload = useCallback(
    async (id: number, imageUrl: string, fileName: string) => {
      setSelectedCoupon({ id, imageUrl, fileName });
    },
    [],
  );

  const { handleReCaptchaVerify } = useCaptcha("coupon", false);

  const isPageOn = Boolean(isModuleOn(countryModules, STATIC_MODULES.COUPON));

  if (!isPageOn) {
    return notFound();
  }

  const orderedCoupons = displayInOrder(countryCoupons);

  if (!orderedCoupons || orderedCoupons?.length === 0) return notFound();

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    if (!selectedCoupon) return;

    const toast = (await import("sonner")).toast;

    let captcha: string | undefined = "test";

    if (isCaptchaEnabled) {
      captcha = await handleReCaptchaVerify();

      if (!captcha) return toast.error(resources["captcha-is-required"]);
    }

    const requestBody = {
      captchaToken: captcha,
      couponID: selectedCoupon?.id,
      name: values.name,
      phone: values.phone,
      email: values.email,
    };

    let response: ApiResponseWrapper<string>;

    try {
      setIsSubmitting(true);

      response = await fetcher("/coupons/SubmitDownload", {
        method: "POST",
        body: JSON.stringify(requestBody),
        headers: {
          LanguageCode: locale,
          CountryID: countryId,
          "Content-Type": "application/json",
        },
      });

      toast.success(resources["successfully-submitted"]);

      const downloadResponse = await fetch(selectedCoupon.imageUrl);
      const blob = await downloadResponse.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = selectedCoupon.fileName;
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);
    } catch (error: any) {
      response = error;

      toast.error(response?.message);
    } finally {
      setIsSubmitting(false);
      form.reset();

      setSelectedCoupon(null);
    }
  };

  return (
    <div className="min-h-screen bg-[#faf7f2] pt-16 md:pt-24">
      {/* Breadcrumbs */}
      <div className="relative z-10 mt-6 flex justify-center md:mt-10">
        <CustomBreadCrumb
          data={[
            { href: PAGE_PATHS.HOME, name: resources["Home"] },
            {
              href: PAGE_PATHS.COUPONS,
              name: headercoupons?.Name || resources["Coupons"],
            },
          ]}
        />
      </div>

      {/* Main Title */}
      <div className="flex flex-col items-center p-4 text-center">
        <motion.h1
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: "easeOut" }}
          className="font-texas font-black uppercase leading-none text-primary drop-shadow-sm"
          style={{ fontSize: "clamp(36px, 12vw, 160px)" }}
        >
          {headercoupons?.Name}
        </motion.h1>

        {headercoupons?.DescriptionLong?.trim() && (
          <div
            dangerouslySetInnerHTML={{
              __html: domSanitize(headercoupons?.DescriptionLong?.trim()),
            }}
          />
        )}
      </div>

      {/* Promotions Grid */}
      <div className="mx-auto max-w-5xl px-4">
        <div className="mx-auto grid justify-center gap-x-6 gap-y-10 pb-12 pt-6 sm:grid-cols-2 sm:pt-12 md:grid-cols-3">
          {orderedCoupons.map((coupon, index) => (
            <motion.div
              key={coupon.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className={`w-full rounded-2xl shadow-lg ${
                index % 2 === 0 ? "bg-white" : "bg-gray-50"
              }`}
            >
              <div className="relative h-full">
                <div className="relative flex h-full w-full flex-col">
                  <NextImage
                    src={coupon.imageURL}
                    alt={coupon.alt || ""}
                    width={360}
                    height={360}
                    className="w-full rounded-2xl object-cover"
                  />

                  {/* Title on Image */}
                  <div className="flex w-full flex-col p-8 text-third md:flex-grow">
                    <h2
                      className="mb-2 line-clamp-2 font-texas text-xl font-bold md:min-h-16 md:text-2xl"
                      title={coupon.title || ""}
                    >
                      {coupon.title}
                    </h2>
                    {coupon.description && (
                      <p
                        className="mb-4 line-clamp-3 max-w-3xl text-sm text-third first-letter:uppercase md:min-h-[72px] md:text-base"
                        title={coupon.description || ""}
                      >
                        {coupon.description?.toLowerCase()}
                      </p>
                    )}

                    <Dialog
                      open={selectedCoupon?.id === coupon.id}
                      onOpenChange={(open) => !open && setSelectedCoupon(null)}
                    >
                      <DialogTrigger asChild>
                        <Button
                          onClick={() =>
                            handleDownload(
                              coupon.id,
                              coupon.imageURL,
                              `coupon-${coupon.id}.${coupon.imageURL.split(".").pop()?.split("?")[0] || "jpg"}`,
                            )
                          }
                          className="mt-auto flex cursor-pointer items-center border-none bg-third px-8 py-2 font-texas text-base font-bold uppercase text-white hover:bg-secondary max-md:mb-3 sm:w-fit"
                        >
                          <Download className="me-2 size-5" />
                          {resources["download"]}
                        </Button>
                      </DialogTrigger>
                      <DialogContent
                        className="bg-third p-6 ring-0 sm:max-w-md"
                        showCloseButton={false}
                      >
                        <DialogHeader>
                          <DialogTitle className="text-2xl text-white">
                            {resources["downloadCoupon"]}
                          </DialogTitle>
                          <DialogDescription className="text-white/80">
                            {
                              resources[
                                "pleaseFillInYourInformationToDownloadTheCoupon"
                              ]
                            }
                          </DialogDescription>
                        </DialogHeader>

                        {/* Custom Close Button */}
                        <button
                          onClick={() => {
                            setSelectedCoupon(null);
                            form.reset();
                          }}
                          className="absolute right-2 top-2 flex h-8 w-8 items-center justify-center rounded-full border-2 border-primary bg-primary p-0 transition-colors hover:border-secondary hover:bg-secondary"
                        >
                          <svg
                            className="h-4 w-4 text-white"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M6 18L18 6M6 6l12 12"
                            />
                          </svg>
                          <span className="sr-only">{resources["Close"]}</span>
                        </button>
                        <Form {...form}>
                          <form
                            onSubmit={form.handleSubmit(onSubmit)}
                            className="space-y-6"
                          >
                            <div className="space-y-4">
                              <FormField
                                control={form.control}
                                name="name"
                                render={({ field }) => (
                                  <FormItem>
                                    <FormControl>
                                      <Input
                                        placeholder="Name *"
                                        className="mt-2 block w-full border-b-2 border-white bg-transparent px-5 py-6 text-white placeholder-white"
                                        {...field}
                                      />
                                    </FormControl>
                                    <FormMessage />
                                  </FormItem>
                                )}
                              />

                              <FormField
                                control={form.control}
                                name="email"
                                render={({ field }) => (
                                  <FormItem>
                                    <FormControl>
                                      <Input
                                        placeholder="Email *"
                                        type="email"
                                        className="mt-2 block w-full border-b-2 border-white bg-transparent px-5 py-5 text-white placeholder-white"
                                        {...field}
                                      />
                                    </FormControl>
                                    <FormMessage />
                                  </FormItem>
                                )}
                              />

                              <FormField
                                control={form.control}
                                name="phone"
                                render={({ field }) => (
                                  <FormItem>
                                    <FormControl>
                                      <Input
                                        placeholder="Phone Number *"
                                        type="tel"
                                        className="mt-2 block w-full border-b-2 border-white bg-transparent px-5 py-6 text-white placeholder-white"
                                        {...field}
                                      />
                                    </FormControl>
                                    <FormMessage />
                                  </FormItem>
                                )}
                              />
                            </div>

                            <div className="flex justify-end space-x-2 pt-4">
                              <Button
                                className="py-2"
                                type="button"
                                onClick={() => {
                                  setSelectedCoupon(null);
                                  form.reset();
                                }}
                              >
                                {resources["cancel"]}
                              </Button>
                              {isSubmitting && <LoadingAnimate />}

                              <Button
                                type="submit"
                                className="border-none bg-white py-2 font-bold text-primary"
                                disabled={isSubmitting}
                              >
                                {resources["downloadCoupon"]}
                              </Button>
                            </div>
                          </form>
                        </Form>
                      </DialogContent>
                    </Dialog>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
