import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

import ToastResponse from "@/components/global/ToastResponse";
import { LoadingAnimate } from "@/components/loading-animate";
import { CategoryType } from "@/types";
import ErrorHandler from "@/utils/errorHandler";

const ContactForm = () => {
  // const { projectConfig } = useData();
  const formSchema = z.object({
    name: z.string().min(1, {
      message: `Name" isRequired`,
    }),
    subject: z.string().min(1, `Subject isRequired`),
    Email: z.string().min(1, `Email isRequired`).email(),
    Message: z.string().min(1, `Message isRequired`),
  });
  const [recaptchaRef, setRecaptchaRef] = useState<any>(null);
  const [captcha, setCaptcha] = useState("");
  const [captchaError, setCaptchaError] = useState("");
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      subject: "",
      Email: "",
      Message: "",
    },
  });

  function onChange(value: any) {
    setCaptcha(value);
    setCaptchaError("");
  }
  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    const toast = (await import("sonner")).toast;

    const formData = new FormData();

    formData.append("NameFirst", values.name);
    formData.append("Email", values.Email);
    formData.append("Message", values.Message);
    formData.append("Subject", values.subject);
    // formData.append("GoogleCaptureClientKey", captcha);

    // if (!captcha) {
    //   return setCaptchaError(resources["requiredCaptcha"]);
    // }
    try {
      const response = await fetch("/api/contactus", {
        method: "POST",
        body: formData,
      });
      const data = await response.json();
      if (data && !data?.success)
        throw new ErrorHandler(data?.title, data?.message);

      if (data?.success) {
        form.reset();

        toast.success(<ToastResponse message={"Successfully submitted"} />);
      }
      // recaptchaRef.reset();
    } catch (error: any) {
      recaptchaRef.reset();
      setCaptcha("");
      toast.error(
        <ToastResponse title={error?.title} message={error?.message} error />,
      );
    }
    setCaptcha("");
    setCaptchaError("");
  };

  return (
    <Form {...form}>
      <form className="px-3" onSubmit={form.handleSubmit(onSubmit)}>
        <div className="my-5 grid grid-cols-1 gap-3">
          <div>
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      placeholder={`Enter your Name`}
                      className="mt-2 block w-full rounded-2xl border-2 border-primary bg-transparent px-5 py-6 text-primary placeholder-primary/60"
                      {...field}
                    />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div>
            <FormField
              control={form.control}
              name="subject"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      placeholder={`Enter your Subject`}
                      className="mt-2 block w-full rounded-2xl border-2 border-primary bg-transparent px-5 py-6 text-primary placeholder-primary/60"
                      {...field}
                    />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div>
            <FormField
              control={form.control}
              name="Email"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      placeholder={`Enter your Email`}
                      className="mt-2 block w-full rounded-2xl border-2 border-primary bg-transparent px-5 py-6 text-primary placeholder-primary/60"
                      {...field}
                    />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div>
            <FormField
              control={form.control}
              name="Message"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Textarea
                      placeholder={`Enter your Message`}
                      className="mt-2 block w-full rounded-2xl border-2 border-primary bg-transparent px-5 py-6 text-primary placeholder-primary/60"
                      {...field}
                    />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>
        {/* <div className="mb-5 flex flex-col items-start justify-start">
          <ReCAPTCHA
            ref={(e: any) => setRecaptchaRef(e)}
            sitekey={"6LdHebUqAAAAAFhIX7ow-UCtBh7iXruTBvlbdGqp"}
            onChange={onChange}
            // size="compact"
          />
          {captchaError && (
            <p className="text-sm font-medium text-red-700">{captchaError}</p>
          )}
        </div> */}
        {form.formState.isSubmitting && <LoadingAnimate />}

        <Button
          type="submit"
          className="hover:text-primary"
          disabled={form.formState.isSubmitting}
        >
          Submit
        </Button>
      </form>
    </Form>
  );
};

export default ContactForm;
