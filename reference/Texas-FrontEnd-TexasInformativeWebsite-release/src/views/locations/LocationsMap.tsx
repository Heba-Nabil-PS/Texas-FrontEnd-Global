"use client";

import { memo, useCallback, useState } from "react";
import {
  AdvancedMarker,
  APIProvider,
  Map,
  type MapCameraChangedEvent,
  type MapCameraProps,
} from "@vis.gl/react-google-maps";
import { DEFAULT_MAP_ZOOM } from "@/utils/utils";
// Types
import { MapPositionProps } from "@/types";
import type { CountryLocationProps } from "@/modules/country/types/country.types";

type LocationsMapProps = {
  stores: CountryLocationProps[];
  zoom: number;
  userLocation: MapPositionProps | null;
  countryCenter: MapPositionProps;
  onMarkerClick: (uniqueCode: string) => void;
};

const LocationsMap = (props: LocationsMapProps) => {
  const { countryCenter, stores, zoom, userLocation, onMarkerClick } = props;

  const INITIAL_CAMERA = {
    center: countryCenter,
    zoom: zoom < 1 ? DEFAULT_MAP_ZOOM : zoom,
  };

  const [cameraProps, setCameraProps] =
    useState<MapCameraProps>(INITIAL_CAMERA);

  const handleCameraChange = useCallback(
    (ev: MapCameraChangedEvent) => setCameraProps(ev.detail),
    [],
  );

  return (
    <APIProvider apiKey={process.env.NEXT_PUBLIC_GOOGLE_MAP_API_KEY!}>
      <Map
        id={"e02b0f7a-c8db-4c8b-8d2c"}
        mapId={process.env.NEXT_PUBLIC_GOOGLE_MAP_ID || "map_id"}
        className="size-full overflow-hidden"
        reuseMaps
        {...cameraProps}
        onCameraChanged={handleCameraChange}
      >
        {userLocation && (
          <AdvancedMarker position={userLocation}>
            <img
              src="/images/UserPin.png"
              alt="user pin"
              width={32}
              height={32}
              loading="lazy"
              className="object-contain"
            />
          </AdvancedMarker>
        )}

        {stores?.map((item) => (
          <MarkerWithInfo
            key={item.id}
            data={item}
            onSelect={() => onMarkerClick(item.uniqueCode)}
          />
        ))}
      </Map>
    </APIProvider>
  );
};

export default memo(LocationsMap);

function MarkerWithInfo({
  data,
  onSelect,
}: {
  data: CountryLocationProps;
  onSelect: () => void;
}) {
  return (
    <AdvancedMarker
      position={{
        lat: Number(data.latitude),
        lng: Number(data.longitude),
      }}
      onClick={onSelect}
    >
      <img
        src="/images/pin2.png"
        alt="map pin"
        width={20}
        height={40}
        loading="lazy"
        className="object-contain"
      />
    </AdvancedMarker>
  );
}
