import { useEffect, useRef, useState } from "react";
import { ClockIcon, MapPinIcon, PhoneIcon } from "lucide-react";
import { calculateDistance, displayInOrder } from "@/lib";
import CustomLightBox from "@/components/global/CustomLightBox";
import type { CountryLocationProps } from "@/modules/country/types/country.types";
import type { MapPositionProps } from "@/types";

interface LocationItemProps {
  location: CountryLocationProps;
  isOpen: boolean;
  // index: number;
  setOpenId: React.Dispatch<React.SetStateAction<string | null>>;
  useCoupons: boolean;
  resources: {
    GetDirections: string;
    getcoupons: string;
    farFromLocation: string;
  };
  userLocation: MapPositionProps | null;
}

const LocationItem = (props: LocationItemProps) => {
  const {
    location,
    isOpen,
    // index,
    setOpenId,
    useCoupons,
    resources,
    userLocation,
  } = props;

  const [openGallery, setOpenGallery] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen && containerRef.current) {
      containerRef.current.scrollIntoView({
        behavior: "smooth",
        block: "center",
      });
    }
  }, [isOpen]);

  return (
    <div
      ref={containerRef}
      key={location.id}
      className={`border-2 ${
        isOpen ? "border-primary" : "border-third-300"
      } overflow-hidden rounded-md`}
    >
      <button
        className="flex w-full items-center justify-between bg-white px-4 py-3 hover:bg-secondary/20"
        onClick={() => setOpenId(isOpen ? null : location.uniqueCode)}
      >
        <div className="flex items-center gap-3 text-start">
          {/* <span className="inline-flex size-8 shrink-0 items-center justify-center rounded-full border-2 border-primary bg-secondary font-bold text-primary">
            {index + 1}
          </span> */}
          <span className="uppercase tracking-wide text-primary ltr:font-texas">
            {location.name?.trim()}
          </span>

          {userLocation && (
            <p className="flex items-center gap-1 text-sm font-bold leading-none">
              <MapPinIcon className="h-4 w-4 shrink-0" />
              {calculateDistance(
                userLocation?.lat,
                userLocation?.lng,
                Number(location?.latitude),
                Number(location?.longitude),
              )}{" "}
              KM &nbsp; {resources["farFromLocation"]}
            </p>
          )}
        </div>
        <span
          className={`shrink-0 transition-transform ${
            isOpen ? "rotate-180" : "rotate-0"
          }`}
        >
          <img
            src="/images/dr.png"
            className="size-4 object-contain text-primary"
            loading="lazy"
          />
        </span>
      </button>
      <div
        className={`grid transition-all ${
          isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
        }`}
      >
        <div className="overflow-hidden">
          <div className="bg-secondary/10 p-4">
            {location.description?.trim() && (
              <a
                href={location.directionLink?.trim()}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-2 flex gap-2 text-sm capitalize text-third"
              >
                <MapPinIcon className="h-5 w-5 shrink-0 text-primary" />
                {location.description?.toLowerCase()}
              </a>
            )}
            {location.phone?.trim() && (
              <a
                href={`tel:${location.phone}`}
                className="mt-2 flex items-center gap-2 text-sm text-third"
              >
                <PhoneIcon className="h-4 w-4 text-primary" />
                {location.phone?.trim()}
              </a>
            )}
            {location.openingDaily?.trim() && (
              <p className="mt-2 flex items-center gap-2 text-sm uppercase text-third">
                <ClockIcon className="h-4 w-4 text-primary" />
                {location.openingDaily?.trim()}
              </p>
            )}

            {/* facilities */}
            {location.facilityList && location.facilityList.length > 0 && (
              <div className="flex flex-wrap gap-3 pb-2 pl-1 pt-4">
                {displayInOrder(location.facilityList)?.map(
                  (facility, index) => (
                    <div
                      key={index}
                      className="flex flex-col items-center gap-1"
                    >
                      <img
                        src={facility.imageActual}
                        alt={facility.name!}
                        width="50"
                        height="50"
                        className="rounded-md border border-third-300 p-2"
                      />
                      <p className="text-center text-xs">{facility.name}</p>
                    </div>
                  ),
                )}
              </div>
            )}
            {/* aggrigator */}
            {location.aggregatorList && location.aggregatorList?.length > 0 && (
              <div className="flex flex-col gap-3 border-t border-secondary/20">
                <div className="flex flex-wrap gap-3 py-2">
                  {displayInOrder(location.aggregatorList)?.map(
                    (aggregator, index) => (
                      <div key={index} className="flex items-center gap-6">
                        {aggregator.imageActual?.trim() && (
                          <a
                            href={aggregator.url!}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            <img
                              src={aggregator.imageActual?.trim()}
                              alt={aggregator.alt!}
                              width="120"
                              height="30"
                              className="object-contain"
                            />
                          </a>
                        )}
                      </div>
                    ),
                  )}
                </div>
              </div>
            )}

            {/* cta */}
            <div className="my-3 flex items-center gap-4">
              {location.directionLink?.trim() && (
                <a
                  className="text-xs font-bold uppercase text-primary underline transition-colors hover:text-secondary"
                  target="_blank"
                  rel="noopener noreferrer"
                  href={location.directionLink?.trim()}
                >
                  {resources["GetDirections"]}
                </a>
              )}

              {useCoupons &&
                location.couponList &&
                location.couponList?.length > 0 && (
                  <>
                    <button
                      className="cursor-pointer text-xs font-bold uppercase text-primary underline transition-colors hover:text-secondary"
                      onClick={() => setOpenGallery(true)}
                    >
                      {resources["getcoupons"]}
                    </button>

                    <CustomLightBox
                      open={openGallery}
                      handleClose={() => setOpenGallery(false)}
                      slides={
                        location.couponList
                          ?.filter((item) => !!item.imageURL?.trim())
                          ?.map((item) => ({
                            src: item.imageURL || "",
                            width: 3840,
                            height: 5760,
                          })) || []
                      }
                    />
                  </>
                )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LocationItem;
