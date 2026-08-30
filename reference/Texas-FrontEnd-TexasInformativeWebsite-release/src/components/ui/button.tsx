import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center border justify-center whitespace-nowrap text-sm md:text-base font-medium ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 relative transition-all ease-in-out duration-500",
  {
    variants: {
      variant: {
        default:
          "border-primary border-2 rounded-full hover:bg-secondary hover:border-secondary bg-primary text-white",
        secondary: "bg-transparent border-primary  bg-black text-white",
        third: "h-auto bg-black-800 text-white border-0 text-sm ",
        link: "border-0 !p-0 text-sm border-b-[1px] border-black hover:text-secondary hover:border-secondary",
      },
      size: {
        default: "px-10 py-3 rtl:sm:py-4",
        sm: "h-9 rounded-md px-3",
        lg: "h-11 rounded-md px-8",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

export interface ButtonProps
  extends
    React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  },
);
Button.displayName = "Button";

export { Button, buttonVariants };
