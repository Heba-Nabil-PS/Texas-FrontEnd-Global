"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";
import { PAGE_PATHS } from "@/constants/page-paths";
import { Button } from "@/components/ui/button";
import { NextLink } from "@/components/global/next-link";
import { BlogSingleProps } from "@/modules/blogs/types/blog-single";
import { CustomBreadCrumb } from "@/components/global/custom-breadcrumb";
import { NextImage } from "@/components/global/next-image";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { domSanitize } from "@/lib/domSanitize";
import type { BlogProps } from "@/modules/blogs/types/blogs.type";
import type { InnerBlogsPageResourcesProps } from "@/types/resources";
import { getLocaleDirection } from "@/lib";

type SingleBlogProps = {
  blogData: BlogSingleProps;
  slug: string;
  allBlogs: BlogProps[];
  resources: InnerBlogsPageResourcesProps;
  locale: string;
};

const BlogDetailsView = (props: SingleBlogProps) => {
  const { blogData, slug, allBlogs, resources, locale } = props;

  // Find current index and get prev/next posts from local blogs data
  const currentIndex = allBlogs.findIndex((b) => b.uniqueCode === slug);
  const prev = currentIndex > 0 ? allBlogs[currentIndex - 1] : null;
  const next =
    currentIndex < allBlogs.length - 1 ? allBlogs[currentIndex + 1] : null;

  return (
    <section className="min-h-screen bg-[#faf7f2] pt-24">
      {/* Breadcrumbs */}
      <div className="mt-6 flex justify-center md:mt-10">
        <CustomBreadCrumb
          data={[
            { href: PAGE_PATHS.HOME, name: resources["Home"] },
            { href: PAGE_PATHS.BLOGS, name: resources["Blog"] },
            {
              href: `${PAGE_PATHS.BLOGS}/${blogData.uniqueCode}`,
              name: (
                <span
                  dangerouslySetInnerHTML={{
                    __html: domSanitize(blogData.title?.trim()),
                  }}
                />
              ),
            },
          ]}
        />
      </div>

      <div className="mx-auto max-w-5xl px-4 pb-20">
        <h1
          className="mt-8 font-texas text-4xl font-black text-primary md:text-5xl"
          dangerouslySetInnerHTML={{
            __html: domSanitize(blogData.title?.trim()),
          }}
        />
        <p className="text-third-800/70 mt-2 text-sm uppercase tracking-wide">
          {blogData.displayDate
            ? new Date(blogData.displayDate).toLocaleDateString()
            : ""}
        </p>

        <Carousel
          opts={{
            loop: true,
            direction: getLocaleDirection(locale),
          }}
          className="relative mt-6 w-full overflow-hidden rounded-xl"
        >
          <CarouselContent>
            {blogData.blogImages?.map((image, index) => (
              <CarouselItem key={index} className="relative w-full">
                <div className="relative aspect-video h-auto w-full">
                  <NextImage
                    src={image.imageActual}
                    alt={
                      blogData.alt
                        ? new DOMParser().parseFromString(
                            domSanitize(blogData.alt?.trim()),
                            "text/html",
                          ).body.textContent || ""
                        : ""
                    }
                    fill
                    className="object-contain"
                    priority={index === 0}
                  />
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>

          {blogData.blogImages?.length > 1 && (
            <>
              <CarouselPrevious className="left-4 rtl:left-auto rtl:right-4" />
              <CarouselNext className="right-4 rtl:left-4 rtl:right-auto" />
            </>
          )}
        </Carousel>

        {blogData.description?.trim() && (
          <article
            className="prose prose-lg text-third-800/90 mt-8 max-w-none"
            dangerouslySetInnerHTML={{
              __html: domSanitize(blogData.description?.trim()),
            }}
          />
        )}

        {/* Prev / Next navigation */}
        <div className="mt-10 flex flex-col items-stretch justify-between gap-4 border-t border-third/20 pt-6 md:flex-row md:items-center">
          <div className="flex-1">
            {prev && (
              <Button
                asChild
                className="border-third/10 bg-transparent font-texas font-bold uppercase text-third"
              >
                <NextLink
                  href={`/blogs/${prev.uniqueCode}`}
                  className="flex items-center"
                  scroll={false}
                >
                  <ChevronLeft className="me-2 size-5 rtl:-scale-x-100" />
                  <span className="text-left">
                    <span className="block text-xs opacity-80">
                      {resources["previous"]}
                    </span>
                    <span
                      className="block max-w-[280px] truncate"
                      dangerouslySetInnerHTML={{
                        __html: domSanitize(prev.title?.trim()),
                      }}
                    />
                  </span>
                </NextLink>
              </Button>
            )}
          </div>
          <div className="flex-1 text-end">
            {next && (
              <Button
                asChild
                className="border-third/10 bg-transparent font-texas font-bold uppercase text-third"
              >
                <NextLink
                  href={`${PAGE_PATHS.BLOGS}/${next.uniqueCode}`}
                  className="flex items-center justify-end"
                  scroll={false}
                >
                  <span className="me-2 text-end">
                    <span className="block text-xs opacity-80">
                      {resources["next"]}
                    </span>
                    <span
                      className="block max-w-[280px] truncate"
                      dangerouslySetInnerHTML={{
                        __html: domSanitize(next.title?.trim()),
                      }}
                    />
                  </span>
                  <ChevronRight className="size-5 rtl:-scale-x-100" />
                </NextLink>
              </Button>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default BlogDetailsView;
