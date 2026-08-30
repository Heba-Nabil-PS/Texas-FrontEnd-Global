"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { motion } from "motion/react";
import { CustomBreadCrumb } from "@/components/global/custom-breadcrumb";
import CateringForm from "./CateringForm";
import { menuData } from "@/data/menu";
import { NextLink } from "@/components/global/next-link";
import { NextImage } from "@/components/global/next-image";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

type MenuItem = {
  id: string;
  name: string;
  description: string;
  image: string;
  price?: string;
};

type Props = {
  currentCategory: {
    id: string;
    name: string;
    items: MenuItem[];
  };
  pathname?: string;
  params: {
    category: string;
    locale: string;
  };
};

const CateringViewPage = ({
  currentCategory = {
    id: "",
    name: "Catering",
    items: [],
  },
  pathname = "",
  params = { category: "", locale: "en" },
}: Partial<Props> = {}) => {
  const t = useTranslations("Menu");

  const cateringSections = [
    {
      id: "chicken",
      title: "Chicken",
      description:
        "Perfect individual chicken sets for guests who love our Original or Spicy classics.",
      highlight: "Great for hearty, individual portions.",
      items: [
        {
          id: "1a-chicken",
          name: "1A Chicken",
          description:
            "2pcs Original/Spicy Chicken, 1 Reg Fries/Mashed Potato.",
          price: "6.90",
        },
        {
          id: "1b-chicken",
          name: "1B Chicken",
          description:
            "3pcs Original/Spicy Tenders, 1 Reg Fries/Mashed Potato.",
          price: "5.90",
        },
      ],
    },
    {
      id: "burgers-wraps",
      title: "Burgers & Wraps",
      description:
        "Crowd-pleasing burger and wrap sets, ideal for casual and corporate events.",
      highlight: "Easy to eat, perfect for on-the-go events.",
      items: [
        {
          id: "2a-burger",
          name: "2A Burger",
          description: "Tex Supreme Burger, 1 Reg Fries/Mashed Potato.",
          price: "5.90",
        },
        {
          id: "2b-burger",
          name: "2B Burger",
          description: "Classic Burger, 1 Reg Fries/Mashed Potato.",
          price: "4.50",
        },
      ],
    },
    {
      id: "variety-combos",
      title: "Variety Combos",
      description:
        "A balance of burgers, chicken and sides for guests who want it all.",
      highlight: "Best for mixed preferences in a single set.",
      items: [
        {
          id: "3a-variety",
          name: "3A Variety",
          description:
            "Classic Burger, 1 Original/Spicy Chicken, 1 Reg Fries/Mashed Potato.",
          price: "5.90",
        },
        {
          id: "3b-variety",
          name: "3B Variety",
          description:
            "Tender Wrap, 1 Original/Spicy Chicken, 1 Reg Fries/Mashed Potato.",
          price: "5.90",
        },
      ],
    },
    {
      id: "snacks-sides",
      title: "Snacks & Sides",
      description:
        "Add-ons to complete your catering table with bites everyone will love.",
      highlight: "Perfect as light bites or sharing platters.",
      items: [
        {
          id: "honey-butter-biscuit",
          name: "Honey-Butter Biscuit",
          description: "Golden, flaky biscuits with a honey-butter finish.",
          price: "1.30",
        },
        {
          id: "2pcs-tenders",
          name: "2PCS Tenders",
          description: "2 pieces of crispy, juicy tenders.",
          price: "2.80",
        },
        {
          id: "6pcs-nuggets",
          name: "6PCS Nuggets",
          description: "6 pieces of crunchy chicken nuggets.",
          price: "5.30",
        },
      ],
    },
    {
      id: "beverages",
      title: "Beverages",
      description:
        "Complete your meal with refreshing beverages for every guest.",
      highlight: "Ideal add-on to any catering package.",
      items: [
        {
          id: "coca-cola",
          name: "Coca-Cola / Jasmine Green Tea",
          description: "Assorted canned soft drinks and teas.",
          price: "1.00",
        },
      ],
    },
  ];

  const partySets = [
    {
      id: "set-a",
      label: "A (8 - 10 Pax)",
      name: "Super-value",
      description:
        "15 pc Chicken, 10 pc Tenders, 18 pc Nuggets, 10 Honey-butter Biscuits, 5 Large Mashed Potatoes, 2 x 1.5L Coca-Cola.",
      price: "93",
    },
    {
      id: "set-b",
      label: "B (10 - 12 Pax)",
      name: "Delightful",
      description:
        "20 pc Chicken, 20 pc Tenders, 18 pc Nuggets, 10 Honey-butter Biscuits, 6 Large Mashed Potatoes, 2 x 1.5L Coca-Cola.",
      price: "123",
    },
    {
      id: "set-c",
      label: "C (12 - 15 Pax)",
      name: "Abundance",
      description:
        "25 pc Chicken, 15 pc Tenders, 18 pc Nuggets, 12 Honey-butter Biscuits, 3 Large Mashed Potatoes, 3 Large Coleslaw, 3 x 1.5L Coca-Cola.",
      price: "133",
    },
  ];

  type TabKey = "catering" | "party" | "truck" | "vouchers";

  const [activeTab, setActiveTab] = useState<TabKey>("catering");

  return (
    <div className="min-h-screen pt-24">
      {/* Breadcrumb */}
      <div className="relative z-10 mt-6 flex justify-center md:mt-10">
        <CustomBreadCrumb
          data={[
            { name: "Home", href: "/" },
            { name: "Catering", href: "/catering" },
          ]}
        />
      </div>

      <motion.h1
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.9, ease: "easeOut" }}
        className="text-center font-texas font-black uppercase leading-none tracking-tight text-primary drop-shadow-sm"
        style={{ fontSize: "clamp(48px, 16vw, 160px)" }}
      >
        Catering
      </motion.h1>

      <div className="relative overflow-hidden">
        <div className="container relative z-10 mx-auto">
          <div className="scrollbar-hide flex overflow-x-auto px-2 py-4 md:justify-center">
            <div className="flex space-x-2 rounded-full border border-primary p-1">
              <button
                type="button"
                onClick={() => setActiveTab("catering")}
                className={`flex min-w-[80px] items-center gap-2 rounded-full px-4 py-2 text-sm font-bold transition-all duration-300 ${
                  activeTab === "catering"
                    ? "bg-primary text-white"
                    : "text-primary hover:bg-primary/10"
                }`}
              >
                <span className="text-center text-sm font-bold">
                  Catering Menu
                </span>
              </button>
              <button
                type="button"
                onClick={() => setActiveTab("party")}
                className={`flex min-w-[80px] items-center gap-2 rounded-full px-4 py-2 text-sm font-bold transition-all duration-300 ${
                  activeTab === "party"
                    ? "bg-primary text-white"
                    : "text-primary hover:bg-primary/10"
                }`}
              >
                <span className="text-center text-sm font-bold">
                  Party Sets
                </span>
              </button>
              <button
                type="button"
                onClick={() => setActiveTab("truck")}
                className={`flex min-w-[80px] items-center gap-2 rounded-full px-4 py-2 text-sm font-bold transition-all duration-300 ${
                  activeTab === "truck"
                    ? "bg-primary text-white"
                    : "text-primary hover:bg-primary/10"
                }`}
              >
                <span className="text-center text-sm font-bold">
                  Food Truck
                </span>
              </button>
              <button
                type="button"
                onClick={() => setActiveTab("vouchers")}
                className={`flex min-w-[80px] items-center gap-2 rounded-full px-4 py-2 text-sm font-bold transition-all duration-300 ${
                  activeTab === "vouchers"
                    ? "bg-primary text-white"
                    : "text-primary hover:bg-primary/10"
                }`}
              >
                <span className="text-center text-sm font-bold">
                  Gift Vouchers
                </span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Tab Content */}
      {activeTab === "catering" && (
        <>
          {/* Menu grid */}
          <div className="grid grid-cols-1 gap-0.5 bg-[#FAF7F2] sm:grid-cols-2 lg:grid-cols-3">
            {menuData
              .flatMap((category) => category.items)
              .map((item) => (
                <div key={item.id} className="group relative overflow-hidden">
                  <div className="absolute inset-0 z-0 origin-center scale-0 rounded-full bg-secondary transition-transform duration-700 group-hover:scale-[4]" />
                  <div className="relative z-10 flex h-full flex-col bg-white p-6 transition-colors duration-300 group-hover:bg-transparent">
                    <div className="mb-4 h-60 overflow-hidden">
                      <NextImage
                        src={item.image!}
                        alt={item.name}
                        width={500}
                        height={500}
                        className="h-full w-full object-contain transition-transform duration-500 group-hover:scale-110"
                      />
                    </div>
                    <div className="mb-3 flex flex-col items-center justify-center space-x-1">
                      <h2 className="text-center font-texas text-2xl font-extrabold uppercase text-third">
                        {item.name.split("(")[0].trim()}
                      </h2>
                      {item.name.includes("(") && (
                        <span className="block text-sm font-semibold text-primary">
                          {item.name
                            .split("(")
                            .slice(1)
                            .join("")
                            .replace(")", "")}
                        </span>
                      )}
                      {item.price && (
                        <div className="mt-2">
                          <span className="text-xl font-bold text-primary">
                            {item.currency === "USD"
                              ? "$"
                              : item.currency || "$"}
                            {item.price.toFixed(2)}
                          </span>
                        </div>
                      )}
                    </div>

                    <div className="pointer-events-none absolute inset-0 border border-[#FAF7F2]" />
                  </div>
                </div>
              ))}
          </div>

          <div className="bg-third/5">
            <div className="mx-auto max-w-3xl rounded-3xl p-6 shadow-sm md:p-8">
              <h3 className="mb-4 text-center font-texas text-4xl font-extrabold uppercase text-primary">
                Catering Menu Enquiry
              </h3>
              <CateringForm initialMenu="Catering Menu" />
            </div>
          </div>

          {/* 
          <div className="relative">
            <div className="absolute -inset-4 rounded-3xl bg-gradient-to-br from-secondary/10 via-primary/5 to-amber-100 blur-2xl" />
            <div className="relative rounded-3xl bg-white/90 p-6 shadow-xl ring-1 ring-primary/10">
              <p className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-secondary">
                Popular catering picks
              </p>
              <ul className="space-y-3 text-sm">
                <li className="flex items-start justify-between gap-4 border-b border-dashed border-amber-200 pb-2">
                  <div>
                    <p className="font-semibold text-gray-900">1A Chicken</p>
                    <p className="text-xs text-gray-600">
                      2pcs Original/Spicy Chicken, 1 Reg Fries/Mashed Potato.
                    </p>
                  </div>
                  <span className="font-bold text-primary">$6.90</span>
                </li>
                <li className="flex items-start justify-between gap-4 border-b border-dashed border-amber-200 pb-2">
                  <div>
                    <p className="font-semibold text-gray-900">
                      Tex Supreme Burger Set
                    </p>
                    <p className="text-xs text-gray-600">
                      Tex Supreme Burger, 1 Reg Fries/Mashed Potato.
                    </p>
                  </div>
                  <span className="font-bold text-primary">$5.90</span>
                </li>
                <li className="flex items-start justify-between gap-4 pb-1">
                  <div>
                    <p className="font-semibold text-gray-900">
                      Party Set C (12 – 15 pax)
                    </p>
                    <p className="text-xs text-gray-600">
                      Perfect for office celebrations and family gatherings.
                    </p>
                  </div>
                  <span className="font-bold text-primary">$133</span>
                </li>
              </ul>
              <p className="mt-4 text-xs text-gray-500">
                *Content inspired by the official catering page at{" "}
                <span className="underline">
                  paradigmsolutions.me/texasorder/menu-Catering4
                </span>
                .
              </p>
            </div>
          </div> */}
        </>
      )}

      {/* Party Sets */}
      {activeTab === "party" && (
        <section className="bg-white py-12 md:py-16">
          <div className="container mx-auto px-4">
            <div className="mb-8 text-center">
              <h3 className="mb-4 text-center font-texas text-5xl font-extrabold uppercase text-primary">
                Party Sets
              </h3>
              <p className="mx-auto mt-2 max-w-2xl text-sm text-gray-700 md:text-base">
                Wide variety of group combos for 8 to 15 guests, perfect for
                celebrations, office gatherings and family occasions.
              </p>
            </div>

            {/* Menu grid */}
            <div className="grid grid-cols-1 gap-0.5 bg-[#FAF7F2] sm:grid-cols-2 lg:grid-cols-3">
              {menuData
                .flatMap((category) => category.items)
                .map((item) => (
                  <div key={item.id} className="group relative overflow-hidden">
                    <div className="absolute inset-0 z-0 origin-center scale-0 rounded-full bg-secondary transition-transform duration-700 group-hover:scale-[4]" />
                    <div className="relative z-10 flex h-full flex-col bg-white p-6 transition-colors duration-300 group-hover:bg-transparent">
                      <div className="mb-4 h-60 overflow-hidden">
                        <NextImage
                          src={item.image!}
                          alt={item.name}
                          width={500}
                          height={500}
                          className="h-full w-full object-contain transition-transform duration-500 group-hover:scale-110"
                        />
                      </div>
                      <div className="mb-3 flex flex-col items-center justify-center space-x-1">
                        <h2 className="text-center font-texas text-2xl font-extrabold uppercase text-third">
                          {item.name.split("(")[0].trim()}
                        </h2>
                        {item.name.includes("(") && (
                          <span className="block text-sm font-semibold text-primary">
                            {item.name
                              .split("(")
                              .slice(1)
                              .join("")
                              .replace(")", "")}
                          </span>
                        )}
                        {item.price && (
                          <div className="mt-2">
                            <span className="text-xl font-bold text-primary">
                              {item.currency === "USD"
                                ? "$"
                                : item.currency || "$"}
                              {item.price.toFixed(2)}
                            </span>
                          </div>
                        )}
                      </div>

                      <div className="pointer-events-none absolute inset-0 border border-[#FAF7F2]" />
                    </div>
                  </div>
                ))}
            </div>

            <div className="mx-auto mt-10 max-w-3xl rounded-3xl bg-[#FAF7F2] p-6 shadow-sm md:p-8">
              <h3 className="mb-4 text-center font-texas text-4xl font-extrabold uppercase text-primary">
                Party Sets Enquiry
              </h3>
              <CateringForm initialMenu="Party Sets" />
            </div>
          </div>
        </section>
      )}

      {/* Food Truck */}
      {activeTab === "truck" && (
        <section className="py-12 md:py-16">
          <div className="container mx-auto px-4">
            <div className="grid gap-10 md:grid-cols-[1.6fr,1.2fr] md:items-center">
              <div>
                <h2 className="font-texas text-3xl font-black uppercase text-primary md:text-4xl">
                  Food Truck
                </h2>
                <p className="mt-3 max-w-xl text-sm md:text-base">
                  Bring the full Texas Chicken experience to your venue with our
                  mobile food truck service. Perfect for festivals, outdoor
                  events, private functions and branded activations.
                </p>
                <ul className="mt-4 space-y-2 text-sm">
                  <li>• Live cooking and serving on-site.</li>
                  <li>• Customizable menus for your event concept.</li>
                  <li>• Ideal for high-footfall events and public launches.</li>
                </ul>
                <p className="mt-5 text-xs">
                  Get in touch with us to find out more and build the perfect
                  food truck experience for your guests.
                </p>
              </div>
              <div className="relative">
                <Carousel
                  opts={{
                    align: "start",
                    loop: true,
                  }}
                  className="mx-auto w-full max-w-5xl"
                >
                  <CarouselContent>
                    {[
                      "/images/1-.jpg",
                      "/images/2-.jpg",
                      "/images/3-.jpg",
                      "/images/4-.jpg",
                    ].map((src, index) => (
                      <CarouselItem key={index} className="basis-full">
                        <div className="relative overflow-hidden rounded-lg">
                          <NextImage
                            width={500}
                            height={500}
                            src={src}
                            alt={`Catering event ${index + 1}`}
                            className="h-auto w-full object-cover transition-transform duration-300 hover:scale-105"
                          />
                        </div>
                      </CarouselItem>
                    ))}
                  </CarouselContent>
                  <CarouselPrevious />
                  <CarouselNext />
                </Carousel>
              </div>
            </div>
            <div className="mx-auto mt-10 max-w-3xl rounded-3xl bg-[#FAF7F2] p-6 shadow-sm md:p-8">
              <h3 className="mb-4 text-center font-texas text-4xl font-extrabold uppercase text-primary">
                Food Truck Enquiry
              </h3>
              <CateringForm initialMenu="Food Truck" />
            </div>
          </div>
        </section>
      )}

      {/* Gift Vouchers */}
      {activeTab === "vouchers" && (
        <section className="py-12 md:py-16">
          <div className="container mx-auto px-4">
            <div className="mb-8 text-center">
              <h2 className="font-texas text-3xl font-black uppercase text-primary md:text-4xl">
                Gift Vouchers
              </h2>
              <p className="mx-auto mt-2 max-w-2xl text-sm text-gray-700 md:text-base">
                Share the Texas Chicken experience with meal and value vouchers
                – ideal for corporate gifting, rewards programs and special
                occasions.
              </p>
            </div>

            <div className="grid gap-6 md:grid-cols-3">
              <div className="bg-primary-5 rounded-3xl p-6 shadow-sm ring-1 ring-amber-100">
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-secondary">
                  Meal vouchers
                </p>
                <h3 className="mt-2 font-texas text-2xl font-extrabold uppercase text-third">
                  1PC & 2PC Meal
                </h3>
                <p className="mt-3 text-sm text-gray-700">
                  Entitles the bearer to a 1pc Meal or 2pc Meal, including
                  chicken, Honey-Butter Biscuit and sides, redeemable at
                  selected Texas Chicken restaurants.
                </p>
                <ul className="mt-3 space-y-1 text-xs text-gray-600">
                  <li>• Not valid for online delivery.</li>
                  <li>• Not exchangeable for cash.</li>
                  <li>• Valid until the printed expiry date.</li>
                </ul>
              </div>

              <div className="bg-primary-5 rounded-3xl p-6 shadow-sm ring-1 ring-amber-100">
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-secondary">
                  Combo vouchers
                </p>
                <h3 className="mt-2 font-texas text-2xl font-extrabold uppercase text-third">
                  2PC & 3PC Chicken Combo
                </h3>
                <p className="mt-3 text-sm text-gray-700">
                  Combo vouchers for 2pc and 3pc Chicken meals, complete with
                  sides and soft drink, redeemable at participating outlets.
                </p>
                <ul className="mt-3 space-y-1 text-xs text-gray-600">
                  <li>• Dine-in and takeaway only at selected locations.</li>
                  <li>• Not valid with other promotions or discounts.</li>
                  <li>• Strictly no revalidation after expiry.</li>
                </ul>
              </div>

              <div className="bg-primary-5 rounded-3xl p-6 shadow-sm ring-1 ring-amber-100">
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-secondary">
                  Value vouchers
                </p>
                <h3 className="mt-2 font-texas text-2xl font-extrabold uppercase text-third">
                  RM10 & RM20
                </h3>
                <p className="mt-3 text-sm text-gray-700">
                  Monetary vouchers redeemable for any purchase at participating
                  Texas Chicken and partner outlets, perfect for incentives and
                  gifting.
                </p>
                <ul className="mt-3 space-y-1 text-xs text-gray-600">
                  <li>• Not exchangeable for cash or refundable.</li>
                  <li>• No change given for unutilized balance.</li>
                  <li>• Restaurants are not responsible for lost vouchers.</li>
                </ul>
                <p className="mt-3 text-xs text-gray-500">
                  Vouchers are typically delivered to your preferred restaurant
                  within 3–5 working days and are valid for 1 year from purchase
                  date.
                </p>
              </div>
            </div>

            <div className="mx-auto mt-10 max-w-3xl rounded-3xl bg-third/5 p-6 shadow-sm md:p-8">
              <h3 className="mb-4 text-center font-texas text-2xl font-extrabold uppercase text-third">
                Gift Vouchers Enquiry
              </h3>
              <CateringForm initialMenu="Gift Vouchers" />
            </div>
          </div>
        </section>
      )}
    </div>
  );
};

export default CateringViewPage;
