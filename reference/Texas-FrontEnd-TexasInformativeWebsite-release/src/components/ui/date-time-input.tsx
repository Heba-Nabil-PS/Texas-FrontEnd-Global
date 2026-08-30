"use client";

import * as React from "react";

import { cn } from "@/lib/utils";
import { Input } from "@/components/ui/input";

type NativeDateTimeType = "date" | "time" | "datetime-local";

export interface DateTimeInputProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "type"> {
  type: NativeDateTimeType;
  /** Shown while the field is empty (native date/time inputs ignore `placeholder`). */
  placeholder?: string;
  /** Classes for the placeholder overlay — use for horizontal padding & text color. */
  placeholderClassName?: string;
}

/**
 * Native date / time / datetime-local input that keeps its real `type` at all
 * times so iOS Safari opens the picker on the FIRST tap. (Swapping the type
 * inside `onFocus` — the previous approach — leaves the picker closed on iOS.)
 *
 * Because native date/time inputs ignore `placeholder`, the custom placeholder
 * is rendered as an overlay while the field is empty; the browser's own format
 * hint is hidden underneath via the `.dt-field` styles in globals.css.
 */
const DateTimeInput = React.forwardRef<HTMLInputElement, DateTimeInputProps>(
  (
    { type, placeholder, value, className, placeholderClassName, ...props },
    ref,
  ) => {
    const isEmpty = value == null || value === "";

    return (
      <span className="dt-field">
        <Input
          ref={ref}
          type={type}
          value={value}
          data-empty={isEmpty}
          // The overlay placeholder is aria-hidden, so give the control a name.
          aria-label={placeholder}
          className={cn("dt-field__input", className)}
          {...props}
        />
        {placeholder && isEmpty ? (
          <span
            aria-hidden="true"
            className={cn("dt-field__placeholder", placeholderClassName)}
          >
            {placeholder}
          </span>
        ) : null}
      </span>
    );
  },
);
DateTimeInput.displayName = "DateTimeInput";

export { DateTimeInput };
