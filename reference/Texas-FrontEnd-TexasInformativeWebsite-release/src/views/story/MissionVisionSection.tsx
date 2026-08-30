import { NextImage } from "@/components/global/next-image";
import { domSanitize } from "@/lib/domSanitize";
import type { AdvancedContentCategoryProps } from "@/modules/informative/types/advanced-content.types";

interface MissionVisionSectionProps {
  data: AdvancedContentCategoryProps[];
  locale: string;
}

const MissionVisionSection = (props: MissionVisionSectionProps) => {
  const { data, locale } = props;

  if (data?.length === 0) return null;

  return (
    <section className="relative px-4 pt-14">
      <div className="container md:px-6">
        {/* Mission and Vision Cards */}
        <div className="grid gap-10 md:grid-cols-2 md:gap-28">
          {data?.map((item) => {
            const displayImage =
              locale === "ar" ? item.MediumImage : item.ImageUrl;

            return (
              <div key={item.ID} className="relative rounded-2xl">
                <h3 className="sr-only mb-4 font-texas text-3xl font-black uppercase text-white md:text-4xl">
                  {item.Name}
                </h3>
                {displayImage?.trim() ? (
                  <div>
                    <NextImage
                      src={displayImage}
                      alt={item.ImageAlt || item.Name || "mission"}
                      width={300}
                      height={100}
                    />
                  </div>
                ) : (
                  item.Name?.trim() && (
                    <h4 className="mb-4 font-texas text-3xl font-black uppercase text-primary md:text-5xl">
                      {item.Name}
                    </h4>
                  )
                )}

                {item.DescriptionShort?.trim() && (
                  <div
                    className="text-xl leading-relaxed text-third"
                    dangerouslySetInnerHTML={{
                      __html: domSanitize(item.DescriptionShort?.trim()),
                    }}
                  />
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default MissionVisionSection;
