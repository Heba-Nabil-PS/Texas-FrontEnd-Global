"use client";

import { useMemo, useState } from "react";
import { AsYouType } from "libphonenumber-js";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, useWatch } from "react-hook-form";
import { z } from "zod";
import { SearchIcon } from "lucide-react";
import { useData } from "@/components/providers/data-provider";
import { useConfig } from "@/components/providers/config-provider";
import { useCaptcha } from "@/hooks/useCaptcha";
import { uploadFetcher } from "@/lib/data-fetcher/upload-fetcher";
import { displayInOrder, getLocaleDirection, sanitizeInputs } from "@/lib";
import { Button } from "@/components/ui/button";
import { LoadingAnimate } from "@/components/loading-animate";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { DateTimeInput } from "@/components/ui/date-time-input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { NAMES_REGEX, TIME_REGEX } from "@/constants";
import { Textarea } from "@/components/ui/textarea";
import { Dropzone } from "@/components/global/drop-zone";
import { ApiResponseWrapper } from "@/lib/data-fetcher/response-wrapper";
import type { ContactPageResourcesProps } from "@/types/resources";
import type { CountryLocationProps } from "@/modules/country/types/country.types";

// Owns its own search state so typing doesn't re-render the whole ContactForm
// (which rebuilds the zod schema and re-sorts locations on every render).
function LocationSearchOptions({
  locations,
}: {
  locations: CountryLocationProps[];
}) {
  const [search, setSearch] = useState("");

  const filtered = useMemo(() => {
    if (!search.trim()) return locations;

    const query = search.trim().toLowerCase();

    return locations.filter((location) =>
      location.name?.trim().toLowerCase().includes(query),
    );
  }, [search, locations]);

  return (
    <>
      {locations.length > 3 && (
        <div className="sticky top-0 z-10 mb-1 bg-secondary p-1">
          <div className="relative">
            <SearchIcon className="pointer-events-none absolute start-2 top-1/2 size-4 -translate-y-1/2 text-black/60" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              onKeyDown={(e) => e.stopPropagation()}
              placeholder="Search"
              className="w-full rounded-md border border-black/30 bg-transparent py-1.5 pe-2 ps-8 text-sm capitalize text-black outline-none placeholder:text-black/50"
            />
          </div>
        </div>
      )}
      {filtered.length > 0 ? (
        filtered.map((location) => (
          <SelectItem
            key={location.id}
            value={`${location.id}`}
            onPointerMove={(e) => e.preventDefault()}
            onPointerLeave={(e) => e.preventDefault()}
          >
            {location.name?.toLowerCase()}
          </SelectItem>
        ))
      ) : (
        <div className="px-2 py-1.5 text-sm text-black/60">
          No locations found
        </div>
      )}
    </>
  );
}

interface ContactFormProps {
  locale: string;
  resources: ContactPageResourcesProps;
}

