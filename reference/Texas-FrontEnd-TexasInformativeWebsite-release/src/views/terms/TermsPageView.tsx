"use client";

import { domSanitize } from "@/lib/domSanitize";
import { AdvancedContentCategoryProps } from "@/modules/informative/types/advanced-content.types";

interface TermsPageViewProps {
  headerTerrms: AdvancedContentCategoryProps | undefined;
}

const TermsPageView = ({ headerTerrms }: TermsPageViewProps) => {
  return (
    <main className="container mx-auto min-h-screen bg-white px-4 py-20 text-black sm:px-6 md:py-28 lg:px-8">
      <div className="mx-auto max-w-4xl">
        <div className="mb-12 text-center">
          <h1 className="my-4 text-center font-texas text-6xl font-black uppercase leading-none tracking-tight text-primary drop-shadow-sm md:text-8xl">
            {headerTerrms?.Name}
          </h1>
        </div>

        {headerTerrms?.DescriptionLong?.trim() && (
          <div
            dangerouslySetInnerHTML={{
              __html: domSanitize(headerTerrms.DescriptionLong?.trim()),
            }}
            className="[&_a]:text-secondary [&_a]:underline hover:[&_a]:text-primary"
          />
        )}
      </div>
    </main>
  );
};

export default TermsPageView;

export const serverClasses =
  "font-black w-full overflow-x-auto prose prose-lg mb-12 max-w-none mb-4 mt-10 text-2xl font-semibold mb-3 text-gray-700 mb-3 mt-6 text-xl font-semibold";
