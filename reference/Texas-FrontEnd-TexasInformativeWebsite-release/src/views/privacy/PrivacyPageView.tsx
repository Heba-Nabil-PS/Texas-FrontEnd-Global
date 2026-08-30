"use client";

import { domSanitize } from "@/lib/domSanitize";
import { AdvancedContentCategoryProps } from "@/modules/informative/types/advanced-content.types";

interface PrivacyPageViewProps {
  headerPrivacy: AdvancedContentCategoryProps;
}

export function PrivacyView({ headerPrivacy }: PrivacyPageViewProps) {
  return (
    <main className="container mx-auto min-h-screen bg-white px-4 py-20 text-black sm:px-6 md:py-28 lg:px-8">
      <div className="mx-auto max-w-4xl">
        <div className="mb-12 text-center">
          <h1 className="my-4 text-center font-texas text-6xl font-black uppercase leading-none tracking-tight text-primary drop-shadow-sm md:text-8xl">
            {headerPrivacy?.Name}
          </h1>
        </div>
        {headerPrivacy?.DescriptionLong?.trim() && (
          <div
            dangerouslySetInnerHTML={{
              __html: domSanitize(headerPrivacy.DescriptionLong?.trim()),
            }}
            className="[&_a]:text-secondary [&_a]:underline hover:[&_a]:text-primary"
          />
        )}
      </div>
    </main>
  );
}

export const serverClasses = "font-black w-full overflow-x-auto";