export function ContactForm(props: ContactFormProps) {
  const { locale, resources } = props;

  const {
    countryData: { states, inquiries, locations },
  } = useData();

  const { captchaClientKey, countryId } = useConfig();
  const isCaptchaEnabled = !!captchaClientKey?.trim();

  const orderedStates = displayInOrder(states);
  const orderedLocations = displayInOrder(locations);

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
    InquiryTypeId: z.string().min(1, resources["please-select-inquiry-type"]),
    InquiryDate: z
      .string()
      .trim()
      .min(1, resources["date-required"])
      .refine(
        (date) => {
          const input = new Date(date);
          input.setHours(0, 0, 0, 0);

          const today = new Date();
          today.setHours(0, 0, 0, 0);

          return input <= today;
        },
        { message: resources["date-must-current-past-date"] },
      ),
    InquiryTime: z
      .string()
      .trim()
      .min(1, resources["time-required"])
      .regex(TIME_REGEX, resources["invalid-time"]),
    Subject: z
      .string()
      .trim()
      .min(
        5,
        `${resources["subject-must-be-between"]} 5 ${resources["and"]} 100 ${resources["characters-long"]}`,
      )
      .max(
        100,
        `${resources["subject-must-be-between"]} 5 ${resources["and"]} 100 ${resources["characters-long"]}`,
      ),
    Feedback: z.string().trim().min(1, resources["message-is-required"]),
    // Optional fields
    Files: z.array(z.instanceof(File)).optional(),
  });

  const { handleReCaptchaVerify } = useCaptcha("contact", false);

  const [isSubmitting, setIsSubmitting] = useState(false);

  const [acceptedFiles, setAcceptedFiles] = useState<File[]>([]);
  const [fileRejections, setFileRejections] = useState<string[]>([]);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      Name: "",
      MobileNumber: "",
      Email: "",
      StateId: "",
      BranchId: "",
      InquiryTypeId: "",
      InquiryDate: "",
      InquiryTime: "",
      Subject: "",
      Feedback: "",
      Files: undefined,
    },
  });

  // Local "yyyy-MM-dd" for the date input's `max`. Built from local getters
  // (not date-fns/ISO) to avoid the UTC-midnight day shift noted on submit.
  const todayStr = useMemo(() => {
    const now = new Date();
    return `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, "0")}-${String(now.getDate()).padStart(2, "0")}`;
  }, []);

  const watchedState = useWatch({ control: form.control, name: "StateId" });

  const filteredLocations = useMemo(() => {
    if (!watchedState) return orderedLocations;

    return orderedLocations.filter(
      (location) => location.stateId === Number(watchedState),
    );
  }, [watchedState, orderedLocations]);

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    const toast = (await import("sonner")).toast;

    let captcha: string | undefined = "test";

    if (isCaptchaEnabled) {
      captcha = await handleReCaptchaVerify();

      if (!captcha) return toast.error(resources["captcha-is-required"]);
    }

    const valuesWithoutHack = sanitizeInputs({
      Feedback: values.Feedback,
      Subject: values.Subject,
    });

    const formData = new FormData();

    formData.append("RecaptchaToken", captcha);
    formData.append("Name", values.Name);
    formData.append("MobileNumber", values.MobileNumber);
    formData.append("Email", values.Email);
    values.StateId && formData.append("StateId", values.StateId);
    formData.append("BranchId", values.BranchId);
    formData.append("InquiryTypeId", values.InquiryTypeId);
    // Native <input type="date"> already yields "yyyy-MM-dd"; append it raw.
    // Round-tripping through date-fns format() parses ISO as UTC midnight and
    // re-formats in local time, which shifts the day back in UTC- timezones.
    formData.append("InquiryDate", values.InquiryDate);
    formData.append("InquiryTime", values.InquiryTime);
    formData.append("Subject", valuesWithoutHack.Subject);
    formData.append("Feedback", valuesWithoutHack.Feedback);
    if (acceptedFiles && acceptedFiles.length > 0) {
      acceptedFiles.forEach((file) => {
        formData.append("Files", file);
      });
    }

    let response: ApiResponseWrapper<string>;

    try {
      setIsSubmitting(true);

      response = await uploadFetcher("/forms/contactus/submit", {
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

      setIsSubmitting(false);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          <FormField
            control={form.control}
            name="Name"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input
                    placeholder={resources["name"] + " *"}
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
            name="MobileNumber"
            render={({ field: { value, onChange, ...rest } }) => (
              <FormItem>
                <FormControl>
                  <Input
                    placeholder={resources["phone-number"] + " *"}
                    type="tel"
                    className="mt-2 block w-full border-b-2 border-white bg-transparent px-5 py-6 text-white placeholder-white"
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
                    className="mt-2 block w-full border-b-2 border-white bg-transparent px-5 py-5 text-white placeholder-white"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {orderedStates && orderedStates?.length > 0 && (
            <FormField
              control={form.control}
              name="StateId"
              render={({ field }) => (
                <FormItem>
                  <Select
                    onValueChange={(value) => {
                      field.onChange(value);
                      form.setValue("BranchId", "");
                    }}
                    value={field.value}
                    dir={getLocaleDirection(locale)}
                  >
                    <FormControl>
                      <SelectTrigger className="w-full text-white">
                        <SelectValue
                          placeholder={resources["state"]}
                          className="first-letter:capitalize"
                        />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {orderedStates.map((state) => (
                        <SelectItem
                          key={state.id}
                          value={`${state.id}`}
                          className="first-letter:capitalize"
                        >
                          {state.name?.toLowerCase()}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
          )}

          {filteredLocations && filteredLocations?.length > 0 && (
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
                      <SelectTrigger className="w-full text-white">
                        <SelectValue
                          placeholder={resources["nearest-location"] + " *"}
                        />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <LocationSearchOptions locations={filteredLocations} />
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
          )}

          {inquiries && inquiries?.length > 0 && (
            <FormField
              control={form.control}
              name="InquiryTypeId"
              render={({ field }) => (
                <FormItem>
                  <Select
                    onValueChange={field.onChange}
                    value={field.value}
                    dir={getLocaleDirection(locale)}
                  >
                    <FormControl>
                      <SelectTrigger className="w-full capitalize text-white">
                        <SelectValue
                          placeholder={resources["TypeofInquiry"] + " *"}
                        />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {inquiries.map((inquiry) => (
                        <SelectItem key={inquiry.id} value={`${inquiry.id}`}>
                          {inquiry.name?.toLowerCase()}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
          )}

          {/* Date */}
          <FormField
            control={form.control}
            name="InquiryDate"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <DateTimeInput
                    type="date"
                    max={todayStr}
                    placeholder={resources["preferred-date"]}
                    className="date-input-white block w-full border-b-2 border-white bg-transparent px-5 py-6 text-white"
                    placeholderClassName="px-5 text-white text-sm"
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
            name="InquiryTime"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <DateTimeInput
                    type="time"
                    placeholder={resources["time-of-incident"]}
                    className="time-input-white mt-2 block w-full border-b-2 border-white bg-transparent px-5 py-6 text-sm text-white"
                    placeholderClassName="px-5 text-white text-sm"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="md:col-span-2">
            <FormField
              control={form.control}
              name="Subject"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      placeholder={resources["placeholder_Subject"] + " *"}
                      className="mt-2 block w-full border-b-2 border-white bg-transparent px-5 py-6 text-white placeholder-white"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="md:col-span-2">
            <FormField
              control={form.control}
              name="Feedback"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Textarea
                      placeholder={resources["placeholder_Message"] + " *"}
                      className="mt-2 block w-full border-b-2 border-white bg-transparent px-5 py-6 text-white placeholder-white"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          {/* Attachment */}
          <div className="md:col-span-2">
            <Dropzone
              fileRejections={fileRejections}
              setFileRejections={setFileRejections}
              setAcceptedFiles={setAcceptedFiles}
              acceptedFiles={acceptedFiles}
              resources={{
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
                "drag-and-drop": resources["drag-and-drop"],
                "max-files-total": resources["max-files-total"],
              }}
            />
          </div>
        </div>

        {isSubmitting && <LoadingAnimate />}

        <Button
          type="submit"
          className="uppercase hover:text-primary"
          disabled={isSubmitting}
        >
          {resources["Submit"]}
        </Button>
      </form>
    </Form>
  );
}
