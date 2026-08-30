import { Button } from "@/components/ui/button";
import {
  FormControl,
  FormField,
  FormItem,
  FormMessage,
  Form,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { AsYouType } from "libphonenumber-js";
import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

const formSchema = z.object({
  Name: z.string().min(1, "Name is required"),
  Email: z.string().email("Invalid email address"),
  MobileNumber: z.string().min(10, "Phone number is required"),
  City: z.string().optional(),
  Area: z.string().optional(),
  "Postal Code": z.string().optional(),
  Street: z.string().optional(),
  Building: z.string().optional(),
  menu: z.string().optional(),
  Date: z.string().optional(),
  Time: z.string().optional(),
});

type CateringFormProps = {
  initialMenu?: string;
};

const CateringForm = ({ initialMenu }: CateringFormProps) => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      Name: "",
      Email: "",
      MobileNumber: "",
      City: "",
      Area: "",
      "Postal Code": "",
      Street: "",
      Building: "",
      menu: initialMenu || "",
      Date: "",
      Time: "",
    },
  });

  const [hasAcceptedTerms, setHasAcceptedTerms] = React.useState(false);
  const [showTermsError, setShowTermsError] = React.useState(false);

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    if (!hasAcceptedTerms) {
      setShowTermsError(true);
      return;
    }

    console.log("Form submitted:", values);
    // Handle form submission here
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          name="Name"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input
                  placeholder={"Name *"}
                  className="w-full border-b-2 border-secondary bg-transparent px-4 py-2 placeholder-black focus:border-primary"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          name="Email"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input
                  placeholder={"Email *"}
                  className="w-full border-b-2 border-secondary bg-transparent px-4 py-2 placeholder-black focus:border-primary"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="grid grid-cols-1 items-baseline gap-4 md:grid-cols-2">
          <FormField
            name="MobileNumber"
            render={({ field: { value, onChange, ...rest } }) => (
              <FormItem>
                <FormControl>
                  <Input
                    placeholder={"Phone Number *"}
                    type="tel"
                    className="w-full border-b-2 border-secondary bg-transparent px-4 py-2 placeholder-black focus:border-primary"
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
            name="City"
            render={({ field }) => (
              <FormItem>
                <Select onValueChange={field.onChange} value={field.value}>
                  <FormControl>
                    <SelectTrigger className="w-full border-b-2 border-secondary bg-transparent px-4 py-2 placeholder-black focus:border-primary">
                      <SelectValue placeholder={"City"} />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="riyadh">Riyadh</SelectItem>
                    <SelectItem value="jeddah">Jeddah</SelectItem>
                    <SelectItem value="dammam">Dammam</SelectItem>
                    <SelectItem value="mecca">Mecca</SelectItem>
                    <SelectItem value="medina">Medina</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            name="Area"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input
                    placeholder={"Area"}
                    className="block w-full border-b-2 border-secondary bg-transparent px-4 py-2 placeholder-black focus:border-primary"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            name="Postal Code"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input
                    placeholder={"Postal Code"}
                    className="block w-full border-b-2 border-secondary bg-transparent px-4 py-2 placeholder-black focus:border-primary"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            name="Street"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input
                    placeholder={"Street"}
                    className="block w-full border-b-2 border-secondary bg-transparent px-4 py-2 placeholder-black focus:border-primary"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            name="Building"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input
                    placeholder={"Building/House"}
                    className="block w-full border-b-2 border-secondary bg-transparent px-4 py-2 placeholder-black focus:border-primary"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            name="Menu"
            render={({ field }) => (
              <FormItem>
                <Select onValueChange={field.onChange} value={field.value}>
                  <FormControl>
                    <SelectTrigger className="w-full border-b-2 border-secondary bg-transparent px-4 py-2 placeholder-black focus:border-primary">
                      <SelectValue placeholder={"Menu"} />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="riyadh">Riyadh</SelectItem>
                    <SelectItem value="jeddah">Jeddah</SelectItem>
                    <SelectItem value="dammam">Dammam</SelectItem>
                    <SelectItem value="mecca">Mecca</SelectItem>
                    <SelectItem value="medina">Medina</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            name="Date"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input
                    type="datetime-local"
                    placeholder={"Date"}
                    className="block w-full border-b-2 border-secondary bg-transparent px-4 py-2 placeholder-black focus:border-primary"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="space-y-2 pt-2 text-xs text-gray-700">
          <label className="flex items-start gap-2 text-left">
            <Input
              type="checkbox"
              checked={hasAcceptedTerms}
              onChange={(e) => {
                setHasAcceptedTerms(e.target.checked);
                if (e.target.checked) setShowTermsError(false);
              }}
              className="mt-0.5 h-4 w-4 rounded border-secondary text-primary focus:ring-primary"
            />
            <span>
              I agree to the{" "}
              <Dialog>
                <DialogTrigger asChild>
                  <button
                    type="button"
                    className="font-semibold text-primary underline underline-offset-2"
                  >
                    Terms &amp; Conditions
                  </button>
                </DialogTrigger>
                <DialogContent className="max-w-3xl bg-white p-4">
                  <DialogHeader>
                    <DialogTitle>Terms and Conditions</DialogTitle>
                  </DialogHeader>
                  <div className="space-y-3 text-left text-xs text-gray-700 md:text-sm">
                    <p>
                      • Catering package is valid for a minimum order of 50
                      packs and above.
                    </p>
                    <p>
                      • Full payment must be paid at least 7 days before the
                      event / function date.
                    </p>
                    <p>
                      • For corporate customers, an official PO is required to
                      confirm bookings for orders above 300 pax.
                    </p>
                    <p>
                      • Transportation / delivery charges may apply for orders
                      below the specified minimum.
                    </p>
                    <p>
                      • Catering sets are not valid with other promotions and
                      discounted offers.
                    </p>
                    <p>
                      • All food will not be piping hot upon pre-packing, but we
                      assure you of quality in terms of taste, flavour and
                      hygiene.
                    </p>
                    <p>
                      • Products that are sensitive to temperature (such as
                      fries, certain wraps, delicate desserts, etc.) are not
                      recommended for bulk catering.
                    </p>
                    <p>
                      • Texas Chicken reserves the right to amend the terms and
                      conditions without prior notice.
                    </p>
                  </div>
                </DialogContent>
              </Dialog>{" "}
              and Privacy Policy of Texas Chicken XXXXX.
            </span>
          </label>
          {showTermsError && (
            <p className="text-xs font-medium text-red-600">
              Please accept the Terms &amp; Conditions to proceed.
            </p>
          )}
        </div>

        <div className="pt-2 text-center">
          <Button
            type="submit"
            className="bg-primary font-bold uppercase text-white transition duration-300 hover:bg-secondary"
          >
            book now
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default CateringForm;
