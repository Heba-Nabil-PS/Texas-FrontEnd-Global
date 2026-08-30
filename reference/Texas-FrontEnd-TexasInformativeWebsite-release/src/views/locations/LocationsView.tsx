"use client";

import { useEffect, useMemo, useState } from "react";
import { notFound } from "next/navigation";
import { motion } from "motion/react";
import { SearchIcon, TriangleAlertIcon } from "lucide-react";
import { useData } from "@/components/providers/data-provider";
import { domSanitize } from "@/lib/domSanitize";
import { CustomBreadCrumb } from "@/components/global/custom-breadcrumb";
import { PAGE_PATHS } from "@/constants/page-paths";
import { calculateDistance, isModuleOn } from "@/lib";
import { STATIC_MODULES } from "@/constants/country-modules";
import LocationItem from "./LocationItem";
import { NextImage } from "@/components/global/next-image";
import { useConfig } from "@/components/providers/config-provider";
import type { LocationsPageResourcesProps } from "@/types/resources";
import type { AdvancedContentCategoryProps } from "@/modules/informative/types/advanced-content.types";
import type { MapPositionProps } from "@/types";
import { cn } from "@/lib/utils";

interface LocationsViewProps {
  resources: LocationsPageResourcesProps;
  headerLocations: AdvancedContentCategoryProps | undefined;
}

export function LocationsView(props: LocationsViewProps) {
  const { resources, headerLocations } = props;

  const {
    countryData: { locations, countryModules },
  } = useData();

  const { googleMapIframURL } = useConfig();

  const [userLocation, setUserLocation] = useState<MapPositionProps | null>(
    null,
  );
  const [showMsg, setShowMsg] = useState(false);

  useEffect(() => {
    function geoLocation() {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(handleLocationSuccess);

        navigator.permissions
          .query({ name: "geolocation" })
          .then(function (result) {
            setShowMsg(result.state !== "granted");
          });
      }
    }

    function handleLocationSuccess(position: GeolocationPosition) {
      setUserLocation({
        lat: position.coords.latitude,
        lng: position.coords.longitude,
      });
    }

    geoLocation();
  }, []);

  const [query, setQuery] = useState("");
  const [openId, setOpenId] = useState<string | null>(
    locations[0]?.uniqueCode || null,
  );

  const filtered = useMemo(() => {
    if (!query.trim()) return locations;

    const q = query.toLowerCase();

    return locations.filter(
      (location) =>
        location.name?.trim().toLowerCase().includes(q) ||
        location.description?.trim().toLowerCase().includes(q) ||
        location.phone?.trim().toLowerCase().includes(q) ||
        location.email?.trim().toLowerCase().includes(q),
    );
  }, [query, locations]);

  const sortByDistance = useMemo(() => {
    if (!userLocation) return filtered;

    return [...filtered].sort((a, b) => {
      const distanceA = calculateDistance(
        userLocation?.lat,
        userLocation?.lng,
        Number(a?.latitude),
        Number(a?.longitude),
      );

      const distanceB = calculateDistance(
        userLocation?.lat,
        userLocation?.lng,
        Number(b?.latitude),
        Number(b?.longitude),
      );
      return Number(distanceA) - Number(distanceB);
    });
  }, [filtered, userLocation]);

  const isPageOn = Boolean(isModuleOn(countryModules, STATIC_MODULES.LOCATION));
  const useCoupons = Boolean(
    isModuleOn(countryModules, STATIC_MODULES.LOCATIONCOUPONINBACKEND),
  );

  if (!isPageOn) {
    return notFound();
  }

  return (
    <div className="min-h-screen bg-white py-16 lg:py-28">
      <div className="relative z-10 mt-6 flex justify-center md:mt-10">
        <CustomBreadCrumb
          data={[
            { href: PAGE_PATHS.HOME, name: resources["Home"] },
            {
              href: PAGE_PATHS.LOCATIONS,
              name: headerLocations?.Name || resources["ourstores"],
            },
          ]}
        />
      </div>
      {headerLocations && (
        <div className="flex flex-col items-center text-center">
          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease: "easeOut" }}
            className="font-black uppercase leading-none tracking-tight text-primary drop-shadow-sm ltr:font-texas"
            style={{ fontSize: "clamp(48px, 16vw, 160px)" }}
          >
            {headerLocations?.Name}
          </motion.h1>

          {headerLocations?.DescriptionLong?.trim() && (
            <div
              dangerouslySetInnerHTML={{
                __html: domSanitize(headerLocations?.DescriptionLong?.trim()),
              }}
            />
          )}
        </div>
      )}
      {/* Search */}
      <div className="container z-10 mx-auto px-4">
        <div className="mx-auto mb-10 max-w-3xl">
          <div className="relative">
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder={resources["discover-the-nearest-one"]}
              className="w-full border-b-4 border-secondary bg-white px-10 py-3 text-sm capitalize outline-none focus:border-primary"
            />
            <span className="pointer-events-none absolute start-3 top-1/2 -translate-y-1/2 text-gray-400">
              <SearchIcon />
            </span>
          </div>
        </div>
      </div>

      {/* Left collapsible list + Right map */}
      <div className="mx-auto max-w-7xl px-4">
        {showMsg && (
          <div className="mb-5">
            <div className="flex w-fit items-center gap-2 text-sm text-third">
              <TriangleAlertIcon className="size-4 shrink-0 text-primary" />
              {resources["allowLocationMsg"]}
            </div>
          </div>
        )}

        <div className="flex flex-col-reverse justify-center gap-8 lg:flex-row">
          {/* Left: Collapsible branches */}
          <div className="w-full space-y-4 lg:w-3/5">
            {sortByDistance.map((location) => {
              const isOpen = openId === location.uniqueCode;
              return (
                <LocationItem
                  key={location.id}
                  location={location}
                  isOpen={isOpen}
                  // index={index}
                  setOpenId={setOpenId}
                  useCoupons={useCoupons}
                  resources={{
                    getcoupons: resources["getcoupons"],
                    GetDirections: resources["GetDirections"],
                    farFromLocation: resources["farFromLocation"],
                  }}
                  userLocation={userLocation}
                />
              );
            })}
          </div>

          {/* Right: Google Map */}
          {headerLocations?.ImageUrl && (
            <div className="h-[50vh] w-full overflow-hidden rounded-lg lg:sticky lg:top-32 lg:w-1/2">
              {googleMapIframURL?.trim() ? (
                <iframe
                  src={googleMapIframURL}
                  allowFullScreen
                  width={1000}
                  height={600}
                  className="w-full"
                />
              ) : (
                // <LocationsMap
                //   stores={sortByDistance}
                //   zoom={DEFAULT_MAP_ZOOM}
                //   userLocation={userLocation}
                //   countryCenter={{
                //     lat: Number(sortByDistance[0].latitude) ?? 0,
                //     lng: Number(sortByDistance[0].longitude) ?? 0,
                //   }}
                //   onMarkerClick={setOpenId}
                // />
                <NextImage
                  src={headerLocations?.ImageUrl}
                  alt={headerLocations?.Name || headerLocations?.ImageAlt || ""}
                  width={1000}
                  height={600}
                  className="size-full object-cover"
                />
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
