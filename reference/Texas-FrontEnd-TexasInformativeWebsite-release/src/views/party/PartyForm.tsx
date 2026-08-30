"use client";

import { useState } from "react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { format } from "date-fns";
import { AsYouType } from "libphonenumber-js";
import { useData } from "@/components/providers/data-provider";
import { useConfig } from "@/components/providers/config-provider";
import { displayInOrder, getLocaleDirection, sanitizeInputs } from "@/lib";
import {
  InquiryType,
  MeatPreference,
  NAMES_REGEX,
  TIME_REGEX,
} from "@/constants";
import { useCaptcha } from "@/hooks/useCaptcha";
import { ApiResponseWrapper } from "@/lib/data-fetcher/response-wrapper";
import { fetcher } from "@/lib/data-fetcher/fetcher";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { DateTimeInput } from "@/components/ui/date-time-input";
import { LoadingAnimate } from "@/components/loading-animate";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import type { PartyPageResourcesProps } from "@/types/resources";

interface PartyFormProps {
  locale: string;
  resources: PartyPageResourcesProps;
}

export function PartyForm(props: PartyFormProps) {
  const { locale, resources } = props;

  const {
    countryData: { locations },
  } = useData();

  const { captchaClientKey, countryId } = useConfig();
  const isCaptchaEnabled = !!captchaClientKey?.trim();

  const InquiryTypeOptions = Object.entries(InquiryType).map(
    ([key, value]) => ({
      id: key,
      title:
        resources[value?.toLowerCase() as keyof PartyPageResourcesProps] ||
        value,
    }),
  );

  const MeatPreferenceOptions = Object.entries(MeatPreference).map(
    ([key, value]) => ({
      id: key,
      title:
        resources[value?.toLowerCase() as keyof PartyPageResourcesProps] ||
        value,
    }),
  );

  const orderedLocations = displayInOrder(locations);

  const formSchema = z
    .object({
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
      MobileNumber: z
        .string()
        .trim()
        .min(1, resources["phone-number-is-required"])
        .max(
          20,
          `${resources["phone-number-must-be-at-most"]} 20 ${resources["characters-long"]}`,
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
      StateId: z.string().optional(),
      BranchId: z.string().min(1, resources["please-select-location"]),
      KindOfParty: z.string().min(1, resources["please-select-party-type"]),
      PartyDate: z
        .string()
        .trim()
        .min(1, resources["date-required"])
        .refine(
          (date) => {
            const input = new Date(date);
            input.setHours(0, 0, 0, 0);

            const today = new Date();
            today.setHours(0, 0, 0, 0);

            return input >= today;
          },
          { message: resources["date-and-time-must-be-in-the-future"] },
        ),
      PartyTime: z
        .string()
        .trim()
        .min(1, resources["time-required"])
        .regex(TIME_REGEX, resources["invalid-time"]),
      MeatPreference: z
        .string()
        .trim()
        .min(1, resources["meat-preference-required"]),
      NumberOfChickenPieces: z
        .string()
        .min(1, resources["number-of-chicken-pieces-required"])
        .refine(
          (val) => {
            const num = Number(val);
            return !isNaN(num) && num >= 1 && num <= 1000;
          },
          { message: resources["number-of-chicken-pieces-must-be-between"] },
        )
        .transform((val) => Number(val)),

      Feedback: z.string().trim().optional(),
    })
    .superRefine((data, ctx) => {
      const { PartyDate, PartyTime } = data;

      if (!PartyDate || !PartyTime) return;

      const today = new Date();
      today.setHours(0, 0, 0, 0);

      const selectedDate = new Date(PartyDate);
      selectedDate.setHours(0, 0, 0, 0);

      // Only validate time if party date is today
      if (selectedDate.getTime() === today.getTime()) {
        const [hours, minutes] = PartyTime.split(":").map(Number);

        const selectedDateTime = new Date();
        selectedDateTime.setHours(hours, minutes, 0, 0);

        if (selectedDateTime <= new Date()) {
          ctx.addIssue({
            path: ["PartyTime"],
            message: resources["party-time-must-be-in-the-future"],
            code: z.ZodIssueCode.custom,
          });
        }
      }
    });

  const { handleReCaptchaVerify } = useCaptcha("party", false);

  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<
    z.infer<typeof formSchema>,
    any,
    z.infer<typeof formSchema>
  >({
    resolver: zodResolver(formSchema),
    defaultValues: {
      Name: "",
      MobileNumber: "",
      Email: "",
      BranchId: "",
      PartyDate: "",
      PartyTime: "",
      MeatPreference: "",
      // @ts-ignore
      NumberOfChickenPieces: "",
      Feedback: "",
      KindOfParty: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    const toast = (await import("sonner")).toast;

    let captcha: string | undefined = "test";

    if (isCaptchaEnabled) {
      captcha = await handleReCaptchaVerify();

      if (!captcha) return toast.error(resources["captcha-is-required"]);
    }

    const valuesWithoutHack = sanitizeInputs({
      Feedback: values.Feedback,
    });

    const requestBody = {
      RecaptchaToken: captcha,
      name: values.Name,
      mobileNumber: values.MobileNumber,
      email: values.Email,
      branchId: Number(values.BranchId),
      partyDate: format(values.PartyDate, "yyyy-MM-dd"),
      partyTime: values.PartyTime,
      kindOfParty: values.KindOfParty,
      meatPreference: values.MeatPreference,
      numberOfChickenPieces: values.NumberOfChickenPieces,
      feedback: valuesWithoutHack.Feedback,
    };

    let response: ApiResponseWrapper<string>;

    try {
      setIsSubmitting(true);

      response = await fetcher("/Forms/PartyPickup/Submit", {
        method: "POST",
        body: JSON.stringify(requestBody),
        headers: {
          LanguageCode: locale,
          CountryID: countryId,
          "Content-Type": "application/json",
        },
      });

      toast.success(resources["successfully-submitted"]);

      form.reset();
    } catch (error: any) {
      response = error;

      toast.error(response?.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="Name"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input
                  placeholder={resources["name"] + " *"}
                  className="w-full border-b-2 border-secondary px-4 py-2 placeholder-black focus:border-primary"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="grid grid-cols-1 items-baseline gap-4 gap-y-6 md:grid-cols-2">
          <FormField
            control={form.control}
            name="MobileNumber"
            render={({ field: { value, onChange, ...rest } }) => (
              <FormItem>
                <FormControl>
                  <Input
                    placeholder={resources["phone-number"] + " *"}
                    type="tel"
                    className="w-full border-b-2 border-secondary px-4 py-2 placeholder-black focus:border-primary"
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
            name="Email"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input
                    placeholder={resources["Email"] + " *"}
                    className="w-full border-b-2 border-secondary px-4 py-2 placeholder-black focus:border-primary"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="KindOfParty"
            render={({ field }) => (
              <FormItem>
                <Select
                  onValueChange={field.onChange}
                  value={field.value}
                  dir={getLocaleDirection(locale)}
                >
                  <FormControl>
                    <SelectTrigger className="w-full border-b-2 border-secondary px-4 py-2 focus:border-primary">
                      <SelectValue
                        placeholder={
                          resources["Whatkindofpartyareyouplanning"] + " *"
                        }
                      />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {InquiryTypeOptions.map((partyType) => (
                      <SelectItem key={partyType.id} value={partyType.title}>
                        {partyType.title}
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
            name="PartyDate"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <DateTimeInput
                    type="date"
                    min={format(new Date(), "yyyy-MM-dd")}
                    placeholder={resources["preferred-date"]}
                    className="block w-full border-b-2 border-secondary px-4 py-2 focus:border-primary"
                    placeholderClassName="px-4 text-black"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Time */}
          <FormField
            control={form.control}
            name="PartyTime"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <DateTimeInput
                    type="time"
                    placeholder={resources["preferred-time"]}
                    className="block w-full border-b-2 border-secondary px-4 py-2 focus:border-primary"
                    placeholderClassName="px-4 text-black"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {orderedLocations && orderedLocations?.length > 0 && (
            <FormField
              control={form.control}
              name="BranchId"
              render={({ field }) => (
                <FormItem>
                  <Select
                    onValueChange={field.onChange}
                    value={field.value}
                    dir={getLocaleDirection(locale)}
                  >
                    <FormControl>
                      <SelectTrigger className="w-full border-b-2 border-secondary px-4 py-2 placeholder-black focus:border-primary">
                        <SelectValue
                          placeholder={resources["choose-location"] + " *"}
                        />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {locations.map((location) => (
                        <SelectItem key={location.id} value={`${location.id}`}>
                          {location.name?.toLowerCase()}
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
            name="MeatPreference"
            render={({ field }) => (
              <FormItem>
                <Select
                  onValueChange={field.onChange}
                  value={field.value}
                  dir={getLocaleDirection(locale)}
                >
                  <FormControl>
                    <SelectTrigger className="w-full border-b-2 border-secondary px-4 py-2 focus:border-primary">
                      <SelectValue placeholder={resources["MeatPreference"]} />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {MeatPreferenceOptions.map((item) => (
                      <SelectItem key={item.id} value={item.title}>
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
            name="NumberOfChickenPieces"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input
                    type="number"
                    min="1"
                    max="1000"
                    placeholder={resources["Numberofchickenpieces"] + " *"}
                    className="w-full border-b-2 border-secondary px-4 py-2 placeholder-black focus:border-primary"
                    value={field.value}
                    onChange={(e) =>
                      field.onChange(
                        e.target.value === "" ? "" : e.target.value,
                      )
                    }
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="md:col-span-2">
            <FormField
              control={form.control}
              name="Feedback"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Textarea
                      placeholder={resources["Feedback"]}
                      className="w-full border-b-2 border-secondary px-4 py-2 placeholder-black focus:border-primary"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>

        {isSubmitting && <LoadingAnimate />}

        <div className="pt-2 text-center">
          <Button
            type="submit"
            className="bg-primary font-bold uppercase text-white transition duration-300 hover:bg-secondary"
            disabled={isSubmitting}
          >
            {resources["book-now"]}
          </Button>
        </div>
      </form>
    </Form>
  );
}
