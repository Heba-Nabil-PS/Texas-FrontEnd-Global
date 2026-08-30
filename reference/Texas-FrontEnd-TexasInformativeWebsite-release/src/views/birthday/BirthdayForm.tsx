import { useState } from "react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { format } from "date-fns";
import { AsYouType } from "libphonenumber-js";
import { useData } from "@/components/providers/data-provider";
import { useConfig } from "@/components/providers/config-provider";
import { displayInOrder, getLocaleDirection } from "@/lib";
import { NAMES_REGEX } from "@/constants";
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { LoadingAnimate } from "@/components/loading-animate";
import type { BirthdayPageResourcesProps } from "@/types/resources";

interface BirthdayFormProps {
  locale: string;
  resources: BirthdayPageResourcesProps;
}

export function BirthdayForm(props: BirthdayFormProps) {
  const { locale, resources } = props;

  const {
    countryData: { citizenships },
  } = useData();

  const { captchaClientKey, countryId } = useConfig();
  const isCaptchaEnabled = !!captchaClientKey?.trim();

  const orderedCitizenships = displayInOrder(citizenships);

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
    StateId: z.string().min(1, resources["please-select-state"]),
    Age: z
      .string()
      .min(1, resources["age-required"])
      .refine(
        (val) => {
          const num = Number(val);
          return !isNaN(num) && num >= 1 && num <= 120;
        },
        {
          message: resources["age-must-be-between"],
        },
      ),
    BirthdayDate: z
      .string()
      .trim()
      .min(1, resources["date-required"])
      .refine(
        (date) => {
          const input = new Date(date);
          const now = new Date();

          // Set time to 00:00:00 for both dates for date comparison
          const inputDate = new Date(input);
          inputDate.setHours(0, 0, 0, 0);
          const today = new Date(now);
          today.setHours(0, 0, 0, 0);

          // If it's a future date, it's always valid
          if (inputDate > today) return true;

          // If it's today, check if the time is in the future
          if (inputDate.getTime() === today.getTime()) {
            return input > now;
          }

          // Past date is invalid
          return false;
        },
        { message: resources["date-and-time-must-be-in-the-future"] },
      ),
    Gender: z.string().trim().min(1, resources["gender-required"]),
    NumberOfInvitees: z
      .string()
      .min(1, resources["number-invitees-required"])
      .refine(
        (val) => {
          const num = Number(val);
          return !isNaN(num) && num >= 1 && num <= 100;
        },
        {
          message: resources["number-invitees-must-between"],
        },
      ),
  });

  const { handleReCaptchaVerify } = useCaptcha("birthday", false);

  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      Name: "",
      MobileNumber: "",
      Email: "",
      BirthdayDate: "",
      Gender: "",
      NumberOfInvitees: "",
      StateId: "",
      Age: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    const toast = (await import("sonner")).toast;

    let captcha: string | undefined = "test";

    if (isCaptchaEnabled) {
      captcha = await handleReCaptchaVerify();

      if (!captcha) return toast.error(resources["captcha-is-required"]);
    }

    const requestBody = {
      RecaptchaToken: captcha,
      name: values.Name,
      contactNumber: values.MobileNumber,
      email: values.Email,
      birthdayDate: format(values.BirthdayDate, "yyyy-MM-dd'T'HH:mm"),
      gender: Number(values.Gender),
      Numberofinvitees: Number(values.NumberOfInvitees),
      cityId: Number(values.StateId),
      age: Number(values.Age),
    };

    let response: ApiResponseWrapper<string>;

    try {
      setIsSubmitting(true);

      response = await fetcher("/Forms/Birthday/Submit", {
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

        <div className="grid grid-cols-1 items-baseline gap-4 md:grid-cols-2">
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
            name="Age"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input
                    type="number"
                    min="1"
                    max="120"
                    placeholder={resources["age"] + " *"}
                    className="w-full border-b-2 border-secondary px-4 py-2 placeholder-black focus:border-primary"
                    value={field.value}
                    onChange={(e) => field.onChange(e.target.value)}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="BirthdayDate"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <DateTimeInput
                    type="datetime-local"
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

          <FormField
            control={form.control}
            name="Gender"
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
                        placeholder={resources["select-gender"] + " *"}
                      />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="1">{resources["Female"]}</SelectItem>
                    <SelectItem value="2">{resources["Male"]}</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          {orderedCitizenships && orderedCitizenships?.length > 0 && (
            <FormField
              control={form.control}
              name="StateId"
              render={({ field }) => (
                <FormItem>
                  <Select onValueChange={field.onChange} value={field.value}>
                    <FormControl>
                      <SelectTrigger className="w-full border-b-2 border-secondary px-4 py-2 placeholder-black focus:border-primary">
                        <SelectValue
                          placeholder={resources["select-city"] + " *"}
                        />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {orderedCitizenships.map((citizenship) => (
                        <SelectItem
                          key={citizenship.id}
                          value={`${citizenship.id}`}
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
          )}

          <FormField
            control={form.control}
            name="NumberOfInvitees"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input
                    type="number"
                    min="1"
                    max="100"
                    placeholder={resources["NumberOfInvitees"] + " *"}
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
