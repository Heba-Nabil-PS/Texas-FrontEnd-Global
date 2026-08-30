"use client";

import { NextLink } from "@/components/global/next-link";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumbs";
import { motion } from "motion/react";
import { ClockIcon, MapPinIcon, PhoneIcon, SearchIcon } from "lucide-react";
import Image from "next/image";
import { useMemo, useState } from "react";

type Store = {
  id: number;
  name: string;
  address: string;
  Hotline: string;
  image: string;
  hours: string;
  coordinates: { lat: number; lng: number };
};

const STORES: Store[] = [
  {
    id: 1,
    name: "Airport Rd - Adu Dhabi",
    address: "Bldg 528, Sheikh Rashid Bin Saeed St, Al Tibbiya",
    Hotline: "600522224",
    image: "/images/v1.jpg",
    hours: "12:00 PM - 11:59 AM",
    coordinates: { lat: 24.4539, lng: 54.3773 },
  },
  {
    id: 2,
    name: "Al Falah",
    address: "Tanif St - Al Falah - Abu Dhabi - United Arab Emirates",
    Hotline: "600522224",
    image: "/images/v2.jpg",
    hours: "10:00 AM - 5:00 AM",
    coordinates: { lat: 24.495, lng: 54.607 },
  },
  {
    id: 3,
    name: "Al Maqaam",
    address:
      "ADNOC Petrol Station, opposite Ajman City Centre, Mushrif Area, Ajman",
    Hotline: "600522224",
    image: "/images/v3.jpg",
    hours: "12:00 AM - 11:59 PM",
    coordinates: { lat: 24.074, lng: 55.698 },
  },
  {
    id: 4,
    name: "Al Maqaam",
    address:
      "ADNOC Petrol Station, opposite Ajman City Centre, Mushrif Area, Ajman",
    Hotline: "600522224",
    image: "/images/new-offer.jpg",
    hours: "12:00 AM - 11:59 PM",
    coordinates: { lat: 25.405, lng: 55.513 },
  },
  {
    id: 5,
    name: "Airport Rd - Adu Dhabi",
    address: "Bldg 528, Sheikh Rashid Bin Saeed St, Al Tibbiya",
    Hotline: "600522224",
    image: "/images/v1.jpg",
    hours: "12:00 PM - 11:59 AM",
    coordinates: { lat: 24.466, lng: 54.366 },
  },
  {
    id: 6,
    name: "Al Falah",
    address: "Tanif St - Al Falah - Abu Dhabi - United Arab Emirates",
    Hotline: "600522224",
    image: "/images/v2.jpg",
    hours: "10:00 AM - 5:00 AM",
    coordinates: { lat: 24.568, lng: 54.71 },
  },
  {
    id: 7,
    name: "Al Maqaam",
    address:
      "ADNOC Petrol Station, opposite Ajman City Centre, Mushrif Area, Ajman",
    Hotline: "600522224",
    image: "/images/v3.jpg",
    hours: "12:00 AM - 11:59 PM",
    coordinates: { lat: 24.12, lng: 55.78 },
  },
  {
    id: 8,
    name: "Al Maqaam",
    address:
      "ADNOC Petrol Station, opposite Ajman City Centre, Mushrif Area, Ajman",
    Hotline: "600522224",
    image: "/images/new-offer.jpg",
    hours: "12:00 AM - 11:59 PM",
    coordinates: { lat: 25.34, lng: 55.49 },
  },
  {
    id: 9,
    name: "Al Maqaam",
    address:
      "ADNOC Petrol Station, opposite Ajman City Centre, Mushrif Area, Ajman",
    Hotline: "600522224",
    image: "/images/new-offer.jpg",
    hours: "12:00 AM - 11:59 PM",
    coordinates: { lat: 25.41, lng: 55.54 },
  },
];

const LocationsStoreViewPage = () => {
  const [query, setQuery] = useState("");

  const filtered = useMemo(() => {
    if (!query.trim()) return STORES;
    const q = query.toLowerCase();
    return STORES.filter(
      (s) =>
        s.name.toLowerCase().includes(q) ||
        s.address.toLowerCase().includes(q) ||
        s.Hotline.toLowerCase().includes(q),
    );
  }, [query]);

  return (
    <div className="min-h-screen bg-white py-28">
      {/* Heading */}
      <div className="mt-6 flex justify-center md:mt-10">
        <Breadcrumb>
          <BreadcrumbList className="text-third-800/70">
            <BreadcrumbItem>
              <BreadcrumbLink className="hover:text-secondary" href="/">
                Home
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage className="text-secondary">
                Our Stores
              </BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </div>
      <div className="flex flex-col items-center text-center">
        <motion.h1
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: "easeOut" }}
          className="font-texas font-black uppercase leading-none tracking-tight text-primary drop-shadow-sm"
          style={{ fontSize: "clamp(48px, 16vw, 160px)" }}
        >
          OUR stores
        </motion.h1>
        <p className="text-third-800/80 mb-4 mt-6 max-w-3xl text-base md:text-xl">
          {
            "Whether you’re craving bold flavor at home or on the go, <span className='font-bold italic'>Texas Chicken™</span> is always within reach. Visit your nearest store or get your favorite meals delivered hot and fresh, just the way you like it."
          }
        </p>
      </div>
      {/* Search */}
      <div className="container mx-auto px-4">
        <div className="mx-auto mb-10 max-w-3xl">
          <div className="relative">
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Discover the nearest one"
              className="w-full border-b-4 border-secondary bg-white px-10 py-3 text-sm outline-none focus:border-primary"
            />
            <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
              <SearchIcon />
            </span>
          </div>
        </div>
      </div>

      {/* Stores Grid */}
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((store) => (
            <div
              key={store.id}
              className="group relative h-[400px] transition-all duration-300 hover:-translate-y-1"
            >
              <div className="relative h-48 w-full">
                {/* Number Badge */}
                <div className="absolute left-3 top-3 z-10 flex h-10 w-10 items-center justify-center border-2 border-primary bg-secondary font-bold text-primary">
                  {store.id}
                </div>
                <Image
                  src={store.image}
                  alt={store.name}
                  width={500}
                  height={500}
                  className="h-52 object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>
              <div className="w-full border-2 border-primary bg-white p-4 md:absolute md:-left-2 md:-mt-12 md:w-[90%]">
                <h3 className="mb-2 text-lg font-bold text-primary">
                  {store.name}
                </h3>
                <div className="mb-2 flex items-start gap-2 text-sm text-gray-600">
                  <MapPinIcon className="mt-0.5 h-4 w-4 flex-shrink-0 text-primary" />
                  <p className="line-clamp-2">{store.address}</p>
                </div>
                <div className="mb-3 flex items-center gap-2 text-sm text-gray-600">
                  <PhoneIcon className="h-4 w-4 text-primary" />
                  <a href={`tel:${store.Hotline}`} className="hover:underline">
                    {store.Hotline}
                  </a>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <ClockIcon className="h-4 w-4 text-primary" />
                  <span>{store.hours}</span>
                </div>
                <div className="mt-4">
                  <NextLink
                    href={`#`}
                    className="inline-flex items-center text-sm font-medium text-primary transition-colors hover:text-red-700"
                  >
                    View on map
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="ml-1 h-4 w-4"
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
                  </NextLink>
                </div>
              </div>
            </div>
          ))}
        </div>
        {filtered.length === 0 && (
          <div className="col-span-full py-12 text-center">
            <p className="text-gray-500">
              No stores found matching your search.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default LocationsStoreViewPage;
