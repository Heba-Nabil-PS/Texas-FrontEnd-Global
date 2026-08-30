"use client";

import { motion as m, AnimatePresence } from "motion/react";
import { Calendar } from "lucide-react";
import { PAGE_PATHS } from "@/constants/page-paths";
import { domSanitize } from "@/lib/domSanitize";
import { NextLink } from "@/components/global/next-link";
import { BlogProps } from "@/modules/blogs/types/blogs.type";
import { CustomBreadCrumb } from "@/components/global/custom-breadcrumb";
import { NextImage } from "@/components/global/next-image";
import type { BlogsPageResourcesProps } from "@/types/resources";
import type { AdvancedContentCategoryProps } from "@/modules/informative/types/advanced-content.types";

interface BlogsPageViewProps {
  blogs: BlogProps[];
  headerBlogs: AdvancedContentCategoryProps;
  resources: BlogsPageResourcesProps;
  locale: string;
}

export function BlogsPageView(props: BlogsPageViewProps) {
  const { blogs, resources, headerBlogs, locale } = props;

  return (
    <section className="min-h-screen bg-[#faf7f2] pt-16 md:pt-24">
      <div className="mt-6 flex justify-center md:mt-10">
        <CustomBreadCrumb
          data={[
            { href: PAGE_PATHS.HOME, name: resources["Home"] },
            { href: PAGE_PATHS.BLOGS, name: resources["Blog"] },
          ]}
        />
      </div>

      <div className="flex flex-col items-center">
        <m.h1
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: "easeOut" }}
          className="text-center font-texas font-black uppercase leading-none tracking-tight text-primary drop-shadow-sm"
          style={{ fontSize: "clamp(48px, 16vw, 160px)" }}
        >
          {headerBlogs?.Name}
        </m.h1>
        {headerBlogs?.DescriptionLong?.trim() && (
          <div
            dangerouslySetInnerHTML={{
              __html: domSanitize(headerBlogs.DescriptionLong?.trim()),
            }}
          />
        )}
      </div>
      {/* Blog Content */}
      <div className="container mx-auto px-4 py-12 md:py-16">
        {/* Blog Grid */}
        <div className="mb-16">
          <AnimatePresence>
            {blogs && blogs.length > 0 ? (
              <div className="flex flex-wrap justify-center gap-8">
                {blogs.map((blog) => (
                  <m.article
                    key={blog.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 20 }}
                    transition={{ duration: 0.3 }}
                    className="flex size-full flex-col overflow-hidden rounded-xl bg-white shadow-md transition-shadow duration-300 hover:shadow-lg md:w-1/3 lg:w-1/3"
                  >
                    <NextLink
                      href={`${PAGE_PATHS.BLOGS}/${blog.uniqueCode}`}
                      className="group flex h-full flex-col"
                    >
                      {blog.imagePrimaActual?.trim() && (
                        <div className="relative aspect-video overflow-hidden">
                          <NextImage
                            src={blog.imagePrimaActual}
                            alt={
                              blog.alt
                                ? new DOMParser().parseFromString(
                                    domSanitize(blog.alt),
                                    "text/html",
                                  ).body.textContent || ""
                                : ""
                            }
                            fill
                            className="size-full object-cover transition-transform duration-500 group-hover:scale-105"
                          />
                        </div>
                      )}
                      <div className="flex flex-1 flex-col p-6">
                        <div className="mb-3 flex items-center text-sm text-gray-500">
                          <div className="me-4 flex items-center">
                            <Calendar className="me-1 size-4" />
                            {new Date(blog.displayDate).toLocaleDateString(
                              locale,
                              {
                                year: "numeric",
                                month: "long",
                                day: "numeric",
                              },
                            )}
                          </div>
                        </div>

                        {blog.title?.trim() && (
                          <h2
                            className="mb-3 font-texas text-xl font-bold text-gray-900 transition-colors group-hover:text-secondary"
                            dangerouslySetInnerHTML={{
                              __html: domSanitize(blog.title?.trim()),
                            }}
                          />
                        )}

                        {blog.descriptionShort?.trim() && (
                          <div
                            className="mb-4 line-clamp-3 text-gray-600"
                            dangerouslySetInnerHTML={{
                              __html: domSanitize(
                                blog.descriptionShort?.trim(),
                              ),
                            }}
                          />
                        )}

                        <div className="mt-auto pt-4">
                          <span className="inline-flex items-center font-medium text-secondary group-hover:underline">
                            {resources["ReadMore"]}
                            <svg
                              className="ms-1 size-4 transform transition-transform group-hover:translate-x-1 rtl:-scale-x-100"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M9 5l7 7-7 7"
                              />
                            </svg>
                          </span>
                        </div>
                      </div>
                    </NextLink>
                  </m.article>
                ))}
              </div>
            ) : (
              <div className="py-12 text-center">
                <div className="mx-auto mb-4 size-24 text-gray-300">
                  <svg
                    className="size-full"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1}
                      d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                </div>
                <h2 className="mb-1 text-lg font-medium text-gray-900">
                  {resources["no-articles-found"]}
                </h2>
              </div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
