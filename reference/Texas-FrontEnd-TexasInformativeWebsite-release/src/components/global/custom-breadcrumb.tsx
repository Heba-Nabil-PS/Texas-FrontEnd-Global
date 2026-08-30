import { Fragment } from "react";
import { cn } from "@/lib/utils";

import { NextLink } from "./next-link";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumbs";

interface CustomBreadCrumbProps {
  data: {
    href: string;
    name: React.ReactNode;
  }[];
  linksClassName?: string;
  pageClassName?: string;
  separatorClassName?: string;
  listClassName?: string;
  wrapperClassName?: string;
}

export function CustomBreadCrumb(props: CustomBreadCrumbProps) {
  const {
    data,
    wrapperClassName,
    linksClassName,
    pageClassName,
    separatorClassName,
    listClassName,
  } = props;

  if (!data || !Array.isArray(data)) return null;

  return (
    <Breadcrumb className={wrapperClassName}>
      <BreadcrumbList
        className={cn("text-third-800/70 capitalize", listClassName)}
      >
        {data.map((item, index) => (
          <Fragment key={index}>
            <BreadcrumbItem>
              {index < data.length - 1 ? (
                <BreadcrumbLink
                  className={cn("hover:text-secondary", linksClassName)}
                  asChild
                >
                  <NextLink href={item.href}>{item.name}</NextLink>
                </BreadcrumbLink>
              ) : (
                <BreadcrumbPage className={cn("text-secondary", pageClassName)}>
                  {item.name}
                </BreadcrumbPage>
              )}
            </BreadcrumbItem>
            {index < data.length - 1 && (
              <BreadcrumbSeparator
                className={cn("rtl:-scale-x-100", separatorClassName)}
              />
            )}
          </Fragment>
        ))}
      </BreadcrumbList>
    </Breadcrumb>
  );
}
