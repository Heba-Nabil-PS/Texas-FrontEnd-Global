import { Link } from "@/i18n/navigation";
import { forwardRef } from "react";

export const NextLink = forwardRef<
  HTMLAnchorElement,
  React.ComponentProps<typeof Link>
>(function NextLink(props, ref) {
  return <Link ref={ref} prefetch={false} {...props} />;
});
